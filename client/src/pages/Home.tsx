import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "../components/SiteChrome";
import { isValidIndianPhone } from "../lib/validation";

const LOGO_BASE = import.meta.env.BASE_URL;
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  HeartHandshake,
  Leaf,
  Menu,
  MessageCircle,
  NotebookPen,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";

const heroLines = [
  { lead: "handle", emphasis: "challenges?", answer: "We help navigate them. They learn Resilience." },
  { lead: "speak with", emphasis: "confidence?", answer: "It starts here. They learn Communication." },
  { lead: "discover who", emphasis: "they are?", answer: "We nurture it. They learn Individuality." },
  { lead: "lead, not just", emphasis: "follow?", answer: "We give them room. They learn Leadership." },
  { lead: "make better", emphasis: "decisions?", answer: "We let them think on their own. They learn Judgement." },
  { lead: "handle emotions", emphasis: "better?", answer: "We help them understand feelings. They learn Emotional Intelligence." },
  { lead: "handle life,", emphasis: "not just exams?", answer: "We prepare them. They learn Life Skills." },
  { lead: "become", emphasis: "future-ready?", answer: "Welcome to TYA." },
];

const steps = [
  { number: "01", title: "Find your Pod", eyebrow: "Belong before you lead.", copy: "Meet your Mates, discover your strengths and learn to communicate, collaborate and contribute as part of a team.", icon: Users, color: "#F3F0EA" },
  { number: "02", title: "Take on a Mission", eyebrow: "Learning begins when it feels real.", copy: "Solve problems, tackle challenges, make decisions and adapt when the unexpected happens.", icon: Target, color: "#E4B42A" },
  { number: "03", title: "Step up & lead", eyebrow: "Every challenge creates an opportunity.", copy: "Take on roles, negotiate, present ideas, make decisions and learn to take responsibility when it matters.", icon: Zap, color: "#F28D63" },
  { number: "04", title: "Make an impact", eyebrow: "What you learn travels with you.", copy: "Turn learning into community, civic and environmental action — while building a visible record of growth.", icon: Leaf, color: "#F3F0EA" },
];

const curriculum = {
  "Class 6 to 9": [
    ["Leadership", "Speak up, listen and take responsibility."],
    ["Communication", "Share ideas and understand another point of view."],
    ["Problem solving", "Try, learn, adapt and keep going."],
    ["Self-awareness", "Notice feelings, strengths and growing edges."],
    ["Growth orientation", "Treat challenges as chances to get better."],
    ["Friendship", "Build trust through play and shared missions."],
  ],
  "Class 10 to 12": [
    ["Critical thinking", "Ask better questions before choosing a path."],
    ["Decision making", "Consider options and learn from outcomes."],
    ["Negotiation", "Find a way forward when people disagree."],
    ["Digital & AI literacy", "Use new tools with judgment and purpose."],
    ["Entrepreneurship", "Turn an idea into a useful next step."],
    ["Civic awareness", "See how individual action can shift a community."],
  ],
  "Grads": [
    ["Career & future planning", "Map strengths, options and the next meaningful step."],
    ["Leadership", "Lead conversations, projects and people with purpose."],
    ["Financial literacy", "Make informed decisions about money and opportunity."],
    ["Entrepreneurship", "Turn a useful idea into sustainable action."],
    ["Digital & AI literacy", "Use emerging tools with judgment and responsibility."],
    ["Professional ethics", "Build trust through principled decisions."],
  ],
} as const;

type CurriculumTab = keyof typeof curriculum;

const faqs = [
  { question: "What happens in a typical TYA session?", answer: "Every session starts with a Mission — a real-feeling challenge that gives young people a reason to use the skill. They work in their Pod, take on roles, make decisions, reflect and try again. It is active, social and structured, not another class where they sit and listen." },
  { question: "How do I know if TYA is right for my young person?", answer: "TYA is organised into three stages: Class 6 to 9, Class 10 to 12 and Grads. Each stage adapts the Missions and language to where the learner is — from building confidence and communication to career, financial and future planning." },
  { question: "How do parents see progress?", answer: "You receive a written TYA Growth Card every month. It is not a grade or a certificate — it is a clear snapshot of five behaviours the coach actually observed: confidence, collaboration, decision making, adaptability and ownership." },
  { question: "How are safety and consistency handled?", answer: "Batches are intentionally structured for 30 young people, with coach-led Pods and clear roles for participation. Coaches are verified, pick-up is named, and every centre follows the same term structure so parents know what week one is building towards." },
];

