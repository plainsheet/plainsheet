import { calcOffset } from "./bottom-sheet-calculator";
import { AnimationFrame } from "./utils/animation/AnimationFrame";
import { setTranslate } from "./utils/dom/translate";
import {
  CrossPlatformEventListener,
  CrossPlatFormMouseEvent,
} from "./utils/event-listeners/CrossPlatformEventListener";
import { isNumber } from "./utils/types/isNumber";

interface DraggingState {
  startY: number | null;
  isDragging: boolean;
}
const draggingState: DraggingState = {
  startY: null,
  isDragging: false,
} as const;

export const handleDragStart =
  (eventListener: CrossPlatformEventListener) =>
  (event: CrossPlatFormMouseEvent) => {
    draggingState.startY = eventListener.getCoordinates(event).y;
    draggingState.isDragging = true;
  };

export const handleDragMove =
  (
    eventListener: CrossPlatformEventListener,
    animationFrame: AnimationFrame,
    bottomSheetContainer: HTMLElement
  ) =>
  (event: CrossPlatFormMouseEvent) => {
    moveSheetToPointer(
      event,
      eventListener,
      animationFrame,
      bottomSheetContainer
    );
  };

function moveSheetToPointer(
  event: CrossPlatFormMouseEvent,
  eventListener: CrossPlatformEventListener,
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
      y: draggingState.startY + offset,
    });
  }, 0);
}

export const handleDragEnd =
  (eventListener: CrossPlatformEventListener) =>
  (event: CrossPlatFormMouseEvent) => {
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
