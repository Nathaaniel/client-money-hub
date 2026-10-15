// `npm run export`: writes the selector's content as one Markdown document,
// ready to upload to or paste into Microsoft Copilot 365.
import { mkdirSync, writeFileSync } from "node:fs";
import { buildContent } from "./content.js";

const to = "dist/account-selector-content.md";
mkdirSync("dist", { recursive: true });
const text = buildContent();
writeFileSync(to, text);
console.log(`Wrote ${to} (${Math.round(text.length / 1024)} KB). Upload it to Copilot, or open it and paste the text.`);
