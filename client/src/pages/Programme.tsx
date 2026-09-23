import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { Link, useRoute } from "wouter";

const logo = "/manus-storage/tya-logo-black-transparent_34aef484.png";
const whatsappHref = "https://wa.me/910000000000?text=Hi%20TYA%20Club%2C%20I%27d%20like%20to%20know%20more%20about%20a%20programme.";

const programmes = {
  "class-6-to-9": {
    label: "Class 6 to 9",
    short: "Find your voice",
    title: "Build the confidence to try, contribute and lead.",
    intro: "A purposeful first stage where young people learn to know themselves, work with others and take brave, practical steps.",
    colour: "#dce7e3",
    outcomes: ["Speak up with clarity and listen to another point of view.", "Break a messy problem into smaller, solvable steps.", "Recognise feelings, strengths and growing edges.", "Build trust through play, collaboration and shared Missions."],
    missions: ["The Kindness Exchange", "Design a Better Playground", "The Lost Expedition", "Build a Team That Works"],
    rhythm: "Weekly 90-minute Mission Pods · 12-week term",
  },
  "class-10-to-12": {
    label: "Class 10 to 12",
    short: "Think independently",
    title: "Turn curiosity into judgment, initiative and impact.",
    intro: "A stage for young people navigating bigger choices — with Missions that make critical thinking, negotiation and digital judgment feel useful.",
    colour: "#f6d77a",
    outcomes: ["Ask better questions before choosing a path.", "Make decisions with trade-offs and consequences in view.", "Navigate disagreement through negotiation and empathy.", "Use digital and AI tools with purpose, context and care."],
    missions: ["The Water Crisis", "Launch a Social Enterprise", "The Algorithm Debate", "City 2040"],
    rhythm: "Weekly 90-minute Mission Pods · 12-week term",
  },
  grads: {
    label: "Grads",
    short: "Own your next chapter",
    title: "Make the transition from potential to direction.",
    intro: "A practical, reflective programme for graduates who want to navigate work, money, leadership and the future with more intention.",
    colour: "#f28d63",
    outcomes: ["Map strengths, values and possible career directions.", "Make informed decisions about money and opportunity.", "Lead projects and conversations with trust and accountability.", "Use emerging tools while holding a clear professional ethic."],
    missions: ["Your First 100 Days", "The Ethical AI Brief", "Build a Sustainable Side Project", "Money, Meaning & Momentum"],
    rhythm: "Weekly 90-minute Mission Pods · 8-week term",
  },
} as const;

type ProgrammeKey = keyof typeof programmes;

function Header() {
  return <header className="sticky top-0 z-40 border-b border-[#3e4245]/10 bg-[#e9e6e1]/90 backdrop-blur-md"><div className="container flex h-[76px] items-center justify-between"><Link href="/"><img src={logo} alt="TYA Club" className="h-10 w-auto max-w-[150px] object-contain" /></Link><nav className="hidden items-center gap-8 text-sm font-semibold lg:flex"><Link className="nav-link" href="/">Home</Link><Link className="nav-link" href="/parents">For parents</Link><Link className="nav-link" href="/#curriculum">Curriculum</Link></nav><a className="btn-primary rounded-full px-5 py-3 text-sm font-bold" href={whatsappHref} target="_blank" rel="noreferrer">Ask about a trial <MessageCircle className="ml-2 inline" size={15} /></a></div></header>;
}

