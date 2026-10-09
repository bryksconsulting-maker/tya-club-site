import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./redesign.css";

// GitHub Pages serves the root 404 fallback for nested preview routes. Carry
// the requested path through the preview index, then restore it before routing.
const pagesPreviewPath = new URLSearchParams(window.location.search).get("__pages_preview_path");
if (pagesPreviewPath) {
  const params = new URLSearchParams(window.location.search);
  params.delete("__pages_preview_path");
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const route = pagesPreviewPath.startsWith("/") ? pagesPreviewPath : `/${pagesPreviewPath}`;
  const query = params.toString();
  window.history.replaceState({}, "", `${base}${route}${query ? `?${query}` : ""}${window.location.hash}`);
}

// Local previews use the site root; accept an old GitHub Pages-style URL and
// preserve its route, query and anchor while removing the deployment prefix.
if (import.meta.env.BASE_URL === "/" && /^\/tya-club-site(?=\/|$)/.test(window.location.pathname)) {
  const path = window.location.pathname.replace(/^\/tya-club-site(?=\/|$)/, "") || "/";
  window.history.replaceState({}, "", `${path}${window.location.search}${window.location.hash}`);
}

createRoot(document.getElementById("root")!).render(<App />);
