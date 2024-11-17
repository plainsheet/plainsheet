import {
  BottomSheetCore,
  BottomSheetCoreProps,
  createPlaceholderBottomSheet,
} from "@plainsheet/core";
import { useEffect, useMemo, useRef, useState } from "react";

const placeHolderSheet = createPlaceholderBottomSheet();

interface UseBottomSheetProps {
  onAfterOpen?: BottomSheetCoreProps["afterOpen"];
  onAfterClose?: BottomSheetCoreProps["afterClose"];
}

interface UseBottomSheetReturn {
  /**
   * Props to be passed to the `BottomSheet`.
   */
  props: HookProvidedProps;
  /**
   * `BottomSheetCore` instance to control the bottom sheet.
   */
  instance: BottomSheetCore;
  /**
   * a React state tells whether the bottom sheet is open.
   */
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface HookProvidedProps {
  /**
   * `ref` of the BottomSheet component. Pass it to the component to use `instance`.
   */
  ref: React.MutableRefObject<BottomSheetCore>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  afterOpen: BottomSheetCoreProps["afterOpen"];
  afterClose: BottomSheetCoreProps["afterClose"];
}

export function useBottomSheet(
  props: UseBottomSheetProps = {}
): UseBottomSheetReturn {
  const ref = useRef<BottomSheetCore>(placeHolderSheet);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [instance, setInstance] = useState(ref.current);
  useEffect(() => {
    setInstance(ref.current);
  }, [ref.current]);

  const onAfterOpen = () => {
    props.onAfterOpen?.();

    setIsOpen(true);
  };
  const onAfterClose = () => {
    props.onAfterClose?.();

    setIsOpen(false);
  };

  const hookProvidedProps = useMemo<HookProvidedProps>(() => {
    return {
      ref,
      isOpen,
      setIsOpen,
      afterOpen: onAfterOpen,
      afterClose: onAfterClose,
    };
  }, [ref.current, isOpen, setIsOpen, onAfterOpen, onAfterClose]);

  return {
    props: hookProvidedProps,
    instance,
    isOpen,
    setIsOpen,
  };
}
