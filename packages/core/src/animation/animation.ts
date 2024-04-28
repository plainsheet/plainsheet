import { spring } from "src/utils/animation/common-animations";
import { calcOffset } from "../calculator/position-calculator";
import { AnimationFrame } from "../utils/animation/AnimationFrame";
import { setTranslate } from "../utils/dom/translate";

export function translateContainer(
  startY: number,
  endY: number,
  animationFrame: AnimationFrame,
  bottomSheetContainer: HTMLElement,
  onEnd?: () => void
) {
  const offset = calcOffset(startY, endY);

  animationFrame.stop();

  animationFrame.start((progressPercent) => {
    setTranslate(bottomSheetContainer, {
      y: startY + offset * spring(progressPercent),
    });

    if (progressPercent === 1) {
      onEnd?.();
    }
  }, 200);
}
