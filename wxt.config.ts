import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "YouTube Speed Shortcuts",
    web_accessible_resources: [
      {
        resources: ["injected.js"],
        matches: ["https://www.youtube.com/*"],
      },
    ],
  },
  imports: false,
  srcDir: "src",
});
