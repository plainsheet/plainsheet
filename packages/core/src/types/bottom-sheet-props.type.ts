import type { DraggingDirection } from "src/calculator/position-calculator.type";
import type {
  AnimationTimingPoints,
  CommonAnimation,
} from "src/utils/animation/animation.type";
import type { CSSColor, CSSUnit } from "src/utils/types/css-attribute";

export type RequiredBottomSheetProps = Required<BottomSheetCoreProps>;
export interface BottomSheetCoreProps {
  ariaLabel?: string;
  content: string;

  width?: string;

  // NOTE: Position settings
  /**
   * Space between the top of the bottom sheet and the viewport's top.
   * defaults to 20
   */
  marginTop?: number;
  defaultPosition?: BottomSheetPosition;

  // NOTE: Behavior settings
  shouldCloseOnOutsideClick?: boolean;
  snapPoints?: SnapPoints;
  /**
   * If it is true, the bottom sheet can be dragged up above its content height.
   * defaults to true
   */
  expandable?: boolean;
  /**
   * If it is true, the bottom sheet can be dragged. Set false to use the bottom sheet as a blocking dialog.
   * defaults to true
   */
  draggable?: boolean;
  /**
   * If it is true, the content's background can be dragged.
   * defaults to true
   */
  backgroundDraggable?: boolean;
  /**
   * Element selectors that will trigger dragging of the bottom sheet.
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
  backdropColor?: CSSColor | string | null;
  backDropTransition?: string | null;

  // NOTE: Custom CSS classes.
  rootClass?: string | null;
  containerClass?: string | null;
  handleClass?: string | null;
  contentWrapperClass?: string | null;
  backdropClass?: string | null;

  // NOTE: Animation settings.
  /**
   * Common animation timing functions such as "ease-in-out", or
   * an object {p1x: number, p1y: number, p2x: number, p2y: number} that describes the timing of animations as a Bezier curve.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
   */
  draggingAnimationTimings?: CommonAnimation | AnimationTimingPoints | null;
  /**
   * In milliseconds.
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
 * Points where it snaps to when the handle is released.
 * A snap is a rational number ranging from 0 to 1, exclusive.
 * If snapPoints is [0.5, 0.7], it snaps to 50% and 70% of the viewport height.
 * defaults to [0.5]
 */
export type SnapPoints = number[];
