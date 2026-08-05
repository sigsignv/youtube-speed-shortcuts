export type YouTubePlayerElement = Element & {
  handleGlobalKeyDown(keyCode: number, shiftKey?: boolean): void;
  getAvailablePlaybackRates(): number[];
  getPlaybackRate(): number;
  setPlaybackRate(rate: number): void;
};

const requiredMethods = [
  "handleGlobalKeyDown",
  "getAvailablePlaybackRates",
  "getPlaybackRate",
  "setPlaybackRate",
] as const;

export function findYouTubePlayer(): YouTubePlayerElement | null {
  const element = document.querySelector("#movie_player");
  if (!element || !isYouTubePlayerElement(element)) {
    return null;
  }

  return element;
}

function isYouTubePlayerElement(
  element: Element,
): element is YouTubePlayerElement {
  for (const methodName of requiredMethods) {
    const method: unknown = Reflect.get(element, methodName);
    if (typeof method !== "function") {
      return false;
    }
  }

  return true;
}
