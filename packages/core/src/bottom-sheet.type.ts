export type BottomSheetPosition = "top" | "middle" | "content-height";

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
}

/**
 * @description Points where it snaps to when the handle is released.
 * A snap is a rational number ranging from 0 to 1, exclusive.
 * If snapPoints is [0.5, 0.7], it snaps to 50% and 70% of the full height(viewportHeight - marginTop).
 */
export type SnapPoints = number[];
