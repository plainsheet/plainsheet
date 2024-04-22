import { BottomSheetPosition } from "./bottom-sheet-props.type";
import { BottomSheetState } from "./bottom-sheet-state.type";

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
  getIsMounted: () => BottomSheetState["isMounted"];
  getIsOpen: () => boolean;
  getIsClosed: () => boolean;
  getPosition: () => BottomSheetPosition;
  getHeight: () => number;
  /**
   * @param endY Position to move the bottom sheet.
   * The top of the viewport is 0, and it increases as it gets closer to the bottom of the viewport.
   */
  moveTo: (endY: number) => void;
  /**
   * @param percent A relative number represent the position to move the bottom sheet to.
   * 0.1 is 10% below form the top of the viewport, 0.2 is 20%, and so on.
   */
  snapTo: (percent: number) => void;
}
