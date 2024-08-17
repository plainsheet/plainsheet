import "./style/pbs-root.css";
import "./style/pbs-backdrop.css";
import "./style/pbs-container.css";
import "./style/pbs-handle.css";
import "./style/pbs-content.css";

import { setVisibility } from "./utils/dom/visibility";
import { initializeBottomSheetElements } from "./initializer/bottom-sheet-initializer";
import { getTranslate, setTranslate } from "./utils/dom/translate";
import { AnimationFrame } from "./utils/animation/animation-frame";
import {
  calcDiffOfHeight,
  calcDirectionWithHeight,
  convertDefaultPositionToYCoordinate,
  extractPoints,
} from "./calculator/position-calculator";
import { translateContainerWithAnim } from "./animation/animation";
import type {
  BottomSheetState,
  DraggingState,
} from "./types/bottom-sheet-state.type";
import type {
  BottomSheetPosition,
  BottomSheetCoreProps,
  SnapPoints,
} from "./types/bottom-sheet-props.type";
import { BOTTOM_SHEET_POSITION } from "./types/bottom-sheet-props.type";
import type { BottomSheetCore } from "./types/bottom-sheet.type";
import { isPercent } from "./utils/types/is-percent";
import { toFixedNumber } from "./utils/math/unit";
import { observe } from "./utils/proxy/observe";
import { logError } from "./utils/log/log";
import {
  createPropSetHandler,
  interpretAnimationTimingsProp,
  overwriteDefaultProps,
} from "./initializer/bottom-sheet-props-initializer";
import { isNumber } from "./utils/types/is-number";

