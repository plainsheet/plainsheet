import "./bottom-sheet.css";
import { BottomSheetPosition } from "./bottom-sheet.type";

import {
  calcContainerHeightExcludingFiller,
  calcContentWrapperBottomFillerHeight,
  calcOffset,
  defaultPositionToYCoordinate,
} from "./bottom-sheet-calculator";
import { setVisibility } from "./utils/dom/visibility";
import { initializeBottomSheetElements } from "./bottom-sheet-initializer";
import {
  CrossPlatformMouseEventListener,
  EventCallback,
} from "./utils/event-listeners/CrossPlatformMouseEventListener";
import { getTranslate, setTranslate } from "./utils/dom/translate";
import { AnimationFrame } from "./utils/animation/AnimationFrame";
import {
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  handleDragTriggerClick,
} from "./bottom-sheet-dragging";

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

  const animationFrame = new AnimationFrame();
  const windowMouseEventListener = new CrossPlatformMouseEventListener(
    window.document.body
  );
  const handleEventListener = new CrossPlatformMouseEventListener(
    bottomSheetHandle
  );

  const onDragStart: EventCallback = handleDragStart(
    windowMouseEventListener,
    bottomSheetContainer
  );
  const onDragMove: EventCallback = handleDragMove(
    windowMouseEventListener,
    animationFrame,
    bottomSheetContainer
  );
  const onDragEnd: EventCallback = handleDragEnd(windowMouseEventListener);

  const mount = (mountingPoint?: Element): void => {
    // NOTE: Apply initial styles to elements.
    bottomSheetContainer.style.paddingBottom =
      calcContentWrapperBottomFillerHeight(
        bottomSheetContentWrapper,
        marginTop
      );

    // NOTE: Mount elements to the document.
    const mountingPointOrFallback = mountingPoint ?? window.document.body;
    mountingPointOrFallback.appendChild(bottomSheetRoot);
    mountingPointOrFallback.appendChild(bottomSheetBackdrop);
    setTranslate(bottomSheetContainer, {
      y: bottomSheetContainer.clientHeight,
    });

    handleEventListener.addEventListeners({
      onMove: handleDragTriggerClick,
    });
    windowMouseEventListener.addEventListeners({
      onStart: onDragStart,
      onMove: onDragMove,
      onEnd: onDragEnd,
    });
  };

  const unmount = (): void => {
    bottomSheetRoot.remove();

    handleEventListener.removeEventListeners({
      onMove: handleDragTriggerClick,
    });
    windowMouseEventListener.removeEventListeners({
      onStart: onDragStart,
      onMove: onDragMove,
      onEnd: onDragEnd,
    });
  };

  const open = (): void => {
    setVisibility([bottomSheetBackdrop, bottomSheetContainer], true);

    const startY = bottomSheetContainer.clientHeight;
    const endY = defaultPositionToYCoordinate(
      bottomSheetContainer,
      calcContainerHeightExcludingFiller(
        bottomSheetContentWrapper,
        bottomSheetHandle
      ),
      defaultPosition
    );

    animationFrame.stop();
    translateContainer(startY, endY);
  };

  const close = (): void => {
    setVisibility([bottomSheetBackdrop, bottomSheetContainer], false);

    const startY = getTranslate(bottomSheetContainer).y;
    const endY = bottomSheetContainer.clientHeight;

    animationFrame.stop();
    translateContainer(startY, endY);
  };

  function translateContainer(startY: number, endY: number) {
    const offset = calcOffset(startY, endY);

    animationFrame.start((progressPercent) => {
      setTranslate(bottomSheetContainer, {
        y: startY + offset * progressPercent,
      });
    }, 300);
  }

  return {
    mount,
    unmount,
    open,
    close,
  };
}
