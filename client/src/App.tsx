import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Franchise from "./pages/Franchise";
import { WhatsAppFloat } from "./components/SiteChrome";

function GithubPagesLinks() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    if (!base) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith(base + "/") || href === base) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      event.preventDefault();
      window.history.pushState({}, "", base + (href === "/" ? "/" : href));
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");

    const rewriteImages = () => {
      document.querySelectorAll<HTMLImageElement>('img[src^="/manus-storage/"]').forEach((image) => {
        const key = image.getAttribute("src")?.replace(/^\/manus-storage\//, "");
        if (!key || image.dataset.githubPagesRewritten === "true") return;
        image.dataset.githubPagesRewritten = "true";
        image.src = `${base}/images/${key}`;
        image.addEventListener("error", () => {
          if (image.dataset.githubPagesFallback === "true") return;
          const svgKey = key.replace(/\.(jpe?g|png)$/i, ".svg");
          image.dataset.githubPagesFallback = "true";
          image.src = `${base}/images/${svgKey}`;
        }, { once: true });
      });
    };

    rewriteImages();
    const observer = new MutationObserver(rewriteImages);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}

function RouteScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: "start" }));
      return;
    }

    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function LegacySectionRedirect() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const basePath = base === "/" ? "" : base.replace(/\/$/, "");
    const path = window.location.pathname.replace(basePath, "") || "/";
    const destination = new URL(base, window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    const podQuery = searchParams.get("pod") ?? searchParams.get("centre");
    if (podQuery) destination.searchParams.set("pod", podQuery);
    const target = path.startsWith("/programmes/") ? "curriculum" : (legacySectionTargets[path] ?? "top");
    destination.hash = podQuery ? "centre-results" : target;
    window.location.replace(destination.toString());
  }, []);

  return null;
}

function StoryAliasRedirect() {
  useEffect(() => {
    window.location.replace(`${import.meta.env.BASE_URL}our-story`);
  }, []);
  return null;
}

const legacySectionTargets: Record<string, string> = {
  "/parents": "parents",
  "/parent-guides": "parent-guides",
  "/how-it-works": "how-it-works",
  "/curriculum": "curriculum",
  "/experience": "experience",
  "/centres": "find-a-pod",
};

function Router() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={base}>
      <RouteScrollManager />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/parents" component={LegacySectionRedirect} />
        <Route path="/parent-guides" component={LegacySectionRedirect} />
        <Route path="/about" component={StoryAliasRedirect} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/how-it-works" component={LegacySectionRedirect} />
        <Route path="/curriculum" component={LegacySectionRedirect} />
        <Route path="/experience" component={LegacySectionRedirect} />
        <Route path="/centres" component={LegacySectionRedirect} />
        <Route path="/contact" component={Contact} />
        <Route path="/franchise" component={Franchise} />
        <Route path="/programmes/:slug" component={LegacySectionRedirect} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <GithubPagesLinks />
          <Toaster position="top-right" />
          <Router />
          <WhatsAppFloat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
