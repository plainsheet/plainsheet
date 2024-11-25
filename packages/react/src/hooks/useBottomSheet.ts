import {
  BottomSheetCore,
  BottomSheetCoreProps,
  createPlaceholderBottomSheet,
  DraggingDirection,
} from "@plainsheet/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const placeHolderSheet = createPlaceholderBottomSheet();

interface UseBottomSheetProps extends Omit<BottomSheetCoreProps, "content"> {}

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
  open: () => void;
  close: () => void;
  moveTo: MoveTo;
  snapTo: SnapTo;
}
type MoveTo = (...params: Parameters<BottomSheetCore["moveTo"]>) => void;
type SnapTo = (...params: Parameters<BottomSheetCore["snapTo"]>) => void;

interface HookProvidedProps extends UseBottomSheetProps {
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

  const {
    beforeOpen: beforeOpenProp,
    afterOpen: afterOpenProp,
    beforeClose: beforeCloseProp,
    afterClose: afterCloseProp,
    onDragStart: onDragStartProp,
    onDragMove: onDragMoveProp,
    onDragEnd: onDragEndProp,
    ...restCoreProps
  } = props;

  const beforeOpen = () => {
    beforeOpenProp?.();
  };

  const afterOpen = () => {
    afterOpenProp?.();

    setIsOpen(true);
  };

  const beforeClose = () => {
    beforeCloseProp?.();
  };

  const afterClose = () => {
    afterCloseProp?.();

    setIsOpen(false);
  };

  const onDragStart = () => {
    onDragStartProp?.();
  };

  const onDragMove = (direction: DraggingDirection, progress: number) => {
    onDragMoveProp?.(direction, progress);
  };

  const onDragEnd = () => {
    onDragEndProp?.();
  };

  const hookProvidedProps = useMemo<HookProvidedProps>(() => {
    return {
      ref,
      isOpen,
      setIsOpen,
      beforeOpen,
      afterOpen,
      beforeClose,
      afterClose,
      onDragStart,
      onDragMove,
      onDragEnd,
      ...restCoreProps,
    };
  }, [ref.current, isOpen, setIsOpen, props]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const close = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const moveTo: MoveTo = useCallback(
    (...params) => {
      instance.moveTo(...params);
    },
    [instance]
  );
  const snapTo: SnapTo = useCallback(
    (...params) => {
      instance.snapTo(...params);
    },
    [instance]
  );

  return {
    props: hookProvidedProps,
    instance,
    isOpen,
    setIsOpen,
    open,
    close,
    moveTo,
    snapTo,
  };
}
