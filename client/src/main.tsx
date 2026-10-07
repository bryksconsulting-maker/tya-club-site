import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Local previews use the site root; accept an old GitHub Pages-style URL and
// preserve its route, query and anchor while removing the deployment prefix.
if (import.meta.env.BASE_URL === "/" && /^\/tya-club-site(?=\/|$)/.test(window.location.pathname)) {
  const path = window.location.pathname.replace(/^\/tya-club-site(?=\/|$)/, "") || "/";
  window.history.replaceState({}, "", `${path}${window.location.search}${window.location.hash}`);
}

createRoot(document.getElementById("root")!).render(<App />);
