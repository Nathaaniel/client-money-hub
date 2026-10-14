import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// viteSingleFile inlines all JavaScript, CSS and images into one HTML file,
// so the output works offline, by email and from OneDrive/SharePoint.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "dist", emptyOutDir: true }
});
