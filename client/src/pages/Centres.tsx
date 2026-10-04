import { useState } from "react";
import { CalendarDays, Clock3, ExternalLink, MapPin, MessageCircle, Users } from "lucide-react";
import { MapView } from "../components/Map";
import { PageShell, SectionLabel, WHATSAPP_HREF } from "../components/SiteChrome";
import { centreProfiles as centres, type CentreProfile } from "../data/centreProfiles";

function centreWhatsappHref(centre: CentreProfile) {
  const text = encodeURIComponent(`Hi TYA Club, I'd like to ask about a free trial at the ${centre.locality}, ${centre.city} centre.`);
  return `${WHATSAPP_HREF.split("?")[0]}?text=${text}`;
}

function CentreGallery({ centre }: { centre: CentreProfile }) {
  return <div className="centre-detail-gallery" aria-label={`${centre.locality} centre photos`}>
    {centre.gallery.slice(0, 3).map((photo, index) => <div className={`centre-gallery-frame ${index === 0 ? "centre-gallery-main" : ""}`} key={photo.label}>
      {photo.image ? <img className="centre-gallery-image" src={photo.image} alt={photo.alt} /> : <div className="centre-gallery-placeholder" role="img" aria-label={photo.alt}>
        <span className="centre-gallery-caption">{photo.label}</span>
      </div>}
    </div>)}
  </div>;
}

function CentreMap({ centre }: { centre: CentreProfile }) {
  return <section className="centre-map-card" aria-label={`Map and directions for ${centre.locality}`}>
    <div className="centre-map-view">
      <MapView key={centre.city} className="h-full min-h-[150px] w-full" initialCenter={{ lat: centre.lat, lng: centre.lng }} initialZoom={15} onMapReady={(map) => {
        new google.maps.Marker({ position: { lat: centre.lat, lng: centre.lng }, map, title: `${centre.locality}, ${centre.city}` });
      }} />
    </div>
    <div className="centre-map-caption">
      <p>{centre.address}</p>
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.address)}`} target="_blank" rel="noreferrer">Get directions <ExternalLink size={13} /></a>
    </div>
  </section>;
}

export default function Centres() {
  const [selectedCity, setSelectedCity] = useState(centres[0]?.city ?? "");
  const centre = centres.find((item) => item.city === selectedCity) ?? centres[0];

  if (!centre) return <PageShell><section className="container py-16"><h1>No centres are listed yet.</h1></section></PageShell>;

  const trialHref = centreWhatsappHref(centre);
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

  return <PageShell>
    <div className="centre-detail-page">
      <div className="container">
        <div className="centre-detail-toolbar">
          <nav className="centre-breadcrumb" aria-label="Breadcrumb">
            <a href="/centres">Centres</a><span aria-hidden="true">/</span><span>{centre.city}</span><span aria-hidden="true">/</span><strong>{centre.locality}</strong>
          </nav>
          <label className="centre-picker">
            <MapPin size={14} aria-hidden="true" />
            <span className="sr-only">Choose locality and city</span>
            <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)} aria-label="Choose a centre">
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
            <h1>TYA Club {centre.locality}</h1>
            <p className="centre-address">{centre.address}</p>
            <p className="centre-detail-summary">{centreSummary}</p>

            <div className="centre-stat-grid" aria-label="Centre information">
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
              <h2 id="centre-trial-title">{trial?.date ?? "Find your first session"}</h2>
              <p className="centre-trial-meta">{trial ? `${trial.time} · ages ${trial.ageRange}` : "Ask us for the next available date and age group."}</p>
              {trial?.totalSeats !== null && trial?.totalSeats !== undefined && <div className="centre-seat-meter" aria-label={`${trial.seatsLeft ?? 0} of ${trial.totalSeats} seats left`}>
                {Array.from({ length: trial.totalSeats }, (_, index) => <span key={index} className={index >= (trial.seatsLeft ?? 0) ? "full" : ""} />)}
              </div>}
              {trial?.seatsLeft !== null && trial?.seatsLeft !== undefined && <p className="centre-seats-left">{trial.seatsLeft} of {trial.totalSeats} seats left</p>}
              <a className="centre-trial-primary" href={trialHref} target="_blank" rel="noreferrer">{trial ? "Book this trial" : "Ask about a free trial"}</a>
              <a className="centre-trial-secondary" href={trialHref} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp this centre</a>
              <p className="centre-trial-note">No card needed. Parents are welcome to sit in.</p>
            </section>

            <CentreMap centre={centre} />
          </aside>
        </div>
      </div>

      <section className="container centre-expansion-note">
        <div><SectionLabel>More locations</SectionLabel><h2>Not near one yet?</h2><p>Tell us where you are. We are growing thoughtfully.</p></div>
        <a className="btn-dark rounded-full px-5 py-3 text-sm font-bold" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">Suggest a neighbourhood <MessageCircle size={15} /></a>
      </section>
    </div>
  </PageShell>;
}
