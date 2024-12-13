import type {
  BottomSheetCoreProps,
  BottomSheetState,
  RequiredBottomSheetProps,
} from "src/types";
import type { AnimationTimingFunction } from "src/utils";
import {
  isAnimationTimingPoints,
  isCommonAnimationTimingsKey,
} from "src/utils";
import {
  commonAnimationTimingsNameToFunction,
  easeOut,
} from "src/utils/animation/common-animations";
import { isString } from "src/utils/types/is-string";
import { isBoolean } from "src/utils/types/is-boolean";
import { replaceClassName } from "src/utils/dom/class-names";
import { translateContainerWithAnim } from "src/animation/animation";
import { isNumber } from "src/utils/types/is-number";
import { setHiddenClass } from "src/utils/dom/visibility";
import type { ObserverSetHandler } from "src/utils/proxy/observe";
import { cubicBezier } from "../utils/animation/cubic-bezier";
import { exists } from "../utils/types/exists";
import { BOTTOM_SHEET_DEFAULT_PROPS } from "./bottom-sheet-defaults";
import type {
  BottomSheetElements,
  InitializeEventsReturnType,
} from "./bottom-sheet-initializer";
import { initializeBorderRadius } from "./style/style-initializer";

export function overwriteDefaultProps(
  props: BottomSheetCoreProps
): RequiredBottomSheetProps {
  const propsWithDefaults: RequiredBottomSheetProps = {
    ...BOTTOM_SHEET_DEFAULT_PROPS,
  };

  const providedProps = Object.entries(props).reduce<Record<string, unknown>>(
    (acc, curr) => {
      const [propKey, propValue] = curr;
      if (exists(propValue)) {
        acc[propKey] = propValue;
      }

      return acc;
    },
    {}
  );

  const validProps = {
    ...propsWithDefaults,
    ...providedProps,
  };

  return validProps;
}

export function interpretAnimationTimingsProp(
  draggingAnimationTimings: BottomSheetCoreProps["draggingAnimationTimings"]
): AnimationTimingFunction {
  if (isAnimationTimingPoints(draggingAnimationTimings)) {
    const { p1x, p1y, p2x, p2y } = draggingAnimationTimings;
    return cubicBezier(p1x, p1y, p2x, p2y);
  }

  if (isCommonAnimationTimingsKey(draggingAnimationTimings)) {
    return commonAnimationTimingsNameToFunction(draggingAnimationTimings);
  }

  return easeOut;
}

export function createPropSetHandler(
  elements: BottomSheetElements,
  bottomSheetState: BottomSheetState,
  propsWithDefaults: Required<BottomSheetCoreProps>,
  eventHandlers: InitializeEventsReturnType
): ObserverSetHandler {
  function handlePropSet(property: string | symbol, value: unknown): void {
    switch (property) {
      case "content":
        if (isString(value)) {
          // TODO: sanitize it.
          elements.bottomSheetContentWrapper.innerHTML = value;
        }
        break;
      case "width":
        if (isString(value)) {
          elements.bottomSheetContainer.style.width = value;
        }
        break;
      case "shouldShowHandle":
        if (!isBoolean(value)) {
          setHiddenClass(elements.bottomSheetHandle, false);
        }
        break;
      case "shouldShowBackdrop":
        if (!isBoolean(value)) {
          setHiddenClass(elements.bottomSheetBackdrop, false);
        }
        break;
      case "containerBorderRadius":
        if (isString(value)) {
          elements.bottomSheetContainer.style.borderRadius =
            initializeBorderRadius(value);
        }
        break;
      case "backdropColor":
        if (isString(value)) {
          elements.bottomSheetBackdrop.style.backgroundColor = value;
        }
        break;
      case "backDropTransition":
        if (isString(value)) {
          elements.bottomSheetBackdrop.style.transition = value;
        }
        break;
      case "rootClass":
        if (!isString(value)) {
          return;
        }
        replaceClassName(
          elements.bottomSheetRoot,
          propsWithDefaults.rootClass,
          value
        );
        break;
      case "containerClass":
        if (!isString(value)) {
          return;
        }
        replaceClassName(
          elements.bottomSheetContainer,
          propsWithDefaults.containerClass,
          value
        );
        break;
      case "handleClass":
        if (!isString(value)) {
          return;
        }
        replaceClassName(
          elements.bottomSheetHandle,
          propsWithDefaults.handleClass,
          value
        );
        break;
      case "contentWrapperClass":
        if (!isString(value)) {
          return;
        }
        replaceClassName(
          elements.bottomSheetContentWrapper,
          propsWithDefaults.contentWrapperClass,
          value
        );
        break;
      case "backdropClass":
        if (!isString(value)) {
          return;
        }
        replaceClassName(
          elements.bottomSheetBackdrop,
          propsWithDefaults.backdropClass,
          value
        );
        break;
      case "expandable":
        eventHandlers.clearEventListeners();
        eventHandlers.attachEventListeners(propsWithDefaults);
        break;
      case "preventClosing":
        eventHandlers.clearEventListeners();
        eventHandlers.attachEventListeners(propsWithDefaults);
        break;
      case "draggable":
        eventHandlers.clearEventListeners();
        eventHandlers.attachEventListeners(propsWithDefaults);
        break;
      case "draggingAnimationTimings":
        if (isAnimationTimingPoints(value)) {
          const validDraggingAnimationTimings =
            interpretAnimationTimingsProp(value);
          const translateContainer = translateContainerWithAnim(
            validDraggingAnimationTimings,
            propsWithDefaults.draggingAnimationDuration
          );
          bottomSheetState.translateContainer = translateContainer;
        }
        break;
      case "draggingAnimationDuration":
        if (isNumber(value)) {
          const validDraggingAnimationTimings = interpretAnimationTimingsProp(
            propsWithDefaults.draggingAnimationTimings
          );

          const translateContainer = translateContainerWithAnim(
            validDraggingAnimationTimings,
            value
          );
          bottomSheetState.translateContainer = translateContainer;
        }
        break;
      case "rootStyle":
        if (propsWithDefaults.rootStyle) {
          Object.assign(
            elements.bottomSheetRoot.style,
            propsWithDefaults.rootStyle
          );
        }
        break;
      case "backdropStyle":
        if (propsWithDefaults.backdropStyle) {
          Object.assign(
            elements.bottomSheetBackdrop.style,
            propsWithDefaults.backdropStyle
          );
        }
        break;
      case "containerStyle":
        if (propsWithDefaults.containerStyle) {
          Object.assign(
            elements.bottomSheetContainer.style,
            propsWithDefaults.containerStyle
          );
        }
        break;
      case "handleStyle":
        if (propsWithDefaults.handleStyle) {
          Object.assign(
            elements.bottomSheetHandleBar.style,
            propsWithDefaults.handleStyle
          );
        }
        break;
      case "contentWrapperStyle":
        if (propsWithDefaults.contentWrapperStyle) {
          Object.assign(
            elements.bottomSheetContentWrapper.style,
            propsWithDefaults.contentWrapperStyle
          );
        }
        break;
      default:
        break;
    }
  }

  return handlePropSet;
}
