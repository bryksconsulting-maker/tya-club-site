import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SectionLabel } from "./SiteChrome";
import { compositeTestimonials } from "../data/centreProfiles";

const parentStorySlides = [
  {
    quote: "She asked to go on a Sunday. That has never happened with any class.",
    name: "[Parent name]",
    place: "[Society], [City]",
    label: "What a parent told us",
    note: "Sample quote · replace with an approved parent testimonial",
  },
  ...compositeTestimonials.map((testimonial) => ({
    ...testimonial,
    label: "Illustrative parent perspective",
    note: "Illustrative composite · Testimonials will be updated here",
  })),
];

export function ParentStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);

  const updateActiveStory = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial-story-card");
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
    const position = Math.round(track.scrollLeft / (card.offsetWidth + gap));
    setActiveStory(Math.min(parentStorySlides.length - 1, Math.max(0, position)));
  };

  const moveToStory = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial-story-card");
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
    const nextStory = Math.min(parentStorySlides.length - 1, Math.max(0, activeStory + direction));
    track.scrollTo({
      left: nextStory * (card.offsetWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    if (paused || interactionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      const track = trackRef.current;
      const card = track?.querySelector<HTMLElement>(".testimonial-story-card");
      if (!track || !card) return;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
      const nextStory = (activeStory + 1) % parentStorySlides.length;
      track.scrollTo({
        left: nextStory * (card.offsetWidth + gap),
        behavior: "smooth",
      });
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeStory, interactionPaused, paused]);

  return (
    <section className="testimonial-stories" aria-labelledby="parent-stories-title">
      <div className="container">
        <div className="testimonial-stories-heading">
          <div className="testimonial-stories-intro">
            <SectionLabel>What parents told us</SectionLabel>
            <h2 id="parent-stories-title">Small changes, <span>worth noticing.</span></h2>
          </div>
          <div className="testimonial-stories-controls" role="group" aria-label="Parent story controls">
            <span className="testimonial-story-count" aria-live="polite">{String(activeStory + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(parentStorySlides.length).padStart(2, "0")}</span>
            <button type="button" className="testimonial-story-arrow" aria-label="Previous parent story" onClick={() => moveToStory(-1)} disabled={activeStory === 0}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="testimonial-story-arrow testimonial-story-arrow-next" aria-label="Next parent story" onClick={() => moveToStory(1)} disabled={activeStory === parentStorySlides.length - 1}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="testimonial-stories-track"
          ref={trackRef}
          role="region"
          aria-label="Parent stories. Scroll sideways to read each story."
          tabIndex={0}
          onScroll={updateActiveStory}
          onPointerEnter={() => setInteractionPaused(true)}
          onPointerLeave={() => setInteractionPaused(false)}
          onFocus={() => setInteractionPaused(true)}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false); }}
        >
          {parentStorySlides.map((testimonial, index) => (
            <article className="testimonial-story-card" key={testimonial.place}>
              <div className="testimonial-story-topline">
                <p className="testimonial-story-kicker">{testimonial.label}</p>
                <span className="testimonial-story-index">{String(index + 1).padStart(2, "0")} / {String(parentStorySlides.length).padStart(2, "0")}</span>
              </div>
              <blockquote><span className="testimonial-story-quote-mark" aria-hidden="true">[</span>{" "}{testimonial.quote}<span className="testimonial-story-close-bracket" aria-hidden="true">]</span></blockquote>
              <div className="testimonial-story-footer">
                <p className="testimonial-story-byline"><strong>{testimonial.name}</strong><span>{testimonial.place}</span></p>
                <p className="testimonial-story-note">{testimonial.note}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="testimonial-stories-autoplay-row">
          <span>{paused || interactionPaused ? "Story rotation paused" : "Stories move automatically · pause to read"}</span>
          <button type="button" aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? "Resume stories" : "Pause stories"}
          </button>
        </div>
      </div>
    </section>
  );
}
