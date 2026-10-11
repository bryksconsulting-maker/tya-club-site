# TYA Club production deployment

## Release model

- `main` is the production source of truth.
- Changes should enter `main` through a pull request after the **Production readiness** workflow passes.
- GitHub Pages remains a preview at the repository subpath.
- Hostinger connects to `main`, builds the site, and serves the root-domain build at `https://thetyaclub.com`.

## Hostinger build settings

Use the **Node.js Web App / GitHub integration** flow for this repository. The project is a static React site, but its source must be built before it can be served.

| Setting | Value |
| --- | --- |
| Repository | `bryksconsulting-maker/tya-club-site` |
| Branch | `main` |
| Node version | `22` |
| Package manager | `pnpm` |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output directory | `dist/public` |
| Base path | `/` (the default; do not set `VITE_BASE_PATH`) |
| Production domain | `thetyaclub.com` |

The build output includes prerendered pages, `.htaccess`, `robots.txt`, `sitemap.xml`, social images, and hashed JavaScript/CSS assets.

## First launch

1. Create or select the Hostinger website for `thetyaclub.com`.
2. Choose **Deploy Web App** / **Import Git Repository** and connect GitHub.
3. Grant Hostinger access only to the TYA Club repository when GitHub offers repository-level access.
4. Apply the build settings above and complete the first deployment.
5. Enable automatic deployment from `main` after the first deployment is verified.
6. Attach `thetyaclub.com`, enable SSL, and redirect `www.thetyaclub.com` to the canonical non-`www` domain in hPanel.

## Release checklist

Before merging a release:

1. Confirm the Production readiness workflow passes.
2. Review the GitHub Pages preview.
3. Merge into `main`.
4. Confirm the Hostinger deployment shows the expected commit SHA.
5. Verify these production URLs return the TYA Club content:
   - `/`
   - `/pods/`
   - `/our-story/`
   - `/contact/`
   - `/franchise/`
   - `/robots.txt`
   - `/sitemap.xml`
6. Check HTTPS, desktop/mobile navigation, forms, WhatsApp links, and the custom 404 page.

## Rollback

Revert the faulty commit in GitHub and merge the revert into `main`. Hostinger will redeploy the restored source automatically. Keep the previous successful deployment in Hostinger available until the new deployment has been verified.

## Plan fallback

If the Hostinger plan cannot build a Node.js/React repository, use static hosting and deploy the contents of `dist/public` with Hostinger Connector. Do not connect the source tree directly to an HTML-only Git deployment because browsers cannot serve the unbuilt TypeScript/React source.
