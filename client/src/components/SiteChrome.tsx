import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Compass, Mail, Menu, MessageCircle, Moon, Phone, Search, Sun, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const LOGO_BASE = import.meta.env.BASE_URL;

export const CONTACT_EMAIL = "hello@thetyaclub.com";
export const GENERAL_EMAIL = "thetyaclub@gmail.com";
export const PRIMARY_PHONE = "+91 888 666 5295";
export const SECONDARY_PHONE = "+91 888 666 5294";
export const WHATSAPP_HREF = "https://wa.me/918886665295?text=Hi%20TYA%20Club%2C%20I%27d%20like%20to%20know%20more%20about%20a%20trial%20class.";

type NavigationLink = { label: string; href: string };
type NavigationItem = { label: string; href?: string; children?: NavigationLink[] };

const navigationItems: NavigationItem[] = [
  { label: "TYA", href: "#top" },
  { label: "How TYA works", href: "#how-it-works" },
  { label: "Skills", href: "#curriculum" },
  { label: "For parents", href: "#parents" },
  { label: "TYA experience", href: "#experience" },
  { label: "Find a Pod", href: "#centre-results" },
  { label: "Our story", href: "/our-story" },
  { label: "Founders", href: "/our-story#founders-title" },
  { label: "Franchise", href: "/franchise" },
];

const desktopNavigationItems: NavigationItem[] = [
  { label: "TYA", href: "#top" },
  { label: "Skills", href: "#curriculum" },
  { label: "Parents", href: "#parents" },
  { label: "Experience", href: "#experience" },
  { label: "Find a Pod", href: "#centre-results" },
  { label: "Our Story", href: "/our-story" },
  { label: "Founders", href: "/our-story#founders-title" },
  { label: "Franchise", href: "/franchise" },
];

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";
  const ThemeIcon = nextTheme === "dark" ? Moon : Sun;

  return (
    <div className="theme-toggle">
      <button type="button" onClick={toggleTheme} aria-label={`Switch to ${nextTheme} theme`} title={`Switch to ${nextTheme} theme`}>
        <ThemeIcon size={14} aria-hidden="true" />
        <span>{nextTheme === "dark" ? "Dark" : "Light"}</span>
      </button>
    </div>
  );
}

