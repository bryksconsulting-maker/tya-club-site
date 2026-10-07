import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SectionIntro } from "./SiteChrome";
import { compositeTestimonials } from "../data/centreProfiles";

const parentStorySlides = [
  {
    quote: "She asked to go on a Sunday. That has never happened with any class.",
    name: "A grateful parent",
    place: "Hyderabad",
    label: "What a parent told us",
    note: "Verified parent testimonial",
  },
  ...compositeTestimonials.map((testimonial) => ({
    ...testimonial,
    label: "Parent perspective",
    note: "Illustrative composite based on parent feedback",
  })),
  {
    quote: "She came home talking about the idea her Pod built — and how she helped make it happen.",
    name: "A proud parent",
    place: "Hyderabad · Class 6 to 9 family",
    label: "Parent perspective",
    note: "Verified parent testimonial",
  },
  {
    quote: "He used to wait for someone else to decide. Now he can explain the choice he made and why.",
    name: "A proud parent",
    place: "Surat · Class 10 to 12 family",
    label: "Parent perspective",
    note: "Verified parent testimonial",
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
  const visibleEnd = Math.min(visibleStart + visibleStoryCount, parentStorySlides.length);

  return (
    <section className="parent-stories bg-[#F3F0EA] py-16 sm:py-24" aria-labelledby="parent-stories-title">
      <div className="container">
        <SectionIntro eyebrow="Parent Stories" title="Voices of transformation." description="Hearing from parents who notice changes in their young adults’ confidence and capabilities." id="parent-stories-title" className="parent-stories-heading" />

        <div className="testimonial-stories-carousel relative group">
          <div ref={trackRef} className="testimonial-stories-track flex gap-4 overflow-x-auto scroll-smooth no-scrollbar" onScroll={updateActiveStory}>
            {parentStorySlides.map((testimonial, index) => (
              <article key={index} className="testimonial-story-card shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
                <blockquote className="testimonial-story-quote">
                  <p className="testimonial-story-text">
                    <span className="testimonial-story-open-bracket" aria-hidden="true">“</span>
                    {testimonial.quote}
                    <span className="testimonial-story-close-bracket" aria-hidden="true">”</span>
                  </p>
                </blockquote>
                <div className="testimonial-story-footer">
                  <p className="testimonial-story-byline"><strong>{testimonial.name}</strong><span>{testimonial.place}</span></p>
                  <p className="testimonial-story-note">{testimonial.note}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="testimonial-stories-nav absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button type="button" className="testimonial-stories-arrow prev pointer-events-auto" onClick={() => moveToStory(-1)} aria-label="Previous story"><ChevronLeft size={20} /></button>
            <button type="button" className="testimonial-stories-arrow next pointer-events-auto" onClick={() => moveToStory(1)} aria-label="Next story"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="testimonial-stories-autoplay-row mt-8 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
          <div className="testimonial-stories-autoplay-controls flex items-center gap-4">
            <span>{paused || interactionPaused ? "Story rotation paused" : "Stories move automatically · pause to read"}</span>
            <button type="button" className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={() => setPaused((current) => !current)}>
              {paused ? <Play size={12} /> : <Pause size={12} />}
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
