# Instructions for GitHub Copilot

This repo is a React + Vite prototype that builds to one self-contained HTML file (`dist/client-money-hub.html`). People open that file offline or from SharePoint, so it must not depend on anything external.

## Where to make changes
- Content and text: `src/data/*.js`, one file per page. Prefer editing data over page components.
- Settings (bank name, decision sought, default sector, classification label): `CONFIG` in `src/config.js`.
- Internal details gathered from Copilot 365: `INTERNAL` in `src/data/internal.js`, as `[topic, position, source]` rows.
- Branding: the BRANDING block at the top of `src/styles.css`; logo in `src/brand.js`.
- Sector-specific data is keyed by the sector keys in `SECTORS` (`lettings`, `conveyancing`, `payments`, `wealth`, `insurance`, `other`). Adding a sector means adding data for it in every file that `test/logic.test.js` checks.

## Rules
- Don't add CDN links, external fonts, analytics or network calls; the output must work offline.
- Don't add dependencies unless asked.
- Keep the pure logic in `src/logic/` free of React so `npm test` can run it.
- Write in British English, plain language, short sentences. Placeholders go in [square brackets].
- Keep the colour tokens in `src/styles.css`; don't hard-code colours in components.
- After changes, run `npm test` and `npm run build`.
