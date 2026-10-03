import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Parents from "./pages/Parents";
import Programme from "./pages/Programme";
import OurStory from "./pages/OurStory";
import HowItWorks from "./pages/HowItWorks";
import Curriculum from "./pages/Curriculum";
import ParentGuides from "./pages/ParentGuides";
import Experience from "./pages/Experience";
import Centres from "./pages/Centres";
import Contact from "./pages/Contact";
import Franchise from "./pages/Franchise";
import { WhatsAppFloat } from "./components/SiteChrome";

function GithubPagesLinks() {
  useEffect(() => {
    const base = "/tya-club-site";

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

function Router() {
  const base = window.location.pathname.startsWith("/tya-club-site")
    ? "/tya-club-site"
    : "";

  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/parents" component={Parents} />
        <Route path="/parent-guides" component={ParentGuides} />
        <Route path="/about" component={OurStory} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/curriculum" component={Curriculum} />
        <Route path="/experience" component={Experience} />
        <Route path="/centres" component={Centres} />
        <Route path="/contact" component={Contact} />
        <Route path="/franchise" component={Franchise} />
        <Route path="/programmes/:slug" component={Programme} />
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