export function createBottomSheet(
  props: BottomSheetCoreProps
): BottomSheetCore {
  const propsWithDefaults = overwriteDefaultProps(props);

  const validDraggingAnimationTimings = interpretAnimationTimingsProp(
    props.draggingAnimationTimings
  );
  const translateContainer = translateContainerWithAnim(
    validDraggingAnimationTimings,
    propsWithDefaults.draggingAnimationDuration
  );

  const bottomSheetState: BottomSheetState = {
    isMounted: false,
    translateContainer,
  };
  const draggingState: DraggingState = {
    startY: null,
    containerStartTranslate: {
      x: 0,
      y: 0,
    },
    isDragging: false,
    originalDocumentOverflowY: null,
  } as const;
  function recoverDocumentOverflowY() {
    if (
      draggingState.originalDocumentOverflowY &&
      draggingState.originalDocumentOverflowY !== "hidden"
    ) {
      document.body.style.overflowY = draggingState.originalDocumentOverflowY;
    }
  }
  const animationFrame = new AnimationFrame();

  const initializerOptions = {
    animationFrame,
    onClose: close,
    bottomSheetState,
    draggingState,
    snapTo,
    moveUp,
    moveDown,
  };

  const { elements, eventHandlers } = initializeBottomSheetElements(
    propsWithDefaults,
    initializerOptions
  );

  const observedProps = observe(
    propsWithDefaults,
    createPropSetHandler(elements, bottomSheetState, propsWithDefaults)
  );

  const { bottomSheetBackdrop, bottomSheetRoot, bottomSheetContainer } =
    elements;

  const mount = (mountingPoint?: Element): void => {
    const mountingPointOrFallback = mountingPoint ?? window.document.body;
    mountingPointOrFallback.appendChild(bottomSheetRoot);
    mountingPointOrFallback.appendChild(bottomSheetBackdrop);

    const viewportHeight = window.innerHeight;
    setTranslate(bottomSheetContainer, {
      y: viewportHeight,
    });

    eventHandlers.attachEventListeners();

    bottomSheetState.isMounted = true;
  };

  const unmount = (): void => {
    eventHandlers.clearEventListeners();

    Object.values(elements).forEach((el: HTMLElement) => {
      el.remove();
    });

    recoverDocumentOverflowY();
    bottomSheetState.isMounted = false;
  };

  const open = (): void => {
    if (!getIsMounted()) {
      logError(
        'Bottom Sheet is not mounted yet. call the "mount" method first.'
      );
    }
    props.beforeOpen?.();

    const isOpen = getIsOpen();
    if (isOpen) {
      return;
    }

    if (observedProps.shouldShowBackdrop) {
      setVisibility(bottomSheetBackdrop, true);
    }
    setVisibility([bottomSheetContainer], true);
    // NOTE: Resets the position to the bottom of the viewport
    // Because it was pushed 100vh down below the viewport when it is mounted,
    // which will make the animation timing incorrect.
    setTranslate(bottomSheetContainer, {
      y: bottomSheetContainer.clientHeight,
    });

    const viewportHeight = window.innerHeight;
    const endY = convertDefaultPositionToYCoordinate(
      viewportHeight,
      bottomSheetContainer.clientHeight,
      observedProps.marginTop,
      observedProps.defaultPosition
    );

    const startContainerY = getTranslate(bottomSheetContainer).y;
    bottomSheetState.translateContainer({
      startY: startContainerY,
      endY,
      animationFrame,
      bottomSheetContainer,
      onEnd: props.afterOpen,
    });

    elements.bottomSheetHandle.focus();

    const originalOverflowY = document.body.style.overflowY;
    draggingState.originalDocumentOverflowY = originalOverflowY || "initial";

    document.body.style.overflowY = "hidden";
  };

  function close(): void {
    if (getIsClosed()) {
      return;
    }

    props.beforeClose?.();

    const startY = getTranslate(bottomSheetContainer).y;
    const endY = bottomSheetContainer.clientHeight;

    bottomSheetState.translateContainer({
      startY,
      endY,
      animationFrame,
      bottomSheetContainer,
      onEnd: () => {
        props.afterClose?.();
        setVisibility([bottomSheetBackdrop, bottomSheetContainer], false);
      },
    });

    recoverDocumentOverflowY();
  }

  function getIsMounted(): boolean {
    return bottomSheetState.isMounted;
  }

  function getIsOpen(): boolean {
    const containerY = getTranslate(bottomSheetContainer).y;

    const viewportHeight = window.innerHeight;
    const containerHeight =
      bottomSheetContainer.clientHeight >= viewportHeight
        ? viewportHeight
        : bottomSheetContainer.clientHeight;

    return containerY < containerHeight;
  }
  function getIsClosed(): boolean {
    return !getIsOpen();
  }

  function getPosition(): BottomSheetPosition {
    const containerY = getTranslate(bottomSheetContainer).y;

    const containerHeight = bottomSheetContainer.clientHeight;
    const viewportHeight = window.innerHeight;

    if (containerY <= 5 && containerY >= -5) {
      // NOTE: The animation timing function might produce end position that is not zero.
      // So we use a rough assumption that the end position is ±5.
      return BOTTOM_SHEET_POSITION.CONTENT_HEIGHT;
    }

    const visibleHeight = containerHeight - containerY;
    if (visibleHeight === viewportHeight / 2) {
      return BOTTOM_SHEET_POSITION.MIDDLE;
    }

    const visibleHeightAtTop = viewportHeight - observedProps.marginTop;
    const animationErrorCompensation = 10;

    if (
      visibleHeight <= visibleHeightAtTop + animationErrorCompensation &&
      visibleHeight >= visibleHeightAtTop - animationErrorCompensation
    ) {
      return BOTTOM_SHEET_POSITION.TOP;
    }

    return BOTTOM_SHEET_POSITION.CLOSED;
  }

  function getHeight(): number {
    return bottomSheetContainer.clientHeight;
  }

  function moveTo(endY: number): void {
    if (!getIsOpen()) {
      return;
    }

    const containerY = getTranslate(bottomSheetContainer).y;
    const containerHeight = bottomSheetContainer.clientHeight;

    const visibleHeight = containerHeight - containerY;
    const visibleEndHeight = window.innerHeight - endY;
    const direction = calcDirectionWithHeight(visibleHeight, visibleEndHeight);
    const heightOffset = calcDiffOfHeight(visibleHeight, visibleEndHeight);

    bottomSheetState.translateContainer({
      startY: containerY,
      endY: containerY + (direction.isUp ? -heightOffset : heightOffset),
      animationFrame,
      bottomSheetContainer,
    });
  }

  function getMinOffsetFromPoints(
    points: SnapPoints,
    {
      viewportHeight,
      visibleHeight,
    }: {
      viewportHeight: number;
      visibleHeight: number;
    }
  ): {
    minOffset: number | null;
  } {
    let minOffset = null;

    for (const snapPoint of points) {
      const snapPointHeight = snapPoint * viewportHeight;
      const visibleContainerAndSnapPointHeightOffset = calcDiffOfHeight(
        visibleHeight,
        snapPointHeight
      );

      if (
        minOffset === null ||
        visibleContainerAndSnapPointHeightOffset < minOffset
      ) {
        minOffset = visibleContainerAndSnapPointHeightOffset;
      }
    }

    return {
      minOffset,
    };
  }

  function moveUp(): void {
    const snapPointsFromBottom = [...observedProps.snapPoints].reverse();

    const containerY = getTranslate(bottomSheetContainer).y;
    const containerHeight = bottomSheetContainer.clientHeight;
    const visibleHeight = containerHeight - containerY;

    if (!observedProps.expandable && visibleHeight >= containerHeight) {
      return;
    }

    const viewportHeight = window.innerHeight;

    const snapPointsAboveBottomSheet = extractPoints(
      "above",
      { visibleHeight, viewportHeight },
      snapPointsFromBottom
    );
    const { minOffset } = getMinOffsetFromPoints(snapPointsAboveBottomSheet, {
      visibleHeight,
      viewportHeight,
    });

    if (
      minOffset === null &&
      visibleHeight < viewportHeight - observedProps.marginTop
    ) {
      bottomSheetState.translateContainer({
        startY: containerY,
        endY: convertDefaultPositionToYCoordinate(
          viewportHeight,
          containerHeight,
          observedProps.marginTop,
          "top"
        ),
        animationFrame,
        bottomSheetContainer,
      });
      return;
    }

    if (isNumber(minOffset)) {
      bottomSheetState.translateContainer({
        startY: containerY,
        endY: containerY - minOffset,
        animationFrame,
        bottomSheetContainer,
      });
    }
  }

  function moveDown(): void {
    const containerY = getTranslate(bottomSheetContainer).y;
    const containerHeight = bottomSheetContainer.clientHeight;
    const visibleHeight = containerHeight - containerY;

    if (visibleHeight < 1) {
      return;
    }

    const viewportHeight = window.innerHeight;

    const snapPointsBelowBottomSheet = extractPoints(
      "below",
      { visibleHeight, viewportHeight },
      observedProps.snapPoints
    );
    const { minOffset } = getMinOffsetFromPoints(snapPointsBelowBottomSheet, {
      visibleHeight,
      viewportHeight,
    });

    if (isNumber(minOffset)) {
      bottomSheetState.translateContainer({
        startY: containerY,
        endY: containerY + minOffset,
        animationFrame,
        bottomSheetContainer,
      });
    }
  }

  function snapTo(percent: number): void {
    const viewportHeight = window.innerHeight;

    if (!isPercent(percent)) {
      return;
    }

    const endY = toFixedNumber(viewportHeight * percent, 2);

    moveTo(endY);
  }

  return {
    props: observedProps,
    elements,
    mount,
    unmount,
    open,
    close,
    getIsMounted,
    getIsOpen,
    getIsClosed,
    getPosition,
    getHeight,
    moveTo,
    snapTo,
  };
}
