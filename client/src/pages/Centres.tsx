import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { MapView } from "../components/Map";
import { PageHero, PageShell, SectionLabel, WHATSAPP_HREF } from "../components/SiteChrome";
import { centreProfiles as centres } from "../data/centreProfiles";

export default function Centres() {
  return <PageShell>
    <PageHero eyebrow="Find a centre" title={<>A TYA room near <span className="font-display italic text-[#f6d77a]">you.</span></>} intro="Start with a conversation, find the right age group and experience a TYA Mission in person." />
    <section className="container py-24 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">{centres.map((centre) => <article className="content-card" key={centre.city}>
          <div className="flex items-start justify-between gap-4"><span className="icon-disc"><MapPin size={18} /></span><span className="rounded-full bg-[#dce7e3] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#0e7568]">{centre.seats}</span></div>
          <h2 className="mt-8 text-3xl font-medium">{centre.locality}</h2><p className="mt-1 font-bold text-[#7a6316]">{centre.city}</p><p className="mt-5 text-sm leading-6 text-muted-copy">{centre.address}</p><p className="mt-3 text-sm text-muted-copy">{centre.detail}</p>
          <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-[#3e4245]/10 bg-[#e9e6e1]/55 sm:flex"><img src={centre.coach.image} alt={centre.coach.alt} className="aspect-square w-full object-cover sm:w-36" /><div className="p-5"><p className="text-base font-bold">{centre.coach.title}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#7a6316]">{centre.coach.role}</p><p className="mt-3 text-sm leading-6 text-muted-copy">{centre.coach.bio}</p><p className="mt-3 text-[9px] font-semibold uppercase tracking-[.1em] text-muted-copy">AI-generated representative portrait · Not a named employee</p></div></div>
          <div className="mt-6 flex flex-wrap gap-4"><a className="inline-flex items-center gap-2 text-sm font-bold" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Ask about a trial <MessageCircle size={15} /></a><a className="inline-flex items-center gap-2 text-sm font-bold text-[#7a6316]" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.address)}`} target="_blank" rel="noreferrer">Get directions <ExternalLink size={14} /></a></div>
        </article>)}</div>
        <div className="map-frame"><MapView className="h-[460px] rounded-[1.25rem] lg:h-[760px]" initialCenter={{ lat: 19.3, lng: 75.8 }} initialZoom={5} onMapReady={(map) => { centres.forEach((centre) => { new google.maps.Marker({ position: { lat: centre.lat, lng: centre.lng }, map, title: `${centre.locality}, ${centre.city}` }); }); }} /></div>
      </div>
    </section>
    <section className="soft-panel py-20"><div className="container flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><SectionLabel>Not near one yet?</SectionLabel><h2 className="mt-4 text-4xl font-medium">Tell us where you are.</h2></div><div className="flex flex-wrap gap-3"><a className="btn-dark rounded-full px-5 py-3 text-sm font-bold" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">WhatsApp us</a><a className="btn-primary rounded-full px-5 py-3 text-sm font-bold" href="tel:+918886665295"><Phone className="mr-2 inline" size={15} /> Call the team</a></div></div></section>
  </PageShell>;
}
