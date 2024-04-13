import {
  calcDraggingDirection,
  calcOffset,
} from "../calculator/position-calculator";
import { SnapPoints } from "../bottom-sheet.type";
import { AnimationFrame } from "../utils/animation/AnimationFrame";
import { getTranslate, setTranslate } from "../utils/dom/translate";
import {
  CrossPlatformMouseEvent,
  CrossPlatformMouseEventListener,
} from "../utils/event-listeners/CrossPlatformMouseEventListener";
import { isNumber } from "../utils/types/isNumber";
import { Coordinates, Position } from "src/animation/animation.type";
import { translateContainer } from "./animation";

interface DraggingState {
  /** @description Used to know how far the cursor moved. */
  startY: Position | null;

  /** @description Used to know where was the bottom sheet before dragging. */
  containerStartTranslate: Coordinates;

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
    mouseEventListener: CrossPlatformMouseEventListener,
    bottomSheetContainer: HTMLElement
  ) =>
  (event: CrossPlatformMouseEvent) => {
    draggingState.startY = mouseEventListener.getCoordinates(event).y;
    draggingState.containerStartTranslate = getTranslate(bottomSheetContainer);
  };

export const handleDragMove =
  (
    mouseEventListener: CrossPlatformMouseEventListener,
    bottomSheetContainer: HTMLElement,
    animationFrame: AnimationFrame,
    dragTopPointLimit: number
  ) =>
  (event: CrossPlatformMouseEvent) => {
    moveSheetToPointer(
      event,
      mouseEventListener,
      animationFrame,
      bottomSheetContainer,
      dragTopPointLimit
    );
  };

function moveSheetToPointer(
  event: CrossPlatformMouseEvent,
  mouseEventListener: CrossPlatformMouseEventListener,
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

  const endY = mouseEventListener.getCoordinates(event).y;
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
    bottomSheetContainer: HTMLElement,
    animationFrame: AnimationFrame,
    snapPoints: SnapPoints,
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

    /** @description An empty space between open container and the top of the viewport(props.marginTop). */
    // TODO: Receive it from the caller
    const dragTopPointLimit =
      window.innerHeight - bottomSheetContainer.clientHeight;

    if (direction.isUp) {
      const snapPointsInAsc = [...snapPoints].sort(
        (left, right) => left - right
      );

      for (let snapPoint of snapPointsInAsc) {
        //  NOTE: snapPointY is a position from the top of the viewport.
        //    window.innerHeight - (snapPoint * window.innerHeight)
        const snapPointY = Math.max(
          window.innerHeight - snapPoint * window.innerHeight,
          dragTopPointLimit
        );

        if (endY >= snapPointY) {
          translateContainer(
            containerEndY,
            snapPointY,
            animationFrame,
            bottomSheetContainer
          );

          return;
        }
      }

      // NOTE: Translate to the fully open position when it moves past all snap points.
      translateContainer(
        containerEndY,
        0,
        animationFrame,
        bottomSheetContainer
      );
    } else if (direction.isDown) {
      const snapPointsInDesc = [...snapPoints].sort(
        (left, right) => right - left
      );

      for (let snapPoint of snapPointsInDesc) {
        const snapPointY = window.innerHeight - snapPoint * window.innerHeight;

        if (endY <= snapPointY) {
          translateContainer(
            containerEndY,
            snapPointY,
            animationFrame,
            bottomSheetContainer
          );

          return;
        }
      }

      onClose();
    }
  };
