import { ArrowRight, HeartHandshake, Sparkles, Users } from "lucide-react";
import { PageHero, PageShell, SectionIntro } from "../components/SiteChrome";

const founders = [
  {
    name: "Kiran Babu P.",
    role: "Founder",
    image: "kiran-babu-p-portrait.jpg",
    imageAlt: "Kiran Babu P.",
    initials: "KBP",
    summary: "A TEDx Speaker, life-skills coach and entrepreneur whose 27-year corporate career across India, the US and Europe helped shape the idea behind TYA Club.",
  },
  {
    name: "Anoop Jaju",
    role: "Co-founder",
    imageAlt: "Portrait placeholder for Anoop Jaju.",
    initials: "AJ",
    summary: "Anoop brought fresh perspectives, energy and ideas to the journey. Alongside Kiran and Sreyansh, he helped shape TYA Club’s new identity: Transforming Young Adults.",
  },
  {
    name: "Sreyansh Jain",
    role: "Co-founder",
    imageAlt: "Portrait placeholder for Sreyansh Jain.",
    initials: "SJ",
    summary: "Sreyansh brought fresh perspectives, energy and ideas to the journey. Alongside Kiran and Anoop, he helped shape TYA Club’s new identity: Transforming Young Adults.",
  },
];

export default function OurStory() {
  const imageBase = `${import.meta.env.BASE_URL}images/`;

  return <PageShell>
    <PageHero eyebrow="Our story" title="Where TYA began." intro="The idea was founded by Kiran Babu P, following nearly a decade of research, observation and conversations across multiple cities, exploring what young adults need..." />

    <section className="container story-narrative py-16 lg:py-24" aria-labelledby="our-story-title">
      <SectionIntro id="our-story-title" title={<>They meet. They question. They <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">become.</strong></span></>} description="A room for the person they are becoming." />
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

        <div className="founder-grid mt-9" role="list" aria-label="Founder profiles">
          {founders.map((founder) => <article className="founder-profile" role="listitem" key={founder.name}>
            <figure className={`founder-card-portrait${founder.image ? "" : " is-placeholder"}`} data-founder={founder.initials}>
              {founder.image
                ? <img src={`${imageBase}${founder.image}`} alt={founder.imageAlt} />
                : <span className="founder-monogram" role="img" aria-label={founder.imageAlt}>{founder.initials}</span>}
              {!founder.image && <figcaption>Portrait placeholder</figcaption>}
            </figure>
            <div className="founder-profile-copy">
              <p className="founder-profile-role">{founder.role}</p>
              <h3>{founder.name}</h3>
              <p className="founder-profile-bio">{founder.summary}</p>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="soft-panel py-16 lg:py-24"><div className="container"><SectionIntro eyebrow="Our point of view" title={<>Confidence is not a personality trait. It is a <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">practice.</strong></span></>} description="Belonging, purposeful Missions and visible progress help confidence grow through experience." /><div className="grid gap-4 md:grid-cols-3"><article className="content-card"><Users size={20} className="text-[#0e9c8c]" /><h3>Belong before you lead</h3><p>Pods create the safety and familiarity young adults need to participate in their own way.</p></article><article className="content-card"><Sparkles size={20} className="text-[#f28d63]" /><h3>Make skills feel useful</h3><p>Missions give communication, judgment and ownership a real reason to matter.</p></article><article className="content-card"><HeartHandshake size={20} className="text-[#7a6316]" /><h3>Keep parents in the loop</h3><p>Growth is made visible through coach observations, reflection and the monthly Growth Card.</p></article></div></div></section>

    <section className="container py-16 lg:py-20"><SectionIntro eyebrow="Start here" title="Give them one hour to try." description="Meet the coach, see a Mission in motion and decide after your young adult has experienced the room." action={<a className="btn-dark inline-flex items-center rounded-full px-6 py-4 text-sm font-bold" href={`${import.meta.env.BASE_URL}#parents`}>See the parent view <ArrowRight className="ml-2 inline" size={16} /></a>} /></section>
  </PageShell>;
}
