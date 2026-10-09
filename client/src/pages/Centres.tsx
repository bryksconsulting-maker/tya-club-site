import { useState } from "react";
import { CalendarDays, Clock3, ExternalLink, MapPin, MessageCircle, Users } from "lucide-react";
import { IndiaPodsMap } from "../components/IndiaPodsMap";
import { PageShell, SectionIntro, WHATSAPP_HREF } from "../components/SiteChrome";
import { centreProfiles as centres, type CentreProfile } from "../data/centreProfiles";

function centreWhatsappHref(centre: CentreProfile) {
  const text = encodeURIComponent(`Hi TYA Club, I'd like to ask about a free trial at the ${centre.locality}, ${centre.city} Pod.`);
  return `${WHATSAPP_HREF.split("?")[0]}?text=${text}`;
}

function CentreGallery({ centre }: { centre: CentreProfile }) {
  const photos = centre.gallery.filter((photo) => photo.image).slice(0, 3);
  if (!photos.length) return null;

  return <div className="centre-detail-gallery" aria-label={`${centre.locality} Pod photos`}>
    {photos.map((photo, index) => <div className={`centre-gallery-frame ${index === 0 ? "centre-gallery-main" : ""}`} key={photo.label}>
      <img className="centre-gallery-image" src={photo.image!} alt={photo.alt} />
    </div>)}
  </div>;
}

