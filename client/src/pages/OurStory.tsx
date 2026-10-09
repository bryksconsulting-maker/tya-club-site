import { ArrowRight, HeartHandshake, Sparkles, Users } from "lucide-react";
import { PageHero, PageShell, SectionIntro } from "../components/SiteChrome";

const founders = [
  {
    name: "Kiran Babu P.",
    role: "Founder",
    image: "kiran-babu-p-portrait.jpg",
    imageAlt: "Kiran Babu P.",
    initials: "KBP",
    bio: ["A TEDx Speaker, life-skills coach and entrepreneur whose 27-year corporate career across India, the US and Europe helped shape the idea behind TYA Club."],
  },
  {
    name: "Anoop Jaju",
    role: "Co-founder",
    imageAlt: "Portrait placeholder for Anoop Jaju.",
    initials: "AJ",
    bio: [
      "Anoop Jaju is an Entrepreneur and Business Leader with an MBA from SP Jain Institute of Management and Research, Mumbai, and over 25 years of entrepreneurial experience. Anoop Jaju brings deep expertise in textile manufacturing, business management and diversification. He oversees a manufacturing operation producing 10 million metres of value-added fabrics annually, supported by a workforce of 200 people. His group’s diverse interests span textiles, recruitment, real estate and solar energy, with one of its companies listed on the NSE.",
      "Beyond business, Anoop is passionate about building entrepreneurial communities and nurturing future-ready young adults. Through NIA Surat and TYA Club, he champions meaningful connections, business growth, collaboration and personal development.",
      "His philosophy is simple—build businesses that create value, connections that create opportunities, and communities that inspire growth.",
    ],
  },
  {
    name: "Sreyansh Jain",
    role: "Co-founder",
    imageAlt: "Portrait placeholder for Sreyansh Jain.",
    initials: "SJ",
    bio: [
      "Sreyansh Jain is an entrepreneur and growth strategist with an experience of over a decade transforming vision into reality through leadership, innovation, and disciplined execution.",
      "A strong believer in continuous learning and personal growth, Sreyansh is dedicated to helping individuals and organizations unlock their full potential. His experience spans business development, team building, systems thinking, and entrepreneurial growth.",
      "As a Co-Founder of TYA (Transforming Young Adults), he is committed to empowering the next generation with the skills, mindset, confidence, and values needed to succeed in life. Through experiential learning and practical education, his mission is to bridge the gap between academic knowledge and real-world readiness.",
      "For Sreyansh, education is not just about preparing for exams; it is about preparing for life.",
    ],
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
              <div className="founder-profile-bio">{founder.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="soft-panel py-16 lg:py-24"><div className="container"><SectionIntro eyebrow="Our point of view" title={<>Confidence is not a personality trait. It is a <span className="font-display italic headline-accent headline-accent--butter"><strong className="headline-impact">practice.</strong></span></>} description="Belonging, purposeful Missions and visible progress help confidence grow through experience." /><div className="grid gap-4 md:grid-cols-3"><article className="content-card"><Users size={20} className="text-[#0e9c8c]" /><h3>Belong before you lead</h3><p>Pods create the safety and familiarity young adults need to participate in their own way.</p></article><article className="content-card"><Sparkles size={20} className="text-[#f28d63]" /><h3>Make skills feel useful</h3><p>Missions give communication, judgment and ownership a real reason to matter.</p></article><article className="content-card"><HeartHandshake size={20} className="text-[#7a6316]" /><h3>Keep parents in the loop</h3><p>Growth is made visible through coach observations, reflection and the monthly Growth Card.</p></article></div></div></section>

    <section className="container py-16 lg:py-20"><SectionIntro eyebrow="Start here" title="Give them one hour to try." description="Meet the coach, see a Mission in motion and decide after your young adult has experienced the room." action={<a className="btn-dark inline-flex items-center rounded-full px-6 py-4 text-sm font-bold" href={`${import.meta.env.BASE_URL}#parents`}>See the parent view <ArrowRight className="ml-2 inline" size={16} /></a>} /></section>
  </PageShell>;
}
