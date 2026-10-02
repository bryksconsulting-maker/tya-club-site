import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Mail, Menu, MessageCircle, Moon, Phone, Sun, X } from "lucide-react";
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
  { label: "About", href: "/about" },
  { label: "How TYA works", href: "/how-it-works", children: [
    { label: "Curriculum", href: "/curriculum" },
    { label: "TYA Experience", href: "/experience" },
  ] },
  { label: "Programmes", children: [
    { label: "Class 6 to 9", href: "/programmes/class-6-to-9" },
    { label: "Class 10 to 12", href: "/programmes/class-10-to-12" },
    { label: "Grads", href: "/programmes/grads" },
  ] },
  { label: "For parents", href: "/parents", children: [
    { label: "Parent Guides", href: "/parent-guides" },
    { label: "Find a centre", href: "/centres" },
  ] },
  { label: "Franchise", href: "/franchise" },
  { label: "Contact", href: "/contact" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-toggle" aria-label="Choose colour theme">
      <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")} aria-label="Use light theme" aria-pressed={theme === "light"}><Sun size={14} /> <span>Light</span></button>
      <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")} aria-label="Use dark theme" aria-pressed={theme === "dark"}><Moon size={14} /> <span>Dark</span></button>
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
        <Link href="/" onClick={closeMenus} className="shrink-0" aria-label="TYA Club home"><img src={`${LOGO_BASE}tya-logo-lockup.svg`} alt="TYA Club" className="logo-light h-10 w-auto max-w-[140px] object-contain sm:h-11 sm:max-w-[150px]" /><img src={`${LOGO_BASE}tya-logo-lockup-coral.svg`} alt="TYA Club" className="logo-dark h-10 w-auto max-w-[140px] object-contain sm:h-11 sm:max-w-[150px]" /></Link>
        <nav className="site-navigation" aria-label="Primary navigation" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopGroup(null); }}>
          {navigationItems.map((item) => {
            const active = item.href ? isCurrent(item.href) : item.children?.some((child) => isCurrent(child.href));
            if (!item.children) {
              if (!item.href) return null;
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

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: string; children?: React.ReactNode }) {
  return <section className="grain page-hero overflow-hidden border-b py-20 lg:py-28"><div className="container grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-end"><div><SectionLabel light>{eyebrow}</SectionLabel><h1 className="mt-5 max-w-[720px] text-balance text-6xl font-medium leading-[.92] tracking-[-.055em] sm:text-7xl">{title}</h1><p className="mt-7 max-w-[600px] text-lg leading-8 text-white/65">{intro}</p></div>{children && <div className="lg:justify-self-end">{children}</div>}</div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer border-t py-14"><div className="container grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr] md:items-end"><div><Link href="/"><img src={`${LOGO_BASE}tya-logo-lockup-coral.svg`} alt="TYA Club" className="h-14 w-auto max-w-[170px] object-contain" /></Link><p className="mt-5 max-w-[360px] text-sm leading-6 text-white/60">Where skills become confidence. A learning community for young people to practise the capabilities school cannot grade.</p></div><div className="space-y-3 text-sm"><p className="section-kicker text-[#f6d77a]">Contact</p><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} /> {CONTACT_EMAIL}</a><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`tel:${PRIMARY_PHONE.replace(/\s/g, "")}`}><Phone size={15} /> {PRIMARY_PHONE}</a><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`tel:${SECONDARY_PHONE.replace(/\s/g, "")}`}><Phone size={15} /> {SECONDARY_PHONE}</a></div><div className="space-y-3 text-sm"><p className="section-kicker text-[#f6d77a]">Explore</p><Link className="block text-white/80 hover:text-[#f6d77a]" href="/contact">Contact us</Link><Link className="block text-white/80 hover:text-[#f6d77a]" href="/centres">Find a centre</Link><Link className="block text-white/80 hover:text-[#f6d77a]" href="/franchise">Franchise with TYA</Link><a className="block text-white/80 hover:text-[#f6d77a]" href="https://www.facebook.com/thetyaclub" target="_blank" rel="noreferrer">Facebook</a><a className="block text-white/80 hover:text-[#f6d77a]" href="https://www.instagram.com/tya.club/" target="_blank" rel="noreferrer">Instagram</a></div></div><div className="container mt-10 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© 2026 TYA Club</span><a href={`mailto:${GENERAL_EMAIL}`}>{GENERAL_EMAIL}</a></div></footer>;
}

export function WhatsAppFloat() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
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

export function PageShell({ children }: { children: React.ReactNode }) { return <div className="site-shell min-h-screen"><SiteHeader /><main>{children}</main><SiteFooter /></div>; }
