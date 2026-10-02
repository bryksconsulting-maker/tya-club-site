import { useEffect, useState } from "react";
import { ArrowLeftRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero, PageShell, SectionLabel } from "../components/SiteChrome";
import { compositeTestimonials } from "../data/centreProfiles";

const outcomes = [
  ["A voice of their own.", "Confidence to speak, listen and be heard."],
  ["The confidence to walk into a room.", "Comfortable in new rooms, new places and new situations."],
  ["The courage to start.", "Turning ideas into action."],
  ["The skill to figure things out.", "Even when nobody gives them the answer."],
  ["Leadership, without the title.", "And knows when to let someone else lead."],
  ["The grit to keep going.", "Especially when things get difficult."],
  ["Room for different views.", "Different opinions don't have to mean divided people."],
  ["A mind of their own.", "Not just follows the crowd."],
  ["A heart that cares beyond itself.", "Community. People. Planet."],
  ["The habit of extending a hand.", "See a problem. Step up."],
  ["You win and I win.", "It’s not my way or the highway. Everyone can win."],
  ["A global mindset.", "They've learned to look beyond their own little corner of the world."],
  ["A reason to give back.", "Because once you've experienced what you can do, you start looking for where you're needed next."],
  ["The courage to believe there's a way through.", "Even when the moment feels bigger than everything else."],
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

export default function Curriculum() {
    const [outcomePosition, setOutcomePosition] = useState(0);
  const [skillPosition, setSkillPosition] = useState(0);
  const [outcomeOrder, setOutcomeOrder] = useState<number[]>(() => outcomes.map((_, i) => i));
  const [skillOrder, setSkillOrder] = useState<number[]>(() => learningSkills.map((_, i) => i));
  const outcome = outcomes[outcomeOrder[outcomePosition]];
  const skillPositionIndex = skillOrder[skillPosition];

  useEffect(() => {
    const shuffle = (length: number) => {
      const next = Array.from({ length }, (_, i) => i);
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    };
    const timer = window.setInterval(() => {
      setOutcomePosition((value) => {
        if (value + 1 < outcomes.length) return value + 1;
        setOutcomeOrder(shuffle(outcomes.length));
        return 0;
      });
      setSkillPosition((value) => {
        if (value + 1 < learningSkills.length) return value + 1;
        setSkillOrder(shuffle(learningSkills.length));
        return 0;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return <PageShell>
    <PageHero
      eyebrow="What they learn"
      title={<>Not just knowledge. <span className="font-display italic text-[#f6d77a]">Capability.</span></>}
      intro="A purposeful curriculum that moves from self-awareness to social responsibility, through Missions that make every skill feel useful."
    />

    <section className="what-they-learn-section py-16 lg:py-24">
      <div className="container">
        <SectionLabel>What they learn?</SectionLabel>
        <div className="what-they-learn-board mt-6 lg:mt-8">
          <div className="what-they-learn-side">
            <div className="what-they-learn-rule" />
            <div className="what-they-learn-side-inner">
              <button
                className="what-they-learn-arrow"
                aria-label="Previous statement"
                onClick={() => setOutcomePosition((value) => (value - 1 + outcomes.length) % outcomes.length)}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="min-w-0 flex-1">
                <p className="what-they-learn-statement-title">{outcome[0]}</p>
                <p className="what-they-learn-statement-copy">{outcome[1]}</p>
              </div>
              <button
                className="what-they-learn-arrow"
                aria-label="Next statement"
                onClick={() => setOutcomePosition((value) => (value + 1) % outcomes.length)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="what-they-learn-rule" />
            <span className="what-they-learn-count">{String(outcomePosition + 1).padStart(2, "0")} / {outcomes.length}</span>
          </div>

          <div className="what-they-learn-centre">
            <span className="what-they-learn-centre-kicker">Not just <em>knowledge.</em></span>
            <h2>Capability.</h2>
            <p>A purposeful curriculum that moves from self-awareness to social responsibility, through Missions that make every skill useful.</p>
            <div className="what-they-learn-centre-meta">
              <span>14 outcomes</span>
              <span>22 skills</span>
            </div>
          </div>

          <div className="what-they-learn-side">
            <div className="what-they-learn-rule" />
            <div className="what-they-learn-side-inner">
              <button
                className="what-they-learn-arrow"
                aria-label="Previous skill"
                onClick={() => setSkillPosition((value) => (value - 1 + learningSkills.length) % learningSkills.length)}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="min-w-0 flex-1">
                <p className="what-they-learn-skill">{learningSkills[skillPositionIndex]}</p>
              </div>
              <button
                className="what-they-learn-arrow"
                aria-label="Next skill"
                onClick={() => setSkillPosition((value) => (value + 1) % learningSkills.length)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="what-they-learn-rule" />
            <span className="what-they-learn-count">{String(skillPosition + 1).padStart(2, "0")} / {learningSkills.length}</span>
          </div>
        </div>
      </div>
    </section>

    <section className="testimonial-stories">
      <div className="container">
        <div className="testimonial-stories-heading">
          <SectionLabel>Parent stories</SectionLabel>
          <p><ArrowLeftRight size={14} aria-hidden="true" /> Scroll sideways for more</p>
        </div>
        <div className="testimonial-stories-track" role="region" aria-label="Parent stories. Scroll sideways to read each story." tabIndex={0}>
          {compositeTestimonials.map((testimonial) => <article className="testimonial-story-card" key={testimonial.place}>
            <p className="testimonial-story-kicker">What a parent told us</p>
            <blockquote><span aria-hidden="true">[</span>{testimonial.quote}<span aria-hidden="true">]</span></blockquote>
            <p className="testimonial-story-byline">{testimonial.name} · {testimonial.place}</p>
            <p className="testimonial-story-note">Illustrative composite · Testimonials will be updated here</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className="soft-panel py-24 lg:py-32"><div className="container"><div className="flex items-center gap-3"><Check className="text-[#0e9c8c]" /><SectionLabel>Growth Card update</SectionLabel></div><h2 className="mt-5 max-w-[680px] text-5xl font-medium leading-[.96] tracking-[-.05em] sm:text-6xl">The behaviours parents can <span className="font-display italic text-[#7a6316]">see.</span></h2><div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">{["Confidence", "Communication", "Collaboration", "Decision making", "Adaptability", "Ownership"].map((item) => <div className="growth-chip" key={item}>{item}</div>)}</div></div></section>
  </PageShell>;}
