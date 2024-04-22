import { BottomSheetPosition } from "../types/bottom-sheet-props.type";

/** @description It expects the bottom sheet to be open. */
export function convertDefaultPositionToYCoordinate(
  viewportHeight: number,
  containerHeight: number,
  marginTop: number,
  position: BottomSheetPosition
) {
  switch (position) {
    case "content-height":
      return 0;
    case "middle":
      return -(viewportHeight / 2 - containerHeight);
    case "top":
      return -(viewportHeight - containerHeight) + marginTop;
    default:
      return 0;
  }
}

export function calcDraggingDirection(startY: number, endY: number) {
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
 * @param startY Point Y where the dragging started.
 * @param endY Point Y where the dragging ended.
 * @returns ±number, which is the distance between startY and endY .
 */
export function calcOffset(startY: number, endY: number) {
  const isUp = endY < startY;
  const offset = isUp ? -(startY - endY) : endY - startY;

  return offset;
}

export function calcDiffOfHeight(leftHeight: number, rightHeight: number) {
  const isLeftLarger = leftHeight > rightHeight;

  const diff = isLeftLarger
    ? leftHeight - rightHeight
    : rightHeight - leftHeight;

  return diff;
}

export function calcDirectionWithHeight(
  leftHeight: number,
  rightHeight: number
) {
  const isUp = leftHeight < rightHeight;
  const isDown = leftHeight > rightHeight;
  const stayedSame = leftHeight === rightHeight;

  return {
    isUp,
    isDown,
    stayedSame,
  };
}