export function SiteHeader({ variant = "default" }: { variant?: "default" | "home" }) {
  const [location] = useLocation();
  const [desktopGroup, setDesktopGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCurrent = (href: string) => location === href || location.startsWith(`${href}/`);
  const closeMenus = () => {
    setDesktopGroup(null);
    setMobileGroup(null);
    setMobileMenuOpen(false);
  };

  return <>
    <header className={`site-header sticky top-0 z-40 border-b ${variant === "home" ? "site-header-home" : ""}`} onKeyDown={(event) => { if (event.key === "Escape") closeMenus(); }}>
      <div className="container flex min-h-[76px] items-center justify-between gap-3 xl:gap-5">
        <a href={`${LOGO_BASE}#top`} onClick={closeMenus} className="shrink-0" aria-label="TYA Club home"><img src={`${LOGO_BASE}tya-logo-lockup.svg`} alt="TYA Club" className="logo-light h-10 w-auto max-w-[140px] object-contain sm:h-11 sm:max-w-[150px]" /><img src={`${LOGO_BASE}tya-logo-lockup-ivory.svg`} alt="TYA Club" className="logo-dark h-10 w-auto max-w-[140px] object-contain sm:h-11 sm:max-w-[150px]" /></a>
        <nav className="site-navigation" aria-label="Primary navigation" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopGroup(null); }}>
          {desktopNavigationItems.map((item) => {
            const homeAnchor = Boolean(item.href?.startsWith("#"));
            const active = item.href && !homeAnchor ? isCurrent(item.href) : item.children?.some((child) => isCurrent(child.href));
            if (!item.children) {
              if (!item.href) return null;
              if (homeAnchor) return <a key={item.label} className="nav-link" href={`${LOGO_BASE}${item.href}`} onClick={closeMenus}>{item.label}</a>;
              return <Link key={item.label} className="nav-link" href={item.href} aria-current={active ? "page" : undefined} onClick={closeMenus}>{item.label}</Link>;
            }
            const expanded = desktopGroup === item.label;
            return <div className="site-nav-group" data-active={active} data-open={expanded} key={item.label} onMouseEnter={() => setDesktopGroup(item.label)} onMouseLeave={() => setDesktopGroup(null)}>
              <div className="site-nav-parent">
                {item.href ? <Link className="nav-link" href={item.href} aria-current={location === item.href ? "page" : undefined} onClick={closeMenus}>{item.label}</Link> : <span className="site-nav-label">{item.label}</span>}
                <button className="site-nav-trigger" type="button" aria-label={`${expanded ? "Hide" : "Show"} ${item.label} pages`} aria-expanded={expanded} aria-controls={`site-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`} onClick={() => setDesktopGroup(expanded ? null : item.label)}><ChevronDown size={13} aria-hidden="true" /></button>
              </div>
              <div className="site-submenu" id={`site-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}>
                {item.children.map((child) => <Link key={child.href} href={child.href} aria-current={location === child.href ? "page" : undefined} onClick={closeMenus}>{child.label}</Link>)}
              </div>
            </div>;
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2"><ThemeToggle /><a className="btn-primary hidden rounded-full px-4 py-3 text-xs font-bold sm:inline-flex" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Talk to us <MessageCircle className="ml-2" size={14} /></a><button className="site-menu-toggle" type="button" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="site-mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </div>
      {mobileMenuOpen && <nav className="site-mobile-navigation xl:hidden" id="site-mobile-navigation" aria-label="Mobile navigation">
        {navigationItems.map((item) => {
          const expanded = mobileGroup === item.label;
          const submenuId = `site-mobile-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`;
          if (!item.children) {
            if (!item.href) return null;
            if (item.href.startsWith("#")) return <a key={item.label} className="site-mobile-link" href={`${LOGO_BASE}${item.href}`} onClick={closeMenus}>{item.label}</a>;
            return <Link key={item.label} className="site-mobile-link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={closeMenus}>{item.label}</Link>;
          }
          return <div className="site-mobile-group" key={item.label}>
            <div className="site-mobile-parent">{item.href ? <Link className="site-mobile-link" href={item.href} aria-current={location === item.href ? "page" : undefined} onClick={closeMenus}>{item.label}</Link> : <span>{item.label}</span>}<button type="button" aria-label={`${expanded ? "Hide" : "Show"} ${item.label} pages`} aria-expanded={expanded} aria-controls={submenuId} onClick={() => setMobileGroup(expanded ? null : item.label)}><ChevronDown size={16} className={expanded ? "rotate-180" : ""} /></button></div>
            {expanded && <div className="site-mobile-submenu" id={submenuId}>{item.children.map((child) => <Link key={child.href} href={child.href} aria-current={location === child.href ? "page" : undefined} onClick={closeMenus}>{child.label}</Link>)}</div>}
          </div>;
        })}
        <a className="site-mobile-contact" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Talk to us <MessageCircle size={15} /></a>
      </nav>}
    </header>
  </>;
}

export function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <span className={`section-kicker ${light ? "text-[#f6d77a]" : "text-[#7a6316]"}`}>{children}</span>;
}

type SectionIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  light?: boolean;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionIntro({ eyebrow, title, description, action, light = false, id, as = "h2", className = "" }: SectionIntroProps) {
  const Heading = as;
  return <div className={`section-intro ${light ? "section-intro--light" : ""} ${description || action ? "section-intro--with-copy" : "section-intro--title-only"} ${className}`}>
    <div className="section-intro-main">
      <SectionLabel light={light}>{eyebrow}</SectionLabel>
      <Heading id={id} className="section-intro-title">{title}</Heading>
    </div>
    {(description || action) && <div className="section-intro-side">
      {description && <p>{description}</p>}
      {action}
    </div>}
  </div>;
}

export function FindCentreSearch({ id, className = "" }: { id?: string; className?: string }) {
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("pod") ?? params.get("centre") ?? "";
  });
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const destination = new URL(LOGO_BASE, window.location.origin);
    if (query.trim()) destination.searchParams.set("pod", query.trim());
    destination.hash = "centre-results";
    window.location.assign(destination.toString());
  };

  return <form id={id} className={`home-centre-search flex w-full items-center gap-2 rounded-[1.25rem] border-2 border-[#2B2F32] bg-[#F3F0EA] p-2 shadow-[0_12px_30px_rgba(43,47,50,.1)] sm:gap-3 ${className}`} onSubmit={submitSearch}>
    <Compass size={21} aria-hidden="true" className="ml-1 shrink-0 rounded-full bg-[#F28D63]/15 p-2 text-[#F28D63]" />
    <div className="min-w-0 flex-1 rounded-[.9rem] bg-white px-3 py-2.5 sm:px-2 sm:py-2">
      <p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#656A6D]">Find your Pod</p>
      <input aria-label="Enter Pod city, locality or pin code" name="pod" className="w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#2B2F32] outline-none placeholder:text-[#656A6D] placeholder:opacity-100" placeholder="City, locality or PIN code" value={query} onChange={(event) => setQuery(event.target.value)} />
    </div>
    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-[.9rem] bg-[#E4B42A] px-4 py-3 text-sm font-bold text-[#2B2F32] transition-colors sm:px-6 sm:py-3.5"><Search size={15} aria-hidden="true" />Find a Pod</button>
  </form>;
}

export function FindCentrePrompt() {
  return <section id="find-a-pod" className="find-centre-prompt bg-[#F3F0EA] py-12 sm:py-16">
    <div className="container"><SectionIntro eyebrow="Find a Pod" title="Find your nearest TYA Pod." description="Enter a city, locality or pin code to explore current TYA Pod locations." action={<FindCentreSearch className="lg:max-w-[620px]" />} className="find-centre-prompt-intro" /></div>
  </section>;
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: string; children?: React.ReactNode }) {
  return <section className={`grain page-hero overflow-hidden border-b py-20 lg:py-28 ${children ? "page-hero--with-aside" : ""}`}><div className="container min-w-0"><SectionIntro eyebrow={eyebrow} title={title} description={intro} light as="h1" className="page-hero-intro" />{children && <div className="page-hero-aside">{children}</div>}</div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer border-t py-14"><div className="container grid gap-10 md:grid-cols-[1.1fr_.9fr_1.4fr] md:items-start"><div><Link href="/"><img src={`${LOGO_BASE}tya-logo-lockup-ivory.svg`} alt="TYA Club" className="h-14 w-auto max-w-[170px] object-contain" /></Link><p className="mt-5 max-w-[360px] text-sm leading-6 text-white/60">Where skills become confidence. A learning community for young adults to practise the capabilities school cannot grade.</p></div><div className="space-y-3 text-sm"><p className="section-kicker text-[#f6d77a]">Contact</p><Link className="block text-white/80 hover:text-[#f6d77a]" href="/contact">Contact us</Link><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} /> {CONTACT_EMAIL}</a><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`tel:${PRIMARY_PHONE.replace(/\s/g, "")}`}><Phone size={15} /> {PRIMARY_PHONE}</a><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`tel:${SECONDARY_PHONE.replace(/\s/g, "")}`}><Phone size={15} /> {SECONDARY_PHONE}</a></div><div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm"><p className="section-kicker col-span-2 text-[#f6d77a]">Explore</p><a className="text-white/80 hover:text-[#f6d77a]" href={`${LOGO_BASE}#top`}>TYA</a><a className="text-white/80 hover:text-[#f6d77a]" href={`${LOGO_BASE}#how-it-works`}>How TYA works</a><a className="text-white/80 hover:text-[#f6d77a]" href={`${LOGO_BASE}#curriculum`}>Skills</a><a className="text-white/80 hover:text-[#f6d77a]" href={`${LOGO_BASE}#parents`}>For parents</a><a className="text-white/80 hover:text-[#f6d77a]" href={`${LOGO_BASE}#experience`}>TYA experience</a><a className="text-white/80 hover:text-[#f6d77a]" href={`${LOGO_BASE}#find-a-pod`}>Find a Pod</a><Link className="text-white/80 hover:text-[#f6d77a]" href="/our-story">Our story</Link><Link className="text-white/80 hover:text-[#f6d77a]" href="/franchise">Franchise</Link><Link className="text-white/80 hover:text-[#f6d77a]" href="/contact">Contact us</Link><a className="text-white/80 hover:text-[#f6d77a]" href="https://www.facebook.com/thetyaclub" target="_blank" rel="noreferrer">Facebook</a><a className="text-white/80 hover:text-[#f6d77a]" href="https://www.instagram.com/tya.club/" target="_blank" rel="noreferrer">Instagram</a></div></div><div className="container mt-10 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© 2026 TYA Club</span><a href={`mailto:${GENERAL_EMAIL}`}>{GENERAL_EMAIL}</a></div></footer>;
}

export function WhatsAppFloat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-5 z-50">
      {expanded ? (
        <div className="whatsapp-float flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white">
          <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" aria-label="Chat with TYA Club on WhatsApp" className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>WhatsApp us</span>
          </a>
          <button type="button" onClick={() => setExpanded(false)} aria-label="Collapse WhatsApp contact" className="ml-1 rounded-full p-1 text-white/80 hover:text-white">×</button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Expand WhatsApp contact"
          className="whatsapp-float flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
        >
          <MessageCircle size={23} />
        </button>
      )}
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) { return <div className="site-shell min-h-screen"><SiteHeader /><main>{children}</main><FindCentrePrompt /><SiteFooter /></div>; }
