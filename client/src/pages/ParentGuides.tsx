import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, PageShell } from "../components/SiteChrome";

const guides = [
  {
    category: "Action & agency",
    question: "He has great ideas. Getting started is what matters.",
    why: "Having an idea is exciting. Turning it into action can feel much harder when they don't know where to begin or are afraid of getting it wrong.",
    response: "TYA gives them Missions, projects and challenges where they have to turn an idea into action — plan it, try it, adjust it and move forward.",
  },
  {
    category: "Resilience",
    question: "She really doesn't know what to do when things don't go her way — she panics.",
    why: "When young adults are used to knowing what comes next, an unexpected change can feel overwhelming. They need practice staying with a problem when the original plan no longer works.",
    response: "That's why TYA has The Twist — challenges deliberately change, forcing them to pause, rethink and decide what to do next.",
  },
  {
    category: "Confidence",
    question: "He knows exactly what he wants to say — when it's time, he gasps.",
    why: "Knowing what you think is one thing. Saying it when everyone is listening is another.",
    response: "TYA creates real reasons to speak — presenting, negotiating, debating and defending ideas — so confidence grows through practice, not instruction.",
  },
  {
    category: "Purpose",
    question: "She cares so much about the world. Sometimes I wonder where she thinks she fits into it.",
    why: "Young Adults can care deeply about big issues while feeling that someone else should solve them. What they often need is an opportunity to experience their own ability to make a difference.",
    response: "Through Earth, community and civic Missions, TYA turns “someone should do something” into “what can we do?”",
  },
  {
    category: "Leadership",
    question: "He loves being part of the team — but whenever a chance comes, he rejects it.",
    why: "Being part of a team feels comfortable. Taking responsibility can feel much riskier.",
    response: "TYA gives every young adult opportunities to lead, decide, coordinate and take responsibility — without making leadership about being the loudest person in the room.",
  },
  {
    category: "Decision-making",
    question: "Give her ten options and somehow… none of them work for her.",
    why: "Too many choices can sometimes create more uncertainty, especially when they're worried about making the wrong one. Decision-making gets stronger when young adults actually get to practise it.",
    response: "TYA puts them into situations where choices have consequences, so they learn to make thoughtful decisions rather than wait for the perfect one.",
  },
  {
    category: "Persistence",
    question: "He's so excited when he starts something. And loses interest at the same speed.",
    why: "Starting is exciting. Staying with something after the novelty disappears is a skill of its own.",
    response: "TYA gives them challenges that require persistence, teamwork and follow-through — especially when the exciting part is over.",
  },
  {
    category: "Self-discovery",
    question: "She knows exactly what everyone else wants to become. She's still figuring herself out.",
    why: "Young Adults see what everyone around them is doing while still discovering their own strengths, interests and values. They don't always need a career answer yet — they need experiences that help them discover themselves.",
    response: "TYA lets them lead, create, negotiate, solve and experiment in different roles — giving them more chances to discover what feels like them.",
  },
  {
    category: "Voice & confidence",
    question: "She has a voice. I just wish she'd use it more.",
    why: "Some young adults have plenty to say but hesitate when the room feels unfamiliar or they aren't sure their opinion will matter.",
    response: "At TYA, their voice has a purpose — the Pod needs their idea, the Mission needs their decision and the Arena needs their point of view.",
  },
  {
    category: "Ownership",
    question: "He'll spot the problem. Then wait for someone else to do something about it.",
    why: "Noticing a problem is easy. Taking responsibility for doing something about it is a skill that develops through experience.",
    response: "TYA gives young adults problems without immediately giving them the answer — asking them to notice, decide, act and own the outcome.",
  },
  {
    category: "Focus",
    question: "Her attention can be everywhere at once. Getting it to stay in one place is the tricky part.",
    why: "With constant stimulation around them, directing attention can be difficult — especially when something feels repetitive or disconnected from purpose.",
    response: "TYA makes focus part of the experience: a Mission has a goal, a Pod needs them and the clock is moving. They have a reason to pay attention.",
  },
  {
    category: "Getting through setbacks",
    question: "When life doesn't go to plan, she feels like everything has fallen apart.",
    why: "For a young adult, one rejection, failure, breakup or disappointment can sometimes feel like the whole world has collapsed. They need to know that a painful moment is not the end of their story — and that reaching out is part of finding a way through.",
    response: "TYA gives them repeated practice with setbacks, uncertainty and unexpected change — learning to pause, seek support, regain perspective and find a way forward when things feel overwhelming.",
  },
] as const;

const featuredGuideIndex = 8;
const pathGuideSteps = [
  { index: featuredGuideIndex, stage: "Start with confidence" },
  { index: 0, stage: "Put ideas into action" },
  { index: 1, stage: "Practise resilience" },
] as const;
const remainingGuideIndexes = guides.map((_, index) => index).filter((index) => !pathGuideSteps.some((step) => step.index === index));
const carouselGuides = [
  ...pathGuideSteps,
  ...remainingGuideIndexes.map((index) => ({ index, stage: guides[index].category })),
] as const;

