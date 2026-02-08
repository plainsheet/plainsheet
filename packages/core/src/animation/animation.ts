import type { GetMutableKeys } from "@plainsheet/utility";
import type { AnimationTimingFunction } from "src/utils/animation/animation.type";
import { calcOffset } from "../calculator/position-calculator";
import type { AnimationFrame } from "../utils/animation/animation-frame";
import { setTranslate } from "../utils/dom/translate";
import type { StyleCreators } from "./animation.type";

export interface TranslateContainerParams {
  startY: number;
  endY: number;
  animationFrame: AnimationFrame;
  bottomSheetContainer: HTMLElement;
  onEnd?: () => void;
  animationTimingFunction: AnimationTimingFunction;
  /**
   * In Milliseconds.
   */
  animationDuration: number;
}
export type TranslateContainerParamsExceptAnimation = Omit<
  TranslateContainerParams,
  "animationTimingFunction" | "animationDuration"
>;

export type TranslateContainer = ReturnType<typeof translateContainerWithAnim>;

export function translateContainer(params: TranslateContainerParams): void {
  const {
    startY,
    endY,
    bottomSheetContainer,
    animationFrame,
    onEnd,
    animationTimingFunction,
    animationDuration,
  } = params;
  const offset = calcOffset(startY, endY);

  animationFrame.stop();

  let hasOnEndBeenCalled = false;

  animationFrame.start((progressPercent) => {
    setTranslate(bottomSheetContainer, {
      y: startY + offset * animationTimingFunction(progressPercent),
    });

    if (!hasOnEndBeenCalled && progressPercent >= 1) {
      onEnd?.();
      hasOnEndBeenCalled = true;
    }
  }, animationDuration);
}

export const translateContainerWithAnim =
  (animTimingFunction: AnimationTimingFunction, animDuration: number) =>
  (params: TranslateContainerParamsExceptAnimation) => {
    translateContainer({
      ...params,
      animationTimingFunction: animTimingFunction,
      animationDuration: animDuration,
    });
  };

export interface AnimateBackdropParams {
  backdrop: HTMLElement;
  styleCreators: StyleCreators;
  animationFrame: AnimationFrame;
  animationTimingFunction: AnimationTimingFunction;
  /**
   * In Milliseconds.
   */
  animationDuration: number;
  onEnd?: () => void;
}
export type AnimateBackdropParamsExceptAnimation = Omit<
  AnimateBackdropParams,
  "animationTimingFunction" | "animationDuration"
>;
export function animateBackdrop(params: AnimateBackdropParams): void {
  const {
    backdrop,
    animationFrame,
    animationTimingFunction,
    animationDuration,
    onEnd,
  } = params;

  animationFrame.stop();
  let hasOnEndBeenCalled = false;

  animationFrame.start((progressPercent) => {
    Object.entries(params.styleCreators).forEach(([key, valGetter]) => {
      backdrop.style[key as keyof GetMutableKeys<keyof CSSStyleDeclaration>] =
        valGetter(Number(animationTimingFunction(progressPercent).toFixed(2)));
    });

    if (!hasOnEndBeenCalled && progressPercent >= 1) {
      onEnd?.();
      hasOnEndBeenCalled = true;
    }
  }, animationDuration);
}
export const animateBackdropWithAnim =
  (animTimingFunction: AnimationTimingFunction, animDuration: number) =>
  (params: AnimateBackdropParamsExceptAnimation) => {
    animateBackdrop({
      ...params,
      animationTimingFunction: animTimingFunction,
      animationDuration: animDuration,
    });
  };
