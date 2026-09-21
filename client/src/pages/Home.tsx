import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
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
  { lead: "be ready for the", emphasis: "real world?", answer: "Let them experience it." },
  { lead: "lead with", emphasis: "confidence?", answer: "Let them experience it." },
  { lead: "solve problems that", emphasis: "matter?", answer: "Let them experience it." },
  { lead: "work with people", emphasis: "unlike themselves?", answer: "Let them experience it." },
  { lead: "make an impact beyond", emphasis: "the classroom?", answer: "Let them experience it." },
];

const steps = [
  { number: "01", title: "Find your Pod", eyebrow: "Belong before you lead.", copy: "Meet your Mates, discover your strengths and learn to communicate, collaborate and contribute as part of a team.", icon: Users, color: "#dce7e3" },
  { number: "02", title: "Take on a Mission", eyebrow: "Learning begins when it feels real.", copy: "Solve problems, tackle challenges, make decisions and adapt when the unexpected happens.", icon: Target, color: "#f6d77a" },
  { number: "03", title: "Step up & lead", eyebrow: "Every challenge creates an opportunity.", copy: "Take on roles, negotiate, present ideas, make decisions and learn to take responsibility when it matters.", icon: Zap, color: "#f28d63" },
  { number: "04", title: "Make an impact", eyebrow: "What you learn travels with you.", copy: "Turn learning into community, civic and environmental action — while building a visible record of growth.", icon: Leaf, color: "#b7cfca" },
];

const curriculum = {
  "6–9": [
    ["Leadership", "Speak up, listen and take responsibility."],
    ["Communication", "Share ideas and understand another point of view."],
    ["Problem solving", "Try, learn, adapt and keep going."],
    ["Self-awareness", "Notice feelings, strengths and growing edges."],
    ["Growth orientation", "Treat challenges as chances to get better."],
    ["Friendship", "Build trust through play and shared missions."],
  ],
  "10–14": [
    ["Critical thinking", "Ask better questions before choosing a path."],
    ["Decision making", "Consider options and learn from outcomes."],
    ["Negotiation", "Find a way forward when people disagree."],
    ["Digital & AI literacy", "Use new tools with judgment and purpose."],
    ["Entrepreneurship", "Turn an idea into a useful next step."],
    ["Civic awareness", "See how individual action can shift a community."],
  ],
  "All ages": [
    ["Confidence", "Be willing to try, speak and show your work."],
    ["Collaboration", "Listen, support others and work towards an outcome."],
    ["Adaptability", "Respond constructively when plans change."],
    ["Creativity", "Imagine more than one answer."],
    ["Planning", "Break a big ambition into practical steps."],
    ["Social responsibility", "Make choices that help more than just yourself."],
  ],
} as const;

type CurriculumTab = keyof typeof curriculum;

const faqs = [
  { question: "What happens in a typical TYA session?", answer: "Every session starts with a Mission — a real-feeling challenge that gives young people a reason to use the skill. They work in their Pod, take on roles, make decisions, reflect and try again. It is active, social and structured, not another class where they sit and listen." },
  { question: "How do I know if TYA is right for my child?", answer: "TYA is designed for ages 6–14, with experiences adapted for different stages. It works especially well for young people who are curious, thoughtful, energetic, shy, outspoken or still finding their place — the programme makes room for different ways of contributing." },
  { question: "How do parents see progress?", answer: "You receive a written TYA Growth Card every month. It is not a grade or a certificate — it is a clear snapshot of five behaviours the coach actually observed: confidence, collaboration, decision making, adaptability and ownership." },
  { question: "How are safety and consistency handled?", answer: "Batches are intentionally small: twelve young people, one coach and one assistant. Coaches are verified, pick-up is named, and every centre follows the same term structure so parents know what week one is building towards." },
];

