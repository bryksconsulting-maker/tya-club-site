import { ArrowDown, ArrowRight, Check, Compass, HeartHandshake, MapPin, Users } from "lucide-react";
import { Link } from "wouter";
import { PageShell, SectionIntro, WHATSAPP_HREF } from "../components/SiteChrome";

const journey = [
  { title: "Discover", copy: "Explore the TYA purpose, experience and opportunity in your city." },
  { title: "Find the fit", copy: "Discuss your community, partner profile and practical foundations." },
  { title: "Plan", copy: "Shape the centre, team and thoughtful local launch pathway." },
  { title: "Prepare", copy: "Complete training, operations and community outreach together." },
  { title: "Launch", copy: "Welcome the first families and begin the local TYA journey." },
] as const;

const partnerQualities = ["Community-minded", "Entrepreneurial", "People-focused", "Ready to learn"] as const;

export default function Franchise() {
  return <PageShell>
    <section className="franchise-journey-hero">
      <div className="container franchise-journey-hero-grid">
        <div className="franchise-journey-hero-copy">
          <p className="section-eyebrow">Bring TYA to your city</p>
          <h1>Start a room where young adults <strong>become.</strong></h1>
          <p>Join a thoughtful network of partners creating practical, confidence-building experiences for the next generation.</p>
          <div className="franchise-journey-actions">
            <a className="btn-dark franchise-journey-primary" href="#partnership-journey">Explore the partnership <ArrowDown size={17} /></a>
            <Link className="franchise-journey-text-link" href="/contact">Start a conversation <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="franchise-journey-art" aria-label="A local TYA community">
          <span className="franchise-journey-orbit franchise-journey-orbit--one" aria-hidden="true" />
          <span className="franchise-journey-orbit franchise-journey-orbit--two" aria-hidden="true" />
          <span className="franchise-journey-map-pin" aria-hidden="true"><MapPin size={25} /></span>
          <div className="franchise-journey-art-card">
            <span>A local TYA community</span>
            <strong>One city. One committed partner. Many possibilities.</strong>
          </div>
        </div>
      </div>
    </section>

    <section className="franchise-journey-section" id="partnership-journey">
      <div className="container">
        <SectionIntro eyebrow="The partnership journey" title={<>From first conversation to <strong className="headline-impact">opening day.</strong></>} description="A guided path helps both sides understand the fit, prepare thoughtfully and build with confidence." />
        <ol className="franchise-journey-steps">
          {journey.map((step, index) => <li key={step.title} className="franchise-journey-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="franchise-partner-section">
      <div className="container franchise-partner-grid">
        <div className="franchise-partner-portrait">
          <div className="franchise-partner-icon-row" aria-hidden="true">
            <span><Compass size={23} /></span>
            <span><Users size={23} /></span>
            <span><HeartHandshake size={23} /></span>
          </div>
          <div>
            <p className="section-eyebrow">The right partner</p>
            <blockquote>“Someone who believes young adults deserve better spaces to grow.”</blockquote>
          </div>
        </div>

        <div className="franchise-partner-copy">
          <p className="section-eyebrow">Could this be you?</p>
          <h2>Purpose, people and the drive to <strong>build well.</strong></h2>
          <p>We are looking for thoughtful local leaders who understand their communities and care about creating a meaningful learning experience.</p>
          <div className="franchise-partner-checks">
            {partnerQualities.map((quality) => <div key={quality}><Check size={17} />{quality}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="franchise-support-section">
      <div className="container franchise-support-grid">
        <div>
          <p className="section-eyebrow">Build with support</p>
          <h2>A shared standard. A locally rooted community.</h2>
        </div>
        <p>Our first conversation explores the brand, programme delivery, coach preparation, parent experience and practical foundations of building TYA in your city.</p>
      </div>
    </section>

    <section className="franchise-journey-cta">
      <div className="container">
        <h2>Let’s explore whether the partnership fits.</h2>
        <div>
          <Link className="btn-dark inline-flex items-center rounded-full px-6 py-4 text-sm font-bold" href="/contact">Contact the team <ArrowRight className="ml-2" size={16} /></Link>
          <a className="franchise-journey-whatsapp" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Talk on WhatsApp</a>
        </div>
      </div>
    </section>
  </PageShell>;
}