export default function Programme() {
  const [, params] = useRoute<{ slug: string }>("/programmes/:slug");
  const key = (params?.slug || "class-6-to-9") as ProgrammeKey;
  const programme = programmes[key] || programmes["class-6-to-9"];

  return <div className="min-h-screen bg-[#e9e6e1] text-[#3e4245]"><Header /><main>
    <section className="grain overflow-hidden bg-[#16255a] py-20 text-[#fffdf9] lg:py-28"><div className="container grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><span className="section-kicker text-[#f6d77a]">Programme · {programme.label}</span><h1 className="mt-5 max-w-[650px] text-balance text-6xl font-medium leading-[.92] tracking-[-.055em] sm:text-7xl">{programme.title}</h1><p className="mt-7 max-w-[520px] text-lg leading-8 text-white/65">{programme.intro}</p><div className="mt-9 flex flex-col gap-4 sm:flex-row"><a className="btn-primary rounded-full px-6 py-4 text-center text-sm font-bold" href={whatsappHref} target="_blank" rel="noreferrer">Book a free trial <ArrowRight className="ml-2 inline" size={16} /></a><Link className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white hover:bg-white/10" href="/parents">For parents <ArrowRight size={15} /></Link></div></div><div className="relative"><div className="absolute -right-5 -top-5 h-24 w-24 rounded-full" style={{ backgroundColor: programme.colour }} /><div className="relative rounded-[1.5rem] bg-[#fdfcf9] p-7 text-[#3e4245] shadow-[0_24px_80px_rgba(0,0,0,.22)] sm:p-10"><div className="flex items-start justify-between border-b border-[#3e4245]/12 pb-6"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7a6316]">TYA stage outcome</p><h2 className="mt-2 text-3xl font-bold">{programme.short}</h2></div><span className="grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: programme.colour }}><Sparkles size={19} /></span></div><div className="space-y-5 py-7">{programme.outcomes.map((outcome, index) => <div className="flex gap-3" key={outcome}><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dce7e3] text-[#0e7568]"><Check size={14} /></span><p className="text-base leading-6">{outcome}</p></div>)}</div><p className="border-t border-[#3e4245]/12 pt-5 text-xs font-bold uppercase tracking-[.12em] text-[#6e7478]">{programme.rhythm}</p></div></div></div></section>

    <section className="container py-24 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr]"><div><span className="section-kicker text-[#7a6316]">Learning outcomes</span><h2 className="mt-5 text-balance text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">What changes by the end of the <span className="font-display italic text-[#7a6316]">term.</span></h2><p className="mt-7 max-w-[430px] text-lg leading-8 text-[#6e7478]">The outcome is not a worksheet. It is a young person who has practised the behaviour enough to take it into the next room.</p></div><div className="grid gap-4 sm:grid-cols-2">{programme.outcomes.map((outcome, index) => <article key={outcome} className="rounded-[1.5rem] border border-[#3e4245]/10 bg-[#fdfcf9] p-6"><span className="text-xs font-bold text-[#f28d63]">0{index + 1}</span><p className="mt-12 text-xl font-semibold leading-tight">{outcome}</p></article>)}</div></div></section>

    <section className="bg-[#dce7e3] py-24 lg:py-32"><div className="container"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><span className="section-kicker text-[#7a6316]">Mission menu</span><h2 className="mt-5 text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">A reason to use the skill.</h2></div><p className="max-w-[460px] text-lg leading-8 text-[#6e7478]">Each Mission creates a real-feeling reason to practise. Roles rotate, the room stays active and the reflection makes the learning visible.</p></div><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{programme.missions.map((mission, index) => <article key={mission} className="rounded-[1.5rem] bg-[#fdfcf9] p-6 transition hover:-translate-y-1"><span className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: index % 2 ? "#f6d77a" : programme.colour }}><span className="text-sm font-bold">0{index + 1}</span></span><h3 className="mt-14 text-xl font-bold">{mission}</h3><p className="mt-3 text-sm leading-6 text-[#6e7478]">A collaborative challenge designed for this stage.</p></article>)}</div></div></section>

    <section className="container py-24 lg:py-32"><div className="rounded-[2rem] bg-[#f28d63] p-8 sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><span className="section-kicker text-[#3e4245]">Ready when they are</span><h2 className="mt-5 max-w-[680px] text-balance text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">Give them one hour to <span className="font-display italic">try.</span></h2><p className="mt-6 max-w-[480px] text-lg leading-8 text-[#3e4245]/75">Meet the coach, see a Mission in motion and decide after your young person has felt the room.</p></div><a className="btn-dark inline-flex shrink-0 items-center justify-center rounded-full px-6 py-4 text-sm font-bold" href={whatsappHref} target="_blank" rel="noreferrer">Book a free trial <MessageCircle className="ml-2" size={16} /></a></div></div></section>
  </main><footer className="bg-[#3e4245] py-10 text-[#fffdf9]"><div className="container flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><Link href="/"><img src="/manus-storage/tya-logo-gold-transparent_b4d5c758.png" alt="TYA Club" className="h-9 w-auto" /></Link><p className="text-sm text-white/55">Where skills become confidence.</p></div></footer><a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with TYA Club on WhatsApp" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,.32)] transition hover:-translate-y-1"><MessageCircle size={19} /><span className="hidden sm:inline">WhatsApp us</span></a></div>;
}
