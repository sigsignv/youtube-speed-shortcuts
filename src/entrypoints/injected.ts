import { defineUnlistedScript } from "#imports";
import { onNavigateToWatchPage } from "~/utils/event";
import { findYouTubePlayer, type YouTubePlayerElement } from "~/utils/player";

export default defineUnlistedScript(() => {
  onNavigateToWatchPage(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat || isEditableTarget(event.target)) {
        return;
      }

      if (
        !event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        !/^\d$/.test(event.key)
      ) {
        return;
      }

      const shortcutNumber = Number(event.key);
      const player = findYouTubePlayer();
      if (!player) {
        console.debug("Could not find YouTube player on watch page");
        return;
      }

      if (shortcutNumber === 0) {
        applyPlaybackRate(player, 1.0);
        event.preventDefault();
      } else {
        const availablePlaybackRates = getAvailablePlaybackRates(player);
        const targetRate = availablePlaybackRates[shortcutNumber - 1];
        if (targetRate !== undefined) {
          applyPlaybackRate(player, targetRate);
          event.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
});

function getAvailablePlaybackRates(player: YouTubePlayerElement): number[] {
  try {
    const availablePlaybackRates = player.getAvailablePlaybackRates();
    return availablePlaybackRates.filter((rate) => rate > 1.0);
  } catch (error) {
    console.error("Failed to get available playback rates:", error);
    return [];
  }
}

function getPlaybackRate(player: YouTubePlayerElement): number | null {
  try {
    return player.getPlaybackRate();
  } catch (error) {
    console.error("Failed to get current playback rate:", error);
    return null;
  }
}

function applyPlaybackRate(
  player: YouTubePlayerElement,
  targetRate: number,
): void {
  const currentRate = getPlaybackRate(player);
  if (currentRate === null) {
    return;
  }

  try {
    if (currentRate <= targetRate) {
      player.setPlaybackRate(targetRate - 0.25);
      // Simulate pressing the ">" key to increase the playback rate
      player.handleGlobalKeyDown(190, true);
    } else {
      player.setPlaybackRate(targetRate + 0.25);
      // Simulate pressing the "<" key to decrease the playback rate
      player.handleGlobalKeyDown(188, true);
    }
  } catch (error) {
    console.error("Failed to set playback rate:", error);
  }

  const actualRate = getPlaybackRate(player);
  if (actualRate !== targetRate) {
    console.warn(
      `Playback rate not set correctly. Expected: ${targetRate}, Actual: ${actualRate}`,
    );
    try {
      player.setPlaybackRate(targetRate);
    } catch (error) {
      console.error("Failed to set playback rate directly:", error);
    }
  }
}

function isEditableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}
