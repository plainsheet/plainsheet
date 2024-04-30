import "./style.css";
import { setupButton } from "./button.ts";
import { setupBlockingBottomSheet } from "./features/blocking-bottom-sheet.ts";
import { setupDraggingDetection } from "./features/dragging-detction.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Good old HTML Website Example</h1>
    <p>
      See how Plain Bottom Sheet can be used on a classic HTML website.
    </p>

    
    <h2> Try Them Out! ⬇️</h2>
    <div class="card">
      <button id="blocking-bottom-sheet-open-button" type="button">Blocking Bottom Sheet</button>

      <button id="dragging-detection-open-button" type="button">Dragging Detection</button>

      <button id="button-close" type="button">Life-cycle Events</button>

      <button id="button-close" type="button">Snap Points</button>
    </div>
  </div>
`;

const { blockingBottomSheet } = setupBlockingBottomSheet();
setupButton(
  document.querySelector<HTMLButtonElement>(
    "#blocking-bottom-sheet-open-button"
  )!,
  () => {
    blockingBottomSheet.open();
  }
);

// const { draggingDetectionBottomSheet } = setupDraggingDetection();
// setupButton(
//   document.querySelector<HTMLButtonElement>("#dragging-detection-open-button")!,
//   () => {
//     draggingDetectionBottomSheet.open();
//   }
// );
