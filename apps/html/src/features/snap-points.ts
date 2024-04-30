import { createBottomSheet } from "plain-bottom-sheet-core";

let state = {
  step: 0,
  snapPoints: [0.3, 0.4, 0.6, 0.8],
};

export function setupSnapPoints() {
  const bottomSheet = createBottomSheet({
    content: `<div class="dragging-detection"> 
            <h2>Fill the inputs!</h2> 
            <input 
                id="input-step-0"
            />
            <input 
                id="input-step-1"
            />
            <input 
                id="input-step-2"
            />
            <input 
                id="input-step-3"
            />
        </div>`,
    snapPoints: state.snapPoints,
  });

  bottomSheet.mount();

  state.snapPoints.forEach((_, idx) => {
    document
      .querySelector<HTMLInputElement>(`#input-step-${idx}`)
      ?.addEventListener("focus", () => {
        state.step = idx;

        bottomSheet.snapTo(state.snapPoints[state.step]);
      });
  });

  return {
    snapPointsBottomSheet: bottomSheet,
  };
}
