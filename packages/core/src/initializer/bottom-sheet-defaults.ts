import {
  BOTTOM_SHEET_POSITION,
  BottomSheetProps,
} from "../types/bottom-sheet-props.type";

export const BOTTOM_SHEET_DEFAULT_PROPS: Required<BottomSheetProps> = {
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
  backgroundDraggable: true,
  shouldCloseOnOutsideClick: true,
  shouldShowBackdrop: true,
  shouldShowHandle: true,
  backDropTransition: null,
  backdropColor: null,
  containerBorderRadius: null,
};
