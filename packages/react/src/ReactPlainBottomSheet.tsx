import { exists, OmitKeyof } from "pbs-utility";
import {
  BottomSheet,
  createBottomSheet,
  createPlaceholderBottomSheet,
  BottomSheetProps,
} from "plain-bottom-sheet-core";
export { createPlaceholderBottomSheet } from "plain-bottom-sheet-core";
export type { BottomSheet } from "plain-bottom-sheet-core";
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type BottomSheetReactProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mountingPoint?: Element | null;
} & CoreProps;
type CoreProps = OmitKeyof<BottomSheetProps, "content", "safely">;

const placeholderBottomSheet = createPlaceholderBottomSheet();

export const ReactPlainBottomSheet = forwardRef<
  BottomSheet,
  BottomSheetReactProps
>(function InnerBottomSheet(props, refToExpose) {
  const {
    children,
    isOpen,
    setIsOpen,
    afterClose,
    mountingPoint,
    ...coreProps
  } = props;

  const [bottomSheet, setBottomSheet] = useState<BottomSheet>(
    placeholderBottomSheet
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
    function initiateBottomSheet() {
      const mountingPoint = exists(props.mountingPoint)
        ? props.mountingPoint
        : window.document.body;
      if (!mountingPoint) {
        return;
      }
      if (bottomSheet.getIsMounted()) {
        if (!bottomSheetContentsWrapperRef.current) {
          return;
        }
        // TODO: Efficiently avoid rerendering/recreating of the bottom sheet
        // while updating the user-provided content
        // createPortal(props.children, bottomSheetContentsWrapperRef.current);
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

      setBottomSheet(bottomSheetInstance);

      return () => {
        bottomSheet.unmount();
      };
    },
    [props.mountingPoint, coreProps, handleAfterClose]
  );

  if (bottomSheetContentsWrapperRef.current) {
    // NOTE: Attach the user-provided content to the bottom sheet
    return createPortal(props.children, bottomSheetContentsWrapperRef.current);
  }
  return null;
});
