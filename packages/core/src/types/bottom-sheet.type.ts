import type { BottomSheetElements } from "src/initializer/bottom-sheet-initializer";
import type {
  BottomSheetPosition,
  BottomSheetCoreProps,
} from "./bottom-sheet-props.type";
import type { BottomSheetState } from "./bottom-sheet-state.type";

export interface BottomSheetCore {
  /**
   * Mutable props to change the behavior of the Bottom Sheet.
   */
  props: BottomSheetCoreProps;
  /**
   * Elements comprise the bottom sheet.
   */
  elements: Partial<BottomSheetElements>;
  /**
   * Mounts the bottom sheet to the dom, or a provided mounting point.
   */
  mount: (mountingPoint?: Element) => void;
  /**
   * Removes the bottom sheet element.
   */
  unmount: () => void;
  /**
   * Shows the bottom sheet.
   */
  open: () => void;
  /**
   * Hides the bottom sheet.
   */
  close: () => void;
  /**
   * @returns If the bottom sheet is mounted
   */
  getIsMounted: () => BottomSheetState["isMounted"];
  /**
   * @returns If the bottom sheet is open.
   */
  getIsOpen: () => boolean;
  /**
   * @returns If the bottom sheet is closed.
   */
  getIsClosed: () => boolean;
  /**
   * @returns Current position of the bottom sheet.
   */
  getPosition: () => BottomSheetPosition;
  /**
   * @returns Current height of the bottom sheet.
   */
  getHeight: () => number;
  /**
   * @param endY- Position to move the bottom sheet.
   * The top of the viewport is 0, and it increases as it gets closer to the bottom of the viewport.
   */
  moveTo: (endY: number) => void;
  /**
   * @param percent- A relative number represent the position to move the bottom sheet to.
   * 0.1 is 10% below form the top of the viewport, 0.2 is 20%, and so on.
   */
  snapTo: (percent: number) => void;
}
