import { build } from "esbuild";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(projectRoot, "dist", "public");
const bundlePath = path.join(projectRoot, "dist", "prerender-entry.mjs");
const base = process.env.GITHUB_ACTIONS ? "/tya-club-site/" : "/";
const basePath = base.replace(/\/$/, "");

await build({
  absWorkingDir: projectRoot,
  entryPoints: ["client/src/App.tsx"],
  outfile: bundlePath,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  alias: {
    "@": path.join(projectRoot, "client/src"),
    "@shared": path.join(projectRoot, "shared"),
    "@assets": path.join(projectRoot, "attached_assets"),
  },
  define: {
    "import.meta.env": JSON.stringify({
      BASE_URL: base,
      DEV: false,
      PROD: true,
      MODE: "production",
      VITE_FRONTEND_FORGE_API_KEY: process.env.VITE_FRONTEND_FORGE_API_KEY ?? "",
      VITE_FRONTEND_FORGE_API_URL: process.env.VITE_FRONTEND_FORGE_API_URL ?? "",
      VITE_OAUTH_PORTAL_URL: process.env.VITE_OAUTH_PORTAL_URL ?? "",
      VITE_APP_ID: process.env.VITE_APP_ID ?? "",
    }),
  },
  logLevel: "warning",
});

const { default: App, SITE_URL, routeMetadata, notFoundMetadata } = await import(pathToFileURL(bundlePath).href);
const socialImageUrl = `${SITE_URL}/og-image.png`;
const socialImageAlt = "TYA Club: real-world skills for young adults, styled in the Club’s charcoal, ivory, mustard and peach colours.";

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function upsertTag(html, pattern, tag) {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function setMeta(html, attribute, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${escapedKey}["'][^>]*\\/?\\s*>`, "i");
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(value)}" />`;
  return upsertTag(html, pattern, tag);
}

function setCanonical(html, url) {
  const pattern = /<link\s+rel=["']canonical["'][^>]*\/?\s*>/i;
  if (!url) return html.replace(pattern, "");
  return upsertTag(html, pattern, `<link rel="canonical" href="${escapeAttribute(url)}" />`);
}

function setStructuredData(html, data) {
  const pattern = /<script\s+id=["']seo-structured-data["'][^>]*>[\s\S]*?<\/script>/i;
  if (!data) return html.replace(pattern, "");
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  const tag = `<script id="seo-structured-data" type="application/ld+json">${json}</script>`;
  return upsertTag(html, pattern, tag);
}

function buildDocument(template, markup, metadata) {
  const title = metadata.title;
  const description = metadata.description;
  const canonicalUrl = metadata.path
    ? `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`
    : undefined;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(title)}</title>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "name", "robots", metadata.robots ?? "index,follow");
  html = setMeta(html, "property", "og:type", "website");
  html = setMeta(html, "property", "og:site_name", "TYA Club");
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:image", socialImageUrl);
  html = setMeta(html, "property", "og:image:secure_url", socialImageUrl);
  html = setMeta(html, "property", "og:image:type", "image/png");
  html = setMeta(html, "property", "og:image:width", "1200");
  html = setMeta(html, "property", "og:image:height", "630");
  html = setMeta(html, "property", "og:image:alt", socialImageAlt);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", socialImageUrl);
  html = setMeta(html, "name", "twitter:image:alt", socialImageAlt);
  html = setStructuredData(html, metadata.structuredData);
  html = setCanonical(html, canonicalUrl);
  if (canonicalUrl) {
    html = setMeta(html, "property", "og:url", canonicalUrl);
  } else {
    html = html.replace(/<meta\s+property=["']og:url["'][^>]*\/?\s*>/i, "");
  }
  return html;
}

const template = await fs.readFile(path.join(outputRoot, "index.html"), "utf8");
const routes = [
  { urlPath: "/", metadata: routeMetadata["/"] },
  { urlPath: "/pods/", metadata: routeMetadata["/pods"] },
  { urlPath: "/our-story/", metadata: routeMetadata["/our-story"] },
  { urlPath: "/contact/", metadata: routeMetadata["/contact"] },
  { urlPath: "/franchise/", metadata: routeMetadata["/franchise"] },
];

for (const route of routes) {
  const ssrPath = route.urlPath === "/" ? `${basePath}/` : `${basePath}${route.urlPath}`;
  const markup = renderToString(createElement(App, { ssrPath }));
  const html = buildDocument(template, markup, route.metadata);
  const relativePath = route.urlPath === "/" ? "index.html" : path.join(route.urlPath.slice(1, -1), "index.html");
  const destination = path.join(outputRoot, relativePath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, html, "utf8");
}

const notFoundPath = `${basePath}/404`;
const notFoundMarkup = renderToString(createElement(App, { ssrPath: notFoundPath }));
const notFoundHtml = buildDocument(template, notFoundMarkup, notFoundMetadata);
await fs.writeFile(path.join(outputRoot, "404.html"), notFoundHtml, "utf8");

await fs.rm(bundlePath, { force: true });
console.log("Pre-rendered home, Pod locations, story, contact, franchise and 404 pages.");
