import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, PageShell, SectionIntro, CONTACT_EMAIL, GENERAL_EMAIL, PRIMARY_PHONE, SECONDARY_PHONE, WHATSAPP_HREF } from "../components/SiteChrome";
import { isValidEmail, isValidIndianPhone } from "../lib/validation";

type ContactFields = { name: string; email: string; phone: string; message: string };
type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState<ContactFields>(() => ({
    name: "",
    email: "",
    phone: "",
    message: "",
  }));
  const [errors, setErrors] = useState<ContactErrors>({});

  useEffect(() => {
    const question = new URLSearchParams(window.location.search).get("question");
    if (question) setFields((current) => ({ ...current, message: question }));
  }, []);

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ContactErrors = {};
    if (fields.name.trim().length < 2) nextErrors.name = "Please enter the parent or guardian’s name.";
    if (!isValidEmail(fields.email)) nextErrors.email = "Enter a valid email address, for example parent@example.com.";
    if (!isValidIndianPhone(fields.phone)) nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (fields.message.trim().length < 10) nextErrors.message = "Please add a little more detail so our team can help.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  };

  return <PageShell>
    <PageHero eyebrow="Contact us" title={<>Let’s make the next step feel <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">simple.</strong></span></>} intro="Ask a question, find your nearest centre or tell us a little about the young adult you are supporting." />
    <section className="container py-16 lg:py-24">
      <SectionIntro eyebrow="Reach the team" title={<>A real person will <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">reply.</strong></span></>} description="Choose the easiest way to reach us. Our team can help with trial sessions, locations and questions about TYA." />
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <div><div className="space-y-5 text-sm"><a className="contact-line" href={`mailto:${CONTACT_EMAIL}`}><Mail size={18} /><span><b>Website email</b>{CONTACT_EMAIL}</span></a><a className="contact-line" href={`mailto:${GENERAL_EMAIL}`}><Mail size={18} /><span><b>General Gmail</b>{GENERAL_EMAIL}</span></a><a className="contact-line" href="tel:+918886665295"><Phone size={18} /><span><b>Primary phone / WhatsApp</b>{PRIMARY_PHONE}</span></a><a className="contact-line" href="tel:+918886665294"><Phone size={18} /><span><b>Secondary phone</b>{SECONDARY_PHONE}</span></a><div className="contact-line items-start"><MapPin size={18} /><span><b>Hyderabad</b>Plot 3-804, SS Chambers, 3rd Floor, Mega Hills, Ayyappa Society, Madhapur, Hyderabad – 500081, Telangana</span></div><div className="contact-line items-start"><MapPin size={18} /><span><b>Surat</b>408-415, 4th Floor, Homeland City mall, Opposite J.H. Ambani School, Vesu, Surat – 395007, Gujarat</span></div></div></div>
      <div className="form-card">{sent ? <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><CheckCircle2 className="text-[#0e9c8c]" size={54} /><h2 className="mt-6 text-4xl font-medium">Message received.</h2><p className="mt-4 max-w-[360px] text-sm leading-6 text-muted-copy">This demo form is ready to connect to your email or CRM. For now, please use WhatsApp or email for the fastest reply.</p></div> : <form className="space-y-5" noValidate onSubmit={submitEnquiry}><p className="section-kicker text-[#7a6316]">Send a message</p><h2 className="text-4xl font-medium">What can we help with?</h2>
        <label><span>Name</span><input className={`theme-input mt-2 w-full rounded-xl px-4 py-3 ${errors.name ? "field-invalid" : ""}`} value={fields.name} onChange={(event) => updateField("name", event.target.value)} onBlur={() => { if (fields.name.trim().length < 2) setErrors((current) => ({ ...current, name: "Please enter the parent or guardian’s name." })); }} aria-invalid={Boolean(errors.name)} aria-describedby="contact-name-error" /><span id="contact-name-error" className="field-error" aria-live="polite">{errors.name}</span></label>
        <label><span>Email address</span><input type="email" inputMode="email" className={`theme-input mt-2 w-full rounded-xl px-4 py-3 ${errors.email ? "field-invalid" : ""}`} value={fields.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => { if (fields.email && !isValidEmail(fields.email)) setErrors((current) => ({ ...current, email: "Enter a valid email address, for example parent@example.com." })); }} placeholder="parent@example.com" aria-invalid={Boolean(errors.email)} aria-describedby="contact-email-error" /><span id="contact-email-error" className="field-error" aria-live="polite">{errors.email}</span></label>
        <label><span>WhatsApp number</span><input type="tel" inputMode="tel" className={`theme-input mt-2 w-full rounded-xl px-4 py-3 ${errors.phone ? "field-invalid" : ""}`} value={fields.phone} onChange={(event) => updateField("phone", event.target.value)} onBlur={() => { if (fields.phone && !isValidIndianPhone(fields.phone)) setErrors((current) => ({ ...current, phone: "Enter a valid 10-digit Indian mobile number." })); }} placeholder="e.g. 88866 65295" aria-invalid={Boolean(errors.phone)} aria-describedby="contact-phone-error" /><span id="contact-phone-error" className="field-error" aria-live="polite">{errors.phone}</span></label>
        <label><span>Your message</span><textarea className={`theme-input mt-2 min-h-[130px] w-full rounded-xl px-4 py-3 ${errors.message ? "field-invalid" : ""}`} value={fields.message} onChange={(event) => updateField("message", event.target.value)} onBlur={() => { if (fields.message && fields.message.trim().length < 10) setErrors((current) => ({ ...current, message: "Please add a little more detail so our team can help." })); }} aria-invalid={Boolean(errors.message)} aria-describedby="contact-message-error" /><span id="contact-message-error" className="field-error" aria-live="polite">{errors.message}</span></label>
        <button className="btn-dark w-full rounded-full px-5 py-4 text-sm font-bold" type="submit">Send enquiry</button><a className="btn-primary flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-bold" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Or message us on WhatsApp</a>
      </form>}</div>
      </div>
    </section>
  </PageShell>;
}
