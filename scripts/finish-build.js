// Runs after `vite build`: names the output file and checks it is self-contained.
import { existsSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";

const from = "dist/index.html";
const to = "dist/client-money-hub.html";

if (existsSync(to)) rmSync(to);
renameSync(from, to);

// Move the inlined app script from <head> to the end of <body> as a plain script,
// so it runs after the page loads in any browser, including from a local file.
let html = readFileSync(to, "utf8");
const moduleScript = /<script type="module"[^>]*>([\s\S]*?)<\/script>/;
const match = html.match(moduleScript);
if (match) {
  html = html.replace(moduleScript, "").replace("</body>", () => `<script>${match[1]}</script>\n</body>`);
  writeFileSync(to, html);
}

const external = html.match(/<(script|link|img)\b[^>]*\b(src|href)="(?!data:)[^"]+"/g) || [];
if (external.length) {
  console.warn("\nWarning: the file loads external resources, so it may not work offline:");
  external.forEach(tag => console.warn("  " + tag));
}

console.log(`\nBuilt ${to} (${Math.round(statSync(to).size / 1024)} KB). Open it in a browser or share the file.`);
