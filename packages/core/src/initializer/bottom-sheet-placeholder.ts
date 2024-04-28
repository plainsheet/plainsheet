import { BOTTOM_SHEET_POSITION } from "../types";
import { BottomSheet } from "../types/bottom-sheet.type";

/**
 * @returns A fallback BottomSheet instance to provide non-null BottomSheet methods to library users.
 */
export function createPlaceholderBottomSheet(): BottomSheet {
  return {
    mount: () => {
      return;
    },
    unmount: () => {
      return;
    },
    open: () => {
      return;
    },
    close: () => {
      return;
    },
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
    moveTo: () => {
      return;
    },
    snapTo: () => {
      return;
    },
  };
}
