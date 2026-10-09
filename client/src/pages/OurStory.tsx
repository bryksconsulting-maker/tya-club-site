import { ArrowRight, HeartHandshake, Sparkles, Users } from "lucide-react";
import { PageHero, PageShell, SectionIntro } from "../components/SiteChrome";

const founders = [
  {
    name: "Kiran Babu P.",
    role: "Founder",
    image: "kiran-babu-p-portrait.jpg",
    imageAlt: "Portrait of Kiran Babu P.",
    initials: "KBP",
    bio: [
      "Kiran Babu P, fondly known as KBP, is a TEDx Speaker, Life Skills Coach, Management Trainer, Business Architect, an author and Serial Entrepreneur. With an extraordinary 27-year corporate career spanning India, the US and Europe, KBP has transformed his experience into a passion for building businesses, developing people and creating possibilities.",
      "A Six Sigma Black Belt and Certified Networker, his expertise spans business, leadership, training, design and creativity, with qualifications across diverse disciplines.",
      "Today, his entrepreneurial ventures span creative design and conceptualisation, business networking, business expansion and growth opportunities for entrepreneurs and start-ups, and life-skills development for young adults—including his initiative TYA Club, focused on helping young adults develop the skills, confidence and perspectives they need to navigate real life.",
      "From corporate boardrooms to entrepreneurship, from creative studios to training rooms, his journey is ultimately about one thing—helping people see possibilities and turn them into reality.",
    ],
  },
  {
    name: "Anoop Jaju",
    role: "Co-founder",
    image: "anoop-jaju-portrait.jpeg",
    imageAlt: "Portrait of Anoop Jaju.",
    initials: "AJ",
    bio: [
      "Anoop Jaju is an Entrepreneur and Business Leader with an MBA from SP Jain Institute of Management and Research, Mumbai, and over 25 years of entrepreneurial experience. Anoop Jaju brings deep expertise in textile manufacturing, business management and diversification supported by a workforce of 200 people. His group’s diverse interests span textiles, recruitment, real estate and solar energy, with one of its companies listed on the NSE.",
      "Beyond business, Anoop is passionate about building entrepreneurial communities and nurturing future-ready young adults. Through NIA Surat and TYA Club, he champions meaningful connections, business growth, collaboration and personal development.",
      "His philosophy is simple—build businesses that create value, connections that create opportunities, and communities that inspire growth.",
    ],
  },
  {
    name: "Sreyansh Jain",
    role: "Co-founder",
    image: "sreyansh-jain-portrait.jpeg",
    imageAlt: "Portrait of Sreyansh Jain.",
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
    <PageHero eyebrow="Our story" title="Where TYA began." intro="Kiran Babu P founded TYA Club after nearly a decade of research, observation and conversations across multiple cities, exploring what young adults need to become confident, independent and future-ready." />

    <section className="container story-narrative py-16 lg:py-24" aria-labelledby="our-story-title">
      <SectionIntro eyebrow="The Idea" id="our-story-title" title={<>They meet. They question. They <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">become.</strong></span></>} description="A room for the person they are becoming." />
      <div className="story-narrative-copy mt-8 text-lg leading-8 text-muted-copy lg:mx-auto lg:max-w-3xl">
        <div className="space-y-5">
          <p>TYA Club was born from a simple question: What if young adults had a space to learn the things that classrooms often don't teach?</p>
          <p>The concept was founded by Kiran Babu P, following nearly a decade of research, observation and conversations across multiple cities, exploring what young adults need... to become confident, independent and future-ready.</p>
          <p>Anoop Jaju and Sreyansh Jain joined the journey, bringing fresh perspectives, energy and ideas to the concept. Together, they reimagined the idea and gave it a new identity — TYA Club: Transforming Young Adults.</p>
        </div>
      </div>
    </section>

    <section className="soft-panel founder-section py-16 lg:py-24" aria-labelledby="founders-title">
      <div className="container">
        <SectionIntro eyebrow="Meet the founders" id="founders-title" title={<>The people behind <span className="font-display italic headline-accent headline-accent--coral"><strong className="headline-impact">the TYA CLUB.</strong></span></>} description="Meet the founders whose experience and ideas shaped TYA Club and its focus on helping young adults grow." />

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
