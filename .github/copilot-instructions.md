# Instructions for GitHub Copilot

This repo is a React + Vite prototype of a bank's client money account selector, in three versions (public website, online banking, relationship manager), plus a Journeys view. It builds to one self-contained HTML file (`dist/account-selector.html`). People open that file offline or from SharePoint, so it must not depend on anything external.

## Where to make changes
- Questions, sentence wording, example answers and existing-customer data: `src/data/selector.js`. Journey stages and the comparison table: `src/data/journeys.js`. Prefer editing data over components.
- Settings (bank name, starting example firm, classification label): `CONFIG` in `src/config.js`.
- Recommendation rules: `src/logic/selector.js`. The three versions: `src/pages/selector/`, with shared parts in `src/components/selector.jsx`.
- Branding: the BRANDING block at the top of `src/styles.css`; logo in `src/brand.js`.
- Example-firm data is keyed by the sector keys in `SECTORS` (`lettings`, `conveyancing`, `payments`, `wealth`, `insurance`, `other`). Adding one means adding a preset and known-customer entry in `src/data/selector.js`.
- Customer versions show `customer` wording and plain names; only the relationship manager version shows `staff` wording and internal data.

## Rules
- Don't add CDN links, external fonts, analytics or network calls; the output must work offline.
- Don't add dependencies unless asked.
- Keep the pure logic in `src/logic/` free of React so `npm test` can run it.
- Write in British English, plain language, short sentences. Placeholders go in [square brackets].
- Keep the colour tokens in `src/styles.css`; don't hard-code colours in components.
- After changes, run `npm test` and `npm run build`. Run `npm run export` to refresh the Markdown document for Copilot 365.
- `scripts/content.js` builds that document from the data and logic; when you add a field to the data, add it to the document too.
