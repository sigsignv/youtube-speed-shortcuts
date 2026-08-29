import { defineConfig, type UserManifest } from "wxt";

export default defineConfig({
  manifest: ({ browser }) => {
    const baseManifest: UserManifest = {
      name: "YouTube Speed Shortcuts",
      web_accessible_resources: [
        {
          resources: ["injected.js"],
          matches: ["https://www.youtube.com/*"],
        },
      ],
    };
    const firefoxManifest: UserManifest = {
      browser_specific_settings: {
        gecko: {
          id: "youtube-speed-shortcuts@signote.cc",
          data_collection_permissions: {
            required: ["none"],
          },
        },
      },
    };
    return browser === "firefox"
      ? { ...baseManifest, ...firefoxManifest }
      : { ...baseManifest };
  },
  modules: ["@wxt-dev/auto-icons"],
  imports: false,
  srcDir: "src",
});
