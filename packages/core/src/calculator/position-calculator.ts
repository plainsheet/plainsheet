import type {
  BottomSheetPosition,
  SnapPoints,
} from "../types/bottom-sheet-props.type";
import type { DraggingDirection } from "./position-calculator.type";

/** It expects the bottom sheet to be open. */
export function convertDefaultPositionToYCoordinate(
  viewportHeight: number,
  containerHeight: number,
  marginTop: number,
  position: BottomSheetPosition
): number {
  switch (position) {
    case "content-height":
      if (containerHeight >= viewportHeight) {
        return calcTopPointYLimit(viewportHeight, containerHeight, marginTop);
      }

      return 0;
    case "middle":
      return -(viewportHeight / 2 - containerHeight);
    case "top":
      return -(viewportHeight - containerHeight) + marginTop;
    default:
      return 0;
  }
}

export function calcDraggingDirection(
  startY: number,
  endY: number
): DraggingDirection {
  const isUp = endY < startY;
  const isDown = endY > startY;
  const stayedSame = endY === startY;

  return {
    isUp,
    isDown,
    stayedSame,
  };
}

/**
 * @param startY- Point Y where the dragging started.
 * @param endY- Point Y where the dragging ended.
 * @returns ±number, which is the distance between startY and endY .
 */
export function calcOffset(startY: number, endY: number): number {
  const isUp = endY < startY;
  const offset = isUp ? -(startY - endY) : endY - startY;

  return offset;
}

export function calcDiffOfHeight(
  leftHeight: number,
  rightHeight: number
): number {
  const isLeftLarger = leftHeight > rightHeight;

  const diff = isLeftLarger
    ? leftHeight - rightHeight
    : rightHeight - leftHeight;

  return diff;
}

export function calcDirectionWithHeight(
  leftHeight: number,
  rightHeight: number
): {
  isUp: boolean;
  isDown: boolean;
  stayedSame: boolean;
} {
  const isUp = leftHeight < rightHeight;
  const isDown = leftHeight > rightHeight;
  const stayedSame = leftHeight === rightHeight;

  return {
    isUp,
    isDown,
    stayedSame,
  };
}

export function extractPoints(
  where: "above" | "below",
  container: {
    viewportHeight: number;
    visibleHeight: number;
  },
  points: SnapPoints
): SnapPoints {
  const shouldBeAbove = where === "above";

  return points.filter((point) => {
    const snapPointHeight = point * container.viewportHeight;
    return shouldBeAbove
      ? container.visibleHeight < snapPointHeight
      : container.visibleHeight > snapPointHeight;
  });
}

export function calcTopPointYLimit(
  viewportHeight: number,
  containerHeight: number,
  marginTop: number
): number {
  return -(viewportHeight - containerHeight) + marginTop;
}
