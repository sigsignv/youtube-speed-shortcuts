import * as v from "valibot";

declare global {
  interface DocumentEventMap {
    "yt-navigate-finish": CustomEvent<unknown>;
  }
}

const NavigateFinishDetailSchema = v.object({
  pageType: v.literal("watch"),
});

type WatchPageSetup = () => Disposer | undefined;

type Disposer = () => void;

export function onWatchPageNavigate(setup: WatchPageSetup): Disposer {
  let currentDisposer: Disposer | undefined;

  const dispose = () => {
    try {
      currentDisposer?.();
    } catch (error) {
      console.error("Failed to clean up:", error);
    } finally {
      currentDisposer = undefined;
    }
  };

  const listener = (event: CustomEvent<unknown>) => {
    dispose();

    const parsed = v.safeParse(NavigateFinishDetailSchema, event.detail);
    if (!parsed.success) {
      return;
    }

    try {
      currentDisposer = setup();
    } catch (error) {
      console.error("Failed to set up:", error);
    }
  };
  document.addEventListener("yt-navigate-finish", listener);

  return () => {
    document.removeEventListener("yt-navigate-finish", listener);
    dispose();
  };
}
