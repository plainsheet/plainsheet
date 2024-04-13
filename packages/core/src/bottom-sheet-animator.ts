import { calcOffset } from "./calculator/position-calculator";
import { AnimationFrame } from "./utils/animation/AnimationFrame";
import { spring } from "./utils/animation/cubic-bezier";
import { setTranslate } from "./utils/dom/translate";

export function translateContainer(
  startY: number,
  endY: number,
  animationFrame: AnimationFrame,
  bottomSheetContainer: HTMLElement
) {
  const offset = calcOffset(startY, endY);

  animationFrame.stop();

  animationFrame.start((progressPercent) => {
    setTranslate(bottomSheetContainer, {
      y: startY + offset * spring(progressPercent),
    });
  }, 200);
}
