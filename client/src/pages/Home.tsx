import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { FindCentreSearch, SiteHeader, WHATSAPP_HREF } from "../components/SiteChrome";
import { ParentStories } from "../components/ParentStories";
import { ParentGuidesContent } from "./ParentGuides";
import { CentresContent } from "./Centres";
import { experienceFaqs } from "../data/experienceFaqs";
import { GrowthCardPreview } from "../components/GrowthCardPreview";
import { LEARNING_CAROUSEL_CYCLE_MS } from "../data/learningCarouselTiming";
import { isValidIndianPhone } from "../lib/validation";

const LOGO_BASE = import.meta.env.BASE_URL;
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  HeartHandshake,
  Leaf,
  MessageCircle,
  NotebookPen,
  Phone,
  Pause,
  Play,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";

const heroLines = [
  { statementLines: ["Want them", "to handle", "challenges?"], response: "We help navigate them.", skill: "Resilience" },
  { statementLines: ["Want them", "to speak with", "confidence?"], response: "It starts here.", skill: "Communication" },
  { statementLines: ["Want them to", "discover", "who they are?"], response: "We nurture it.", skill: "Individuality" },
  { statementLines: ["Want them", "to take", "responsibility?"], response: "We let them own it.", skill: "Accountability" },
  { statementLines: ["Want them", "to lead, not just", "follow?"], response: "We give them room.", skill: "Leadership" },
  { statementLines: ["Want them to", "make better", "decisions?"], response: "We let them think on their own.", skill: "Judgement" },
  { statementLines: ["Want them to", "handle emotions", "better?"], response: "We help them understand feelings.", skill: "Emotional Intelligence" },
  { statementLines: ["Want them", "to handle life,", "not just exams?"], response: "We prepare them.", skill: "Life Skills" },
];

const whyTyaBlocks = [
  {
    icon: Users,
    tone: "charcoal",
    kicker: "A place to take part",
    title: "Room for every young adult to learn.",
    copy: "Thirty young adults. Facilitated by a coach. A space where everyone is given the opportunity to lead, learn, express and experience.",
  },
  {
    icon: NotebookPen,
    tone: "butter",
    kicker: "Growth made visible",
    title: "Progress you can actually see.",
    copy: "A coach-written Growth Card comes home every month. But that’s not all. You will see the transformation practically.",
  },
  {
    icon: HeartHandshake,
    tone: "ivory",
    kicker: "Belonging comes first",
    title: "Friends first. Confidence follows.",
    copy: "Every Pod creates an ecosystem of sharing and comfort. Quiet thinkers, natural thinkers and everyone in between have a conducive atmosphere to learn and grow.",
  },
  {
    icon: Compass,
    tone: "coral",
    kicker: "Practice before real life",
    title: "The real world. In a safe place to try.",
    copy: "Negotiations, business decisions, career and emotional problems, community challenges. TYA gives young adults a chance to prepare before they face them in real life. Every Mission gives skills a reason to matter.",
  },
  {
    icon: Sparkles,
    tone: "charcoal",
    kicker: "Learn by doing",
    title: "Inside a Mission.",
    copy: "We call each scenario—everything young adults might face in life—a Mission. We help them gain the skills to face it. They do not just hear about the skills. They use them.",
  },
  {
    icon: Target,
    tone: "butter",
    kicker: "Outcomes families can see",
    title: "Tangible Missions.",
    copy: "The model helps young adults and their parents experience tangible outcomes.",
  },
];

