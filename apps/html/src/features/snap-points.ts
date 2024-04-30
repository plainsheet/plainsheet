import { createBottomSheet } from "plain-bottom-sheet-core";

let state = {
  step: 0,
  snapPoints: [0.3, 0.4, 0.6, 0.8],
};

export function setupSnapPoints() {
  const bottomSheet = createBottomSheet({
    content: `<div class="dragging-detection"> 
            <h2>Focus on the inputs 🎯</h2> 
            <div>
              <label for="input-step-0">First Input</label>
              <input 
                id="input-step-0"
              />
            </div>

            <div>
              <label for="input-step-1">Second Input</label>
              <input 
              id="input-step-1"
              />
            </div>

            <div>
              <label for="input-step-2">Third Input</label>
              <input 
                  id="input-step-2"
              />
            </div>

            <div>
              <label for="input-step-3">Last Input</label>
              <input 
              id="input-step-3"
              />
            </div>
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

  document
    .querySelector<HTMLInputElement>(`#input-step-3`)
    ?.addEventListener("blur", () => {
      bottomSheet.close();
    });

  return {
    snapPointsBottomSheet: bottomSheet,
  };
}
