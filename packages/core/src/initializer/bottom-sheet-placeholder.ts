import { BOTTOM_SHEET_POSITION } from "../types";
import type { BottomSheet } from "../types/bottom-sheet.type";

/**
 * @returns A fallback BottomSheet instance to provide non-null BottomSheet methods to library users.
 */
export function createPlaceholderBottomSheet(): BottomSheet {
  return {
    mount: () => {},
    unmount: () => {},
    open: () => {},
    close: () => {},
    getIsMounted: () => {
      return false;
    },
    getHeight: () => {
      return 0;
    },
    getIsOpen: () => {
      return false;
    },
    getIsClosed: () => {
      return true;
    },
    getPosition: () => {
      return BOTTOM_SHEET_POSITION.CLOSED;
    },
    moveTo: () => {},
    snapTo: () => {},
  };
}
