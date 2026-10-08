import { useState } from "react";
import { ArrowLeft, ArrowRight, HeartHandshake, Sparkles, Users } from "lucide-react";
import { PageHero, PageShell, SectionIntro } from "../components/SiteChrome";

const founders = [
  {
    name: "Kiran Babu P.",
    role: "Founder · TYA Club",
    imageAlt: "Portrait of Kiran Babu P.",
    portraitPlaceholder: false,
    paragraphs: [
      "Kiran Babu P, fondly known as KBP, is a TEDx Speaker, Life Skills Coach, Management Trainer, Business Architect, an author and Serial Entrepreneur. With an extraordinary 27-year corporate career spanning India, the US and Europe, KBP has transformed his experience into a passion for building businesses, developing people and creating possibilities.",
      "A Six Sigma Black Belt and Certified Networker, his expertise spans business, leadership, training, design and creativity, with qualifications across diverse disciplines.",
      "Today, his entrepreneurial ventures span creative design and conceptualisation, business networking, business expansion and growth opportunities for entrepreneurs and start-ups, and life-skills development for young adults—including his initiative TYA Club, focused on helping young adults develop the skills, confidence and perspectives they need to navigate real life.",
      "From corporate boardrooms to entrepreneurship, from creative studios to training rooms, his journey is ultimately about one thing—helping people see possibilities and turn them into reality.",
    ],
  },
  {
    name: "Anoop Jaju",
    role: "Co-founder · TYA Club",
    imageAlt: "Temporary portrait placeholder for Anoop Jaju.",
    portraitPlaceholder: true,
    paragraphs: [
      "Anoop joined the journey with fresh perspectives, energy and ideas. Alongside Kiran and Sreyansh, he helped reimagine the concept and give it a new identity: TYA Club — Transforming Young Adults.",
    ],
  },
  {
    name: "Sreyansh Jain",
    role: "Co-founder · TYA Club",
    imageAlt: "Temporary portrait placeholder for Sreyansh Jain.",
    portraitPlaceholder: true,
    paragraphs: [
      "Sreyansh joined the journey with fresh perspectives, energy and ideas. Alongside Kiran and Anoop, he helped reimagine the concept and give it a new identity: TYA Club — Transforming Young Adults.",
    ],
  },
];

export default function OurStory() {
  const [activeFounder, setActiveFounder] = useState(0);
  const founder = founders[activeFounder];
  const portrait = `${import.meta.env.BASE_URL}images/kiran-babu-p-portrait.jpg`;

  const moveFounder = (direction: number) => {
    setActiveFounder((current) => (current + direction + founders.length) % founders.length);
  };

  return <PageShell>
    <PageHero eyebrow="Our story" title="Where TYA began." intro="The idea was founded by Kiran Babu P, following nearly a decade of research, observation and conversations across multiple cities, exploring what young adults need..." />

    <section className="container story-narrative py-16 lg:py-24" aria-labelledby="our-story-title">
      <SectionIntro eyebrow="Our story" id="our-story-title" title={<>They meet. They question. They <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">become.</strong></span></>} description="A room for the person they are becoming." />
      <div className="story-narrative-copy mt-8 grid gap-6 text-lg leading-8 text-muted-copy lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <div className="space-y-5">
          <p>TYA Club was born from a simple question: What if young adults had a space to learn the things that classrooms often don't teach?</p>
        </div>
        <div className="space-y-5">
          <p>Today, TYA is envisioned as a space where young adults don't simply learn from someone at the front of a room. They meet, interact, question, experiment, share, play, reflect and learn from one another.</p>
          <p className="story-narrative-close">Because preparing young adults for the future isn't just about what they know. It's about who they become.</p>
        </div>
      </div>
    </section>

    <section className="soft-panel founder-section py-16 lg:py-24" aria-labelledby="founders-title">
      <div className="container">
        <SectionIntro eyebrow="Meet the founders" id="founders-title" title={<>The people behind <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">the idea.</strong></span></>} description="Meet the founders whose experience and ideas shaped TYA Club and its focus on helping young adults grow." />

        <div className="founder-carousel mt-9" role="region" aria-label="Founder profiles">
          <article className="founder-profile" aria-live="polite" aria-atomic="true">
            <figure className="founder-profile-portrait">
              <img src={portrait} alt={founder.imageAlt} />
              {founder.portraitPlaceholder && <figcaption>Portrait placeholder</figcaption>}
            </figure>
            <div className="founder-profile-copy">
              <p className="founder-profile-role">{founder.role}</p>
              <h3>{founder.name}</h3>
              <div className="founder-profile-bio">
                {founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>

          <div className="founder-carousel-controls">
            <button type="button" className="founder-carousel-arrow" aria-label="Previous founder" onClick={() => moveFounder(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="founder-carousel-dots" role="group" aria-label="Choose founder profile">
              {founders.map((item, index) => <button
                type="button"
                className={`founder-carousel-dot${index === activeFounder ? " is-active" : ""}`}
                aria-label={`Show ${item.name}'s profile`}
                aria-current={index === activeFounder ? "true" : undefined}
                key={item.name}
                onClick={() => setActiveFounder(index)}
              />)}
            </div>
            <span className="founder-carousel-count" aria-live="polite">{String(activeFounder + 1).padStart(2, "0")} / {String(founders.length).padStart(2, "0")}</span>
            <button type="button" className="founder-carousel-arrow" aria-label="Next founder" onClick={() => moveFounder(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="soft-panel py-16 lg:py-24"><div className="container"><SectionIntro eyebrow="Our point of view" title={<>Confidence is not a personality trait. It is a <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">practice.</strong></span></>} description="Belonging, purposeful Missions and visible progress help confidence grow through experience." /><div className="grid gap-4 md:grid-cols-3"><article className="content-card"><Users size={20} className="text-[#0e9c8c]" /><h3>Belong before you lead</h3><p>Pods create the safety and familiarity young adults need to participate in their own way.</p></article><article className="content-card"><Sparkles size={20} className="text-[#f28d63]" /><h3>Make skills feel useful</h3><p>Missions give communication, judgment and ownership a real reason to matter.</p></article><article className="content-card"><HeartHandshake size={20} className="text-[#7a6316]" /><h3>Keep parents in the loop</h3><p>Growth is made visible through coach observations, reflection and the monthly Growth Card.</p></article></div></div></section>

    <section className="container py-16 lg:py-20"><SectionIntro eyebrow="Start here" title="Give them one hour to try." description="Meet the coach, see a Mission in motion and decide after your young adult has experienced the room." action={<a className="btn-dark inline-flex items-center rounded-full px-6 py-4 text-sm font-bold" href={`${import.meta.env.BASE_URL}#parents`}>See the parent view <ArrowRight className="ml-2 inline" size={16} /></a>} /></section>
  </PageShell>;
}
