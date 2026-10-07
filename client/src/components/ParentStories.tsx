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
  {
    quote: "She came home talking about the idea her Pod built — and how she helped make it happen.",
    name: "Illustrative parent",
    place: "Hyderabad · Class 6 to 9 family",
    label: "Illustrative parent perspective",
    note: "Sample story · replace with an approved parent testimonial",
  },
  {
    quote: "He used to wait for someone else to decide. Now he can explain the choice he made and why.",
    name: "Illustrative parent",
    place: "Surat · Class 10 to 12 family",
    label: "Illustrative parent perspective",
    note: "Sample story · replace with an approved parent testimonial",
  },
];

function getStoryPageStarts(visibleCount: number) {
  const pageCount = Math.ceil(parentStorySlides.length / visibleCount);
  const lastStart = Math.max(0, parentStorySlides.length - visibleCount);
  return Array.from({ length: pageCount }, (_, page) => Math.min(page * visibleCount, lastStart));
}

function closestStoryPage(pageStarts: number[], storyIndex: number) {
  return pageStarts.reduce((closest, start, page) =>
    Math.abs(start - storyIndex) < Math.abs(pageStarts[closest] - storyIndex) ? page : closest, 0);
}

export function ParentStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [visibleStoryCount, setVisibleStoryCount] = useState(1);
  const [paused, setPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);

  const getCarouselMetrics = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".testimonial-story-card");
    if (!track || !card) return null;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
    const step = card.offsetWidth + gap;
    const visible = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    return { track, card, gap, step, visible };
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      const metrics = getCarouselMetrics();
      if (!metrics) return;
      setVisibleStoryCount(metrics.visible);
      setActiveStory((current) => Math.min(current, Math.max(0, parentStorySlides.length - metrics.visible)));
    };
    updateVisibleCount();
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateVisibleCount);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const updateActiveStory = () => {
    const metrics = getCarouselMetrics();
    if (!metrics) return;
    const position = Math.round(metrics.track.scrollLeft / metrics.step);
    setVisibleStoryCount(metrics.visible);
    setActiveStory(Math.min(Math.max(0, parentStorySlides.length - metrics.visible), Math.max(0, position)));
  };

  const moveToStory = (direction: -1 | 1) => {
    const metrics = getCarouselMetrics();
    if (!metrics) return;
    const pageStarts = getStoryPageStarts(metrics.visible);
    if (pageStarts.length < 2) return;
    const currentPage = closestStoryPage(pageStarts, activeStory);
    const nextPage = (currentPage + direction + pageStarts.length) % pageStarts.length;
    const nextStory = pageStarts[nextPage];
    setActiveStory(nextStory);
    metrics.track.scrollTo({
      left: nextStory * metrics.step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    if (paused || interactionPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      const metrics = getCarouselMetrics();
      if (!metrics) return;
      const pageStarts = getStoryPageStarts(metrics.visible);
      if (pageStarts.length < 2) return;
      const currentPage = closestStoryPage(pageStarts, activeStory);
      const nextStory = pageStarts[(currentPage + 1) % pageStarts.length];
      setActiveStory(nextStory);
      metrics.track.scrollTo({
        left: nextStory * metrics.step,
        behavior: "smooth",
      });
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeStory, visibleStoryCount, interactionPaused, paused]);

  const storyPages = getStoryPageStarts(visibleStoryCount);
  const activePage = closestStoryPage(storyPages, activeStory);
  const visibleStart = storyPages[activePage] ?? 0;
  const visibleEnd = Math.min(parentStorySlides.length, visibleStart + visibleStoryCount);
  const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section className="testimonial-stories" aria-labelledby="parent-stories-title">
      <div className="container">
        <div className="testimonial-stories-heading">
          <div className="testimonial-stories-intro">
            <SectionLabel>What parents told us</SectionLabel>
            <h2 id="parent-stories-title">Small changes, <span>worth noticing.</span></h2>
          </div>
          <div className="testimonial-stories-controls" role="group" aria-label="Parent story controls">
            <span className="testimonial-story-count" aria-live="polite">{formatIndex(visibleStart)}{visibleStoryCount > 1 && <>–{formatIndex(visibleEnd - 1)}</>} <span aria-hidden="true">/</span> {formatIndex(parentStorySlides.length - 1)}</span>
            <button type="button" className="testimonial-story-arrow" aria-label="Previous parent story group" onClick={() => moveToStory(-1)} disabled={storyPages.length < 2}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="testimonial-story-arrow testimonial-story-arrow-next" aria-label="Next parent story group" onClick={() => moveToStory(1)} disabled={storyPages.length < 2}>
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
            <article className="testimonial-story-card" data-tone={["ivory", "mist", "peach"][index % 3]} key={`${testimonial.place}-${index}`}>
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
