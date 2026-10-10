import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero, PageShell, SectionIntro } from "../components/SiteChrome";
import { ParentStories } from "../components/ParentStories";
import { LEARNING_CAROUSEL_CYCLE_MS } from "../data/learningCarouselTiming";

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
    const outcomeTimer = window.setInterval(() => {
      setOutcomePosition((value) => {
        if (value + 1 < outcomes.length) return value + 1;
        setOutcomeOrder(shuffle(outcomes.length));
        return 0;
      });
    }, LEARNING_CAROUSEL_CYCLE_MS / outcomes.length);
    const skillTimer = window.setInterval(() => {
      setSkillPosition((value) => {
        if (value + 1 < learningSkills.length) return value + 1;
        setSkillOrder(shuffle(learningSkills.length));
        return 0;
      });
    }, LEARNING_CAROUSEL_CYCLE_MS / learningSkills.length);
    return () => {
      window.clearInterval(outcomeTimer);
      window.clearInterval(skillTimer);
    };
  }, []);

  return <PageShell>
    <PageHero
      eyebrow="What they learn"
      title={<>Not just knowledge. <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">Capability.</strong></span></>}
      intro="A purposeful curriculum that moves from self-awareness to social responsibility, through Missions that make every skill feel useful."
    />

    <section className="what-they-learn-section py-16 lg:py-24">
      <div className="container">
        <SectionIntro eyebrow="Learning in action" title="What they learn comes to life." description="The outcomes and skills take shape through experiences that young adults can question, practise and carry into everyday life." />
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
            <span className="what-they-learn-centre-kicker">Not just <strong>knowledge.</strong></span>
            <h2 className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">Capability.</strong></h2>
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

    <ParentStories />
    <section className="soft-panel py-16 lg:py-24"><div className="container"><SectionIntro eyebrow="Growth Card update" title={<>The behaviours parents can <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">see.</strong></span></>} description="A coach-written snapshot makes progress easier to notice and talk about at home." /><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">{["Confidence", "Communication", "Collaboration", "Decision making", "Adaptability", "Ownership"].map((item) => <div className="growth-chip" key={item}>{item}</div>)}</div></div></section>
  </PageShell>;}
