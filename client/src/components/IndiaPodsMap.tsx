import type { CSSProperties } from "react";
import type { CentreProfile } from "../data/centreProfiles";
import { indiaStateShapes } from "../data/indiaStateShapes";

interface IndiaPodsMapProps {
  locations: readonly CentreProfile[];
  selectedCity: string;
  onSelect: (city: string) => void;
}

const MAP = { width: 700, height: 760, minLng: 67.5, maxLng: 98.5, minLat: 5.7, maxLat: 37.7, padX: 25, padY: 16 };
const scaleX = (MAP.width - MAP.padX * 2) / (MAP.maxLng - MAP.minLng);
const scaleY = (MAP.height - MAP.padY * 2) / (MAP.maxLat - MAP.minLat);
const project = (lat: number, lng: number) => ({
  x: MAP.padX + (lng - MAP.minLng) * scaleX,
  y: MAP.padY + (MAP.maxLat - lat) * scaleY,
});

const majorCities = [
  { name: "Srinagar", lat: 34.0837, lng: 74.7973, dx: -7, dy: -5 },
  { name: "Leh", lat: 34.1526, lng: 77.5771, dx: 5, dy: -5 },
  { name: "New Delhi", lat: 28.6139, lng: 77.209, dx: 13, dy: -3 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, dx: -6, dy: -6 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, dx: 13, dy: -4 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, dx: -6, dy: 11 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126, dx: 9, dy: 13 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462, dx: 16, dy: -9 },
  { name: "Patna", lat: 25.5941, lng: 85.1376, dx: 12, dy: 12 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, dx: 6, dy: 7 },
  { name: "Guwahati", lat: 26.1445, lng: 91.7362, dx: 15, dy: -8 },
  { name: "Bhubaneswar", lat: 20.2961, lng: 85.8245, dx: 5, dy: 8 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867, dx: -8, dy: 15 },
  { name: "Surat", lat: 21.1702, lng: 72.8311, dx: -8, dy: -7 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946, dx: -7, dy: 7 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, dx: 5, dy: 8 },
  { name: "Kochi", lat: 9.9312, lng: 76.2673, dx: -6, dy: -5 },
  { name: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366, dx: 5, dy: 5 },
] as const;

function mapPosition({ lat, lng }: CentreProfile): CSSProperties {
  const point = project(lat, lng);
  return { left: `${(point.x / MAP.width) * 100}%`, top: `${(point.y / MAP.height) * 100}%` };
}

export function IndiaPodsMap({ locations, selectedCity, onSelect }: IndiaPodsMapProps) {
  const assetBase = import.meta.env.BASE_URL;

  return <div className="india-pod-map" role="group" aria-label="Map of India with state boundaries, major cities and selectable TYA Pod locations">
    <div className="india-pod-map-canvas">
      <svg className="india-pod-map-art" viewBox={`0 0 ${MAP.width} ${MAP.height}`} role="img" aria-labelledby="india-map-title india-map-description">
        <title id="india-map-title">India: states, union territories and major cities</title>
        <desc id="india-map-description">A full map of India with boundaries and names for all states and union territories, major cities, and TYA sample Pods in Madhapur, Hyderabad and Vesu, Surat.</desc>
        <g className="india-pod-map-regions">
          {indiaStateShapes.map((state) => <path key={state.name} d={state.d} data-tone={state.tone}>
            <title>{state.name}</title>
          </path>)}
        </g>
        <g className="india-pod-map-state-labels" aria-hidden="true">
          {indiaStateShapes.map((state) => <text key={state.name} x={state.x} y={state.y} textAnchor="middle">{state.label}</text>)}
        </g>
        <g className="india-pod-map-cities" aria-hidden="true">
          {majorCities.map((city) => {
            const point = project(city.lat, city.lng);
            return <g key={city.name} transform={`translate(${point.x} ${point.y})`}>
              <circle r="2.2" />
              <text x={city.dx} y={city.dy} textAnchor={city.dx < 0 ? "end" : "start"}>{city.name}</text>
            </g>;
          })}
        </g>
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
        <span className="india-pod-map-pin" aria-hidden="true">
          <svg viewBox="0 0 36 46" focusable="false">
            <path d="M18 1.5C8.9 1.5 1.5 8.9 1.5 18c0 11.5 16.5 26.4 16.5 26.4S34.5 29.5 34.5 18C34.5 8.9 27.1 1.5 18 1.5Z" />
            <circle cx="18" cy="17.5" r="11.7" />
          </svg>
          <img src={`${assetBase}tya-logo-coral-icon.svg`} alt="" />
        </span>
        <span className="india-pod-map-marker-label">{location.locality}<small>{location.city}</small></span>
      </button>)}
    </div>
    <div className="india-pod-map-footer">
      <span className="india-pod-map-pan-hint">Swipe sideways to explore</span>
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
    </div>
  </div>;
}
