import { createBottomSheet } from "plain-bottom-sheet-core";

export function setupDraggingDetection() {
  const bottomSheet = createBottomSheet({
    content: `<div class="dragging-detection"> 
            <h2>Drag it to the top!</h2> 
            <p>And see what happens. 👀</p>
        </div>`,
    onDragMove: (_, progress) => {
      const hue = Math.floor(progress * 360);
      const degree = hue;
      document.body.style.background = `linear-gradient(${degree}deg, hsl(${hue}deg 30% 60%), hsl(${hue / 2}deg 30% 60%))`;
    },
    dragTriggers: [
      ".dragging-detection",
      ".dragging-detection > h2",
      ".dragging-detection > p",
    ],
    shouldShowBackdrop: false,
  });

  bottomSheet.mount();

  return {
    draggingDetectionBottomSheet: bottomSheet,
  };
}
