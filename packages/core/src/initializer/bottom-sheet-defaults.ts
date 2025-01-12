/* 
  eslint-disable @typescript-eslint/no-empty-function 
  -- Default functions should be empty.
*/
import type { RequiredBottomSheetProps } from "../types/bottom-sheet-props.type";
import { BOTTOM_SHEET_POSITION } from "../types/bottom-sheet-props.type";

export type BottomSheetDefaultPropKeys = keyof RequiredBottomSheetProps;

export const BOTTOM_SHEET_DEFAULT_PROPS: RequiredBottomSheetProps = {
  ariaLabel: "Bottom sheet",
  content: "",
  defaultPosition: BOTTOM_SHEET_POSITION.CONTENT_HEIGHT,
  marginTop: 20,
  snapPoints: [],
  width: "92%",
  dragTriggers: [],
  beforeOpen: () => {},
  afterOpen: () => {},
  beforeClose: () => {},
  afterClose: () => {},
  onDragStart: () => {},
  onDragMove: () => {},
  onDragEnd: () => {},
  expandable: true,
  preventClosing: false,
  draggable: true,
  backgroundDraggable: true,
  shouldCloseOnOutsideClick: true,
  shouldShowBackdrop: true,
  shouldShowHandle: true,
  backDropTransition: null,
  backdropColor: null,
  containerBackgroundColor: null,
  containerBorderRadius: null,
  rootClass: null,
  containerClass: null,
  handleClass: null,
  contentWrapperClass: null,
  backdropClass: null,
  draggingAnimationTimings: "ease-in-out",
  draggingAnimationDuration: 180,
  rootStyle: {},
  containerStyle: {},
  handleStyle: {},
  contentWrapperStyle: {},
  backdropStyle: {},
  containerGapFillerStyle: {},
};
