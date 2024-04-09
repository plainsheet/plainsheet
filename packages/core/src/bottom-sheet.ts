import "./bottom-sheet.css";
import { BottomSheetData, BottomSheetPosition } from "./bottom-sheet.type";

import {
  calcContainerHeight,
  calcContentWrapperBottomFillerHeight,
  defaultPositionToYCoordinate,
} from "./bottom-sheet-calculator";
import { setElementVisibility } from "./utils/dom/setElementVisibility";
import { getTranslate, setTranslate } from "./utils/dom/transform";
import { initializeBottomSheetElements } from "./bottom-sheet-initializer";
import {
  CrossPlatformEventListener,
  EventCallback,
} from "./utils/event-listeners/CrossPlatformEventListener";

export interface BottomSheetProps {
  content: string;
  width?: string;
  marginTop?: number;
  defaultPosition?: BottomSheetPosition;
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
    bottomSheetContainer,
    bottomSheetContentWrapper,
    bottomSheetHandle,
  } = initializeBottomSheetElements(props);

  const bottomSheetData: BottomSheetData = {
    containerHeight: null,
  };

  // Event listeners
  const mouseEventListener = new CrossPlatformEventListener(window);

  let mouseMoveStartY = 0;
  const handleStart: EventCallback = (event) => {
    mouseMoveStartY = mouseEventListener.getCoordinates(event).y;
    console.log({ event, mouseMoveStartY });
  };
  const handleEnd: EventCallback = (event) => {
    const mouseMoveEndY = mouseEventListener.getCoordinates(event).y;
    const isUp = mouseMoveStartY < mouseMoveEndY;

    const offset = isUp
      ? -(mouseMoveStartY - mouseMoveEndY)
      : mouseMoveEndY - mouseMoveStartY;

    const prevTranslateY = getTranslate(bottomSheetContainer).y;
    setTranslate(bottomSheetContainer, { y: prevTranslateY + offset });
  };

  const mount = (mountingPoint?: Element): void => {
    // Style
    bottomSheetContainer.style.paddingBottom =
      calcContentWrapperBottomFillerHeight(
        bottomSheetContentWrapper,
        marginTop
      );
    bottomSheetData.containerHeight = calcContainerHeight(
      bottomSheetContentWrapper,
      bottomSheetHandle
    );

    // Mount
    const mountingPointOrFallback = mountingPoint ?? window.document.body;
    mountingPointOrFallback.appendChild(bottomSheetRoot);
    mountingPointOrFallback.appendChild(bottomSheetBackdrop);
    close();

    mouseEventListener.addEventListeners(handleStart, handleEnd);
  };

  const unmount = (): void => {
    bottomSheetRoot.remove();
    mouseEventListener.removeEventListeners(handleStart, handleEnd);

    // TODO: clean up timers, references, etc...
  };

  const open = (): void => {
    const yCoordinate = defaultPositionToYCoordinate(
      bottomSheetContainer,
      bottomSheetData,
      defaultPosition
    );
    setTranslate(bottomSheetContainer, { y: yCoordinate });

    setElementVisibility([bottomSheetBackdrop, bottomSheetContainer], true);
  };

  const close = (): void => {
    setTranslate(bottomSheetContainer, {
      y: bottomSheetContainer.clientHeight,
    });

    setElementVisibility([bottomSheetBackdrop, bottomSheetContainer], false);
  };

  return {
    mount,
    unmount,
    open,
    close,
  };
}
