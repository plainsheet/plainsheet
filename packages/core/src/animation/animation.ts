import type { AnimationTimingFunction } from "src/utils/animation/animation.type";
import { calcOffset } from "../calculator/position-calculator";
import type { AnimationFrame } from "../utils/animation/animation-frame";
import { setTranslate } from "../utils/dom/translate";

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
