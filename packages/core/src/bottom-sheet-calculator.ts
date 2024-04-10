import { BottomSheetPosition } from "./bottom-sheet.type";

export function defaultPositionToYCoordinate(
  bottomSheetContainer: Element,
  /**
   * @description Handle + ContentWrapper
   */
  containerHeightExcludingFiller: number,
  position: BottomSheetPosition
) {
  switch (position) {
    case "content-height":
      return (
        bottomSheetContainer.clientHeight -
        (containerHeightExcludingFiller ?? 0)
      );
    case "middle":
      return (
        bottomSheetContainer.clientHeight / 2 -
        (containerHeightExcludingFiller ?? 0)
      );
    case "top":
      return 0;
    default:
      return 0;
  }
}

export function calcContainerHeightExcludingFiller(
  bottomSheetContentWrapper: HTMLElement,
  bottomSheetHandle: HTMLElement
) {
  return (
    bottomSheetContentWrapper.clientHeight + bottomSheetHandle.clientHeight
  );
}

export function calcContentWrapperBottomFillerHeight(
  bottomSheetContentWrapper: HTMLElement,
  marginTop: number
) {
  const viewportHeight = window.innerHeight;
  return `${viewportHeight - bottomSheetContentWrapper.clientHeight - marginTop}px`;
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
