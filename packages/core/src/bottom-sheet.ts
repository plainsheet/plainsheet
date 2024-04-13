import "./style/pbs-root.css";
import "./style/pbs-backdrop.css";
import "./style/pbs-container.css";
import "./style/pbs-handle.css";
import "./style/pbs-content.css";

import { BottomSheetPosition, SnapPoints } from "./bottom-sheet.type";

import { setVisibility } from "./utils/dom/visibility";
import { initializeBottomSheetElements } from "./bottom-sheet-initializer";
import { getTranslate, setTranslate } from "./utils/dom/translate";
import { AnimationFrame } from "./utils/animation/AnimationFrame";

import { convertDefaultPositionToYCoordinate } from "./calculator/position-calculator";
import { translateContainer } from "./animation/animation";

export interface BottomSheetProps {
  content: string;
  width?: string;
  marginTop?: number;
  defaultPosition?: BottomSheetPosition;
  snapPoints?: SnapPoints;
}

export interface BottomSheet {
  mount: (mountingPoint?: Element) => void;
  unmount: () => void;
  open: () => void;
  close: () => void;
}

export function CreateBottomSheet(props: BottomSheetProps): BottomSheet {
  const {
    defaultPosition = "top",
    marginTop = 100,
    snapPoints = [0.5],
    width = "100%",
  } = props;

  const propsWithDefaults = {
    ...props,
    defaultPosition,
    marginTop,
    snapPoints,
    width,
  };

  const animationFrame = new AnimationFrame();
  const initializerOptions = { animationFrame, onClose: close };

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

    // Hides the bottom sheet, no matter how large the bottom sheet is.
    const viewportHeight = window.innerHeight;
    setTranslate(bottomSheetContainer, {
      y: viewportHeight,
    });

    eventHandlers.attachEventListeners();
  };

  const unmount = (): void => {
    bottomSheetRoot.remove();

    eventHandlers.clearEventListeners();
  };

  const open = (): void => {
    setVisibility([bottomSheetBackdrop, bottomSheetContainer], true);

    // Resets the position to the bottom of the viewport
    setTranslate(bottomSheetContainer, {
      y: bottomSheetContainer.clientHeight,
    });

    const startY = getTranslate(bottomSheetContainer).y;

    const viewportHeight = window.innerHeight;
    const endY = convertDefaultPositionToYCoordinate(
      viewportHeight,
      bottomSheetContainer.clientHeight,
      marginTop,
      defaultPosition
    );

    translateContainer(startY, endY, animationFrame, bottomSheetContainer);
  };

  function close() {
    setVisibility([bottomSheetBackdrop, bottomSheetContainer], false);

    const startY = getTranslate(bottomSheetContainer).y;

    const endY = bottomSheetContainer.clientHeight;

    translateContainer(startY, endY, animationFrame, bottomSheetContainer);
  }

  return {
    mount,
    unmount,
    open,
    close,
  };
}
