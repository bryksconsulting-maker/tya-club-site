import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Franchise from "./pages/Franchise";
import Centres from "./pages/Centres";
import { centreProfiles } from "./data/centreProfiles";
import { WhatsAppFloat } from "./components/SiteChrome";

export const SITE_URL = "https://thetyaclub.com";
const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png`;
const SOCIAL_IMAGE_ALT = "TYA Club: real-world skills for young adults, styled in the Club’s charcoal, ivory, mustard and peach colours.";

const organizationStructuredData = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "TYA Club",
  alternateName: "Transforming Young Adults",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/tya-logo-lockup.svg`,
  description: "A learning community where young adults build confidence and practical life skills through coached Missions, small Pods and hands-on experiences.",
  email: "hello@thetyaclub.com",
  telephone: "+91 888 666 5295",
  address: centreProfiles.map((centre) => ({
    "@type": "PostalAddress",
    ...centre.postalAddress,
    addressLocality: centre.city,
    addressCountry: "IN",
  })),
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Surat" },
  ],
  sameAs: ["https://www.facebook.com/thetyaclub", "https://www.instagram.com/tya.club/"],
};

const founderStructuredData = [
  {
    "@type": "Person",
    "@id": `${SITE_URL}/our-story/#kiran-babu-p`,
    name: "Kiran Babu P",
    jobTitle: "Founder",
    description: "TEDx speaker, life skills coach, management trainer, business architect, author and serial entrepreneur with a 27-year corporate career across India, the US and Europe.",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@type": "Person",
    "@id": `${SITE_URL}/our-story/#anoop-jaju`,
    name: "Anoop Jaju",
    jobTitle: "Co-founder",
    description: "Entrepreneur and business leader with an MBA from SP Jain Institute of Management and Research and more than 25 years of entrepreneurial experience.",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@type": "Person",
    "@id": `${SITE_URL}/our-story/#sreyansh-jain`,
    name: "Sreyansh Jain",
    jobTitle: "Co-founder",
    description: "Entrepreneur and growth strategist focused on leadership, innovation, business development and practical education for young adults.",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
];

type RouteMetadata = { title: string; description: string; path?: string; robots?: string; structuredData?: Record<string, unknown> };

export const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "TYA Club | Real-World Life Skills for Young Adults",
    description: "TYA Club helps young adults build confidence and practical life skills through coached Missions, small Pods and hands-on experiences in Hyderabad and Surat.",
    path: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        organizationStructuredData,
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "TYA Club",
          inLanguage: "en-IN",
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
      ],
    },
  },
  "/pods": {
    title: "Find a TYA Pod in Hyderabad & Surat | TYA Club",
    description: "Find TYA Club’s Madhapur Pod in Hyderabad and Vesu Pod in Surat. See verified addresses, explore the map and ask about introductory sessions.",
    path: "/pods/",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        organizationStructuredData,
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/pods/#webpage`,
          url: `${SITE_URL}/pods/`,
          name: "Find a TYA Pod in Hyderabad and Surat",
          inLanguage: "en-IN",
          mainEntity: { "@id": `${SITE_URL}/pods/#pod-locations` },
        },
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/pods/#pod-locations`,
          name: "TYA Club Pod locations",
          itemListElement: centreProfiles.map((centre, index) => {
            const podId = `${centre.locality}-${centre.city}`.toLowerCase().replaceAll(" ", "-");
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "EducationalOrganization",
                "@id": `${SITE_URL}/pods/#${podId}`,
                name: `TYA Club ${centre.locality} Pod`,
                url: `${SITE_URL}/pods/#${podId}`,
                description: `${centre.detail}. ${centre.batchSize === null ? "Batch size to be confirmed." : `Batches of ${centre.batchSize} young adults.`}`,
                parentOrganization: { "@id": `${SITE_URL}/#organization` },
                address: {
                  "@type": "PostalAddress",
                  ...centre.postalAddress,
                  addressLocality: centre.city,
                  addressCountry: "IN",
                },
                telephone: "+91 888 666 5295",
                email: "hello@thetyaclub.com",
              },
            };
          }),
        },
      ],
    },
  },
  "/our-story": {
    title: "Our Story | TYA Club – Transforming Young Adults",
    description: "Meet TYA Club’s founders and learn how a simple question grew into a space where young adults build confidence, independence and real-world skills.",
    path: "/our-story/",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        organizationStructuredData,
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/our-story/#webpage`,
          url: `${SITE_URL}/our-story/`,
          name: "Our Story | TYA Club – Transforming Young Adults",
          inLanguage: "en-IN",
          about: { "@id": `${SITE_URL}/#organization` },
          mainEntity: { "@id": `${SITE_URL}/#organization` },
        },
        ...founderStructuredData,
      ],
    },
  },
  "/contact": {
    title: "Contact TYA Club | Find a Pod in Hyderabad or Surat",
    description: "Talk with TYA Club about trial sessions, programs and Pod locations in Hyderabad and Surat. Contact our team by phone, WhatsApp or email.",
    path: "/contact/",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        organizationStructuredData,
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact/#webpage`,
          url: `${SITE_URL}/contact/`,
          name: "Contact TYA Club",
          inLanguage: "en-IN",
          mainEntity: { "@id": `${SITE_URL}/#organization` },
        },
      ],
    },
  },
  "/franchise": {
    title: "TYA Club Franchise & Partnerships",
    description: "Explore a partnership with TYA Club to bring practical, experience-led learning and life skills programs for young adults to your city.",
    robots: "noindex,follow",
  },
};

