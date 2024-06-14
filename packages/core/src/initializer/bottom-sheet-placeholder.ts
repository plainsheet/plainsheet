/* 
  eslint-disable @typescript-eslint/no-empty-function 
  -- Default functions should be empty.
*/

import { BOTTOM_SHEET_POSITION } from "../types";
import type { BottomSheet } from "../types/bottom-sheet.type";

/**
 * @returns A fallback BottomSheet instance to provide non-null BottomSheet methods to library users.
 */
export function createPlaceholderBottomSheet(): BottomSheet {
  const placeholderEl = document.createElement("div");

  return {
    elements: {
      bottomSheetRoot: placeholderEl,
      bottomSheetBackdrop: placeholderEl,
      bottomSheetContainer: placeholderEl,
      bottomSheetHandle: placeholderEl,
      bottomSheetHandleBar: placeholderEl,
      bottomSheetContentWrapper: placeholderEl,
      bottomSheetContainerGapFiller: placeholderEl,
    },
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
    props: {
      content: "",
    },
  };
}
