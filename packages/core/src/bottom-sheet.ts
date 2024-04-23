import "./style/pbs-root.css";
import "./style/pbs-backdrop.css";
import "./style/pbs-container.css";
import "./style/pbs-handle.css";
import "./style/pbs-content.css";

import { setVisibility } from "./utils/dom/visibility";
import { initializeBottomSheetElements } from "./initializer/bottom-sheet-initializer";
import { getTranslate, setTranslate } from "./utils/dom/translate";
import { AnimationFrame } from "./utils/animation/AnimationFrame";

import {
  calcDiffOfHeight,
  calcDirectionWithHeight,
  convertDefaultPositionToYCoordinate,
} from "./calculator/position-calculator";
import { translateContainer } from "./animation/animation";
import { BottomSheetState } from "./types/bottom-sheet-state.type";
import {
  BOTTOM_SHEET_POSITION,
  BottomSheetProps,
} from "./types/bottom-sheet-props.type";
import { DEFAULT_OPTIONS } from "./initializer/bottom-sheet-defaults";
import { BottomSheet } from "./types/bottom-sheet.type";
import { isPercent } from "./utils/types/isPercent";
import { toFixedNumber } from "./utils/math/unit";

export function createBottomSheet(props: BottomSheetProps): BottomSheet {
  // TODO: Set default props only when the prop is not provided.
  const propsWithDefaults = {
    ...props,
    ...DEFAULT_OPTIONS,
  };
  const {
    defaultPosition = DEFAULT_OPTIONS.defaultPosition,
    marginTop = DEFAULT_OPTIONS.marginTop,
  } = propsWithDefaults;

  // TODO: Make it a BottomSheetState.
  const animationFrame = new AnimationFrame();
  const initializerOptions = { animationFrame, onClose: close };
  const bottomSheetState: BottomSheetState = {
    isMounted: false,
  };

  const { elements, eventHandlers } = initializeBottomSheetElements(
    propsWithDefaults,
    initializerOptions
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

    Object.values(elements).forEach((el) => el.remove());

    bottomSheetState.isMounted = false;
  };

  const open = (): void => {
    props.beforeOpen?.();

    setVisibility([bottomSheetBackdrop, bottomSheetContainer], true);

    const startContainerY = getTranslate(bottomSheetContainer).y;

    const isOpen = getIsOpen();
    if (isOpen) {
      return;
    }

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
      marginTop,
      defaultPosition
    );

    translateContainer(
      startContainerY,
      endY,
      animationFrame,
      bottomSheetContainer,
      props.afterOpen
    );
  };

  function close() {
    props.beforeClose?.();

    setVisibility([bottomSheetBackdrop, bottomSheetContainer], false);

    const startY = getTranslate(bottomSheetContainer).y;
    const endY = bottomSheetContainer.clientHeight;

    translateContainer(
      startY,
      endY,
      animationFrame,
      bottomSheetContainer,
      props.afterClose
    );
  }

  function getIsMounted() {
    return bottomSheetState.isMounted;
  }

  function getIsOpen() {
    const containerY = getTranslate(bottomSheetContainer).y;
    return containerY < bottomSheetContainer.clientHeight;
  }
  function getIsClosed() {
    return !getIsOpen();
  }

  function getPosition() {
    const containerY = getTranslate(bottomSheetContainer).y;

    const containerHeight = bottomSheetContainer.clientHeight;
    const viewportHeight = window.innerHeight;

    if (containerY <= 5 && containerY >= -5) {
      // NOTE: Although it should be 0, the animation timing function might have caused incorrect end position.
      // So we use a rough assumption that the end position is around zero.
      // TODO: We should check if containerY is exactly zero, when the animation timing function is fixed.
      return BOTTOM_SHEET_POSITION.CONTENT_HEIGHT;
    }

    const visibleHeight = containerHeight - containerY;
    if (visibleHeight === viewportHeight / 2) {
      return BOTTOM_SHEET_POSITION.MIDDLE;
    }

    const visibleHeightAtTop = viewportHeight - marginTop;
    const animationErrorCompensation = 10;

    if (
      visibleHeight <= visibleHeightAtTop + animationErrorCompensation &&
      visibleHeight >= visibleHeightAtTop - animationErrorCompensation
    ) {
      return BOTTOM_SHEET_POSITION.TOP;
    }

    return BOTTOM_SHEET_POSITION.CLOSED;
  }

  function getHeight() {
    return bottomSheetContainer.clientHeight;
  }

  function moveTo(endY: number) {
    const containerY = getTranslate(bottomSheetContainer).y;
    const containerHeight = bottomSheetContainer.clientHeight;

    const visibleHeight = containerHeight - containerY;
    const visibleEndHeight = window.innerHeight - endY;
    const direction = calcDirectionWithHeight(visibleHeight, visibleEndHeight);
    const heightOffset = calcDiffOfHeight(visibleHeight, visibleEndHeight);

    translateContainer(
      containerY,
      containerY + (direction.isUp ? -heightOffset : heightOffset),
      animationFrame,
      bottomSheetContainer
    );
  }

  function snapTo(percent: number) {
    const viewportHeight = window.innerHeight;

    if (!isPercent(percent)) {
      return false;
    }

    const endY = toFixedNumber(viewportHeight * percent, 2);

    moveTo(endY);
  }

  return {
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
