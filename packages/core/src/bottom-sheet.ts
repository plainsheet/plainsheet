import "./bottom-sheet.css";
import { BottomSheetPosition, SnapPoints } from "./bottom-sheet.type";

import {
  calcContainerHeightExcludingFiller,
  calcContentWrapperBottomFillerHeight,
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
import { translateContainer } from "./utils/animation/translateContainer";

export interface BottomSheetProps {
  content: string;
  width?: string;
  marginTop?: number;
  defaultPosition?: BottomSheetPosition;
  snapPoints: SnapPoints;
}

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
}

export function CreateBottomSheet(props: BottomSheetProps): BottomSheet {
  const {
    defaultPosition = "middle",
    marginTop = 100,
    snapPoints = [0.2, 0.5, 0.65, 0.8],
  } = props;

  const {
    bottomSheetBackdrop,
    bottomSheetRoot,
    bottomSheetContainer,
    bottomSheetContentWrapper,
    bottomSheetHandle,
  } = initializeBottomSheetElements(props);

  const animationFrame = new AnimationFrame();
  const documentBodyMouseEventListener = new CrossPlatformMouseEventListener(
    window.document.body
  );
  const handleEventListener = new CrossPlatformMouseEventListener(
    bottomSheetHandle
  );

  const onDragStart: EventCallback = handleDragStart(
    documentBodyMouseEventListener,
    bottomSheetContainer
  );
  const onDragMove: EventCallback = handleDragMove(
    documentBodyMouseEventListener,
    animationFrame,
    bottomSheetContainer,
    marginTop
  );
  const onDragEnd: EventCallback = handleDragEnd(
    documentBodyMouseEventListener,
    snapPoints,
    bottomSheetContainer,
    animationFrame,
    close
  );

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
    documentBodyMouseEventListener.addEventListeners({
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
    documentBodyMouseEventListener.removeEventListeners({
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

    translateContainer(startY, endY, animationFrame, bottomSheetContainer);
  };

  function close() {
    setVisibility([bottomSheetBackdrop, bottomSheetContainer], false);

    const startY = getTranslate(bottomSheetContainer).y;
    const endY = bottomSheetContainer.clientHeight;

    translateContainer(startY, endY, animationFrame, bottomSheetContainer);
  }

  return {
    mount,
    unmount,
    open,
    close,
  };
}
