import {
  BottomSheetCore,
  BottomSheetCoreProps,
  createPlaceholderBottomSheet,
  DraggingDirection,
} from "@plainsheet/core";
import { useEffect, useMemo, useRef, useState } from "react";

const placeHolderSheet = createPlaceholderBottomSheet();

interface UseBottomSheetProps {
  onBeforeOpen?: BottomSheetCoreProps["beforeOpen"];
  onAfterOpen?: BottomSheetCoreProps["afterOpen"];
  onBeforeClose?: BottomSheetCoreProps["beforeClose"];
  onAfterClose?: BottomSheetCoreProps["afterClose"];
  onDragStart?: BottomSheetCoreProps["onDragStart"];
  onDragMove?: BottomSheetCoreProps["onDragMove"];
  onDragEnd?: BottomSheetCoreProps["onDragEnd"];
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

interface HookProvidedProps extends Omit<BottomSheetCoreProps, "content"> {
  /**
   * `ref` of the BottomSheet component. Pass it to the component to use `instance`.
   */
  ref: React.MutableRefObject<BottomSheetCore>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

  const onBeforeOpen = () => {
    props.onBeforeOpen?.();
  };

  const onAfterOpen = () => {
    props.onAfterOpen?.();
    setIsOpen(true);
  };

  const onBeforeClose = () => {
    props.onBeforeClose?.();
  };

  const onAfterClose = () => {
    props.onAfterClose?.();
    setIsOpen(false);
  };

  const onDragStart = () => {
    props.onDragStart?.();
  };

  const onDragMove = (direction: DraggingDirection, progress: number) => {
    props.onDragMove?.(direction, progress);
  };

  const onDragEnd = () => {
    props.onDragEnd?.();
  };

  const hookProvidedProps = useMemo<HookProvidedProps>(() => {
    return {
      ref,
      isOpen,
      setIsOpen,
      beforeOpen: onBeforeOpen,
      afterOpen: onAfterOpen,
      beforeClose: onBeforeClose,
      afterClose: onAfterClose,
      onDragStart,
      onDragMove,
      onDragEnd,
    };
  }, [
    ref.current,
    isOpen,
    setIsOpen,
    onBeforeOpen,
    onAfterOpen,
    onBeforeClose,
    onAfterClose,
    onDragStart,
    onDragMove,
    onDragEnd,
  ]);

  return {
    props: hookProvidedProps,
    instance,
    isOpen,
    setIsOpen,
  };
}
