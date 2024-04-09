import { BottomSheetData, BottomSheetPosition } from "./bottom-sheet.type";

export function defaultPositionToYCoordinate(
  bottomSheetContainer: Element,
  bottomSheetData: BottomSheetData,
  position: BottomSheetPosition
) {
  switch (position) {
    case "content-height":
      return (
        bottomSheetContainer.clientHeight -
        (bottomSheetData?.containerHeight ?? 0)
      );
    case "middle":
      return (
        bottomSheetContainer.clientHeight / 2 -
        (bottomSheetData?.containerHeight ?? 0)
      );
    case "top":
      return 0;
    default:
      return 0;
  }
}

export function calcContentWrapperBottomFillerHeight(
  bottomSheetContentWrapper: HTMLElement,
  marginTop: number
) {
  const viewportHeight = window.innerHeight;
  return `${viewportHeight - bottomSheetContentWrapper.clientHeight - marginTop}px`;
}

export function calcContainerHeight(
  bottomSheetContentWrapper: HTMLElement,
  bottomSheetHandle: HTMLElement
) {
  return (
    bottomSheetContentWrapper.clientHeight + bottomSheetHandle.clientHeight
  );
}
