import {
  calcDiffOfHeight,
  calcDraggingDirection,
  calcOffset,
} from "../calculator/position-calculator";
import { SnapPoints } from "../bottom-sheet.type";
import { AnimationFrame } from "../utils/animation/AnimationFrame";
import { getTranslate, setTranslate } from "../utils/dom/translate";
import { isNumber } from "../utils/types/isNumber";
import { Coordinates, Position } from "src/animation/animation.type";
import { translateContainer } from "../animation/animation";
import {
  TabEvent,
  TabEventListener,
} from "src/utils/event-listeners/TabEventListener";

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
  (mouseEventListener: TabEventListener, bottomSheetContainer: HTMLElement) =>
  (event: TabEvent) => {
    draggingState.startY = mouseEventListener.getCoordinates(event).y;
    draggingState.containerStartTranslate = getTranslate(bottomSheetContainer);
  };

export const handleDragMove =
  (
    mouseEventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    animationFrame: AnimationFrame,
    marginTop: number
  ) =>
  (event: TabEvent) => {
    moveSheetToPointer(
      event,
      mouseEventListener,
      animationFrame,
      bottomSheetContainer,
      marginTop
    );
  };

function moveSheetToPointer(
  event: TabEvent,
  mouseEventListener: TabEventListener,
  animationFrame: AnimationFrame,
  bottomSheetContainer: HTMLElement,
  marginTop: number
) {
  if (!draggingState.isDragging) {
    return;
  }
  if (!isNumber(draggingState.startY)) {
    return;
  }

  const endY = mouseEventListener.getCoordinates(event).y;

  const offset = calcOffset(draggingState.startY, endY);

  const viewportHeight = window.innerHeight;
  const containerHeight = bottomSheetContainer.clientHeight;
  const visibleContainerHeight =
    containerHeight - (draggingState.containerStartTranslate.y + offset);

  if (visibleContainerHeight >= viewportHeight - marginTop) {
    return;
  }

  animationFrame.start(() => {
    setTranslate(bottomSheetContainer, {
      y: draggingState.containerStartTranslate.y + offset,
    });
  }, 0);

  // TODO: calculate the total draggable distance and the current dragged distance based on the direction of dragging, which can be derived from
  // where was the cursor when dragging started and where is the cursor now.
}

export const handleDragEnd =
  (
    eventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    animationFrame: AnimationFrame,
    snapPoints: SnapPoints,
    marginTop: number,
    onClose: () => void
  ) =>
  (event: TabEvent) => {
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

    const viewportHeight = window.innerHeight;
    const containerHeight = bottomSheetContainer.clientHeight;

    if (direction.isUp) {
      const snapPointsInAsc = [...snapPoints].sort(
        (left, right) => left - right
      );

      for (let snapPoint of snapPointsInAsc) {
        // The diff between endY and startY can not be used because
        // the contents can be dragged.
        const snapPointHeight = snapPoint * window.innerHeight;
        const containerVisibleHeight = containerHeight + -containerEndY;

        if (containerVisibleHeight <= snapPointHeight) {
          // snapPointHeight - containerVisibleHeight
          const visibleContainerAndSnapPointHeightOffset = calcDiffOfHeight(
            containerVisibleHeight,
            snapPointHeight
          );

          translateContainer(
            containerEndY,
            containerEndY - visibleContainerAndSnapPointHeightOffset,
            animationFrame,
            bottomSheetContainer
          );

          return;
        }
      }

      // NOTE: Translate to the fully open position when it moves past all snap points.
      const topPointYLimit = -(viewportHeight - containerHeight) + marginTop;
      translateContainer(
        containerEndY,
        topPointYLimit,
        animationFrame,
        bottomSheetContainer
      );
    } else if (direction.isDown) {
      const snapPointsInDesc = [...snapPoints].sort(
        (left, right) => right - left
      );

      for (let snapPoint of snapPointsInDesc) {
        const snapPointHeight = snapPoint * window.innerHeight;

        const containerVisibleHeight = containerHeight + -containerEndY;

        if (containerVisibleHeight >= snapPointHeight) {
          // containerVisibleHeight - snapPointHeight
          const visibleContainerAndSnapPointHeightOffset = calcDiffOfHeight(
            containerVisibleHeight,
            snapPointHeight
          );

          translateContainer(
            containerEndY,
            containerEndY + visibleContainerAndSnapPointHeightOffset,
            animationFrame,
            bottomSheetContainer
          );

          return;
        }
      }

      onClose();
    }
  };