const steps = [
  { number: "01", title: "Find your Pod", eyebrow: "Find your people. Find your space.", copy: "Choose the TYA Pod that fits your location and age group. Start with an introductory session and experience what TYA is all about.", icon: Users, color: "#F3F0EA" },
  { number: "02", title: "Commit to the journey", eyebrow: "Show up. Get involved. Grow.", copy: "Every TYA experience is thoughtfully designed for the age group. But real transformation happens when you participate, stay curious and commit to the journey.", icon: Target, color: "#E4B42A" },
  { number: "03", title: "Engage. Explore. Express.", eyebrow: "Discover what you think. Discover who you are.", copy: "Question. Discuss. Create. Play. Experiment. Express. Through activities and conversations, learning becomes something you experience—not something you’re simply taught.", icon: Zap, color: "#F28D63" },
  { number: "04", title: "Evolve. Make an impact.", eyebrow: "Take what you learn beyond TYA.", copy: "Turn ideas into action. Apply your learning in your community and the world around you, while building confidence, responsibility and a growing record of personal development.", icon: Leaf, color: "#F3F0EA" },
];

const learningIdeas = [
  ["A voice of their own.", "Confidence to speak, listen and be heard."],
  ["The confidence to walk into a room.", "Comfortable in new rooms, new places and new situations."],
  ["The courage to start.", "Turning ideas into action."],
  ["The skill to figure things out.", "Even when nobody gives them the answer."],
  ["Leadership, without the title.", "And knows when to let someone else lead."],
  ["The grit to keep going.", "Especially when things get difficult."],
  ["Room for different views.", "Different opinions don’t have to mean divided people."],
  ["A mind of their own.", "Not just follows the crowd."],
  ["A heart that cares beyond itself.", "Community. People. Planet."],
  ["The habit of extending a hand.", "See a problem. Step up."],
  ["You win and I win.", "It’s not my way or the highway. Everyone can win."],
  ["A global mindset.", "They’ve learned to look beyond their own little corner of the world."],
  ["A reason to give back.", "Because once you’ve experienced what you can do, you start looking for where you’re needed next."],
  ["The courage to believe there’s a way through.", "Even when the moment feels bigger than everything else."],
] as const;

const learningSkills = [
  "Leadership",
  "Analytical / Critical Thinking",
  "Communication",
  "Stress Management",
  "Self Awareness & Emotional Intelligence",
  "Problem Solving",
  "Growth Orientation",
  "Careers & Future Planning",
  "Digital & AI Literacy",
  "Entrepreneurship",
  "Financial Literacy",
  "Decision Making",
  "Negotiation",
  "Planning & Strategy",
  "Innovation & Creativity",
  "Time Management",
  "Ethics, Morals & Values (Religion, Faith)",
  "Environment / Social Responsibility",
  "Friendship",
  "Civic awareness",
  "Project Management",
  "Building Social Enterprises",
] as const;

function shuffleLearningSkills() {
  const remaining = learningSkills.filter((skill) => skill !== "Communication");
  for (let index = remaining.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [remaining[index], remaining[swapIndex]] = [remaining[swapIndex], remaining[index]];
  }
  return ["Communication", ...remaining];
}



