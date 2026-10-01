import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell, SectionLabel } from "../components/SiteChrome";
import { compositeTestimonials } from "../data/centreProfiles";

const outcomes = [
  ["A voice of their own.", "Confidence to speak, listen and be heard."], ["The confidence to walk into a room.", "Comfortable in new rooms, new places and new situations."], ["The courage to start.", "Turning ideas into action."], ["The skill to figure things out.", "Even when nobody gives them the answer."], ["Leadership, without the title.", "And knows when to let someone else lead."], ["The grit to keep going.", "Especially when things get difficult."], ["Room for different views.", "Different opinions don't have to mean divided people."], ["A mind of their own.", "Not just follows the crowd."], ["A heart that cares beyond itself.", "Community. People. Planet."], ["The habit of extending a hand.", "See a problem. Step up."], ["You win and I win.", "It’s not my way or the highway. Everyone can win."], ["A global mindset.", "They've learned to look beyond their own little corner of the world."], ["A reason to give back.", "Because once you've experienced what you can do, you start looking for where you're needed next."], ["The courage to believe there's a way through.", "Even when the moment feels bigger than everything else."],
] as const;
const stages = {
  "Class 6 to 9": ["Find your voice", "Build confidence, friendships, self-awareness and the courage to try."],
  "Class 10 to 12": ["Think independently", "Practise judgment, negotiation, critical thinking and digital responsibility."],
  Grads: ["Own your next chapter", "Navigate career, money, leadership and future planning with intention."],
} as const;
type Stage = keyof typeof stages;

export default function Curriculum() {
  const [stage, setStage] = useState<Stage>("Class 6 to 9");
  const [order, setOrder] = useState<number[]>(() => outcomes.map((_, i) => i));
  const [position, setPosition] = useState(0);
  const index = order[position];
  const item = outcomes[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPosition((value) => {
        if (value + 1 < outcomes.length) return value + 1;
        setOrder(() => {
          const next = outcomes.map((_, i) => i);
          for (let i = next.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [next[i], next[j]] = [next[j], next[i]];
          }
          return next;
        });
        return 0;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return <PageShell>
    <PageHero eyebrow="What they learn" title={<>Not just knowledge. <span className="font-display italic text-[#f6d77a]">Capability.</span></>} intro="A purposeful curriculum that moves from self-awareness to social responsibility, through Missions that make every skill feel useful." />
    <section className="container py-24 lg:py-32"><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><SectionLabel>Three stages</SectionLabel><h2 className="mt-5 max-w-[650px] text-balance text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">The right challenge for the <span className="font-display italic text-[#7a6316]">right moment.</span></h2></div><div className="stage-tabs">{(Object.keys(stages) as Stage[]).map((name) => <button key={name} className={stage === name ? "active" : ""} onClick={() => setStage(name)}>{name}</button>)}</div></div><div className="mt-14 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch"><div className="content-card stage-intro"><span className="text-xs font-bold uppercase tracking-[.15em] text-[#f28d63]">{stage}</span><h3 className="mt-7 text-4xl font-medium">{stages[stage][0]}</h3><p className="mt-5 text-lg leading-8 text-muted-copy">{stages[stage][1]}</p><Link className="btn-dark mt-8 inline-flex rounded-full px-5 py-3 text-sm font-bold" href={`/programmes/${stage === "Class 6 to 9" ? "class-6-to-9" : stage === "Class 10 to 12" ? "class-10-to-12" : "grads"}`}>Explore this programme <ArrowRight className="ml-2" size={15} /></Link></div><div className="outcome-card"><button className="outcome-control" aria-label="Previous learning outcome" onClick={() => setPosition((position - 1 + order.length) % order.length)}><ChevronLeft size={18} /></button><div className="min-h-[240px] flex-1"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#f6d77a]">Capability {String(position + 1).padStart(2, "0")} / {outcomes.length}</span><h3 className="mt-10 max-w-[620px] text-4xl font-medium leading-[.98] sm:text-6xl">{item[0]}</h3><p className="mt-5 max-w-[500px] text-lg leading-8 text-white/65">{item[1]}</p></div><button className="outcome-control" aria-label="Next learning outcome" onClick={() => setPosition((position + 1) % order.length)}><ChevronRight size={18} /></button></div></div><div className="mt-7 flex flex-wrap gap-2">{outcomes.map((_, i) => <button key={i} onClick={() => setPosition(order.indexOf(i))} aria-label={`Show capability ${i + 1}`} className={`h-2 rounded-full transition-all ${order[position] === i ? "w-9 bg-[#f28d63]" : "w-2 bg-[#3e4245]/25"}`} />)}</div></section>
    <section className="soft-panel overflow-hidden py-20 lg:py-24"><div className="container"><SectionLabel>What parents say</SectionLabel><h2 className="mt-5 max-w-[700px] text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">Real experiences. <span className="font-display italic text-[#7a6316]">Shared.</span></h2><div className="-mx-4 mt-12 flex snap-x gap-5 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">{compositeTestimonials.map((testimonial) => <article key={testimonial.place} className="w-[min(86vw,420px)] shrink-0 snap-start rounded-[1.5rem] border border-[#3e4245]/10 bg-[#fdfcf9] p-6 shadow-sm sm:p-7"><img src={testimonial.image} alt={testimonial.alt} className="mb-6 h-20 w-20 rounded-full object-cover" /><p className="text-lg leading-8">“{testimonial.quote}”</p><p className="mt-6 text-sm font-bold">{testimonial.name}</p><p className="mt-1 text-xs uppercase tracking-[.12em] text-[#7a6316]">{testimonial.place}</p><p className="mt-4 text-[9px] font-semibold uppercase tracking-[.1em] text-muted-copy">Composite story · Representative portrait</p></article>)}</div></div></section>
    <section className="soft-panel py-24 lg:py-32"><div className="container"><div className="flex items-center gap-3"><Check className="text-[#0e9c8c]" /><SectionLabel>Growth Card update</SectionLabel></div><h2 className="mt-5 max-w-[680px] text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">The behaviours parents can <span className="font-display italic text-[#7a6316]">see.</span></h2><div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">{["Confidence", "Communication", "Collaboration", "Decision making", "Adaptability", "Ownership"].map((item) => <div className="growth-chip" key={item}>{item}</div>)}</div></div></section>
  </PageShell>;
}
