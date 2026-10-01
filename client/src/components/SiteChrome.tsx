import type React from "react";
import { Link } from "wouter";
import { Mail, MessageCircle, Moon, Phone, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const LOGO_BASE = import.meta.env.BASE_URL;

export const CONTACT_EMAIL = "hello@thetyaclub.com";
export const GENERAL_EMAIL = "thetyaclub@gmail.com";
export const PRIMARY_PHONE = "+91 888 666 5295";
export const SECONDARY_PHONE = "+91 888 666 5294";
export const WHATSAPP_HREF = "https://wa.me/918886665295?text=Hi%20TYA%20Club%2C%20I%27d%20like%20to%20know%20more%20about%20a%20trial%20class.";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-toggle" aria-label="Choose colour theme">
      <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")} aria-label="Use light theme" aria-pressed={theme === "light"}><Sun size={14} /> <span>Light</span></button>
      <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")} aria-label="Use dark theme" aria-pressed={theme === "dark"}><Moon size={14} /> <span>Dark</span></button>
    </div>
  );
}

export function SiteHeader() {
  return <>
    <header className="site-header sticky top-0 z-40 border-b">
      <div className="container flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="shrink-0" aria-label="TYA Club home"><img src={`${LOGO_BASE}tya-logo-charcoal.svg`} alt="TYA Club" className="logo-light h-11 w-auto max-w-[150px] object-contain" /><img src={`${LOGO_BASE}tya-logo-gold.svg`} alt="TYA Club" className="logo-dark h-11 w-auto max-w-[150px] object-contain" /></Link>
        <nav className="hidden items-center gap-5 text-[13px] font-bold xl:flex" aria-label="Primary navigation">
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/how-it-works">How TYA works</Link>
          <Link className="nav-link" href="/curriculum">Curriculum</Link>
          <Link className="nav-link" href="/parents">For parents</Link>
          <Link className="nav-link" href="/experience">Experience</Link>
          <Link className="nav-link" href="/centres">Centres</Link>
          <Link className="nav-link" href="/franchise">Franchise</Link>
        </nav>
        <div className="flex items-center gap-2"><ThemeToggle /><a className="btn-primary hidden rounded-full px-4 py-3 text-xs font-bold sm:inline-flex" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Talk to us <MessageCircle className="ml-2" size={14} /></a></div>
      </div>
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
  return <footer className="site-footer border-t py-14"><div className="container grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr] md:items-end"><div><Link href="/"><img src={`${LOGO_BASE}tya-logo-gold.svg` alt="TYA Club" className="h-14 w-auto max-w-[170px] object-contain" /></Link><p className="mt-5 max-w-[360px] text-sm leading-6 text-white/60">Where skills become confidence. A learning community for young people to practise the capabilities school cannot grade.</p></div><div className="space-y-3 text-sm"><p className="section-kicker text-[#f6d77a]">Contact</p><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} /> {CONTACT_EMAIL}</a><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`tel:${PRIMARY_PHONE.replace(/\s/g, "")}`}><Phone size={15} /> {PRIMARY_PHONE}</a><a className="flex items-center gap-2 text-white/80 hover:text-[#f6d77a]" href={`tel:${SECONDARY_PHONE.replace(/\s/g, "")}`}><Phone size={15} /> {SECONDARY_PHONE}</a></div><div className="space-y-3 text-sm"><p className="section-kicker text-[#f6d77a]">Explore</p><Link className="block text-white/80 hover:text-[#f6d77a]" href="/contact">Contact us</Link><Link className="block text-white/80 hover:text-[#f6d77a]" href="/centres">Find a centre</Link><Link className="block text-white/80 hover:text-[#f6d77a]" href="/franchise">Franchise with TYA</Link><a className="block text-white/80 hover:text-[#f6d77a]" href="https://www.facebook.com/thetyaclub" target="_blank" rel="noreferrer">Facebook</a><a className="block text-white/80 hover:text-[#f6d77a]" href="https://www.instagram.com/tya.club/" target="_blank" rel="noreferrer">Instagram</a></div></div><div className="container mt-10 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© 2026 TYA Club</span><a href={`mailto:${GENERAL_EMAIL}`}>{GENERAL_EMAIL}</a></div></footer>;
}

export function WhatsAppFloat() { return <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" aria-label="Chat with TYA Club on WhatsApp" className="whatsapp-float fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white"><MessageCircle size={18} /> <span className="hidden sm:inline">WhatsApp us</span></a>; }

export function PageShell({ children }: { children: React.ReactNode }) { return <div className="site-shell min-h-screen"><SiteHeader /><main>{children}</main><SiteFooter /></div>; }
