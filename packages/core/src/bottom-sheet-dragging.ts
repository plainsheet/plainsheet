import { calcDraggingDirection, calcOffset } from "./bottom-sheet-calculator";
import { SnapPoints } from "./bottom-sheet.type";
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
    bottomSheetContainer: HTMLElement,
    dragTopPointLimit: number
  ) =>
  (event: CrossPlatformMouseEvent) => {
    moveSheetToPointer(
      event,
      eventListener,
      animationFrame,
      bottomSheetContainer,
      dragTopPointLimit
    );
  };

function moveSheetToPointer(
  event: CrossPlatformMouseEvent,
  eventListener: CrossPlatformMouseEventListener,
  animationFrame: AnimationFrame,
  bottomSheetContainer: HTMLElement,
  dragTopPointLimit: number
) {
  if (!draggingState.isDragging) {
    return;
  }
  if (!isNumber(draggingState.startY)) {
    return;
  }

  const endY = eventListener.getCoordinates(event).y;
  if (endY <= dragTopPointLimit) {
    return;
  }

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
  (
    eventListener: CrossPlatformMouseEventListener,
    snapPoints: SnapPoints,
    bottomSheetContainer: HTMLElement,
    animationFrame: AnimationFrame,
    onClose: () => void
  ) =>
  (event: CrossPlatformMouseEvent) => {
    if (!draggingState.isDragging) {
      return;
    }
    draggingState.isDragging = false;

    if (!isNumber(draggingState.startY)) {
      return;
    }

    const startY = draggingState.startY;
    const endY = eventListener.getCoordinates(event).y;

    const containerEndY = getTranslate(bottomSheetContainer).y;

    const direction = calcDraggingDirection(startY, endY);

    if (direction.isUp) {
      const snapPointsInAsc = [...snapPoints].sort(
        (left, right) => left - right
      );

      for (let snapPoint of snapPointsInAsc) {
        const snapPointY = window.innerHeight - snapPoint * window.innerHeight;

        if (endY >= snapPointY) {
          const offset = calcOffset(containerEndY, snapPointY);
          animationFrame.start((progressPercent) => {
            setTranslate(bottomSheetContainer, {
              y: containerEndY + offset * progressPercent,
            });
          }, 300);

          return;
        }
      }

      const offset = calcOffset(containerEndY, 0);
      animationFrame.start((progressPercent) => {
        setTranslate(bottomSheetContainer, {
          y: containerEndY + offset * progressPercent,
        });
      }, 300);
    } else if (direction.isDown) {
      const snapPointsInDesc = [...snapPoints].sort(
        (left, right) => right - left
      );

      for (let snapPoint of snapPointsInDesc) {
        const snapPointY = window.innerHeight - snapPoint * window.innerHeight;

        if (endY <= snapPointY) {
          const offset = calcOffset(containerEndY, snapPointY);
          animationFrame.start((progressPercent) => {
            setTranslate(bottomSheetContainer, {
              y: containerEndY + offset * progressPercent,
            });
          }, 300);

          return;
        }
      }

      onClose();
    }
  };
