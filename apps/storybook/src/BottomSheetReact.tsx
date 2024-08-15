import {
  BottomSheet,
  createBottomSheet,
  createPlaceholderBottomSheet,
  BOTTOM_SHEET_SELECTORS,
  BottomSheetProps,
} from "@plainsheet/plain-bottom-sheet-core";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface PlainBottomSheetProps {
  children: ReactNode;
  mountingPoint?: Element | null;
  options?: BottomSheetProps;
}

const placeholderBottomSheet = createPlaceholderBottomSheet();

// TODO: Make it a React component library.
export const BottomSheetReact = forwardRef<BottomSheet, PlainBottomSheetProps>(
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

    useEffect(
      function initiateBottomSheet() {
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
          content: props.options?.content ?? "",
          ...props.options,
        });
        bottomSheetInstance.mount(mountingPoint);

        setBottomSheet(bottomSheetInstance);

        bottomSheetContentsWrapperRef.current = document.querySelector(
          BOTTOM_SHEET_SELECTORS.CONTENTS_WRAPPER
        );

        return () => {
          bottomSheet.unmount();
        };
      },
      [props.mountingPoint, props.options, props.options?.content]
    );

    return (
      <>
        {bottomSheetContentsWrapperRef.current &&
          createPortal(props.children, bottomSheetContentsWrapperRef.current)}
      </>
    );
  }
);