export const notFoundMetadata = {
  title: "Page Not Found | TYA Club",
  description: "The page you are looking for could not be found. Visit TYA Club to explore our programs and story.",
  robots: "noindex,follow",
};

function RouteMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const path = location.replace(/\/+$/, "") || "/";
    const metadata = routeMetadata[path];
    const title = metadata?.title ?? notFoundMetadata.title;
    const description = metadata?.description ?? notFoundMetadata.description;
    document.title = title;

    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", metadata?.robots ?? (metadata ? "index,follow" : notFoundMetadata.robots));
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "TYA Club");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", SOCIAL_IMAGE_URL);
    setMeta("property", "og:image:secure_url", SOCIAL_IMAGE_URL);
    setMeta("property", "og:image:type", "image/png");
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", SOCIAL_IMAGE_ALT);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", SOCIAL_IMAGE_URL);
    setMeta("name", "twitter:image:alt", SOCIAL_IMAGE_ALT);

    let structuredData = document.head.querySelector<HTMLScriptElement>('#seo-structured-data[type="application/ld+json"]');
    if (metadata?.structuredData) {
      if (!structuredData) {
        structuredData = document.createElement("script");
        structuredData.id = "seo-structured-data";
        structuredData.type = "application/ld+json";
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify(metadata.structuredData).replaceAll("<", "\\u003c");
    } else {
      structuredData?.remove();
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (metadata?.path) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`;
      setMeta("property", "og:url", canonical.href);
    } else {
      canonical?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [location]);

  return null;
}

function BasePathLinks() {
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

  return null;
}

function RouteScrollManager() {
  const [navigationKey, setNavigationKey] = useState(0);

  useEffect(() => {
    const handleNavigation = () => setNavigationKey((key) => key + 1);
    const navigationEvents = ["pushState", "replaceState", "popstate", "hashchange"];

    navigationEvents.forEach((eventName) => window.addEventListener(eventName, handleNavigation));
    return () => navigationEvents.forEach((eventName) => window.removeEventListener(eventName, handleNavigation));
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      let cancelled = false;

      // Wait for web fonts and the hydration layout to settle before scrolling.
      // A single animation frame can run before late-loading fonts change the
      // position of the target on a direct page load.
      void document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cancelled) document.getElementById(targetId)?.scrollIntoView({ block: "start" });
          });
        });
      });

      return () => { cancelled = true; };
    }

    window.scrollTo(0, 0);
  }, [navigationKey]);

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

function Router({ ssrPath }: { ssrPath?: string }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={base} ssrPath={ssrPath}>
      <RouteScrollManager />
      <RouteMetadata />
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
        <Route path="/pods" component={Centres} />
        <Route path="/contact" component={Contact} />
        <Route path="/franchise" component={Franchise} />
        <Route path="/programmes/:slug" component={LegacySectionRedirect} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" switchable>
        <BasePathLinks />
        <SiteToaster />
        <Router ssrPath={ssrPath} />
        <WhatsAppFloat />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function SiteToaster() {
  const { theme } = useTheme();
  return <Toaster position="top-right" theme={theme} />;
}
