import { exists, OmitKeyof } from "@plainsheet/utility";
import {
  BottomSheetCore,
  createBottomSheet,
  createPlaceholderBottomSheet,
  BottomSheetCoreProps,
} from "@plainsheet/core";
export { createPlaceholderBottomSheet } from "@plainsheet/core";
export type { BottomSheetCore } from "@plainsheet/core";
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type BottomSheetProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mountingPointRef?: MutableRefObject<MountingPoint>;
} & CoreProps;
type CoreProps = OmitKeyof<BottomSheetCoreProps, "content">;
type MountingPoint = undefined | HTMLElement;

const placeholderBottomSheet = createPlaceholderBottomSheet();

export const BottomSheet = forwardRef<BottomSheetCore, BottomSheetProps>(
  function InnerBottomSheet(props, refToExpose) {
    const {
      children,
      isOpen,
      setIsOpen,
      afterClose,
      mountingPointRef,
      ...coreProps
    } = props;

    const bottomSheetRef = useRef<BottomSheetCore>(placeholderBottomSheet);
    const [bottomSheet, setBottomSheet] = useState<BottomSheetCore>(
      bottomSheetRef.current
    );
    useImperativeHandle(
      refToExpose,
      () => {
        return bottomSheet;
      },
      [bottomSheet]
    );

    const handleAfterClose = useCallback(() => {
      setIsOpen(false);
      afterClose?.();
    }, [afterClose]);
    useEffect(() => {
      if (isOpen) {
        bottomSheet.open();
      } else {
        bottomSheet.close();
      }
    }, [isOpen]);

    const bottomSheetContentsWrapperRef = useRef<HTMLElement | null>(null);
    useEffect(
      function initializeBottomSheet() {
        if (mountingPointRef && !mountingPointRef.current) {
          // if mountingPointRef is provided, wait for the element to be assigned to the ref.
          return;
        }

        const mountingPoint = exists(props.mountingPointRef?.current)
          ? props.mountingPointRef.current
          : window.document.body;
        if (!mountingPoint) {
          return;
        }
        if (bottomSheet.getIsMounted()) {
          return;
        }

        const bottomSheetInstance = createBottomSheet({
          content: "",
          ...coreProps,
          afterClose: handleAfterClose,
        });
        bottomSheetInstance.mount(mountingPoint);

        bottomSheetContentsWrapperRef.current =
          bottomSheetInstance.elements.bottomSheetContentWrapper ?? null;

        bottomSheetRef.current = bottomSheetInstance;
        setBottomSheet(bottomSheetInstance);

        return () => {
          bottomSheet.unmount();
        };
      },
      [props.mountingPointRef, coreProps, handleAfterClose]
    );

    useEffect(
      function passPropsToCore() {
        Object.assign(bottomSheetRef.current.props, {
          ...coreProps,
        });
        setBottomSheet(bottomSheetRef.current);
      },
      [coreProps]
    );

    useEffect(function cleanUp() {
      return () => {
        bottomSheetRef.current.unmount();
      };
    }, []);

    if (bottomSheetContentsWrapperRef.current) {
      // Attach the user-provided content to the bottom sheet
      return createPortal(
        props.children,
        bottomSheetContentsWrapperRef.current
      );
    }

    return null;
  }
);
