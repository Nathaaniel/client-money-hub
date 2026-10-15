# Account selector

A prototype of a bank's client money account selector, in three versions:

- **Public website**: a firm new to the bank answers eight questions and gets a suggested account in plain English.
- **Online banking**: an existing customer only answers what the bank doesn't already know.
- **Relationship manager**: staff see every question at once, the bank's own data and a rationale for the file.

A **Journeys** view maps how each version fits into opening an account, and compares the three.

It's a React app that builds to **one self-contained HTML file**. The file works offline, by email and from OneDrive or SharePoint, with no server.

## Quick start

You need Node.js 20.19+ or 22.12+.

```bash
npm install        # once
npm run dev        # live preview at http://localhost:5173 that updates as you edit
npm test           # checks the data and logic after edits
npm run build      # writes dist/account-selector.html, the file to share
npm run export     # writes dist/account-selector-content.md, the content as one document
```

## Where things are

| To change | Edit |
|---|---|
| Bank name, starting example firm, classification label | `src/config.js` (`CONFIG`) |
| Colours and fonts | The BRANDING block at the top of `src/styles.css` |
| Logo | `src/brand.js` (instructions inside) |
| Questions, sentence wording, example answers, what the bank knows about existing customers | `src/data/selector.js` |
| Journey stages and the comparison table | `src/data/journeys.js` |
| Recommendation rules | `src/logic/selector.js` |
| The three versions | `src/pages/selector/` (shared parts in `src/components/selector.jsx`) |
| The example firms | `SECTORS` in `src/config.js`. Data in `src/data/selector.js` uses the same keys. |

Placeholders still to fill are written in `[square brackets]`.

## Using the content in Microsoft Copilot 365

Run `npm run export`. It writes `dist/account-selector-content.md`: every question and answer, how the recommendation is decided, the wording customers and staff see, what each regime needs, the example firms and the three journeys. It's built from the same data and rules as the app, so run it again after any edit.

Upload the file to Copilot 365, or open it in any text editor and paste the text into the chat. Then ask things like *"Rewrite the customer wording for a reading age of 9"* or *"Which answers lead to one account per client?"*.

To bring Copilot's suggestions back, paste them into GitHub Copilot in VS Code with *"Update src/data/selector.js with these changes"*, then run `npm test`.

## Presenting it

The dashed **Prototype controls** box isn't part of the design. Use it to pick an example firm, fill in its answers, and (on online banking and relationship manager) change the register check result to show what happens when the bank can't offer an account.

## Before sharing

- Set `classification` in `src/config.js` to your company's data classification label.
- The recommendation logic is illustrative, not legal advice.
