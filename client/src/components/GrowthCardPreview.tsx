import { Sparkles } from "lucide-react";

const observations = [
  ["Confidence", 82],
  ["Communication", 76],
  ["Collaboration", 92],
  ["Decision making", 72],
  ["Adaptability", 81],
  ["Ownership", 62],
] as const;

export function GrowthCardPreview() {
  return (
    <div className="growth-card-stage relative mx-auto w-full max-w-[520px] px-3 py-4">
      <span aria-hidden="true" className="absolute -left-1 top-1 h-16 w-16 rounded-full bg-[#F28D63] sm:h-20 sm:w-20" />
      <span aria-hidden="true" className="absolute -bottom-1 right-0 h-16 w-16 rounded-full bg-[#E4B42A] sm:h-20 sm:w-20" />
      <article aria-label="Sample monthly TYA Growth Card for Aarav" className="growth-card-paper relative rotate-[2deg] rounded-[.9rem] border p-5 shadow-[0_22px_55px_rgba(0,0,0,.22)] sm:p-7">
        <div aria-hidden="true" className="growth-card-frame pointer-events-none absolute inset-[7px] rounded-[.62rem] border" />

        <header className="growth-card-header relative flex items-start justify-between gap-4 border-b pb-4 sm:pb-5">
          <div>
            <p className="growth-card-eyebrow text-[9px] font-bold uppercase tracking-[.19em]">TYA Growth Card</p>
            <h3 className="growth-card-name mt-2 text-xl font-bold leading-none sm:text-2xl">Aarav</h3>
            <p className="growth-card-meta mt-1 text-xs">TYA Pod · Monthly snapshot</p>
          </div>
          <span className="growth-card-icon grid h-10 w-10 shrink-0 place-items-center rounded-full sm:h-11 sm:w-11">
            <Sparkles size={18} aria-hidden="true" />
          </span>
        </header>

        <div className="relative space-y-3.5 py-5 sm:space-y-4 sm:py-6">
          {observations.map(([label, value]) => (
            <div key={label}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[.13em] sm:text-[10px]">
                <span className="growth-card-metric-label">{label}</span>
                <span className="growth-card-metric-value">{value}%</span>
              </div>
              <div className="growth-card-track h-[5px] overflow-hidden rounded-full">
                <div className="growth-card-fill h-full rounded-full" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="growth-card-moment relative border-l-[3px] px-3.5 py-3 sm:px-4">
          <p className="growth-card-moment-label text-[9px] font-bold uppercase tracking-[.17em]">A TYA moment</p>
          <p className="growth-card-quote mt-1.5 text-xs leading-[1.55] sm:text-[13px]">“In the Water Crisis Mission, Aarav proposed a compromise both Pods accepted — and volunteered to present it.”</p>
        </div>

        <footer className="growth-card-footer relative mt-4 border-t pt-3 text-center text-[8px] font-bold uppercase tracking-[.16em] sm:mt-5">
          Written by the coach who was in the room
        </footer>
      </article>
    </div>
  );
}
