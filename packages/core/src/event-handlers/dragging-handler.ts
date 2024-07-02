import type { BottomSheetState, DraggingState } from "src/types";
import { ClassNames } from "src/class-names";
import { hasClassName } from "src/utils/dom/class-names";
import {
  calcDiffOfHeight,
  calcDraggingDirection,
  calcOffset,
} from "../calculator/position-calculator";
import type { AnimationFrame } from "../utils/animation/animation-frame";
import { getTranslate, setTranslate } from "../utils/dom/translate";
import { isNumber } from "../utils/types/is-number";
import type {
  TabEvent,
  TabEventListener,
} from "../utils/event-listeners/TabEventListener";
import type { BottomSheetProps } from "../types/bottom-sheet-props.type";
import { toFixedNumber } from "../utils/math/unit";
import { boundNumber } from "../utils/math/min-max";

export const handleDragTriggerClick = (
  draggingState: DraggingState,
  eventTrigger: EventTarget | null,
  contentWrapper: HTMLElement
): void => {
  if (
    eventTrigger instanceof HTMLElement &&
    !hasClassName(eventTrigger, ClassNames.Handle)
  ) {
    // Bottom sheet can't be dragged by its content when the content is scrolled.
    if (contentWrapper.scrollTop >= 1) {
      return;
    }
  }

  draggingState.isDragging = true;
};

export const handleDragStart =
  (
    mouseEventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    bottomSheetProps: Required<BottomSheetProps>,
    draggingState: DraggingState
  ) =>
  (event: TabEvent) => {
    draggingState.startY = mouseEventListener.getCoordinates(event).y;
    draggingState.containerStartTranslate = getTranslate(bottomSheetContainer);

    draggingState.originalDocumentOverflowY = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";

    bottomSheetProps.onDragStart();
  };

export const handleDragMove =
  (
    mouseEventListener: TabEventListener,
    bottomSheetContainer: HTMLElement,
    bottomSheetProps: Required<BottomSheetProps>,
    draggingState: DraggingState,
    animationFrame: AnimationFrame
  ) =>
  (event: TabEvent) => {
    moveSheetToPointer(
      event,
      mouseEventListener,
      bottomSheetProps,
      draggingState,
      animationFrame,
      bottomSheetContainer,
      bottomSheetProps.marginTop
    );
  };

function moveSheetToPointer(
  event: TabEvent,
  mouseEventListener: TabEventListener,
  bottomSheetProps: Required<BottomSheetProps>,
  draggingState: DraggingState,
  animationFrame: AnimationFrame,
  bottomSheetContainer: HTMLElement,
  marginTop: number
): void {
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

  if (visibleContainerHeight >= viewportHeight) {
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
    draggingState: DraggingState,
    animationFrame: AnimationFrame,
    onClose: () => void,
    bottomSheetState: BottomSheetState
  ) =>
  (event: TabEvent) => {
    if (!draggingState.isDragging) {
      return;
    }
    draggingState.isDragging = false;
    document.body.style.overflowY = draggingState.originalDocumentOverflowY;

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
      const snapPointsInAsc = [...bottomSheetProps.snapPoints].sort(
        (left, right) => left - right
      );

      const containerVisibleHeight = containerHeight + -containerEndY;
      if (
        !bottomSheetProps.expandable &&
        containerVisibleHeight >= containerHeight
      ) {
        return;
      }

      for (const snapPoint of snapPointsInAsc) {
        // The diff between endY and startY can not be used because
        // the contents can be dragged.
        const snapPointHeight = snapPoint * window.innerHeight;

        if (containerVisibleHeight <= snapPointHeight) {
          // snapPointHeight - containerVisibleHeight
          const visibleContainerAndSnapPointHeightOffset = calcDiffOfHeight(
            containerVisibleHeight,
            snapPointHeight
          );

          bottomSheetState.translateContainer({
            startY: containerEndY,
            endY: containerEndY - visibleContainerAndSnapPointHeightOffset,
            animationFrame,
            bottomSheetContainer,
          });

          return;
        }
      }

      // NOTE: Translate to the fully open position when it moves past all snap points.
      const topPointYLimit =
        -(viewportHeight - containerHeight) + bottomSheetProps.marginTop;
      bottomSheetState.translateContainer({
        startY: containerEndY,
        endY: topPointYLimit,
        animationFrame,
        bottomSheetContainer,
      });
    } else if (direction.isDown) {
      const snapPointsInDesc = [...bottomSheetProps.snapPoints].sort(
        (left, right) => right - left
      );

      for (const snapPoint of snapPointsInDesc) {
        const snapPointHeight = snapPoint * window.innerHeight;

        const containerVisibleHeight = containerHeight + -containerEndY;

        if (containerVisibleHeight >= snapPointHeight) {
          // containerVisibleHeight - snapPointHeight
          const visibleContainerAndSnapPointHeightOffset = calcDiffOfHeight(
            containerVisibleHeight,
            snapPointHeight
          );

          bottomSheetState.translateContainer({
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
