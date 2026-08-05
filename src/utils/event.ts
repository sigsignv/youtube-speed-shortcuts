import * as v from "valibot";

declare global {
  interface DocumentEventMap {
    "yt-navigate-finish": CustomEvent<unknown>;
  }
}

const NavigateFinishDetailSchema = v.object({
  pageType: v.string(),
});

type Unsubscribe = () => void;

type Disposer = () => void;

type WatchPageSetup = () => Disposer | undefined;

export function onNavigateToWatchPage(setup: WatchPageSetup): Unsubscribe {
  let disposer: Disposer | undefined;

  const dispose = () => {
    const currentDisposer = disposer;
    disposer = undefined;
    try {
      currentDisposer?.();
    } catch (error) {
      console.error("Failed to clean up:", error);
    }
  };

  const listener = (event: CustomEvent<unknown>) => {
    dispose();

    const parseResult = v.safeParse(NavigateFinishDetailSchema, event.detail);
    if (!parseResult.success || parseResult.output.pageType !== "watch") {
      return;
    }

    try {
      disposer = setup();
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
