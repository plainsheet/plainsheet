import { calcOffset } from "./bottom-sheet-calculator";
import { AnimationFrame } from "./utils/animation/AnimationFrame";
import { getTranslate, setTranslate } from "./utils/dom/translate";
import {
  CrossPlatformMouseEvent,
  CrossPlatformMouseEventListener,
} from "./utils/event-listeners/CrossPlatformMouseEventListener";
import { isNumber } from "./utils/types/isNumber";

interface DraggingState {
  startY: number | null;
  containerStartTranslate: {
    x: number;
    y: number;
  };
  isDragging: boolean;
}
const draggingState: DraggingState = {
  startY: null,
  containerStartTranslate: {
    x: 0,
    y: 0,
  },
  isDragging: false,
} as const;

export const handleDragTriggerClick = () => {
  draggingState.isDragging = true;
};

export const handleDragStart =
  (
    eventListener: CrossPlatformMouseEventListener,
    bottomSheetContainer: HTMLElement
  ) =>
  (event: CrossPlatformMouseEvent) => {
    draggingState.startY = eventListener.getCoordinates(event).y;
    draggingState.containerStartTranslate = getTranslate(bottomSheetContainer);
  };

export const handleDragMove =
  (
    eventListener: CrossPlatformMouseEventListener,
    animationFrame: AnimationFrame,
    bottomSheetContainer: HTMLElement
  ) =>
  (event: CrossPlatformMouseEvent) => {
    moveSheetToPointer(
      event,
      eventListener,
      animationFrame,
      bottomSheetContainer
    );
  };

function moveSheetToPointer(
  event: CrossPlatformMouseEvent,
  eventListener: CrossPlatformMouseEventListener,
  animationFrame: AnimationFrame,
  bottomSheetContainer: HTMLElement
) {
  if (!draggingState.isDragging) {
    return;
  }
  if (!isNumber(draggingState.startY)) {
    return;
  }

  const endY = eventListener.getCoordinates(event).y;
  const offset = calcOffset(draggingState.startY, endY);

  animationFrame.start(() => {
    if (!isNumber(draggingState.startY)) {
      return;
    }
    setTranslate(bottomSheetContainer, {
      y: draggingState.containerStartTranslate.y + offset,
    });
  }, 0);
}

export const handleDragEnd =
  (eventListener: CrossPlatformMouseEventListener) =>
  (event: CrossPlatformMouseEvent) => {
    if (!draggingState.isDragging) {
      return;
    }

    draggingState.isDragging = false;

    if (!isNumber(draggingState.startY)) {
      return;
    }

    const endY = eventListener.getCoordinates(event).y;
    const offset = calcOffset(draggingState.startY, endY);

    // translateValue = { y: startY + offset };
  };

// Snapping logic
//   const snapPointY =
//   (snapPoints.at(0) as number) * bottomSheetContainer.clientHeight;

// if (mouseMoveEndY <= snapPointY) {
//   const isUp = mouseMoveStartY < snapPointY;
//   const offsetToSnap = isUp
//     ? -(mouseMoveStartY - snapPointY)
//     : mouseMoveEndY - mouseMoveStartY;
//   translateValue = { y: mouseMoveStartY + offsetToSnap };
// }
