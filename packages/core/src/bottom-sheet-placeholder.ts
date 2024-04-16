import { BottomSheet } from "./bottom-sheet.type";

export function createPlaceholderBottomSheet(): BottomSheet {
  function warnNotMountedBug() {
    console.warn("BottomSheet is not mounted yet.");
  }

  return {
    mount: (mountingPoint?: Element) => {
      warnNotMountedBug();
    },
    unmount: () => {
      warnNotMountedBug();
    },
    open: () => {
      warnNotMountedBug();
    },
    close: () => {
      warnNotMountedBug();
    },
    isMounted: () => {
      return false;
    },
  };
}
