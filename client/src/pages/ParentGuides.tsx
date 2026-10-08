import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
const cardGuideIndexes = guides.map((_, index) => index).filter((index) => index !== featuredGuideIndex);

function GuideDetails({ guide, id, hidden, className = "" }: { guide: (typeof guides)[number]; id: string; hidden: boolean; className?: string }) {
  return (
    <div className={`parent-guide-expanded-copy ${className}`} id={id} hidden={hidden}>
      <div>
        <p className="parent-guide-expanded-label">Why this happens</p>
        <p>{guide.why}</p>
      </div>
      <div>
        <p className="parent-guide-expanded-label">TYA response</p>
        <p>{guide.response}</p>
      </div>
    </div>
  );
}

function ParentGuideRow({ index, number, expanded, onToggle }: { index: number; number: number; expanded: boolean; onToggle: () => void }) {
  const guide = guides[index];
  const detailsId = `parent-guide-details-${index + 1}`;

  return (
    <article className="parent-guide-row" role="listitem">
      <span className="parent-guide-row-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <div className="parent-guide-row-copy">
        <p className="parent-guide-row-category">{guide.category}</p>
        <h3>
          <button type="button" className="parent-guide-question-trigger" onClick={onToggle} aria-expanded={expanded} aria-controls={detailsId}>
            {guide.question}
          </button>
        </h3>
      </div>
      <button type="button" className="parent-guide-row-open" onClick={onToggle} aria-label={`${expanded ? "Close" : "Read"} guide: ${guide.category}`} aria-expanded={expanded} aria-controls={detailsId}>
        <ArrowUpRight size={21} aria-hidden="true" />
      </button>
      <GuideDetails guide={guide} id={detailsId} hidden={!expanded} className="parent-guide-row-details" />
    </article>
  );
}

export function ParentGuidesContent({ embedded = false }: { embedded?: boolean } = {}) {
  const [expandedGuides, setExpandedGuides] = useState<Set<number>>(() => new Set());
  const [showAllGuides, setShowAllGuides] = useState(false);
  const [email, setEmail] = useState("");

  const toggleGuide = (index: number) => {
    setExpandedGuides((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const requestSubscription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Please add me to the TYA Parent Guides monthly letter");
    const body = encodeURIComponent(`Please add this email address to the monthly Parent Guides letter:\n\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const featuredGuide = guides[featuredGuideIndex];

  return (
      <div className={`parent-guides-page ${embedded ? "parent-guides-page--embedded scroll-mt-24" : ""}`} id={embedded ? "parent-guides" : undefined}>
        <section className="parent-guides-intro" aria-labelledby="parent-guides-intro-title">
          <div className="container">
            <div className="parent-guides-intro-layout">
              <div className="parent-guides-intro-main">
                <p className="parent-guides-library-label"><span aria-hidden="true" />Parent guide library</p>
                <p className="parent-guides-notebook-label">The coach’s notebook</p>
                {embedded ? <h2 id="parent-guides-intro-title" className="parent-guides-intro-title">Written by the coaches,<br />not by a <em>marketing team.</em></h2> : <h1 id="parent-guides-intro-title" className="parent-guides-intro-title">Written by the coaches,<br />not by a <em>marketing team.</em></h1>}
              </div>
              <p className="parent-guides-intro-copy">A calm, easy-to-scan guide to the questions families bring to TYA Club — and what our coaches have learned.</p>
            </div>
          </div>
        </section>

        <section className="container parent-guide-library" aria-labelledby="parent-guide-library-title">
          <div className="parent-guide-section-heading">
            <h2 id="parent-guide-library-title">Explore the guides.</h2>
            <p>Pick a topic and begin wherever you are.</p>
          </div>
          <div className="parent-guides-feature-grid" aria-label="Featured and related parent guides">
            <article className="parent-guide-feature">
              <div className="parent-guide-feature-copy">
                <p className="parent-guide-feature-kicker">Featured parent guide <span aria-hidden="true">·</span> {featuredGuide.category}</p>
                <h3 className="parent-guide-feature-title">
                  <button type="button" className="parent-guide-question-trigger" onClick={() => toggleGuide(featuredGuideIndex)} aria-expanded={expandedGuides.has(featuredGuideIndex)} aria-controls={`parent-guide-details-${featuredGuideIndex + 1}`}>
                    “She has a voice.<br />I just wish she’d<br /><em>use it more.</em>”
                  </button>
                </h3>
                <p className="parent-guide-feature-byline">Notes from the coaches · Parent guide</p>
                <GuideDetails guide={featuredGuide} id={`parent-guide-details-${featuredGuideIndex + 1}`} hidden={!expandedGuides.has(featuredGuideIndex)} />
              </div>
            </article>
            <div className="parent-guide-rows" role="list" aria-label="More parent guides">
              {cardGuideIndexes.slice(0, 3).map((index, position) => (
                <ParentGuideRow key={guides[index].question} index={index} number={position + 1} expanded={expandedGuides.has(index)} onToggle={() => toggleGuide(index)} />
              ))}
            </div>
          </div>
          <div className="parent-guide-library-footer">
            <p>New guides added as coaches answer more parent questions.</p>
            <button type="button" className="parent-guide-expand-button" onClick={() => setShowAllGuides((visible) => !visible)} aria-expanded={showAllGuides} aria-controls={showAllGuides ? "parent-guide-more" : undefined}>
              {showAllGuides ? "Show fewer guides" : "Show all guides"}
              <ArrowRight className={showAllGuides ? "parent-guide-expand-arrow-open" : "parent-guide-expand-arrow"} size={18} aria-hidden="true" />
            </button>
          </div>
          {showAllGuides && <div className="parent-guide-rows parent-guide-rows--additional" id="parent-guide-more" role="list" aria-label="More parent guides">
            {cardGuideIndexes.slice(3).map((index) => (
              <ParentGuideRow key={guides[index].question} index={index} number={cardGuideIndexes.indexOf(index) + 1} expanded={expandedGuides.has(index)} onToggle={() => toggleGuide(index)} />
            ))}
          </div>}
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
