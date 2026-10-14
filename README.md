# Client Money Hub

A prototype of a bank's UK client money proposition: market evidence, segments, regulation, the customer journey, an account selector, a client money console, vendor integrations, compliance assurance and a competitor scorecard.

It's a React app that builds to **one self-contained HTML file**. The file works offline, by email and from OneDrive or SharePoint, with no server.

## Quick start

You need Node.js 20.19+ or 22.12+.

```bash
npm install        # once
npm run dev        # live preview at http://localhost:5173 that updates as you edit
npm test           # checks the data and logic after edits
npm run build      # writes dist/client-money-hub.html, the file to share
```

## Where things are

| To change | Edit |
|---|---|
| Bank name, decision sought, owner, date, starting sector, classification label, change history on or off | `src/config.js` (`CONFIG`) |
| Colours and fonts | The BRANDING block at the top of `src/styles.css` |
| Logo | `src/brand.js` (instructions inside) |
| Internal details ("Our position today" on the Sources page) | `src/data/internal.js` |
| Our own scores (the "[Bank] today" row on Home) | `ourScores` in `src/data/scorecard.js` |
| Page text and content | `src/data/` — one file per page |
| Sections and pages | `STRUCTURE` in `src/config.js`, with components in `src/pages/` |
| The six sectors | `SECTORS` in `src/config.js`. Sector data elsewhere uses the same keys. |
| Selector recommendation rules | `src/logic/selector.js` |

Placeholders still to fill are written in `[square brackets]`.

## Filling in internal details with Copilot 365

1. Ask Copilot 365: *"For our bank's client money accounts, give a one-line position and a source for each of these topics:"* and paste the topics from `src/data/internal.js`.
2. In VS Code, ask GitHub Copilot: *"Update INTERNAL in src/data/internal.js with these answers"* and paste the reply.
3. Run `npm test`, then `npm run build`.

Do the same for `ourScores` in `src/data/scorecard.js` if you want the bank scored against competitors.

## Before sharing

- Set `showChangeHistory: false` in `src/config.js` for people who didn't see earlier versions.
- Set `classification` to your company's data classification label.
- Rates, scores and vendor roles are illustrative. See the caveats on the Sources page.

`legacy/client-money-hub-v3.html` is the previous hand-written single-file version, kept for reference.