function ParentGuideCard({ index, number, stage }: { index: number; number: number; stage: string }) {
  const guide = guides[index];

  return (
    <article className="parent-guide-path-step" role="listitem">
      <div className="parent-guide-path-top">
        <span className="parent-guide-row-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
        <p className="parent-guide-path-stage">{stage}</p>
        <ArrowUpRight className="parent-guide-path-arrow" size={21} aria-hidden="true" />
      </div>
      <h3 className="parent-guide-path-question">“{guide.question}”</h3>
      <div className="parent-guide-path-teaser">
        <p className="parent-guide-expanded-label">Why this happens</p>
        <p>{guide.why}</p>
      </div>
      <div className="parent-guide-expanded-copy parent-guide-path-details">
        <p className="parent-guide-expanded-label">TYA response</p>
        <p>{guide.response}</p>
      </div>
    </article>
  );
}

export function ParentGuidesContent({ embedded = false }: { embedded?: boolean } = {}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeGuide, setActiveGuide] = useState(0);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [email, setEmail] = useState("");

  const showGuide = (nextIndex: number) => {
    const index = Math.max(0, Math.min(carouselGuides.length - 1, nextIndex));
    const card = carouselRef.current?.children.item(index) as HTMLElement | null;
    if (!card) return;
    carouselRef.current?.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveGuide(index);
  };

  const updateActiveGuide = () => {
    const viewport = carouselRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.children) as HTMLElement[];
    const nearest = cards.reduce((best, card, index) => (
      Math.abs(card.offsetLeft - viewport.scrollLeft) < Math.abs(cards[best].offsetLeft - viewport.scrollLeft) ? index : best
    ), 0);
    setActiveGuide(nearest);
    setCanScrollPrevious(viewport.scrollLeft > 2);
    setCanScrollNext(viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 2);
  };

  const requestSubscription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Please add me to the TYA Parent Guides monthly letter");
    const body = encodeURIComponent(`Please add this email address to the monthly Parent Guides letter:\n\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
      <div className={`parent-guides-page ${embedded ? "parent-guides-page--embedded scroll-mt-24" : ""}`} id={embedded ? "parent-guides" : undefined}>
        <section className="parent-guides-intro" aria-labelledby="parent-guides-intro-title">
          <div className="container">
            <div className="parent-guides-intro-layout">
              <div className="parent-guides-intro-main">
                <p className="parent-guides-library-label"><span aria-hidden="true" />For parents</p>
                {embedded ? <h2 id="parent-guides-intro-title" className="parent-guides-intro-title" aria-label="Written by the coaches, not by a marketing team."><span>Written by the <strong>coaches,</strong></span><span>not by a marketing team.</span></h2> : <h1 id="parent-guides-intro-title" className="parent-guides-intro-title" aria-label="Written by the coaches, not by a marketing team."><span>Written by the <strong>coaches,</strong></span><span>not by a marketing team.</span></h1>}
              </div>
              <p className="parent-guides-intro-copy">A calm, easy-to-scan guide to the questions families bring to TYA Club — and what our coaches have learned.</p>
            </div>
          </div>
        </section>

        <section className="container parent-guide-library" aria-label="Parent guide listings">
          <div className="parent-guide-carousel-viewport" ref={carouselRef} role="list" aria-label="Twelve parent guides" onScroll={updateActiveGuide}>
            {carouselGuides.map(({ index, stage }, position) => (
              <ParentGuideCard key={guides[index].question} index={index} number={position + 1} stage={stage} />
            ))}
          </div>
          <div className="parent-guide-library-footer">
            <p>New guides added as coaches answer more parent questions.</p>
            <div className="parent-guide-carousel-controls" aria-label="Parent guide carousel controls">
              <span aria-live="polite">{String(activeGuide + 1).padStart(2, "0")} / {String(carouselGuides.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => showGuide(activeGuide - 1)} disabled={!canScrollPrevious} aria-label="Previous parent guide"><ArrowLeft size={18} aria-hidden="true" /></button>
              <button type="button" onClick={() => showGuide(activeGuide + 1)} disabled={!canScrollNext} aria-label="Next parent guide"><ArrowRight size={18} aria-hidden="true" /></button>
            </div>
          </div>
          {!embedded && <aside className="parent-guide-newsletter">
              <p className="parent-guide-kicker">Free, monthly</p>
              <h2>One practical idea for your evenings.</h2>
              <p>A short letter from our coaches, once a month. No offers, no reminders to enrol.</p>
              <form onSubmit={requestSubscription}>
                <label className="sr-only" htmlFor="parent-guide-email">Your email</label>
                <input id="parent-guide-email" type="email" name="email" placeholder="Your email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                <button type="submit">Subscribe</button>
              </form>
              <p className="parent-guide-subscribe-note">Your email app will open to send your subscription request.</p>
            </aside>}
        </section>
      </div>
  );
}

export default function ParentGuides() {
  return <PageShell><ParentGuidesContent /></PageShell>;
}
