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
