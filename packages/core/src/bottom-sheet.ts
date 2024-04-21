import "./style/pbs-root.css";
import "./style/pbs-backdrop.css";
import "./style/pbs-container.css";
import "./style/pbs-handle.css";
import "./style/pbs-content.css";

import { setVisibility } from "./utils/dom/visibility";
import { initializeBottomSheetElements } from "./initializer/bottom-sheet-initializer";
import { getTranslate, setTranslate } from "./utils/dom/translate";
import { AnimationFrame } from "./utils/animation/AnimationFrame";

import { convertDefaultPositionToYCoordinate } from "./calculator/position-calculator";
import { translateContainer } from "./animation/animation";
import { BottomSheetState } from "./types/bottom-sheet-state.type";
import { BottomSheetProps } from "./types/bottom-sheet-props.type";
import { DEFAULT_OPTIONS } from "./initializer/bottom-sheet-defaults";
import { BottomSheet } from "./types/bottom-sheet.type";

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

  // Make it a BottomSheetState.
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
      bottomSheetContainer
    );
  };

  function close() {
    setVisibility([bottomSheetBackdrop, bottomSheetContainer], false);

    const startY = getTranslate(bottomSheetContainer).y;
    const endY = bottomSheetContainer.clientHeight;

    translateContainer(startY, endY, animationFrame, bottomSheetContainer);
  }

  function getIsMounted() {
    return bottomSheetState.isMounted;
  }
  function getIsOpen() {
    const startContainerY = getTranslate(bottomSheetContainer).y;
    return startContainerY < bottomSheetContainer.clientHeight;
  }

  return {
    mount,
    unmount,
    open,
    close,
    getIsMounted,
  };
}
