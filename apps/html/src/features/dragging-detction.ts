import { createBottomSheet } from "plain-bottom-sheet-core";

export function setupDraggingDetection() {
  const bottomSheet = createBottomSheet({
    content: `<div class="dragging-detection"> 
            <h2>Drag it to the top!</h2> 
            <p>And see what happens. 👀</p>
        </div>`,
    onDragMove: (_, progress) => {
      const hue = Math.floor(progress * 360);
      document.body.style.backgroundColor = `hsl(${hue}deg 30% 60%)`;
    },
  });

  bottomSheet.mount();

  return {
    draggingDetectionBottomSheet: bottomSheet,
  };
}