function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${reversed ? "text-[#fffdf9]" : "text-[#3e4245]"}`} aria-label="TYA Club home">
      <span className="relative flex h-10 w-8 items-center justify-center">
        <span className="absolute bottom-0 h-8 w-6 -skew-x-[22deg] rounded-[5px_5px_10px_10px] bg-current" />
        <span className="absolute top-1 h-2.5 w-2.5 rounded-full bg-[#f6d77a]" />
        <span className="absolute bottom-2 left-1.5 h-[2px] w-4 rotate-[31deg] bg-[#f6d77a]" />
      </span>
      <span className="leading-none">
        <span className="block text-[1.15rem] font-bold tracking-[.28em]">TYA.</span>
        <span className="block pt-1 text-[.57rem] font-bold tracking-[.32em] opacity-70">CLUB</span>
      </span>
    </a>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <span className={`section-kicker ${light ? "text-[#f6d77a]" : "text-[#7a6316]"}`}>{children}</span>;
}

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [curriculumTab, setCurriculumTab] = useState<CurriculumTab>("All ages");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % heroLines.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  const line = heroLines[heroIndex];

  function handleTrialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTrialOpen(false);
    toast.success("Thanks — your trial request is on its way.", { description: "A TYA centre guide will get in touch shortly." });
  }

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#e9e6e1] text-[#3e4245]">
      <div className="bg-[#3e4245] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[.16em] text-[#f6d77a] sm:text-xs">Admissions open · 12 young people per batch · Book a free trial</div>

      <header className="relative z-40 border-b border-[#3e4245]/10 bg-[#e9e6e1]/90 backdrop-blur-md">
        <div className="container flex h-[76px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex" aria-label="Primary navigation">
            <a className="nav-link" href="#programmes">Programmes</a>
            <a className="nav-link" href="#how-it-works">How it works</a>
            <a className="nav-link" href="#parents">For parents</a>
            <a className="nav-link" href="#curriculum">Curriculum</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button className="btn-ghost flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold" onClick={() => toast("Centre finder coming soon", { description: "For now, tell us your city when you book a trial." })}><Compass size={15} /> Find a centre</button>
            <button className="btn-primary rounded-full px-5 py-3 text-sm font-bold" onClick={() => setTrialOpen(true)}>Book a free trial <ArrowRight className="ml-1 inline" size={15} /></button>
          </div>
          <button className="rounded-full p-2 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="container flex flex-col gap-4 border-t border-[#3e4245]/10 py-5 lg:hidden" aria-label="Mobile navigation">
          {[['Programmes', '#programmes'], ['How it works', '#how-it-works'], ['For parents', '#parents'], ['Curriculum', '#curriculum']].map(([label, href]) => <a key={href} className="text-base font-semibold" href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button className="btn-primary mt-2 w-full rounded-full px-5 py-3 text-sm font-bold" onClick={() => { setMenuOpen(false); setTrialOpen(true); }}>Book a free trial <ArrowRight className="ml-1 inline" size={15} /></button>
        </nav>}
      </header>

      <main>
        <section className="grain hero-grid relative overflow-hidden border-b border-[#3e4245]/10 bg-[#e9e6e1]">
          <div className="container grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div className="relative z-10 max-w-[680px]">
              <div className="reveal mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.17em] text-[#7a6316]"><span className="h-2 w-2 rounded-full bg-[#f28d63]" /> An after-school club for ages 6–14</div>
              <h1 className="reveal reveal-2 text-balance text-[clamp(3.55rem,7vw,6.7rem)] font-medium leading-[.91] tracking-[-.055em] text-[#3e4245]">Want your child to<br /><span className="font-display italic text-[#7a6316]">{line.lead}</span><br /><span className="relative inline-block">{line.emphasis}<span className="absolute -bottom-2 left-0 h-1 w-3/4 bg-[#f28d63]" /></span></h1>
              <p className="reveal reveal-3 mt-9 max-w-[500px] text-lg leading-8 text-[#6e7478]">{line.answer} Real missions, small Pods and a monthly view of the progress that matters beyond school.</p>
              <div className="reveal reveal-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button className="btn-dark rounded-full px-6 py-4 text-sm font-bold" onClick={() => setTrialOpen(true)}>Book a free trial <ArrowRight className="ml-2 inline" size={16} /></button>
                <a href="#how-it-works" className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-bold">See how it works <ArrowDownRight className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" size={16} /></a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#3e4245]/15 pt-5 text-xs font-semibold text-[#6e7478]"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#0e9c8c]" /> Verified coaches</span><span className="flex items-center gap-2"><Users size={15} className="text-[#0e9c8c]" /> 12 per batch</span><span className="flex items-center gap-2"><NotebookPen size={15} className="text-[#0e9c8c]" /> Monthly Growth Card</span></div>
            </div>

            <div className="relative mx-auto w-full max-w-[510px] lg:ml-auto">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#f28d63]/40 bg-[#f28d63]/20 hero-orb" />
              <div className="absolute -bottom-7 -left-9 h-32 w-32 rounded-full border border-[#0e9c8c]/30 bg-[#0e9c8c]/15 hero-orb delay" />
              <div className="relative rotate-[2deg] rounded-[2rem] border border-[#3e4245]/10 bg-[#fdfcf9] p-4 shadow-[0_24px_70px_rgba(62,66,69,.14)]">
                <div className="overflow-hidden rounded-[1.25rem] bg-[#3e4245]">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-[10px] font-bold uppercase tracking-[.17em] text-[#f6d77a]"><span>Mission 07</span><span className="flex items-center gap-1.5 text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-[#f28d63]" /> In progress</span></div>
                  <div className="relative min-h-[330px] p-6">
                    <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-[#0e9c8c]/50 blur-[1px]" />
                    <div className="absolute right-10 top-10 h-20 w-20 rounded-full border border-[#f6d77a]/40" />
                    <span className="relative z-10 text-xs font-bold uppercase tracking-[.16em] text-white/45">The water crisis</span>
                    <h2 className="relative z-10 mt-12 max-w-[270px] text-4xl font-medium leading-[.95] tracking-[-.04em] text-[#fffdf9]">Find a way forward<br /><span className="font-display italic text-[#f6d77a]">together.</span></h2>
                    <div className="absolute bottom-7 left-6 right-6 grid grid-cols-3 gap-2"><span className="h-1.5 rounded-full bg-[#f6d77a]" /><span className="h-1.5 rounded-full bg-[#f6d77a]" /><span className="h-1.5 rounded-full bg-white/15" /></div>
                    <div className="absolute bottom-4 right-6 text-[10px] font-bold uppercase tracking-[.17em] text-white/45">Pod 04 · Arena</div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 pb-1 pt-5"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#7a6316]">What grows here</p><p className="mt-1 text-xl font-semibold">Judgment · empathy · courage</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f6d77a]"><Sparkles size={18} /></span></div>
              </div>
              <div className="absolute -bottom-6 -right-6 z-10 w-44 rotate-[-5deg] rounded-2xl bg-[#f28d63] p-4 shadow-xl"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#3e4245]/65">This month</p><p className="mt-2 text-2xl font-bold leading-none">Shows up<br />with ideas.</p><div className="mt-3 h-1 w-20 rounded-full bg-[#3e4245]/30" /></div>
            </div>
          </div>
          <div className="container pb-8"><div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[.16em] text-[#6e7478]"><span className="story-line h-px w-16" /> Scroll to explore <ArrowDownRight size={14} /></div></div>
        </section>

        <section className="border-b border-[#3e4245]/10 bg-[#fdfcf9] py-7">
          <div className="container flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><p className="max-w-[250px] text-sm font-semibold leading-6 text-[#6e7478]">A club built for the skills school can’t grade.</p><div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-[#3e4245]"><span>Leadership</span><span>Communication</span><span>Problem solving</span><span className="hidden sm:inline">Self-awareness</span><span className="hidden md:inline">Digital & AI literacy</span></div><span className="hidden text-xs font-bold uppercase tracking-[.12em] text-[#7a6316] lg:inline">Learn · Try · Own</span></div>
        </section>

        <section id="programmes" className="container py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><SectionLabel>Why TYA</SectionLabel><h2 className="mt-5 max-w-[540px] text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">The skills that make the <span className="font-display italic text-[#7a6316]">difference.</span></h2></div><p className="max-w-[510px] text-lg leading-8 text-[#6e7478]">TYA is where young people practise the things that matter later — making a call, listening to another point of view, taking responsibility and trying again when the first plan fails.</p></div>
          <div className="mt-16 grid gap-4 md:grid-cols-3"><article className="card-sheen rounded-[1.5rem] bg-[#3e4245] p-7 text-[#fffdf9] md:col-span-2 md:min-h-[250px]"><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f6d77a] text-[#3e4245]"><ShieldCheck size={20} /></span><span className="section-kicker text-[#f6d77a]">01 · Safe by design</span></div><div className="mt-12"><h3 className="text-3xl font-semibold tracking-[-.03em]">Small enough to know every voice.</h3><p className="mt-3 max-w-[470px] leading-7 text-white/65">Twelve young people. One coach and one assistant. Named pick-up. A space where being heard is part of the experience.</p></div></div></article><article className="rounded-[1.5rem] bg-[#dce7e3] p-7 md:min-h-[250px]"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#0e9c8c] text-[#fffdf9]"><HeartHandshake size={20} /></span><p className="mt-12 text-2xl font-semibold leading-tight">Friends first.<br />Confidence follows.</p><p className="mt-3 text-sm leading-6 text-[#6e7478]">A Pod makes room for quiet thinkers, natural leaders and everyone in between.</p></article><article className="rounded-[1.5rem] border border-[#3e4245]/12 bg-[#f6d77a] p-7 md:min-h-[250px]"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#3e4245] text-[#f6d77a]"><NotebookPen size={20} /></span><p className="mt-12 text-2xl font-semibold leading-tight">Progress you can<br />actually see.</p><p className="mt-3 text-sm leading-6 text-[#3e4245]/70">A coach-written Growth Card comes home every month.</p></article><article className="rounded-[1.5rem] border border-[#3e4245]/12 bg-[#fdfcf9] p-7 md:col-span-2 md:min-h-[250px]"><div className="flex h-full flex-col justify-between md:flex-row md:items-end md:gap-10"><div><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f28d63]"><Compass size={20} /></span><p className="mt-12 text-2xl font-semibold leading-tight">The real world, in<br />a safe place to try.</p></div><p className="max-w-[300px] text-sm leading-6 text-[#6e7478]">Water crises, negotiations, business decisions, community challenges. Every Mission gives skills a reason to matter.</p></div></article></div>
        </section>

        <section id="how-it-works" className="grain bg-[#fdfcf9] py-24 lg:py-32"><div className="container"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><SectionLabel>How TYA works</SectionLabel><h2 className="mt-5 max-w-[660px] text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">Four steps. One journey. A stronger, more capable <span className="font-display italic text-[#7a6316]">young person.</span></h2></div><p className="max-w-[340px] text-lg leading-7 text-[#6e7478]">Every Pod experience combines real challenges, practical skills, teamwork and responsibility.</p></div><div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{steps.map((step) => { const Icon = step.icon; return <article key={step.number} className="step-card rounded-[1.5rem] border border-[#3e4245]/10 bg-[#e9e6e1] p-6"><div className="flex items-start justify-between"><span className="text-sm font-bold text-[#7a6316]">{step.number}</span><span className="grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: step.color }}><Icon size={19} /></span></div><h3 className="mt-14 text-2xl font-semibold tracking-[-.03em]">{step.title}</h3><p className="mt-3 text-sm font-bold text-[#7a6316]">{step.eyebrow}</p><p className="mt-4 text-sm leading-6 text-[#6e7478]">{step.copy}</p><a className="mt-7 inline-flex items-center gap-2 text-sm font-bold" href="#curriculum">Explore skills <ArrowRight size={15} /></a></article>; })}</div></div></section>

        <section id="curriculum" className="container py-24 lg:py-32"><div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start"><div><SectionLabel>What they learn</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">Not just <span className="font-display italic text-[#7a6316]">knowledge.</span><br />Capability.</h2><p className="mt-7 max-w-[410px] text-lg leading-8 text-[#6e7478]">A purposeful curriculum that moves from self-awareness to social responsibility, through missions that make every skill feel useful.</p><div className="mt-9 flex items-start gap-3 border-l-2 border-[#f28d63] pl-4 text-sm leading-6 text-[#6e7478]"><span className="font-bold text-[#3e4245]">18+ skills</span><span>·</span><span>Delivered through stories, roles and missions — never worksheets alone.</span></div></div><div><div className="flex flex-wrap gap-2 border-b border-[#3e4245]/15 pb-5">{(Object.keys(curriculum) as CurriculumTab[]).map((tab) => <button key={tab} onClick={() => setCurriculumTab(tab)} className={`rounded-full px-5 py-3 text-sm font-bold transition ${curriculumTab === tab ? "bg-[#3e4245] text-[#fffdf9]" : "bg-[#fdfcf9] text-[#6e7478] hover:bg-[#dce7e3]"}`}>Ages {tab}</button>)}</div><div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">{curriculum[curriculumTab].map(([title, copy], index) => <div key={title} className="group border-b border-[#3e4245]/12 py-6"><div className="flex items-start gap-4"><span className="mt-1 text-xs font-bold text-[#f28d63]">0{index + 1}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6e7478]">{copy}</p></div></div></div>)}</div></div></div></section>

        <section id="parents" className="bg-[#3e4245] py-24 text-[#fffdf9] lg:py-32"><div className="container"><div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><SectionLabel light>For parents</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">A card comes home. Not a <span className="font-display italic text-[#f6d77a]">grade.</span></h2><p className="mt-7 max-w-[470px] text-lg leading-8 text-white/65">Every TYA Mission gives your child opportunities to practise skills that matter beyond the Pod — at school, at home, in relationships and eventually in the real world.</p><button className="btn-primary mt-9 rounded-full px-6 py-4 text-sm font-bold" onClick={() => setTrialOpen(true)}>See it in a free trial <ArrowRight className="ml-2 inline" size={16} /></button></div><div className="relative mx-auto w-full max-w-[520px]"><div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-[#f28d63]" /><div className="relative rotate-[3deg] rounded-[1.5rem] bg-[#fdfcf9] p-6 text-[#3e4245] shadow-[0_24px_80px_rgba(0,0,0,.22)] sm:p-9"><div className="flex items-start justify-between border-b border-[#3e4245]/12 pb-6"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7a6316]">TYA Growth Card</p><h3 className="mt-2 text-2xl font-bold">Aarav</h3><p className="text-sm text-[#6e7478]">TYA Pod · Monthly snapshot</p></div><span className="grid h-12 w-12 place-items-center rounded-full bg-[#f6d77a]"><Sparkles size={19} /></span></div><div className="space-y-5 py-7">{[['Confidence', 82], ['Collaboration', 92], ['Decision making', 72], ['Adaptability', 81], ['Ownership', 62]].map(([label, value]) => <div key={label as string}><div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[.12em]"><span>{label as string}</span><span className="text-[#7a6316]">{value as number}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#e9e6e1]"><div className="h-full rounded-full bg-[#0e9c8c]" style={{ width: `${value}%` }} /></div></div>)}</div><div className="rounded-xl bg-[#e9e6e1] p-4"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#f28d63]">TYA moment</p><p className="mt-2 text-sm leading-6">“In the Water Crisis Mission, Aarav proposed a compromise both Pods accepted — and volunteered to present it.”</p></div><p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[.15em] text-[#6e7478]">Written by the coach who was in the room</p></div></div></div></div></section>

        <section className="bg-[#dce7e3] py-8"><div className="marquee"><div className="marquee-track text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-.04em] text-[#3e4245]/80"><span>learn by doing</span><span className="text-[#0e9c8c]">✳</span><span>find your voice</span><span className="text-[#f28d63]">✳</span><span>make an impact</span><span className="text-[#0e9c8c]">✳</span><span>learn by doing</span><span className="text-[#0e9c8c]">✳</span><span>find your voice</span><span className="text-[#f28d63]">✳</span><span>make an impact</span></div></div></section>

        <section className="container py-24 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionLabel>Parent questions</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">Good questions deserve <span className="font-display italic text-[#7a6316]">proper</span> answers.</h2><p className="mt-7 max-w-[370px] leading-7 text-[#6e7478]">Not marketing promises. The practical details that help you decide if TYA is right for your young person.</p><a href="mailto:hello@tyaclub.in" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0e7568]">Ask us anything <ArrowRight size={15} /></a></div><div className="border-t border-[#3e4245]/15">{faqs.map((faq, index) => <div key={faq.question} className="border-b border-[#3e4245]/15"><button className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f6d77a] transition-transform ${openFaq === index ? "rotate-180" : ""}`}><ChevronDown size={16} /></span></button>{openFaq === index && <p className="max-w-[680px] pb-7 pr-12 text-sm leading-7 text-[#6e7478]">{faq.answer}</p>}</div>)}</div></div></section>

        <section className="container pb-24 lg:pb-32"><div className="relative overflow-hidden rounded-[2rem] bg-[#f28d63] px-7 py-14 sm:px-12 lg:px-20 lg:py-20"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-[#f6d77a]/50" /><div className="absolute bottom-[-60px] left-[42%] h-36 w-36 rounded-full border-[20px] border-[#3e4245]/10" /><div className="relative z-10 max-w-[680px]"><SectionLabel>One free trial · decide after, not during</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.96] tracking-[-.045em] sm:text-6xl">The next chapter starts with <span className="font-display italic">one hour.</span></h2><p className="mt-6 max-w-[500px] text-lg leading-8 text-[#3e4245]/75">Sit in on a Mission. Meet the coach. See how your child finds their place.</p><button className="btn-dark mt-9 rounded-full px-7 py-4 text-sm font-bold" onClick={() => setTrialOpen(true)}>Book a free trial <ArrowRight className="ml-2 inline" size={16} /></button></div></div></section>
      </main>

      <footer className="bg-[#3e4245] py-12 text-[#fffdf9]"><div className="container"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 lg:flex-row"><div><Logo reversed /><p className="mt-5 max-w-[300px] text-sm leading-6 text-white/55">Where skills become confidence. An after-school club for young people, built around real experience.</p></div><div className="grid grid-cols-2 gap-x-14 gap-y-4 text-sm font-semibold sm:grid-cols-3"><div className="flex flex-col gap-3"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#f6d77a]">Explore</span><a className="text-white/65 hover:text-white" href="#programmes">Why TYA</a><a className="text-white/65 hover:text-white" href="#how-it-works">How it works</a><a className="text-white/65 hover:text-white" href="#curriculum">Curriculum</a></div><div className="flex flex-col gap-3"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#f6d77a]">Parents</span><a className="text-white/65 hover:text-white" href="#parents">Growth Card</a><a className="text-white/65 hover:text-white" href="#top">Find a centre</a><button className="text-left text-white/65 hover:text-white" onClick={() => setTrialOpen(true)}>Book a trial</button></div><div className="col-span-2 flex flex-col gap-3 sm:col-span-1"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#f6d77a]">Say hello</span><a className="flex items-center gap-2 text-white/65 hover:text-white" href="mailto:hello@tyaclub.in"><MessageCircle size={14} /> hello@tyaclub.in</a><a className="flex items-center gap-2 text-white/65 hover:text-white" href="tel:+910000000000"><Phone size={14} /> +91 00000 00000</a></div></div></div><div className="flex flex-col justify-between gap-4 pt-7 text-xs text-white/45 sm:flex-row"><p>© 2026 TYA Club. Built for the next version of young people.</p><div className="flex gap-5"><a href="#top">Privacy</a><a href="#top">Terms</a><span className="text-[#f6d77a]">Learn. Try. Own.</span></div></div></div></footer>

      {trialOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#3e4245]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="trial-title"><div className="relative max-h-[90vh] w-full max-w-[520px] overflow-auto rounded-[1.5rem] bg-[#fdfcf9] p-7 shadow-2xl sm:p-10"><button className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#e9e6e1]" aria-label="Close trial form" onClick={() => setTrialOpen(false)}><X size={20} /></button><SectionLabel>Start with one hour</SectionLabel><h2 id="trial-title" className="mt-4 pr-8 text-4xl font-medium leading-none tracking-[-.04em]">Book a free <span className="font-display italic text-[#7a6316]">trial.</span></h2><p className="mt-4 max-w-[400px] text-sm leading-6 text-[#6e7478]">Tell us a little about your young person and we’ll match you with the right TYA centre guide.</p><form className="mt-7 space-y-4" onSubmit={handleTrialSubmit}><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">Parent name</span><input required name="parent" placeholder="Your name" className="w-full rounded-xl border border-[#3e4245]/15 bg-[#e9e6e1]/45 px-4 py-3 outline-none placeholder:text-[#6e7478]/60 focus:border-[#7a6316]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">Child’s age</span><select required name="age" defaultValue="" className="w-full rounded-xl border border-[#3e4245]/15 bg-[#e9e6e1]/45 px-4 py-3 outline-none focus:border-[#7a6316]"><option value="" disabled>Select an age</option><option>6–9</option><option>10–14</option></select></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">City or locality</span><input required name="city" placeholder="e.g. Indiranagar, Bengaluru" className="w-full rounded-xl border border-[#3e4245]/15 bg-[#e9e6e1]/45 px-4 py-3 outline-none placeholder:text-[#6e7478]/60 focus:border-[#7a6316]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">WhatsApp number</span><input required type="tel" name="phone" placeholder="+91" className="w-full rounded-xl border border-[#3e4245]/15 bg-[#e9e6e1]/45 px-4 py-3 outline-none placeholder:text-[#6e7478]/60 focus:border-[#7a6316]" /></label><button className="btn-dark mt-3 w-full rounded-full px-6 py-4 text-sm font-bold" type="submit">Request my free trial <ArrowRight className="ml-2 inline" size={16} /></button><p className="flex items-center justify-center gap-2 text-center text-xs text-[#6e7478]"><Check size={14} className="text-[#0e9c8c]" /> No payment needed · Parents welcome to sit in</p></form></div></div>}
    </div>
  );
}
