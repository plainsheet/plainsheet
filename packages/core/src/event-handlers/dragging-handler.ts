import {
  calcDiffOfHeight,
  calcDraggingDirection,
  calcOffset,
} from "../calculator/position-calculator";
import { AnimationFrame } from "../utils/animation/AnimationFrame";
import { getTranslate, setTranslate } from "../utils/dom/translate";
import { isNumber } from "../utils/types/isNumber";
import { Coordinates, Position } from "../animation/animation.type";
import { TranslateContainer } from "../animation/animation";
import {
  TabEvent,
  TabEventListener,
} from "../utils/event-listeners/TabEventListener";
import { BottomSheetProps, SnapPoints } from "../types/bottom-sheet-props.type";
import { toFixedNumber } from "../utils/math/unit";
import { boundNumber } from "../utils/math/min-max";

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
    mouseEventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    bottomSheetProps: Required<BottomSheetProps>
  ) =>
  (event: TabEvent) => {
    draggingState.startY = mouseEventListener.getCoordinates(event).y;
    draggingState.containerStartTranslate = getTranslate(bottomSheetContainer);
    bottomSheetProps.onDragStart();
  };

export const handleDragMove =
  (
    mouseEventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    bottomSheetProps: Required<BottomSheetProps>,
    animationFrame: AnimationFrame,
    marginTop: number
  ) =>
  (event: TabEvent) => {
    moveSheetToPointer(
      event,
      mouseEventListener,
      bottomSheetProps,
      animationFrame,
      bottomSheetContainer,
      marginTop
    );
  };

function moveSheetToPointer(
  event: TabEvent,
  mouseEventListener: TabEventListener,
  bottomSheetProps: Required<BottomSheetProps>,
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
  const direction = calcDraggingDirection(draggingState.startY, endY);

  if (
    direction.isUp &&
    !bottomSheetProps.expandable &&
    visibleContainerHeight >= containerHeight
  ) {
    return;
  }

  animationFrame.start(() => {
    setTranslate(bottomSheetContainer, {
      y: draggingState.containerStartTranslate.y + offset,
    });
  }, 0);

  const draggableViewportHeight = viewportHeight - marginTop;
  const visibleContainerHeightWhenStarted =
    containerHeight - draggingState.containerStartTranslate.y;

  if (direction.isUp) {
    const totalTopGapLeft =
      draggableViewportHeight - visibleContainerHeightWhenStarted;
    const currentTopGapLeft = draggableViewportHeight - visibleContainerHeight;
    const draggingToTopProgress = boundNumber(
      1 - toFixedNumber(currentTopGapLeft / totalTopGapLeft, 2),
      {
        min: 0,
        max: 1,
      }
    );

    bottomSheetProps.onDragMove(direction, draggingToTopProgress);
  } else if (direction.isDown) {
    const draggingToBottomProgress = boundNumber(
      toFixedNumber(
        1 - visibleContainerHeight / visibleContainerHeightWhenStarted,
        2
      ),
      {
        min: 0,
        max: 1,
      }
    );

    bottomSheetProps.onDragMove(direction, draggingToBottomProgress);
  }
}

export const handleDragEnd =
  (
    eventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    bottomSheetProps: Required<BottomSheetProps>,
    animationFrame: AnimationFrame,
    snapPoints: SnapPoints,
    marginTop: number,
    onClose: () => void,
    translateContainer: TranslateContainer
  ) =>
  (event: TabEvent) => {
    if (!draggingState.isDragging) {
      return;
    }
    draggingState.isDragging = false;

    if (!isNumber(draggingState.startY)) {
      return;
    }

    bottomSheetProps.onDragEnd();

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

      const containerVisibleHeight = containerHeight + -containerEndY;
      if (
        !bottomSheetProps.expandable &&
        containerVisibleHeight >= containerHeight
      ) {
        return;
      }

      for (let snapPoint of snapPointsInAsc) {
        // The diff between endY and startY can not be used because
        // the contents can be dragged.
        const snapPointHeight = snapPoint * window.innerHeight;

        if (containerVisibleHeight <= snapPointHeight) {
          // snapPointHeight - containerVisibleHeight
          const visibleContainerAndSnapPointHeightOffset = calcDiffOfHeight(
            containerVisibleHeight,
            snapPointHeight
          );

          translateContainer({
            startY: containerEndY,
            endY: containerEndY - visibleContainerAndSnapPointHeightOffset,
            animationFrame,
            bottomSheetContainer,
          });

          return;
        }
      }

      // NOTE: Translate to the fully open position when it moves past all snap points.
      const topPointYLimit = -(viewportHeight - containerHeight) + marginTop;
      translateContainer({
        startY: containerEndY,
        endY: topPointYLimit,
        animationFrame,
        bottomSheetContainer,
      });
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

          translateContainer({
            startY: containerEndY,
            endY: containerEndY + visibleContainerAndSnapPointHeightOffset,
            animationFrame,
            bottomSheetContainer,
          });

          return;
        }
      }

      onClose();
    }
  };
