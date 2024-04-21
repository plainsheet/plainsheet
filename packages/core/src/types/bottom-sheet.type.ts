import { BottomSheetState } from "./bottom-sheet-state.type";

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
  getIsMounted: () => BottomSheetState["isMounted"];
}
