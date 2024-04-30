// - Showing another bottom sheet after closing the current one.

import { createBottomSheet } from "plain-bottom-sheet-core";

export function setupLifeCycleEvents() {
  const firstBottomSheet = createBottomSheet({
    content: `<div class="life-cycle-event-one"> 
                <h2>Close It 1️⃣</h2> 
                <p>And see what happens. 👀</p>
            </div>`,
    beforeOpen: () => {
      alert("Opening the first bottom sheet!");
    },
    afterOpen: () => {
      alert("Opened the first bottom sheet!");
    },
    afterClose: () => {
      secondBottomSheet.open();
    },
  });

  const secondBottomSheet = createBottomSheet({
    content: `<div class="life-cycle-event-two"> 
            <h2>Close It 2️⃣</h2> 
            <p>And see what happens. 👀</p>
        </div>`,
    beforeClose: () => {
      alert("Closing the second bottom sheet!");
    },
    afterClose: () => {
      alert("Closed the second bottom sheet!");
    },
  });

  firstBottomSheet.mount();
  secondBottomSheet.mount();

  return {
    firstBottomSheet,
    secondBottomSheet,
  };
}
