import type { BottomSheet, BottomSheetProps } from "src";
import { createBottomSheet } from "src";

export function prepareOpenBottomSheet(props: BottomSheetProps): BottomSheet {
  const bottomSheet = createBottomSheet(props);

  bottomSheet.mount();

  bottomSheet.open();

  return bottomSheet;
}
