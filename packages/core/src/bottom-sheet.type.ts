export type BottomSheetPosition = "top" | "middle" | "content-height";

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
}
