export type BottomSheetPosition = "top" | "middle" | "content-height";

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
}

// TODO: Promote to a class when you need methods
export interface BottomSheetData {
  /**
   * @description Handle + ContentWrapper
   */
  containerHeight: number | null;
}
