import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { CONTACT_EMAIL, PageShell, SectionLabel } from "../components/SiteChrome";

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
    why: "When young people are used to knowing what comes next, an unexpected change can feel overwhelming. They need practice staying with a problem when the original plan no longer works.",
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
    why: "Young people can care deeply about big issues while feeling that someone else should solve them. What they often need is an opportunity to experience their own ability to make a difference.",
    response: "Through Earth, community and civic Missions, TYA turns “someone should do something” into “what can we do?”",
  },
  {
    category: "Leadership",
    question: "He loves being part of the team — but whenever a chance comes, he rejects it.",
    why: "Being part of a team feels comfortable. Taking responsibility can feel much riskier.",
    response: "TYA gives every young person opportunities to lead, decide, coordinate and take responsibility — without making leadership about being the loudest person in the room.",
  },
  {
    category: "Decision-making",
    question: "Give her ten options and somehow… none of them work for her.",
    why: "Too many choices can sometimes create more uncertainty, especially when they're worried about making the wrong one. Decision-making gets stronger when young people actually get to practise it.",
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
    why: "Young people see what everyone around them is doing while still discovering their own strengths, interests and values. They don't always need a career answer yet — they need experiences that help them discover themselves.",
    response: "TYA lets them lead, create, negotiate, solve and experiment in different roles — giving them more chances to discover what feels like them.",
  },
  {
    category: "Voice & confidence",
    question: "She has a voice. I just wish she'd use it more.",
    why: "Some young people have plenty to say but hesitate when the room feels unfamiliar or they aren't sure their opinion will matter.",
    response: "At TYA, their voice has a purpose — the Pod needs their idea, the Mission needs their decision and the Arena needs their point of view.",
  },
  {
    category: "Ownership",
    question: "He'll spot the problem. Then wait for someone else to do something about it.",
    why: "Noticing a problem is easy. Taking responsibility for doing something about it is a skill that develops through experience.",
    response: "TYA gives young people problems without immediately giving them the answer — asking them to notice, decide, act and own the outcome.",
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
    why: "For a young person, one rejection, failure, breakup or disappointment can sometimes feel like the whole world has collapsed. They need to know that a painful moment is not the end of their story — and that reaching out is part of finding a way through.",
    response: "TYA gives them repeated practice with setbacks, uncertainty and unexpected change — learning to pause, seek support, regain perspective and find a way forward when things feel overwhelming.",
  },
] as const;

const featuredGuideIndex = 8;
const cardGuideIndexes = [0, 1, 2];

export default function ParentGuides() {
  const [openGuide, setOpenGuide] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  const revealGuide = (index: number) => {
    setOpenGuide(index);
    window.requestAnimationFrame(() => {
      document.getElementById(`parent-guide-${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    <PageShell>
      <div className="parent-guides-page">
        <section className="parent-guides-intro">
          <div className="container">
            <SectionLabel>Parent guides</SectionLabel>
            <h1>Written by the coaches,<br className="hidden sm:block" /> not by a marketing team.</h1>
            <p>The questions parents actually ask us, answered properly. These pages are also how families who have never heard of TYA Club find us in search.</p>
          </div>
        </section>

        <section className="container parent-guides-feature-grid" aria-label="Featured parent guide and monthly letter">
          <article className="parent-guide-feature">
            <div className="parent-guide-feature-art" aria-hidden="true">
              <span>Inside a parent guide</span>
            </div>
            <div className="parent-guide-feature-copy">
              <p className="parent-guide-kicker">Featured parent guide</p>
              <h2>“{featuredGuide.question}”</h2>
              <p>{featuredGuide.why}</p>
              <p className="parent-guide-byline">Written by TYA Club coaches · Parent guide</p>
              <button type="button" className="parent-guide-text-link" onClick={() => revealGuide(featuredGuideIndex)}>
                Read the guide <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>

          <aside className="parent-guide-newsletter">
            <p className="parent-guide-kicker">Free, monthly</p>
            <h2>One practical idea for your evenings.</h2>
            <p>A short letter from our coaches, once a month. No offers, no reminders to enrol.</p>
            <form onSubmit={requestSubscription}>
              <label className="sr-only" htmlFor="parent-guide-email">Your email</label>
              <input id="parent-guide-email" type="email" name="email" placeholder="Your email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
              <button type="submit">Subscribe</button>
            </form>
            <p className="parent-guide-subscribe-note">Your email app will open to send your subscription request.</p>
          </aside>
        </section>

        <section className="container parent-guide-cards" aria-label="More parent guides">
          {cardGuideIndexes.map((index) => {
            const guide = guides[index];
            return (
              <article className="parent-guide-card" key={guide.question}>
                <div className="parent-guide-card-art" aria-hidden="true" />
                <div className="parent-guide-card-copy">
                  <p className="parent-guide-kicker">{guide.category}</p>
                  <h2>{guide.question}</h2>
                  <p className="parent-guide-byline">TYA Club Parent Guide</p>
                  <button type="button" className="parent-guide-text-link" onClick={() => revealGuide(index)}>
                    Read the guide <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <section className="container parent-guide-answers" aria-labelledby="parent-guide-answers-title">
          <div className="parent-guide-answers-heading">
            <SectionLabel>From our coaches</SectionLabel>
            <h2 id="parent-guide-answers-title">The questions parents actually ask.</h2>
            <p>Start with the question. Open it for the context behind it and the way TYA responds.</p>
          </div>
          <div className="faq-list parent-guides-faq-list">
            {guides.map((guide, index) => {
              const isOpen = openGuide === index;
              return (
                <article className="faq-item parent-guide-faq-item" id={`parent-guide-${index + 1}`} key={guide.question}>
                  <button className="faq-trigger parent-guide-faq-trigger" type="button" onClick={() => setOpenGuide(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`parent-guide-answer-${index + 1}`}>
                    <span><span className="parent-guide-number">{String(index + 1).padStart(2, "0")}</span>{guide.question}</span>
                    <ChevronDown className={isOpen ? "rotate-180" : ""} size={19} aria-hidden="true" />
                  </button>
                  {isOpen && <div className="faq-answer parent-guide-faq-answer" id={`parent-guide-answer-${index + 1}`}>
                    <p><strong>Why this happens</strong>{guide.why}</p>
                    <p><strong>TYA response</strong>{guide.response}</p>
                  </div>}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
