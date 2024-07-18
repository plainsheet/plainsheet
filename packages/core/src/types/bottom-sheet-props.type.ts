import type { DraggingDirection } from "src/calculator/position-calculator.type";
import type {
  AnimationTimingPoints,
  CommonAnimation,
} from "src/utils/animation/animation.type";
import type { CSSColor, CSSUnit } from "src/utils/types/css-attribute";

export type RequiredBottomSheetProps = Required<BottomSheetProps>;
export interface BottomSheetProps {
  ariaLabel?: string;
  content: string;

  width?: string;

  // NOTE: Position settings
  /**
   * Space between the top of the bottom sheet and the viewport's top.
   * @default 20
   */
  marginTop?: number;
  defaultPosition?: BottomSheetPosition;

  // NOTE: Behavior settings
  shouldCloseOnOutsideClick?: boolean;
  snapPoints?: SnapPoints;
  /**
   * @description If it is true, the bottom sheet can be dragged up above its content height.
   * @default true
   */
  expandable?: boolean;
  /**
   * @description If it is true, the bottom sheet can be dragged. Set false to use the bottom sheet as a blocking dialog.
   * @default true
   */
  draggable?: boolean;
  /**
   * @description If it is true, the content's background can be dragged.
   * @default true
   */
  backgroundDraggable?: boolean;
  /**
   * @description Element selectors that will trigger dragging of the bottom sheet.
   * By default, the background is draggable unless it is covered by the content.
   */
  dragTriggers?: string[];

  // NOTE: Life-cycle callbacks.
  beforeOpen?: () => void;
  afterOpen?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
  onDragStart?: () => void;
  /**
   * @param direction- Current direction based on where the pointer was when started dragging.
   * @param progress- Rational number ranging from 0 to 1, inclusive.
   * It represents how far the Bottom Sheet is dragged.
   */
  onDragMove?: (direction: DraggingDirection, progress: number) => void;
  onDragEnd?: () => void;

  // NOTE: Appearance settings.
  shouldShowHandle?: boolean;
  shouldShowBackdrop?: boolean;
  containerBorderRadius?: CSSUnit | null;
  backdropColor?: CSSColor | null;
  backDropTransition?: string | null;

  // NOTE: Custom CSS classes.
  rootClass?: string | null;
  containerClass?: string | null;
  handleClass?: string | null;
  contentWrapperClass?: string | null;
  backdropClass?: string | null;

  // NOTE: Animation settings.
  /**
   * @description Common animation timing functions such as "ease-in-out", or
   * four points(p1x, p1y, p2x, p2y) that express the timing of animations as a Bezier curve.
   */
  draggingAnimationTimings?: CommonAnimation | AnimationTimingPoints | null;
  /**
   * @description In milliseconds.
   */
  draggingAnimationDuration?: number;
}

export const BOTTOM_SHEET_POSITION = {
  TOP: "top",
  MIDDLE: "middle",
  CONTENT_HEIGHT: "content-height",
  CLOSED: "closed",
} as const;

export type BottomSheetPosition =
  (typeof BOTTOM_SHEET_POSITION)[keyof typeof BOTTOM_SHEET_POSITION];

/**
 * @description Points where it snaps to when the handle is released.
 * A snap is a rational number ranging from 0 to 1, exclusive.
 * If snapPoints is [0.5, 0.7], it snaps to 50% and 70% of the viewport height.
 * @default [0.5]
 */
export type SnapPoints = number[];
