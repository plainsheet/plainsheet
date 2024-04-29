import {
  BOTTOM_SHEET_POSITION,
  RequiredBottomSheetProps,
} from "../types/bottom-sheet-props.type";

export type BottomSheetDefaultPropKeys = keyof RequiredBottomSheetProps;

export const BOTTOM_SHEET_DEFAULT_PROPS: RequiredBottomSheetProps = {
  content: "",
  defaultPosition: BOTTOM_SHEET_POSITION.CONTENT_HEIGHT,
  marginTop: 20,
  snapPoints: [0.5],
  width: "100%",
  dragTriggers: [],
  beforeOpen: () => {},
  afterOpen: () => {},
  beforeClose: () => {},
  afterClose: () => {},
  onDragStart: () => {},
  onDragMove: () => {},
  onDragEnd: () => {},
  expandable: true,
  draggable: true,
  backgroundDraggable: true,
  shouldCloseOnOutsideClick: true,
  shouldShowBackdrop: true,
  shouldShowHandle: true,
  backDropTransition: null,
  backdropColor: null,
  containerBorderRadius: null,
  rootClass: null,
  containerClass: null,
  handleClass: null,
  contentWrapperClass: null,
  backdropClass: null,
  draggingAnimationTimings: "ease-in-out",
  draggingAnimationDuration: 200,
};
