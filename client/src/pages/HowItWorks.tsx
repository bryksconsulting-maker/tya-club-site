import { ArrowRight, Brain, Compass, HeartHandshake, Lightbulb, MessageCircle, ShieldCheck, Users, Zap } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell, SectionLabel } from "../components/SiteChrome";

const whyBlocks = [
  ["Room for every young adult to learn", "Thirty young adults. Facilitated by a coach. A space where everyone is given the opportunity to lead, learn, express and experience.", Users],
  ["Progress you can actually see.", "A coach-written Growth Card comes home every month. But that’s not all. You will see the transformation practically.", ShieldCheck],
  ["Friends first. Confidence follows.", "Every Pod creates an ecosystem of sharing and comfort for quiet thinkers, natural leaders and everyone in between.", HeartHandshake],
  ["The real world. In a safe place to try.", "Negotiations, business decisions, career and emotional problems, community challenges. Every Mission gives skills a reason to matter.", Compass],
  ["Inside a Mission.", "We call each scenario a Mission. Young Adults do not just hear about the skills. They use them.", Lightbulb],
  ["Tangible Missions.", "The model helps young adults and parents experience outcomes they can see, discuss and carry forward.", Brain],
] as const;
const steps = [
  ["01", "Find your Pod", "Find your people. Find your space.", "Choose the TYA Pod that fits your location and age group. Start with an introductory session and experience what TYA is all about."],
  ["02", "Commit to the journey", "Show up. Get involved. Grow.", "Every TYA experience is thoughtfully designed for the age group. But real transformation happens when you participate, stay curious and commit to the journey."],
  ["03", "Engage. Explore. Express.", "Discover what you think. Discover who you are.", "Question. Discuss. Create. Play. Experiment. Express. Through activities and conversations, learning becomes something you experience—not something you’re simply taught."],
  ["04", "Evolve. Make an impact.", "Take what you learn beyond TYA.", "Turn ideas into action. Apply your learning in your community and the world around you, while building confidence, responsibility and a growing record of personal development."],
] as const;

export default function HowItWorks() {
  return <PageShell>
    <PageHero eyebrow="How TYA works" title={<>One step. One journey. A stronger, more capable <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">young adult.</strong></span></>} intro="Take the first leap. Join the movement. We’ll help you take it from there." />
    <section className="container py-24 lg:py-32"><SectionLabel>Why TYA</SectionLabel><h2 className="mt-5 max-w-[680px] text-balance text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">The skills that make the <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">difference.</strong></span></h2><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{whyBlocks.map(([title, copy, Icon]) => <article className="content-card" key={title}><span className="icon-disc"><Icon size={19} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="soft-panel py-24 lg:py-32"><div className="container"><SectionLabel>The journey</SectionLabel><h2 className="mt-5 max-w-[650px] text-balance text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">Learning becomes something they <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">experience.</strong></span></h2><div className="mt-14 grid gap-4 lg:grid-cols-4">{steps.map(([number, title, eyebrow, copy]) => <article className="step-card content-card" key={number}><h3>{number} — {title.toUpperCase()}</h3><p className="font-bold text-[#7a6316]">{eyebrow}</p><p>{copy}</p></article>)}</div><blockquote className="mt-14 max-w-[820px] border-l-4 border-[#f28d63] pl-6 text-2xl font-medium leading-tight sm:text-4xl">“You’re never on your own. We’re there every step of the way — helping every YA feel comfortable, supported and confident to explore, participate and grow.”</blockquote></div></section>
    <section className="container flex flex-col items-start justify-between gap-8 py-24 sm:flex-row sm:items-center"><div><SectionLabel>Ready when they are</SectionLabel><h2 className="mt-4 text-4xl font-medium">See a Mission in motion.</h2></div><Link className="btn-dark rounded-full px-6 py-4 text-sm font-bold" href="/curriculum">Explore the curriculum <ArrowRight className="ml-2 inline" size={16} /></Link></section>
  </PageShell>;
}
