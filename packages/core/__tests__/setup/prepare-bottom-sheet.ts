import type { BottomSheetCore, BottomSheetCoreProps } from "src";
import { createBottomSheet } from "src";

export function prepareOpenBottomSheet(
  props: BottomSheetCoreProps
): BottomSheetCore {
  const bottomSheet = createBottomSheet(props);

  bottomSheet.mount();

  bottomSheet.open();

  return bottomSheet;
}