function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${reversed ? "text-[#fffdf9]" : "text-[#2B2F32]"}`} aria-label="TYA Club home">
      {reversed ? <img src={`${LOGO_BASE}tya-logo-lockup-ivory.svg`} alt="TYA Club" className="h-12 w-auto max-w-[170px] object-contain" /> : <img src={`${LOGO_BASE}tya-logo-lockup.svg`} alt="TYA Club" className="h-10 w-auto max-w-[150px] object-contain" />}
    </a>
  );
}

function SectionLabel({ children, light = false, prominent = false }: { children: string; light?: boolean; prominent?: boolean }) {
  return <span className={`section-kicker ${prominent ? "home-section-label" : ""} ${light ? "text-[#E4B42A]" : "text-[#2B2F32]"}`}>{children}</span>;
}

export default function Home() {
  const [heroPosition, setHeroPosition] = useState(0);
  const [heroResponseVisible, setHeroResponseVisible] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [trialPhone, setTrialPhone] = useState("");
  const [trialPhoneError, setTrialPhoneError] = useState("");
  const [learningIdeaIndex, setLearningIdeaIndex] = useState(0);
  const [learningSkillOrder] = useState(() => shuffleLearningSkills());
  const [learningSkillIndex, setLearningSkillIndex] = useState(0);
  const [learningCarouselsPaused, setLearningCarouselsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [experienceQuestion, setExperienceQuestion] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroPosition((current) => (current + 1) % heroLines.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setHeroResponseVisible(false);
    const timer = window.setTimeout(() => setHeroResponseVisible(true), 1700);
    return () => window.clearTimeout(timer);
  }, [heroPosition]);

  useEffect(() => {
    if (learningCarouselsPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outcomeTimer = window.setInterval(() => {
      setLearningIdeaIndex((current) => (current + 1) % learningIdeas.length);
    }, LEARNING_CAROUSEL_CYCLE_MS / learningIdeas.length);
    const skillTimer = window.setInterval(() => {
      setLearningSkillIndex((current) => (current + 1) % learningSkillOrder.length);
    }, LEARNING_CAROUSEL_CYCLE_MS / learningSkillOrder.length);
    return () => {
      window.clearInterval(outcomeTimer);
      window.clearInterval(skillTimer);
    };
  }, [learningCarouselsPaused, learningSkillOrder.length]);

  const line = heroLines[heroPosition];
  const centreQuery = new URLSearchParams(window.location.search).get("centre")?.trim() ?? "";

  function askExperienceQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = experienceQuestion.trim();
    if (question) window.location.href = `${LOGO_BASE}contact?question=${encodeURIComponent(question)}`;
  }

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
    <div id="top" className="min-h-screen overflow-x-clip bg-[#F3F0EA] text-[#2B2F32]">
      <SiteHeader variant="home" />

      <main>
        <section className="home-hero grain hero-grid relative overflow-hidden border-b border-[#2B2F32]/10" style={{ backgroundColor: "#E4B42A" }}>
          <div className="container grid min-h-0 items-center gap-12 py-12 lg:min-h-[790px] lg:grid-cols-[1.08fr_.92fr] lg:py-16">
            <div className="relative z-10 max-w-[680px]">
              <div className="reveal mb-10 flex items-center gap-3 text-[15px] font-medium text-[#2B2F32]"><span className="h-4 w-4 rounded-full bg-[#F28D63]" /> Transforming Young Adults into future greatness</div>
              <h1 className="reveal reveal-2 text-balance text-[clamp(3.8rem,7vw,6.8rem)] font-extrabold leading-[.88] tracking-[-.055em] text-[#2B2F32]">
                <span className="block">TYA CLUB</span>
              </h1>
              <p className="reveal reveal-3 mt-7 max-w-[650px] text-base font-medium leading-6 text-[#2B2F32] sm:text-lg sm:leading-[1.5]">
                TYA Club is designed to help young adults develop<br className="hidden sm:block" /> the mindset and life skills that go beyond the classroom.
              </p>
              <p className="reveal reveal-3 mt-8 max-w-[650px] text-base font-medium leading-6 text-[#2B2F32] sm:text-lg sm:leading-[1.5]">
                It’s a platform designed to empower young minds<br className="hidden sm:block" /> aged 11–22 to communicate with confidence,<br className="hidden sm:block" /> think independently, make informed decisions,<br className="hidden sm:block" /> and navigate the challenges of the real world.
              </p>
              <FindCentreSearch id="find-a-centre" className="reveal reveal-3 mt-9 max-w-[545px] scroll-mt-24" />
            </div>

            <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
              <div className="absolute -right-1 -top-7 h-28 w-28 rounded-full border border-[#F28D63]/50 bg-[#F28D63]/20" />
              <div className="absolute -bottom-2 -left-5 h-32 w-32 rounded-full border border-[#2B2F32]/15 bg-[#F3F0EA] hero-orb delay" />
              <div className="mission-polaroid relative rotate-[2deg] p-3 pb-0 shadow-[0_24px_70px_rgba(62,66,69,.18)] sm:p-4 sm:pb-0">
                <div className="mission-polaroid-photo relative min-h-[445px] px-5 pb-12 pt-7 text-center sm:min-h-[485px] sm:px-12 sm:pt-9">
                  <h2 className="mission-card-title mx-auto max-w-[430px] text-balance text-xl font-semibold leading-tight tracking-[-.025em] sm:text-2xl">Are your kids future ready?</h2>
                  <div className="mission-number mt-5 text-sm font-extrabold uppercase tracking-[.2em] sm:text-base">MISSION {String(heroPosition + 1)}:</div>
                  <div key={heroPosition} aria-live="polite" className="mission-carousel-question absolute left-5 right-5 top-[57%] font-semibold sm:left-10 sm:right-10">
                    {line.statementLines.map((part) => <span className="block" key={part}>{part}</span>)}
                  </div>
                  <div className="mission-carousel-progress absolute bottom-8 left-7 right-7 flex gap-1.5 sm:left-12 sm:right-12">
                    {Array.from({ length: heroLines.length }).map((_, index) => <span key={index} className={index <= heroPosition ? "is-active" : ""} />)}
                  </div>
                </div>
                <div className="mission-polaroid-caption flex items-center justify-center px-3 py-4 text-center sm:px-8">
                  <p key={`${heroPosition}-answer`} aria-live="polite" aria-busy={!heroResponseVisible} className={`mission-answer-copy font-medium ${heroResponseVisible ? "mission-answer-visible" : "invisible"}`}>
                    <span className="block">{line.response}</span>
                    {line.skill && <span className="mt-0.5 block">They learn <strong className="mission-skill-highlight font-extrabold">{line.skill.toUpperCase()}</strong>.</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container pb-8"><div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[.16em] text-[#2B2F32]"><span className="story-line h-px w-16" /> Scroll to explore <ArrowDownRight size={14} /></div></div>
        </section>

        <section className="border-b border-[#2B2F32]/10 bg-[#FFFFFF] py-9 sm:py-12">
          <div className="container">
            <p className="mx-auto max-w-[1050px] text-center text-[clamp(1.35rem,3vw,2.4rem)] font-light leading-tight tracking-[-.025em] text-[#2B2F32]">
              A club built for the skills school can’t grade.
            </p>
          </div>
        </section>

        <section id="why-tya" className="why-tya-section py-16 sm:py-20 lg:py-24">
          <div className="container">
            <div className="why-tya-heading">
              <div>
                <SectionLabel prominent>Why TYA</SectionLabel>
                <h2 className="mt-5">The skills that make the <span>difference.</span></h2>
              </div>
              <p className="why-tya-lead">TYA is where young adults practise the things that matter later — making a call, listening to another point of view, taking responsibility and trying again when the first plan fails.</p>
            </div>

            <div className="why-tya-block-grid">
              {whyTyaBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <article className="why-tya-block-card" data-tone={block.tone} key={block.title}>
                    <span className="why-tya-block-icon" aria-hidden="true"><Icon size={19} /></span>
                    <p className="why-tya-block-kicker">{block.kicker}</p>
                    <h3>{block.title}</h3>
                    <p className="why-tya-block-copy">{block.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="grain scroll-mt-24 bg-[#FFFFFF] py-12 sm:py-16 lg:py-20">
          <div className="container">
            <SectionLabel prominent>How TYA works?</SectionLabel>
            <div className="mt-4 rounded-[1.5rem] border border-[#2B2F32]/10 bg-[#F3F0EA] p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-10">
                <h2 className="max-w-[670px] text-balance text-3xl font-medium leading-[1.02] tracking-[-.04em] sm:text-4xl lg:text-5xl">
                  One Step. One Journey. A stronger, more capable <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">Young Adult.</strong></span>
                </h2>
                <p className="max-w-[290px] text-sm leading-6 text-[#656A6D] lg:pb-1">
                  Take the first leap. Join the movement. We’ll help you take it from there.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <article key={step.number} className="step-card how-works-card flex min-h-[230px] flex-col rounded-[1.1rem] border border-[#2B2F32]/10 p-4 sm:min-h-[245px]">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold tracking-[.08em] text-[#2B2F32]">{step.number} — {step.title.toUpperCase()}</span>
                        <span className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: step.color }}>
                          <Icon size={16} />
                        </span>
                      </div>
                      <div className="mt-7">
                        <p className="mt-2 text-[10px] font-bold leading-4 text-[#7a6316]">{step.eyebrow}</p>
                        <p className="mt-2 text-xs leading-[1.6] text-[#656A6D]">{step.copy}</p>
                      </div>
                      <a className="mt-auto inline-flex items-center gap-2 pt-4 text-[11px] font-bold text-[#2B2F32]" href="#curriculum">
                        Explore skills <ArrowRight size={13} />
                      </a>
                    </article>
                  );
                })}
              </div>
              <blockquote className="mt-8 max-w-4xl border-l-4 border-[#F28D63] pl-5 text-sm leading-7 text-[#2B2F32] sm:text-base">
                “You’re never on your own. We’re there every step of the way — helping every YA feel comfortable, supported and confident to explore, participate and grow.”
              </blockquote>
            </div>
          </div>
        </section>

        <section id="curriculum" className="scroll-mt-24 bg-[#FFFFFF] py-14 sm:py-18 lg:py-24">
          <div className="container">
            <SectionLabel prominent>What they learn?</SectionLabel>
            <div className="mt-4 rounded-[1.5rem] bg-[#F3F0EA] p-4 sm:p-7 lg:p-10">
              <div className="grid grid-cols-1 items-center gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)_minmax(0,1fr)] lg:gap-10">
                <div className="order-2 min-w-0 lg:order-1">
                  <div className="flex min-h-[150px] flex-col justify-center border-y border-[#2B2F32]/35 px-3 py-5 text-center sm:min-h-[170px] lg:min-h-[190px]">
                    <div key={learningIdeaIndex} className="learning-carousel-copy">
                      <h3 className="text-xs font-bold uppercase leading-5 tracking-[.12em] text-[#2B2F32] sm:text-sm">{learningIdeas[learningIdeaIndex][0]}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#656A6D]">{learningIdeas[learningIdeaIndex][1]}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" aria-label="Previous learning idea" onClick={() => setLearningIdeaIndex((current) => (current - 1 + learningIdeas.length) % learningIdeas.length)} className="learning-carousel-arrow"><ArrowLeft size={15} /></button>
                    <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#656A6D]">{String(learningIdeaIndex + 1).padStart(2, "0")} / {learningIdeas.length}</span>
                    <button type="button" aria-label="Next learning idea" onClick={() => setLearningIdeaIndex((current) => (current + 1) % learningIdeas.length)} className="learning-carousel-arrow"><ArrowRight size={15} /></button>
                  </div>
                </div>

                <article className="order-1 mx-auto flex min-h-[285px] w-full max-w-[360px] flex-col justify-center rounded-[.75rem] bg-[#e5e2da] p-6 shadow-sm sm:col-span-2 sm:min-h-[310px] sm:p-8 lg:order-2 lg:col-span-1 lg:aspect-square lg:min-h-0" aria-labelledby="curriculum-card-title">
                  <h2 id="curriculum-card-title" className="text-balance text-3xl font-medium leading-[1.05] tracking-[-.04em] text-[#2B2F32] sm:text-4xl">Not just <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">knowledge.</strong></span><br />Capability.</h2>
                  <p className="mt-5 text-xs leading-5 text-[#656A6D] sm:text-sm sm:leading-6">A purposeful curriculum that moves from self-awareness to social responsibility, through missions that make every skill feel useful.</p>
                  <div className="mt-6 flex items-start gap-3 border-t border-[#2B2F32]/15 pt-4 text-[10px] leading-4 text-[#656A6D]">
                    <span className="shrink-0 font-bold text-[#2B2F32]">18+<br />skills</span>
                    <span>Delivered through stories, roles and missions — never worksheets alone.</span>
                  </div>
                </article>

                <div className="order-3 min-w-0">
                  <div className="flex min-h-[150px] flex-col items-center justify-center border-y border-[#2B2F32]/35 px-3 py-5 text-center sm:min-h-[170px] lg:min-h-[190px]">
                    <p className="learning-carousel-copy text-sm font-bold uppercase leading-6 tracking-[.1em] text-[#2B2F32] sm:text-base" key={learningSkillIndex}>{learningSkillOrder[learningSkillIndex]}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button type="button" aria-label="Previous skill" onClick={() => setLearningSkillIndex((current) => (current - 1 + learningSkillOrder.length) % learningSkillOrder.length)} className="learning-carousel-arrow"><ArrowLeft size={15} /></button>
                    <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#656A6D]">{String(learningSkillIndex + 1).padStart(2, "0")} / {learningSkillOrder.length}</span>
                    <button type="button" aria-label="Next skill" onClick={() => setLearningSkillIndex((current) => (current + 1) % learningSkillOrder.length)} className="learning-carousel-arrow"><ArrowRight size={15} /></button>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <button type="button" aria-pressed={learningCarouselsPaused} onClick={() => setLearningCarouselsPaused((paused) => !paused)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold text-[#656A6D] transition hover:bg-[#FFFFFF] hover:text-[#2B2F32]">
                  {learningCarouselsPaused ? <Play size={13} /> : <Pause size={13} />}
                  {learningCarouselsPaused ? "Resume rotation" : "Pause rotation"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <ParentStories />

        <section id="parents" className="scroll-mt-24 bg-[#2B2F32] py-16 text-[#fffdf9] lg:py-24"><div className="container"><div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><SectionLabel light prominent>For parents</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">A card comes home. Not a <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">grade.</strong></span></h2><p className="mt-7 max-w-[470px] text-lg leading-8 text-white/65">Every TYA Mission gives your child opportunities to practise skills that matter beyond the Pod — at school, at home, in relationships and eventually in the real world.</p><button className="btn-primary mt-9 rounded-full px-6 py-4 text-sm font-bold" onClick={() => { setTrialSubmitted(false); setTrialOpen(true); }}>See it in a free trial <ArrowRight className="ml-2 inline" size={16} /></button></div><GrowthCardPreview /></div></div></section>

        <ParentGuidesContent embedded />

        <section className="led-marquee py-4"><div className="marquee"><div className="marquee-track gap-9"><span>learn by doing</span><span className="text-[#2B2F32]">✳</span><span>find your voice</span><span className="text-[#F28D63]">✳</span><span>make an impact</span><span className="text-[#2B2F32]">✳</span><span>learn by doing</span><span className="text-[#2B2F32]">✳</span><span>find your voice</span><span className="text-[#F28D63]">✳</span><span>make an impact</span></div></div></section>

        <section id="experience" className="experience-faq-section scroll-mt-24">
          <div className="container experience-faq-layout">
            <div className="experience-faq-intro">
              <SectionLabel prominent>The TYA Experience</SectionLabel>
              <h2>Good questions deserve <span className="headline-accent headline-accent--butter"><strong className="headline-impact">proper</strong></span> answers.</h2>
              <p>Not marketing promises. The practical details that help you decide if TYA is right for your young adult.</p>
              <form className="experience-question-form" onSubmit={askExperienceQuestion}>
                <label className="sr-only" htmlFor="experience-question">Type a question for TYA Club</label>
                <input id="experience-question" type="text" maxLength={500} required value={experienceQuestion} onChange={(event) => setExperienceQuestion(event.target.value)} placeholder="Type your question" />
                <button type="submit" aria-label="Ask us anything"><span>Ask us anything</span><ArrowRight size={15} aria-hidden="true" /></button>
              </form>
            </div>
            <div className="experience-faq-list">
              {experienceFaqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                const answerId = `experience-answer-${index + 1}`;
                return <article className="experience-faq-item" key={question}>
                  <h3><button className="experience-faq-trigger" type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={answerId}>
                    <span>{question}</span><span className="experience-faq-toggle"><ChevronDown className={isOpen ? "rotate-180" : ""} size={14} aria-hidden="true" /></span>
                  </button></h3>
                  {isOpen && <p className="experience-faq-answer" id={answerId}>{answer}</p>}
                </article>;
              })}
            </div>
          </div>
        </section>

        <CentresContent embedded initialQuery={centreQuery} />

        <section className="container pb-16 lg:pb-24"><div className="relative overflow-hidden rounded-[2rem] bg-[#F28D63] px-7 py-14 sm:px-12 lg:px-20 lg:py-20"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-[#E4B42A]/50" /><div className="absolute bottom-[-60px] left-[42%] h-36 w-36 rounded-full border-[20px] border-[#2B2F32]/10" /><div className="relative z-10 max-w-[680px]"><SectionLabel>One free trial · decide after, not during</SectionLabel><h2 className="mt-5 text-balance text-5xl font-medium leading-[.96] tracking-[-.045em] sm:text-6xl">The next chapter starts with <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">one hour.</strong></span></h2><p className="mt-6 max-w-[500px] text-lg leading-8 text-[#2B2F32]/75">Sit in on a Mission. Meet the coach. See how your child finds their place.</p><button className="btn-dark mt-9 rounded-full px-7 py-4 text-sm font-bold" onClick={() => { setTrialSubmitted(false); setTrialOpen(true); }}>Book a free trial <ArrowRight className="ml-2 inline" size={16} /></button></div></div></section>
      </main>

      <footer className="bg-[#2B2F32] py-12 text-[#fffdf9]"><div className="container"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 lg:flex-row"><div><Logo reversed /><p className="mt-5 max-w-[300px] text-sm leading-6 text-white/55">Where skills become confidence. An after-school club for young adults, built around real experience.</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm font-semibold sm:grid-cols-3"><div className="flex flex-col gap-3"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#E4B42A]">Explore</span><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}#top`}>TYA</a><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}#how-it-works`}>How TYA works</a><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}#curriculum`}>The Curriculum</a></div><div className="flex flex-col gap-3"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#E4B42A]">Parents</span><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}#parents`}>Note for parents</a><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}#experience`}>The TYA Experience</a><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}#find-a-centre`}>Find A center</a></div><div className="col-span-2 flex flex-col gap-3 sm:col-span-1"><span className="mb-1 text-[10px] font-bold uppercase tracking-[.17em] text-[#E4B42A]">More</span><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}our-story`}>Our story</a><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}franchise`}>Franchise</a><a className="text-white/65 hover:text-white" href={`${LOGO_BASE}contact`}>Contact us</a><a className="flex items-center gap-2 text-white/65 hover:text-white" href="mailto:hello@thetyaclub.com"><MessageCircle size={14} /> hello@thetyaclub.com</a><a className="flex items-center gap-2 text-white/65 hover:text-white" href="tel:+918886665295"><Phone size={14} /> +91 888 666 5295</a><a className="flex items-center gap-2 text-white/65 hover:text-white" href="tel:+918886665294"><Phone size={14} /> +91 888 666 5294</a></div></div></div><div className="flex flex-col justify-between gap-4 pt-7 text-xs text-white/45 sm:flex-row"><p>© 2026 TYA Club. Built for the next version of young adults.</p><div className="flex gap-5"><a href="#top">Privacy</a><a href="#top">Terms</a><span className="text-[#E4B42A]">Learn. Try. Own.</span></div></div></div></footer>

      

      {trialOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#2B2F32]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="trial-title"><div className="relative max-h-[90vh] w-full max-w-[520px] overflow-auto rounded-[1.5rem] bg-[#FFFFFF] p-7 shadow-2xl sm:p-10"><button className="absolute right-5 top-5 rounded-full p-2 hover:bg-[#F3F0EA]" aria-label="Close trial form" onClick={() => setTrialOpen(false)}><X size={20} /></button>{trialSubmitted ? <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><div className="success-pop grid h-20 w-20 place-items-center rounded-full bg-[#F3F0EA] text-[#2B2F32]"><CheckCircle2 size={42} strokeWidth={1.7} /></div><SectionLabel>Next step · centre match</SectionLabel><h2 id="trial-title" className="mt-4 text-4xl font-medium leading-none tracking-[-.04em]">You’re on the <span className="font-display italic text-[#2B2F32]">list.</span></h2><p className="mt-5 max-w-[360px] text-sm leading-6 text-[#656A6D]">A TYA centre guide will WhatsApp you within one working day to confirm the best trial slot and share what to expect.</p><div className="mt-7 flex w-full flex-col gap-3 sm:flex-row"><a className="btn-dark flex-1 rounded-full px-5 py-3 text-sm font-bold" href="https://wa.me/918886665295?text=Hi%20TYA%20Club%2C%20I%20just%20requested%20a%20trial%20and%20would%20like%20to%20choose%20a%20slot." target="_blank" rel="noreferrer">Message us now <MessageCircle className="ml-2 inline" size={15} /></a><button className="flex-1 rounded-full border border-[#2B2F32]/15 px-5 py-3 text-sm font-bold hover:bg-[#F3F0EA]" onClick={() => setTrialOpen(false)}>Done</button></div></div> : <><SectionLabel>Start with one hour</SectionLabel><h2 id="trial-title" className="mt-4 pr-8 text-4xl font-medium leading-none tracking-[-.04em]">Book a free <span className="font-display italic text-[#2B2F32]">trial.</span></h2><p className="mt-4 max-w-[400px] text-sm leading-6 text-[#656A6D]">Tell us a little about your young adult and we’ll match you with the right TYA centre guide.</p><form className="mt-7 space-y-4" onSubmit={handleTrialSubmit}><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">Parent name</span><input required name="parent" placeholder="Your name" className="w-full rounded-xl border border-[#2B2F32]/15 bg-[#F3F0EA]/45 px-4 py-3 outline-none placeholder:text-[#656A6D]/60 focus:border-[#2B2F32]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">Learner stage</span><select required name="age" defaultValue="" className="w-full rounded-xl border border-[#2B2F32]/15 bg-[#F3F0EA]/45 px-4 py-3 outline-none focus:border-[#2B2F32]"><option value="" disabled>Select a stage</option><option>Class 6 to 9</option><option>Class 10 to 12</option><option>Grads</option></select></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">City or locality</span><input required name="city" placeholder="e.g. Surat or Hyderabad" className="w-full rounded-xl border border-[#2B2F32]/15 bg-[#F3F0EA]/45 px-4 py-3 outline-none placeholder:text-[#656A6D]/60 focus:border-[#2B2F32]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em]">WhatsApp number</span><input type="tel" name="phone" inputMode="tel" placeholder="e.g. 88866 65295" value={trialPhone} onChange={(event) => { setTrialPhone(event.target.value); if (trialPhoneError) setTrialPhoneError(""); }} onBlur={() => { if (trialPhone && !isValidIndianPhone(trialPhone)) setTrialPhoneError("Enter a valid 10-digit Indian mobile number."); }} aria-invalid={Boolean(trialPhoneError)} aria-describedby="trial-phone-error" className={`w-full rounded-xl border bg-[#F3F0EA]/45 px-4 py-3 outline-none placeholder:text-[#656A6D]/60 focus:border-[#2B2F32] ${trialPhoneError ? "field-invalid" : "border-[#2B2F32]/15"}`} /><span id="trial-phone-error" className="field-error" aria-live="polite">{trialPhoneError}</span></label><button className="btn-dark mt-3 w-full rounded-full px-6 py-4 text-sm font-bold" type="submit">Request my free trial <ArrowRight className="ml-2 inline" size={16} /></button><p className="flex items-center justify-center gap-2 text-center text-xs text-[#656A6D]"><Check size={14} className="text-[#2B2F32]" /> No payment needed · Parents welcome to sit in</p></form></>}</div></div>}
    </div>
  );
}
