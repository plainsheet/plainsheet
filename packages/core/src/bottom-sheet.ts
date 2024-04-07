import "./bottom-sheet.css";
import {
  addClassName,
  mergeClassNames,
  removeClassName,
} from "./utils/css/classNames";
import { createElement } from "./utils/dom/createElement";

export interface BottomSheetProps {
  content: string;
  width?: string;
  marginTop?: number;
  defaultPosition?: BottomSheetPosition;
}

export type BottomSheetPosition = "top" | "middle" | "content-height";

enum ClassNames {
  Backdrop = "pbs-backdrop",

  Root = "pbs-root",
  Sheet = "pbs-sheet",

  Handle = "pbs-handle",
  HandleBar = "pbs-handle-bar",

  ContentWrapper = "pbs-content-wrapper",
}

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
}

export function CreateBottomSheet(props: BottomSheetProps): BottomSheet {
  const { defaultPosition = "middle", marginTop = 100 } = props;

  const {
    bottomSheetBackdrop,
    bottomSheetRoot,
    bottomSheetSheet,
    bottomSheetContentWrapper,
    bottomSheetHandle,
  } = initializeBottomSheet(props);

  // TODO: Use a class
  const bottomSheetData: {
    sheetHeight: number | null;
  } = {
    sheetHeight: null,
  };

  const mount = (mountingPoint?: Element): void => {
    const mountingPointOrFallback = mountingPoint ?? window.document.body;

    mountingPointOrFallback.appendChild(bottomSheetRoot);
    mountingPointOrFallback.appendChild(bottomSheetBackdrop);

    // TODO: setup event-listeners

    const viewportHeight = window.innerHeight;

    console.log({ viewportHeight });

    bottomSheetSheet.style.paddingBottom = `${viewportHeight - bottomSheetContentWrapper.clientHeight - marginTop}px`;

    bottomSheetData.sheetHeight =
      bottomSheetContentWrapper.clientHeight + bottomSheetHandle.clientHeight;

    close();
  };

  const unmount = (): void => {
    bottomSheetRoot.remove();
    // TODO: remove event-listeners, timers, references, etc...
  };

  function defaultPositionToYCoordinate(position: BottomSheetPosition) {
    switch (position) {
      case "content-height":
        return (
          bottomSheetSheet.clientHeight - (bottomSheetData?.sheetHeight ?? 0)
        );
      case "middle":
        return (
          bottomSheetSheet.clientHeight / 2 -
          (bottomSheetData?.sheetHeight ?? 0)
        );
      case "top":
        return 0;
      default:
        return 0;
    }
  }
  const open = (): void => {
    const yCoordinate = defaultPositionToYCoordinate(defaultPosition);
    bottomSheetSheet.style.transform = `translate(0, ${yCoordinate}px)`;

    addClassName(bottomSheetBackdrop, "open");
  };

  const close = (): void => {
    bottomSheetSheet.style.transform = `translate(0, ${bottomSheetSheet.clientHeight}px)`;
    removeClassName(bottomSheetBackdrop, "open");
  };

  return {
    mount,
    unmount,
    open,
    close,
  };

  function initializeBottomSheet(props: BottomSheetProps) {
    const { content = "" } = props;

    const bottomSheetRoot = createElement(
      "dialog",
      mergeClassNames([ClassNames.Root, "root-reset-style"])
    );

    const bottomSheetSheet = createElement("section", ClassNames.Sheet);

    const bottomSheetHandle = createElement("button", ClassNames.Handle);

    const bottomSheetHandleBar = createElement("span", ClassNames.HandleBar);

    bottomSheetHandle.appendChild(bottomSheetHandleBar);

    const bottomSheetContentWrapper = createElement(
      "article",
      ClassNames.ContentWrapper
    );

    bottomSheetRoot.appendChild(bottomSheetSheet);

    bottomSheetSheet.appendChild(bottomSheetHandle);
    bottomSheetSheet.appendChild(bottomSheetContentWrapper);

    // TODO: Sanitize the content.
    const contentElement = document.createElement("div");
    contentElement.innerHTML = content;
    bottomSheetContentWrapper.appendChild(contentElement);

    // TODO: Use a better html element for the backdrop.
    const bottomSheetBackdrop = createElement("div", ClassNames.Backdrop);

    return {
      bottomSheetRoot,
      bottomSheetBackdrop,
      bottomSheetSheet,
      bottomSheetHandle,
      bottomSheetContentWrapper,
    };
  }

  // TODO: Methods to expose
  // setPosition: (position) => void

  // TODO: Properties to expose
  // getSize
  // getPosition
}