function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${reversed ? "text-[#fffdf9]" : "text-[#2B2F32]"}`} aria-label="TYA Club home">
      {reversed ? <img src={`${LOGO_BASE}tya-logo-lockup-coral.svg`} alt="TYA Club" className="h-12 w-auto max-w-[170px] object-contain" /> : <img src={`${LOGO_BASE}tya-logo-lockup.svg`} alt="TYA Club" className="h-10 w-auto max-w-[150px] object-contain" />}
    </a>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <span className={`section-kicker ${light ? "text-[#E4B42A]" : "text-[#2B2F32]"}`}>{children}</span>;
}

export default function Home() {
  const [heroOrder, setHeroOrder] = useState<number[]>(() => Array.from({ length: heroLines.length }, (_, index) => index));
  const [heroPosition, setHeroPosition] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [trialPhone, setTrialPhone] = useState("");
  const [trialPhoneError, setTrialPhoneError] = useState("");
  const [curriculumTab, setCurriculumTab] = useState<CurriculumTab>("Class 6 to 9");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroPosition((current) => {
        const next = current + 1;
        if (next >= heroOrder.length) {
          setHeroOrder((currentOrder) => {
            const shuffled = [...currentOrder];
            for (let index = shuffled.length - 1; index > 0; index -= 1) {
              const swapIndex = Math.floor(Math.random() * (index + 1));
              [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
            }
            return shuffled;
          });
          return 0;
        }
        return next;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [heroOrder.length]);

  const line = heroLines[heroOrder[heroPosition]];

  function handleTrialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidIndianPhone(trialPhone)) {
      setTrialPhoneError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setTrialPhoneError("");
    setTrialSubmitted(true);
    toast.success("Trial request received.");
  }

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#F3F0EA] text-[#2B2F32]">
      <header className="relative z-40 border-b border-[#2B2F32]/10 bg-[#E4B42A]">
        <div className="container flex min-h-[92px] items-center justify-between gap-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-[.02em] lg:flex" aria-label="Primary navigation">
            <a className="nav-link" href="/about">About</a>
            <a className="nav-link" href="/how-it-works">Why TYA?</a>
            <a className="nav-link" href="/parents">Note for parents</a>
            <a className="nav-link" href="/curriculum">Curriculum</a>
            <a className="nav-link" href="/experience">TYA Experience</a>
            <a className="nav-link" href="/franchise">Franchise</a>
            <a className="nav-link" href="/contact">Contact us</a>
          </nav>
          <button className="rounded-full p-2 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="container flex flex-col gap-4 border-t border-[#2B2F32]/15 py-5 lg:hidden" aria-label="Mobile navigation">
          {[['About', '/about'], ['Why TYA?', '/how-it-works'], ['Note for parents', '/parents'], ['Curriculum', '/curriculum'], ['TYA Experience', '/experience'], ['Franchise', '/franchise'], ['Contact us', '/contact']].map(([label, href]) => <a key={href} className="text-base font-semibold uppercase" href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>}
      </header>

      <main>
        <section className="grain hero-grid relative overflow-hidden border-b border-[#2B2F32]/10 bg-[#F3F0EA]">
          <div className="container grid min-h-[790px] items-center gap-12 py-12 lg:grid-cols-[1.08fr_.92fr] lg:py-16">
            <div className="relative z-10 max-w-[680px]">
              <div className="reveal mb-10 flex items-center gap-3 text-[15px] font-medium text-[#2B2F32]"><span className="h-4 w-4 rounded-full bg-[#F28D63]" /> Transforming Young Adults into future greatness</div>
              <h1 className="reveal reveal-2 text-balance text-[clamp(3.8rem,7vw,6.8rem)] font-extrabold leading-[.88] tracking-[-.055em] text-[#2B2F32]">
                <span className="block">TYA CLUB</span>
                <span className="mt-1 block text-[.47em] font-medium leading-[1.05] tracking-[-.025em]">Transforming Young Adults</span>
              </h1>
              <p className="reveal reveal-3 mt-7 max-w-[650px] text-[18px] font-medium leading-[1.5] text-[#2B2F32]">
                TYA Club is designed to help young adults develop<br className="hidden sm:block" /> the mindset and life skills that go beyond the classroom.
              </p>
              <p className="reveal reveal-3 mt-8 max-w-[650px] text-[18px] font-medium leading-[1.5] text-[#2B2F32]">
                It’s a platform designed to empower young minds<br className="hidden sm:block" /> aged 11–22 to communicate with confidence,<br className="hidden sm:block" /> think independently, make informed decisions,<br className="hidden sm:block" /> and navigate the challenges of the real world.
              </p>
              <form className="reveal reveal-3 mt-9 flex max-w-[545px] items-center gap-3 rounded-none border-[4px] border-[#2B2F32] bg-white p-2" onSubmit={(event) => { event.preventDefault(); window.location.href = "/centres"; }}>
                <Compass size={21} className="ml-3 shrink-0 text-[#F28D63]" />
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#656A6D]">Find your centre</p>
                  <input aria-label="Enter pin code or city" className="w-full border-0 bg-transparent p-0 text-sm font-semibold outline-none" placeholder="Enter pin code or city" />
                </div>
                <button type="submit" className="rounded-lg bg-[#E4B42A] px-7 py-4 text-sm font-bold text-[#2B2F32]">Search</button>
              </form>
            </div>

            <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
              <div className="absolute -right-1 -top-7 h-28 w-28 rounded-full border border-[#F28D63]/50 bg-[#F28D63]/20" />
              <div className="absolute -bottom-2 -left-5 h-32 w-32 rounded-full border border-[#2B2F32]/15 bg-[#F3F0EA] hero-orb delay" />
              <div className="relative rotate-[2deg] overflow-hidden rounded-[2rem] border-[8px] border-white bg-white shadow-[0_24px_70px_rgba(62,66,69,.14)]">
                <div className="relative min-h-[570px] bg-[#2B2F32] px-10 pb-9 pt-10 text-white sm:px-14">
                  <div className="text-xs font-bold uppercase tracking-[.16em] text-[#E4B42A]">Mission {String(heroOrder[heroPosition] + 1)}:</div>
                  <div className="mt-20 max-w-[420px] text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-.04em]">
                    {line.lead} {line.emphasis}
                  </div>
                  <div className="absolute bottom-28 left-12 right-12 flex gap-1.5">
                    {Array.from({ length: 11 }).map((_, index) => <span key={index} className={`h-1 flex-1 ${index < 6 ? "bg-[#E4B42A]" : "bg-white/80"}`} />)}
                  </div>
                  <div className="absolute bottom-7 left-12 right-12">
                    <p className="text-lg leading-7 text-white">We let them own it.</p>
                    <p className="text-lg leading-7 text-white">They learn <strong className="font-extrabold uppercase">{line.answer.replace(/^.*They learn /, "").replace(/\.$/, "")}</strong></p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-28 w-44 rounded-[1.2rem] bg-[#F28D63] shadow-[0_12px_25px_rgba(62,66,69,.12)]" />
            </div>
          </div>
          <div className="container pb-8"><div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[.16em] text-[#656A6D]"><span className="story-line h-px w-16" /> Scroll to explore <ArrowDownRight size={14} /></div></div>
        </section>

      <section className="border-b border-[#2B2F32]/10 bg-[#FFFFFF] py-7">
          <div className="container flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><p className="max-w-[250px] text-sm font-semibold leading-6 text-[#656A6D]">A club built for the skills school can’t grade.</p><div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-[#2B2F32]"><span>Leadership</span><span>Communication</span><span>Problem solving</span><span className="hidden sm:inline">Self-awareness</span><span className="hidden md:inline">Digital & AI literacy</span></div><span className="hidden text-xs font-bold uppercase tracking-[.12em] text-[#2B2F32] lg:inline">Learn · Try · Own</span></div>
        </section>

        <section id="programmes" className="container py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><SectionLabel>Why TYA</SectionLabel><h2 className="mt-5 max-w-[540px] text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">The skills that make the <span className="font-display italic text-[#2B2F32]">difference.</span></h2></div><p className="max-w-[510px] text-lg leading-8 text-[#656A6D]">TYA is where young people practise the things that matter later — making a call, listening to another point of view, taking responsibility and trying again when the first plan fails.</p></div>
          <div className="mt-16 grid gap-4 md:grid-cols-3"><article className="card-sheen rounded-[1.5rem] bg-[#2B2F32] p-7 text-[#fffdf9] md:col-span-2 md:min-h-[250px]"><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#E4B42A] text-[#2B2F32]"><ShieldCheck size={20} /></span><span className="section-kicker text-[#E4B42A]">01 · Built for growth</span></div><div className="mt-12"><h3 className="text-3xl font-semibold tracking-[-.03em]">Room for every young adult to lead.</h3><p className="mt-3 max-w-[470px] leading-7 text-white/65">Thirty young people, guided by a coach-led Pod model. A space where being heard is part of the experience.</p></div></div></article><article className="rounded-[1.5rem] bg-[#F3F0EA] p-7 md:min-h-[250px]"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#2B2F32] text-[#fffdf9]"><HeartHandshake size={20} /></span><p className="mt-12 text-2xl font-semibold leading-tight">Friends first.<br />Confidence follows.</p><p className="mt-3 text-sm leading-6 text-[#656A6D]">A Pod makes room for quiet thinkers, natural leaders and everyone in between.</p></article><article className="rounded-[1.5rem] border border-[#2B2F32]/12 bg-[#E4B42A] p-7 md:min-h-[250px]"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#2B2F32] text-[#E4B42A]"><NotebookPen size={20} /></span><p className="mt-12 text-2xl font-semibold leading-tight">Progress you can<br />actually see.</p><p className="mt-3 text-sm leading-6 text-[#2B2F32]/70">A coach-written Growth Card comes home every month.</p></article><article className="rounded-[1.5rem] border border-[#2B2F32]/12 bg-[#FFFFFF] p-7 md:col-span-2 md:min-h-[250px]"><div className="flex h-full flex-col justify-between md:flex-row md:items-end md:gap-10"><div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#F28D63]"><Compass size={20} /></span><p className="mt-12 text-2xl font-semibold leading-tight">The real world, in<br />a safe place to try.</p></div><p className="max-w-[300px] text-sm leading-6 text-[#656A6D]">Water crises, negotiations, business decisions, community challenges. Every Mission gives skills a reason to matter.</p></div></article></div>
        </section>

        <section className="container pb-24 lg:pb-32"><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="group relative overflow-hidden rounded-[1.5rem] bg-[#2B2F32]"><img src="/manus-storage/tya-indian-mission_3a12c7e2.jpg" alt="Indian young people working together during a creative workshop" className="h-[330px] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2F32] via-[#2B2F32]/75 to-transparent p-7 pt-24"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#E4B42A]">Inside a Mission</p><p className="mt-2 max-w-[380px] text-2xl font-semibold leading-tight text-[#fffdf9]">They do not just hear about the skill. They use it.</p></div></div><div className="flex flex-col justify-between rounded-[1.5rem] bg-[#F3F0EA] p-7"><div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#E4B42A]"><Sparkles size={19} /></span><h3 className="mt-12 text-3xl font-semibold leading-tight tracking-[-.03em]">A real room.<br />A real challenge.</h3></div><div><p className="text-sm leading-6 text-[#656A6D]">The experience becomes tangible for parents when they can picture the room: a table, a team and an idea taking shape.</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-bold" href="/parents">See the parent view <ArrowRight size={15} /></a></div></div></div></section>

        <section id="how-it-works" className="grain bg-[#FFFFFF] py-24 lg:py-32"><div className="container"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><SectionLabel>How TYA works</SectionLabel><h2 className="mt-5 max-w-[660px] text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">Four steps. One journey. A stronger, more capable <span className="font-display italic text-[#2B2F32]">young person.</span></h2></div><p className="max-w-[340px] text-lg leading-7 text-[#656A6D]">Every Pod experience combines real challenges, practical skills, teamwork and responsibility.</p></div><div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{steps.map((step) => { const Icon = step.icon; return <article key={step.number} className="step-card rounded-[1.5rem] border border-[#2B2F32]/10 bg-[#F3F0EA] p-6"><div className="flex items-start justify-between"><span className="text-sm font-bold text-[#2B2F32]">{step.number}</span><span className="grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: step.color }}><Icon size={19} /></span></div><h3 className="mt-14 text-2xl font-semibold tracking-[-.03em]">{step.title}</h3><p className="mt-3 text-sm font-bold text-[#2B2F32]">{step.eyebrow}</p><p className="mt-4 text-sm leading-6 text-[#656A6D]">{step.copy}</p><a className="mt-7 inline-flex items-center gap-2 text-sm font-bold" href="#curriculum">Explore skills <ArrowRight size={15} /></a></article>; })}</div></div></section>

        <section id="curriculum" className="container py-24 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start"><div><SectionLabel>What they learn</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">Not just <span className="font-display italic text-[#2B2F32]">knowledge.</span><br />Capability.</h2><p className="mt-7 max-w-[410px] text-lg leading-8 text-[#656A6D]">A purposeful curriculum that moves from self-awareness to social responsibility, through missions that make every skill feel useful.</p><div className="mt-9 flex items-start gap-3 border-l-2 border-[#F28D63] pl-4 text-sm leading-6 text-[#656A6D]"><span className="font-bold text-[#2B2F32]">18+ skills</span><span>·</span><span>Delivered through stories, roles and missions — never worksheets alone.</span></div></div><div><div className="flex flex-wrap gap-2 border-b border-[#2B2F32]/15 pb-5">{(Object.keys(curriculum) as CurriculumTab[]).map((tab) => <button key={tab} onClick={() => setCurriculumTab(tab)} className={`rounded-full px-5 py-3 text-sm font-bold transition ${curriculumTab === tab ? "bg-[#2B2F32] text-[#fffdf9]" : "bg-[#FFFFFF] text-[#656A6D] hover:bg-[#F3F0EA]"}`}>{tab}</button>)}</div><a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2B2F32]" href={`/programmes/${curriculumTab === "Class 6 to 9" ? "class-6-to-9" : curriculumTab === "Class 10 to 12" ? "class-10-to-12" : "grads"}`}>Explore the {curriculumTab} programme <ArrowRight size={15} /></a><div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">{curriculum[curriculumTab].map(([title, copy], index) => <div key={title} className="group border-b border-[#2B2F32]/12 py-6"><div className="flex items-start gap-4"><span className="mt-1 text-xs font-bold text-[#F28D63]">0{index + 1}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#656A6D]">{copy}</p></div></div></div>)}</div></div></div></section>

        <section id="parents" className="bg-[#2B2F32] py-24 text-[#fffdf9] lg:py-32"><div className="container"><div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><SectionLabel light>For parents</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">A card comes home. Not a <span className="font-display italic text-[#E4B42A]">grade.</span></h2><p className="mt-7 max-w-[470px] text-lg leading-8 text-white/65">Every TYA Mission gives your child opportunities to practise skills that matter beyond the Pod — at school, at home, in relationships and eventually in the real world.</p><button className="btn-primary mt-9 rounded-full px-6 py-4 text-sm font-bold" onClick={() => { setTrialSubmitted(false); setTrialOpen(true); }}>See it in a free trial <ArrowRight className="ml-2 inline" size={16} /></button></div><div className="relative mx-auto w-full max-w-[520px]"><div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-[#F28D63]" /><div className="relative rotate-[3deg] rounded-[1.5rem] bg-[#FFFFFF] p-6 text-[#2B2F32] shadow-[0_24px_80px_rgba(0,0,0,.22)] sm:p-9"><div className="flex items-start justify-between border-b border-[#2B2F32]/12 pb-6"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#2B2F32]">TYA Growth Card</p><h3 className="mt-2 text-2xl font-bold">Aarav</h3><p className="text-sm text-[#656A6D]">TYA Pod · Monthly snapshot</p></div><span className="grid h-12 w-12 place-items-center rounded-full bg-[#E4B42A]"><Sparkles size={19} /></span></div><div className="space-y-5 py-7">{[['Confidence', 82], ['Communication', 76], ['Collaboration', 92], ['Decision making', 72], ['Adaptability', 81], ['Ownership', 62]].map(([label, value]) => <div key={label as string}><div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[.12em]"><span>{label as string}</span><span className="text-[#2B2F32]">{value as number}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#F3F0EA]"><div className="h-full rounded-full bg-[#2B2F32]" style={{ width: `${value}%` }} /></div></div>)}</div><div className="rounded-xl bg-[#F3F0EA] p-4"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#F28D63]">TYA moment</p><p className="mt-2 text-sm leading-6">“In the Water Crisis Mission, Aarav proposed a compromise both Pods accepted — and volunteered to present it.”</p></div><p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[.15em] text-[#656A6D]">Written by the coach who was in the room</p></div></div></div></div></section>

        <section className="led-marquee py-4"><div className="marquee"><div className="marquee-track gap-9"><span>learn by doing</span><span className="text-[#2B2F32]">✳</span><span>find your voice</span><span className="text-[#F28D63]">✳</span><span>make an impact</span><span className="text-[#2B2F32]">✳</span><span>learn by doing</span><span className="text-[#2B2F32]">✳</span><span>find your voice</span><span className="text-[#F28D63]">✳</span><span>make an impact</span></div></div></section>

        <section className="container py-24 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionLabel>Parent questions</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">Good questions deserve <span className="font-display italic text-[#2B2F32]">proper</span> answers.</h2><p className="mt-7 max-w-[370px] leading-7 text-[#656A6D]">Not marketing promises. The practical details that help you decide if TYA is right for your young person.</p><a href="/experience" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#2B2F32]">See all questions <ArrowRight size={15} /></a></div><div className="border-t border-[#2B2F32]/15">{faqs.map((faq, index) => <div key={faq.question} className="border-b border-[#2B2F32]/15"><button className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E4B42A] transition-transform ${openFaq === index ? "rotate-180" : ""}`}><ChevronDown size={16} /></span></button>{openFaq === index && <p className="max-w-[680px] pb-7 pr-12 text-sm leading-7 text-[#656A6D]">{faq.answer}</p>}</div>)}</div></div></section>

        <section className="container pb-24 lg:pb-32"><div className="relative overflow-hidden rounded-[2rem] bg-[#F28D63] px-7 py-14 sm:px-12 lg:px-20 lg:py-20"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-[#E4B42A]/50" /><div className="absolute bottom-[-60px] left-[42%] h-36 w-36 rounded-full border-[20px] border-[#2B2F32]/10" /><div className="relative z-10 max-w-[680px]"><SectionLabel>One free trial · decide after, not during</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.96] tracking-[-.045em] sm:text-6xl">The next chapter starts with <span className="font-display italic">one hour.</span></h2><p className="mt-6 max-w-[500px] text-lg leading-8 text-[#2B2F32]/75">Sit in on a Mission. Meet the coach. See how your child finds their place.</p><button className="btn-dark mt-9 rounded-full px-7 py-4 text-sm font-bold" onClick={() => { setTrialSubmitted(false); setTrialOpen(true); }}>Book a free trial <ArrowRight className="ml-2 inline" size={16} /></button></div></div></section>
      </main>

      <footer className="bg-[#2B2F32] py-12 text-[#fffdf9]"><div className="container"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 lg:flex-row"><div><Logo reversed /><p className="mt-5 max-w-[300px] text-sm leading-6 text-white/55">Where skills become confidence. An after-school club for young people, built around real experience.</p></div><div className="grid grid-cols-2 gap-x-14 gap-y-4 text-sm font-semibold sm:grid-cols-3"><div className="flex flex-col gap-3"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#E4B42A]">Explore</span><a className="text-white/65 hover:text-white" href="/about">About TYA</a><a className="text-white/65 hover:text-white" href="/how-it-works">How it works</a><a className="text-white/65 hover:text-white" href="/curriculum">Curriculum</a></div><div className="flex flex-col gap-3"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#E4B42A]">Parents</span><a className="text-white/65 hover:text-white" href="/parents">For parents</a><a className="text-white/65 hover:text-white" href="/centres">Find a centre</a><button className="text-left text-white/65 hover:text-white" onClick={() => { setTrialSubmitted(false); setTrialOpen(true); }}>Book a trial</button></div><div className="col-span-2 flex flex-col gap-3 sm:col-span-1"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#E4B42A]">Say hello</span><a className="flex items-center gap-2 text-white/65 hover:text-white" href="mailto:hello@thetyaclub.com"><MessageCircle size={14} /> hello@thetyaclub.com</a><a className="flex items-center gap-2 text-white/65 hover:text-white" href="tel:+918886665295"><Phone size={14} /> +91 888 666 5295</a><a className="flex items-center gap-2 text-white/65 hover:text-white" href="tel:+918886665294"><Phone size={14} /> +91 888 666 5294</a></div></div></div><div className="flex flex-col justify-between gap-4 pt-7 text-xs text-white/45 sm:flex-row"><p>© 2026 TYA Club. Built for the next version of young people.</p><div className="flex gap-5"><a href="#top">Privacy</a><a href="#top">Terms</a><span className="text-[#E4B42A]">Learn. Try. Own.</span></div></div></div></footer>

      

      {trialOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#2B2F32]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="trial-title"><div className="relative max-h-[90vh] w-full max-w-[520px] overflow-auto rounded-[1.5rem] bg-[#FFFFFF] p-7 shadow-2xl sm:p-10"><button className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#F3F0EA]" aria-label="Close trial form" onClick={() => setTrialOpen(false)}><X size={20} /></button>{trialSubmitted ? <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><div className="success-pop grid h-20 w-20 place-items-center rounded-full bg-[#F3F0EA] text-[#2B2F32]"><CheckCircle2 size={42} strokeWidth={1.7} /></div><SectionLabel>Next step · centre match</SectionLabel><h2 id="trial-title" className="mt-4 text-4xl font-medium leading-none tracking-[-.04em]">You’re on the <span className="font-display italic text-[#2B2F32]">list.</span></h2><p className="mt-5 max-w-[360px] text-sm leading-6 text-[#656A6D]">A TYA centre guide will WhatsApp you within one working day to confirm the best trial slot and share what to expect.</p><div className="mt-7 flex w-full flex-col gap-3 sm:flex-row"><a className="btn-dark flex-1 rounded-full px-5 py-3 text-sm font-bold" href="https://wa.me/918886665295?text=Hi%20TYA%20Club%2C%20I%20just%20requested%20a%20trial%20and%20would%20like%20to%20choose%20a%20slot." target="_blank" rel="noreferrer">Message us now <MessageCircle className="ml-2 inline" size={15} /></a><button className="flex-1 rounded-full border border-[#2B2F32]/15 px-5 py-3 text-sm font-bold hover:bg-[#F3F0EA]" onClick={() => setTrialOpen(false)}>Done</button></div></div> : <><SectionLabel>Start with one hour</SectionLabel><h2 id="trial-title" className="mt-4 pr-8 text-4xl font-medium leading-none tracking-[-.04em]">Book a free <span className="font-display italic text-[#2B2F32]">trial.</span></h2><p className="mt-4 max-w-[400px] text-sm leading-6 text-[#656A6D]">Tell us a little about your young person and we’ll match you with the right TYA centre guide.</p><form className="mt-7 space-y-4" onSubmit={handleTrialSubmit}><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">Parent name</span><input required name="parent" placeholder="Your name" className="w-full rounded-xl border border-[#2B2F32]/15 bg-[#F3F0EA]/45 px-4 py-3 outline-none placeholder:text-[#656A6D]/60 focus:border-[#2B2F32]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">Learner stage</span><select required name="age" defaultValue="" className="w-full rounded-xl border border-[#2B2F32]/15 bg-[#F3F0EA]/45 px-4 py-3 outline-none focus:border-[#2B2F32]"><option value="" disabled>Select a stage</option><option>Class 6 to 9</option><option>Class 10 to 12</option><option>Grads</option></select></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">City or locality</span><input required name="city" placeholder="e.g. Surat or Hyderabad" className="w-full rounded-xl border border-[#2B2F32]/15 bg-[#F3F0EA]/45 px-4 py-3 outline-none placeholder:text-[#656A6D]/60 focus:border-[#2B2F32]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">WhatsApp number</span><input type="tel" name="phone" inputMode="tel" placeholder="e.g. 88866 65295" value={trialPhone} onChange={(event) => { setTrialPhone(event.target.value); if (trialPhoneError) setTrialPhoneError(""); }} onBlur={() => { if (trialPhone && !isValidIndianPhone(trialPhone)) setTrialPhoneError("Enter a valid 10-digit Indian mobile number."); }} aria-invalid={Boolean(trialPhoneError)} aria-describedby="trial-phone-error" className={`w-full rounded-xl border bg-[#F3F0EA]/45 px-4 py-3 outline-none placeholder:text-[#656A6D]/60 focus:border-[#2B2F32] ${trialPhoneError ? "field-invalid" : "border-[#2B2F32]/15"}`} /><span id="trial-phone-error" className="field-error" aria-live="polite">{trialPhoneError}</span></label><button className="btn-dark mt-3 w-full rounded-full px-6 py-4 text-sm font-bold" type="submit">Request my free trial <ArrowRight className="ml-2 inline" size={16} /></button><p className="flex items-center justify-center gap-2 text-center text-xs text-[#656A6D]"><Check size={14} className="text-[#2B2F32]" /> No payment needed · Parents welcome to sit in</p></form></>}</div></div>}
    </div>
  );
}