export function CentresContent({ embedded = false, initialQuery = "" }: { embedded?: boolean; initialQuery?: string } = {}) {
  const query = initialQuery.trim().toLowerCase();
  const initialCentre = centres.find((item) => `${item.city} ${item.locality} ${item.address}`.toLowerCase().includes(query)) ?? centres[0];
  const [selectedCity, setSelectedCity] = useState(initialCentre?.city ?? "");
  const centre = centres.find((item) => item.city === selectedCity) ?? centres[0];
  const queryHasMatch = !query || centres.some((item) => `${item.city} ${item.locality} ${item.address}`.toLowerCase().includes(query));

  if (!centre) {
    const emptyState = <section className="container py-16"><h2 className="text-3xl font-semibold">{query ? `No Pod listed for “${initialQuery}” yet.` : "No Pods are listed yet."}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-copy">Send us the city or pin code and we’ll help find the closest option.</p><a className="btn-dark mt-5 inline-flex rounded-full px-5 py-3 text-sm font-bold" href={`${WHATSAPP_HREF.split("?")[0]}?text=${encodeURIComponent(`Hi TYA Club, I am looking for a Pod near ${initialQuery}.`)}`} target="_blank" rel="noreferrer">Ask about a Pod</a></section>;
    return embedded ? <div className="centre-detail-page centre-detail-embedded" id="centre-results">{emptyState}</div> : <PageShell>{emptyState}</PageShell>;
  }

  const trialHref = centreWhatsappHref(centre);
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.address)}`;
  const trial = centre.nextTrial;
  const centreSummary = [
    centre.detail,
    centre.batchSize === null ? "Batch size to be confirmed" : `Batches of ${centre.batchSize} young adults`,
    centre.mentorCount === null ? "Mentor count to be confirmed" : `${centre.mentorCount} verified mentors`,
    centre.programmesThisTerm === null ? "Term programmes to be confirmed" : `${centre.programmesThisTerm} programmes this term`,
  ].join(" · ");
  const stats = [
    { label: "Batch size", value: centre.batchSize ? `${centre.batchSize} to a batch` : "To be confirmed", Icon: Users },
    { label: "Timings", value: centre.timings ?? "To be confirmed", Icon: Clock3 },
    { label: "Trial days", value: centre.trialDays.length ? centre.trialDays.join(", ") : "To be confirmed", Icon: CalendarDays },
    { label: "Mentors", value: centre.mentorCount === null ? "To be confirmed" : `${centre.mentorCount}, all verified`, Icon: Users },
  ];

  const content = <div className={`centre-detail-page ${embedded ? "centre-detail-embedded scroll-mt-24" : ""}`} id={embedded ? "centre-results" : undefined}>
      <div className="container">
        {embedded && <SectionIntro eyebrow="Find a Pod" title={query && queryHasMatch ? `Pods near ${initialQuery}` : "Explore TYA Pods across India."} description="Choose a location on the India map to see its address and Pod details." action={<a href={`${import.meta.env.BASE_URL}#find-a-pod`}>Change search</a>} className="centre-results-heading" />}
        {query && !queryHasMatch && <p className="pod-search-notice" role="status">No exact Pod match for “{initialQuery}” yet. Choose a location below to see its address and Pod details.</p>}
        <section className="pod-discovery-panel" aria-labelledby="pod-discovery-title">
          {embedded ? <h2 id="pod-discovery-title" className="sr-only">Find a Pod</h2> : <SectionIntro eyebrow="Find your community" title="Find a TYA Pod in Hyderabad or Surat." description="TYA Club offers coached, hands-on life-skills experiences for young adults. Explore the official Pods in Madhapur and Vesu, see each address and ask about an introductory session." id="pod-discovery-title" as="h1" action={<span className="pod-network-count">{centres.length.toString().padStart(2, "0")} <small>Pods</small></span>} className="pod-discovery-heading" />}
          <div className="pod-discovery-grid">
            <IndiaPodsMap locations={centres} selectedCity={selectedCity} onSelect={setSelectedCity} />
            <div className="pod-location-list" aria-label="TYA Pods">
              {centres.map((item, index) => <button type="button" className="pod-location-card" key={item.city} data-selected={selectedCity === item.city} aria-pressed={selectedCity === item.city} aria-label={`Show details for ${item.locality} Pod, ${item.city}`} onClick={() => setSelectedCity(item.city)}>
                <span className="pod-location-card-top"><span className="pod-location-card-number">0{index + 1}</span><span className="pod-location-card-status">Pod</span></span>
                <strong className="pod-location-card-title">{item.locality}<span className="pod-location-card-city">, {item.city}</span></strong>
                <span className="pod-location-card-address">{item.address}</span>
                <span className="pod-location-card-link">View Pod details <ExternalLink size={13} aria-hidden="true" /></span>
              </button>)}
            </div>
          </div>
          {embedded && <div className="mt-5 flex justify-end"><a className="btn-dark inline-flex items-center rounded-full px-5 py-3 text-sm font-bold" href="/pods">View all Pod locations <ExternalLink className="ml-2" size={14} aria-hidden="true" /></a></div>}
        </section>
        <div className="centre-detail-toolbar">
          <nav className="centre-breadcrumb" aria-label="Breadcrumb">
            <a href={`${import.meta.env.BASE_URL}#find-a-pod`}>Pods</a><span aria-hidden="true">/</span><span>{centre.city}</span><span aria-hidden="true">/</span><strong>{centre.locality}</strong>
          </nav>
          <label className="centre-picker">
            <MapPin size={14} aria-hidden="true" />
            <span className="sr-only">Choose locality and city</span>
            <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)} aria-label="Choose a Pod">
              {centres.map((item) => <option value={item.city} key={item.city}>{item.locality}, {item.city}</option>)}
            </select>
            <span className="centre-picker-change">Change</span>
          </label>
        </div>

        <CentreGallery centre={centre} />

        <div className="centre-detail-columns">
          <div className="centre-detail-main">
            <div className="centre-status-row">
              <span className="centre-status-pill">{centre.admissionsStatus}</span>
              <span className="centre-opened">{centre.openedYear === null ? "Opening year to be confirmed" : `Opened ${centre.openedYear}`}</span>
            </div>
            <h2>TYA Pod {centre.locality}</h2>
            <p className="centre-detail-summary">{centreSummary}</p>

            <div className="centre-stat-grid" aria-label="Pod information">
              {stats.map(({ label, value, Icon }) => <div className="centre-stat-card" key={label}>
                <p><Icon size={12} aria-hidden="true" /> {label}</p>
                <strong>{value}</strong>
              </div>)}
            </div>

            <section className="centre-timetable" aria-labelledby="centre-timetable-title">
              <div className="centre-section-heading"><h2 id="centre-timetable-title">This term’s timetable</h2></div>
              {centre.timetable.length ? <div className="centre-table-wrap"><table>
                <thead><tr><th>Day</th><th>Programme</th><th>Time</th><th>Age group</th><th>Places</th></tr></thead>
                <tbody>{centre.timetable.map((entry) => <tr key={`${entry.day}-${entry.programme}`}>
                  <th scope="row">{entry.day}</th><td>{entry.programme}</td><td>{entry.time}</td><td>{entry.ageRange}</td><td>{entry.seatsLeft === null ? "Ask us" : `${entry.seatsLeft} left`}</td>
                </tr>)}</tbody>
              </table></div> : <div className="centre-timetable-empty">Term programmes, session times and age groups will be added here as each centre confirms its schedule.</div>}
            </section>
          </div>

          <aside className="centre-detail-sidebar">
            <section className="centre-trial-card" aria-labelledby="centre-trial-title">
              <p className="centre-trial-kicker">Free trial class</p>
              <p className="centre-trial-location" aria-live="polite">{centre.locality}, {centre.city}</p>
              <h2 id="centre-trial-title">{trial?.date ?? "Find your first session"}</h2>
              <p className="centre-trial-meta">{trial ? `${trial.time} · ages ${trial.ageRange}` : "Ask us for the next available date and age group."}</p>
              <div className="centre-trial-address" aria-live="polite">
                <p><MapPin size={13} aria-hidden="true" /> <span>{centre.address}</span></p>
                <a href={directionsHref} target="_blank" rel="noreferrer">Get directions <ExternalLink size={13} aria-hidden="true" /></a>
              </div>
              {trial?.totalSeats !== null && trial?.totalSeats !== undefined && <div className="centre-seat-meter" aria-label={`${trial.seatsLeft ?? 0} of ${trial.totalSeats} seats left`}>
                {Array.from({ length: trial.totalSeats }, (_, index) => <span key={index} className={index >= (trial.seatsLeft ?? 0) ? "full" : ""} />)}
              </div>}
              {trial?.seatsLeft !== null && trial?.seatsLeft !== undefined && <p className="centre-seats-left">{trial.seatsLeft} of {trial.totalSeats} seats left</p>}
              <a className="centre-trial-primary" href={trialHref} target="_blank" rel="noreferrer">{trial ? "Book this trial" : "Ask about a free trial"}</a>
              <a className="centre-trial-secondary" href={trialHref} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp this Pod</a>
              <p className="centre-trial-note">No card needed. Parents are welcome to sit in.</p>
            </section>

          </aside>
        </div>
      </div>

      <section className="container centre-expansion-note">
        <div className="centre-expansion-layout">
          <div className="centre-expansion-copy">
            <span className="section-kicker centre-expansion-kicker">More locations</span>
            <h2>Not near one yet?</h2>
            <p>Tell us where you are. We are growing thoughtfully.</p>
          </div>
          <div className="centre-expansion-action">
            <a className="btn-dark inline-flex items-center rounded-full px-5 py-3 text-sm font-bold" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Suggest a neighbourhood <MessageCircle className="ml-2" size={15} /></a>
          </div>
        </div>
      </section>
    </div>;

  return embedded ? content : <PageShell>{content}</PageShell>;
}

export default function Centres() {
  return <CentresContent />;
}
