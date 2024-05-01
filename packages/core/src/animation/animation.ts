import { calcOffset } from "../calculator/position-calculator";
import { AnimationFrame } from "../utils/animation/AnimationFrame";
import { setTranslate } from "../utils/dom/translate";
import { AnimationTimingFunction } from "src/utils/animation/animation.type";

export type TranslateContainerParams = {
  startY: number;
  endY: number;
  animationFrame: AnimationFrame;
  bottomSheetContainer: HTMLElement;
  onEnd?: () => void;
  animationTimingFunction: AnimationTimingFunction;
  /**
   * @description In Milliseconds.
   */
  animationDuration: number;
};
export type TranslateContainerParamsExceptAnimation = Omit<
  TranslateContainerParams,
  "animationTimingFunction" | "animationDuration"
>;

export type TranslateContainer = ReturnType<typeof translateContainerWithAnim>;

export function translateContainer(params: TranslateContainerParams) {
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

  let haveOnEndBeenCalled = false;
  animationFrame.start((progressPercent) => {
    setTranslate(bottomSheetContainer, {
      y: startY + offset * animationTimingFunction(progressPercent),
    });

    if (!haveOnEndBeenCalled && progressPercent >= 1) {
      onEnd?.();
      haveOnEndBeenCalled = true;
    }
  }, animationDuration);
}

export const translateContainerWithAnim =
  (animTimingFunction: AnimationTimingFunction, animDuration: number) =>
  (params: TranslateContainerParamsExceptAnimation) => {
    return translateContainer({
      ...params,
      animationTimingFunction: animTimingFunction,
      animationDuration: animDuration,
    });
  };
