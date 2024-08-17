import {
  BottomSheetCore,
  createPlaceholderBottomSheet,
} from "@plainsheet/core";
import { useMemo, useRef, useState } from "react";

const placeHolderSheet = createPlaceholderBottomSheet();

interface UseBottomSheetReturn {
  /**
   * Props to be passed to the `BottomSheet`.
   */
  props: HookProvidedProps;
  /**
   * `BottomSheetCore` instance to control the bottom sheet.
   */
  instance: BottomSheetCore;
}
interface HookProvidedProps {
  /**
   * `ref` of the BottomSheet component. Pass it to the component to use `instance`.
   */
  ref: React.MutableRefObject<BottomSheetCore>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useBottomSheet(): UseBottomSheetReturn {
  const ref = useRef<BottomSheetCore>(placeHolderSheet);
  const [isOpen, setIsOpen] = useState(false);

  const instance = useMemo(() => ref.current, [ref.current]);

  const props = useMemo(() => {
    return {
      ref,
      isOpen,
      setIsOpen,
    };
  }, [isOpen]);

  return {
    instance,
    props,
  };
}
