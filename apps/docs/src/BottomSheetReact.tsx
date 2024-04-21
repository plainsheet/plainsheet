import {
  BottomSheet,
  createBottomSheet,
  createPlaceholderBottomSheet,
  BOTTOM_SHEET_SELECTORS,
} from "plain-bottom-sheet-core";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface BottomSheetReactProps {
  children: ReactNode;
  mountingPoint?: Element | null;
}

const placeholderBottomSheet = createPlaceholderBottomSheet();

// TODO: Make it a React component library.
export const BottomSheetReact = forwardRef<BottomSheet, BottomSheetReactProps>(
  function InnerBottomSheet(props, refToExpose) {
    const [bottomSheet, setBottomSheet] = useState<BottomSheet>(
      placeholderBottomSheet
    );
    const bottomSheetContentsWrapperRef = useRef<HTMLElement | null>(null);

    useImperativeHandle(
      refToExpose,
      () => {
        return bottomSheet;
      },
      [props, bottomSheet]
    );

    useEffect(function initiateBottomSheet() {
      const mountingPoint =
        props.mountingPoint === undefined || props.mountingPoint === null
          ? window.document.body
          : props.mountingPoint;
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

      // TODO: Initiate with user-provided props
      const bottomSheetInstance = createBottomSheet({
        content: "",
        snapPoints: [0.5],
      });
      bottomSheetInstance.mount(mountingPoint);

      setBottomSheet(bottomSheetInstance);

      bottomSheetContentsWrapperRef.current = document.querySelector(
        BOTTOM_SHEET_SELECTORS.CONTENTS_WRAPPER
      );

      return () => {
        bottomSheet.unmount();
      };
    }, []);

    return (
      <>
        {bottomSheetContentsWrapperRef.current &&
          createPortal(props.children, bottomSheetContentsWrapperRef.current)}
      </>
    );
  }
);
