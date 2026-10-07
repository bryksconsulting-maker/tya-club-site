import type { CentreProfile } from "../data/centreProfiles";

interface IndiaPodsMapProps {
  locations: readonly CentreProfile[];
  selectedCity: string;
  onSelect: (city: string) => void;
}

function mapPosition({ lat, lng }: CentreProfile) {
  return {
    left: `${((lng - 68) / 30) * 100}%`,
    top: `${((37 - lat) / 29) * 100}%`,
  };
}

export function IndiaPodsMap({ locations, selectedCity, onSelect }: IndiaPodsMapProps) {
  return <div className="india-pod-map" role="group" aria-label="Sample TYA Pod locations in India">
    <svg className="india-pod-map-art" viewBox="0 0 320 310" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="india-map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" className="india-pod-map-gridline" fill="none" />
        </pattern>
        <linearGradient id="india-map-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" className="india-pod-map-fill-start" />
          <stop offset="100%" className="india-pod-map-fill-end" />
        </linearGradient>
      </defs>
      <rect width="320" height="310" fill="url(#india-map-grid)" />
      <path className="india-pod-map-outline" d="M73 39 82 27 96 22 108 13 122 18 135 14 149 22 162 25 174 32 187 35 201 43 213 47 225 53 236 62 250 59 267 63 282 69 300 70 310 81 301 92 287 95 274 101 265 108 253 107 245 116 238 129 233 143 226 155 220 169 211 179 205 193 197 204 189 219 179 234 171 250 161 267 151 284 140 302 132 285 126 268 121 249 114 233 106 220 97 207 91 193 82 181 75 166 69 153 62 140 57 127 49 116 46 104 41 93 47 82 45 71 53 61 57 51 66 47Z" />
      <path className="india-pod-map-route" d="M52 169 C75 174 97 190 111 209" />
    </svg>
    {locations.map((location) => <button
      className="india-pod-map-marker"
      key={location.city}
      type="button"
      style={mapPosition(location)}
      data-selected={selectedCity === location.city}
      aria-pressed={selectedCity === location.city}
      aria-label={`Show ${location.locality} Pod, ${location.city}`}
      onClick={() => onSelect(location.city)}
    >
      <span className="india-pod-map-marker-dot" aria-hidden="true" />
      <span className="india-pod-map-marker-label">{location.locality}<small>{location.city}</small></span>
    </button>)}
    <span className="india-pod-map-caption">TYA POD NETWORK · SAMPLE LOCATIONS</span>
  </div>;
}
