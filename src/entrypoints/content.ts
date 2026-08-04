import { defineContentScript } from "#imports";

export default defineContentScript({
  matches: ["https://www.youtube.com/*"],
  runAt: "document_start",
  allFrames: false,

  main() {
    console.log("Hello content.");
  },
});
