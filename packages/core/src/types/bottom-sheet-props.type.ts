export interface BottomSheetProps {
  content: string;
  width?: string;
  defaultPosition?: BottomSheetPosition;
  /**
   * Space between the top of the bottom sheet and the viewport's top.
   * @default 20
   */
  marginTop?: number;
  snapPoints?: SnapPoints;
  /**
   * @description Elements that will trigger dragging of the bottom sheet.
   * By default, the background is draggable unless it is covered by the content.
   */
  dragTriggers?: HTMLElement[];
  beforeOpen: () => void;
  afterOpen: () => void;
  beforeClose: () => void;
  afterClose: () => void;
  onDragStart: () => void;
  onDragMove: () => void;
  onDragEnd: () => void;
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
