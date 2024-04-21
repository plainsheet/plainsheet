import { BottomSheet } from "../types/bottom-sheet.type";

/**
 * @returns A fallback BottomSheet instance to provide non-null BottomSheet methods to library users.
 */
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
    getIsMounted: () => {
      return false;
    },
  };
}
