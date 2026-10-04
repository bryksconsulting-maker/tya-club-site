import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "./SiteChrome";
import { compositeTestimonials } from "../data/centreProfiles";

export function ParentStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);

  const updateActiveStory = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial-story-card");
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
    const position = Math.round(track.scrollLeft / (card.offsetWidth + gap));
    setActiveStory(Math.min(compositeTestimonials.length - 1, Math.max(0, position)));
  };

  const moveToStory = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial-story-card");
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
    const nextStory = Math.min(compositeTestimonials.length - 1, Math.max(0, activeStory + direction));
    track.scrollTo({
      left: nextStory * (card.offsetWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section className="testimonial-stories" aria-labelledby="parent-stories-title">
      <div className="container">
        <div className="testimonial-stories-heading">
          <div className="testimonial-stories-intro">
            <SectionLabel>Parent stories</SectionLabel>
            <h2 id="parent-stories-title">Small changes, <span>worth noticing.</span></h2>
            <p>Illustrative parent perspectives from across the TYA journey.</p>
          </div>
          <div className="testimonial-stories-controls" role="group" aria-label="Parent story controls">
            <span className="testimonial-story-count" aria-live="polite">{String(activeStory + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(compositeTestimonials.length).padStart(2, "0")}</span>
            <button type="button" className="testimonial-story-arrow" aria-label="Previous parent story" onClick={() => moveToStory(-1)} disabled={activeStory === 0}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="testimonial-story-arrow testimonial-story-arrow-next" aria-label="Next parent story" onClick={() => moveToStory(1)} disabled={activeStory === compositeTestimonials.length - 1}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="testimonial-stories-track"
          ref={trackRef}
          role="region"
          aria-label="Illustrative parent stories. Scroll sideways to read each story."
          tabIndex={0}
          onScroll={updateActiveStory}
        >
          {compositeTestimonials.map((testimonial, index) => (
            <article className="testimonial-story-card" data-tone={index % 2 === 0 ? "butter" : "coral"} key={testimonial.place}>
              <div className="testimonial-story-topline">
                <p className="testimonial-story-kicker">Illustrative parent perspective</p>
                <span className="testimonial-story-index">{String(index + 1).padStart(2, "0")} / {String(compositeTestimonials.length).padStart(2, "0")}</span>
              </div>
              <span className="testimonial-story-quote-mark" aria-hidden="true">“</span>
              <blockquote>{testimonial.quote}</blockquote>
              <div className="testimonial-story-footer">
                <p className="testimonial-story-byline"><strong>{testimonial.name}</strong><span>{testimonial.place}</span></p>
                <p className="testimonial-story-note">Illustrative composite · Testimonials will be updated here</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
