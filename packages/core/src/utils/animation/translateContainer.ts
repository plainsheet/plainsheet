import { calcOffset } from "../../bottom-sheet-calculator";
import { setTranslate } from "../dom/translate";
import { AnimationFrame } from "./AnimationFrame";

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
      y: startY + offset * progressPercent,
    });
  }, 300);
}
