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
      <article aria-label="Sample monthly TYA Growth Card for Aarav" className="growth-card-paper relative rotate-[2deg] rounded-[.9rem] border border-[#2B2F32]/15 bg-[#FFFDF9] p-5 text-[#2B2F32] shadow-[0_22px_55px_rgba(0,0,0,.22)] sm:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-[7px] rounded-[.62rem] border border-[#2B2F32]/[.06]" />

        <header className="relative flex items-start justify-between gap-4 border-b border-[#2B2F32]/15 pb-4 sm:pb-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.19em] text-[#7A6316]">TYA Growth Card</p>
            <h3 className="mt-2 text-xl font-bold leading-none sm:text-2xl">Aarav</h3>
            <p className="mt-1 text-xs text-[#656A6D]">TYA Pod · Monthly snapshot</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E4B42A] sm:h-11 sm:w-11">
            <Sparkles size={18} aria-hidden="true" />
          </span>
        </header>

        <div className="relative space-y-3.5 py-5 sm:space-y-4 sm:py-6">
          {observations.map(([label, value]) => (
            <div key={label}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[.13em] sm:text-[10px]">
                <span>{label}</span>
                <span className="text-[#656A6D]">{value}%</span>
              </div>
              <div className="h-[5px] overflow-hidden rounded-full bg-[#E9E6E1]">
                <div className="h-full rounded-full bg-[#0E9C8C]" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="relative border-l-[3px] border-[#F28D63] bg-[#F3F0EA] px-3.5 py-3 sm:px-4">
          <p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#A8451C]">A TYA moment</p>
          <p className="mt-1.5 text-xs leading-[1.55] text-[#2B2F32] sm:text-[13px]">“In the Water Crisis Mission, Aarav proposed a compromise both Pods accepted — and volunteered to present it.”</p>
        </div>

        <footer className="relative mt-4 border-t border-[#2B2F32]/10 pt-3 text-center text-[8px] font-bold uppercase tracking-[.16em] text-[#656A6D] sm:mt-5">
          Written by the coach who was in the room
        </footer>
      </article>
    </div>
  );
}
