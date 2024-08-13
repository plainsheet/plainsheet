import { createBottomSheet } from "@plainsheet/plain-bottom-sheet-core";

export function setupBlockingBottomSheet() {
  const bottomSheet = createBottomSheet({
    content: `<div class="blocking-bottom-sheet"> 
            <h2>Blocking Bottom Sheet</h2> 
            <button
                id="blocking-bottom-sheet-close-button"
            > Click here to close </button>
        </div>`,
    draggable: false,
    shouldCloseOnOutsideClick: false,
    shouldShowHandle: false,
  });

  bottomSheet.mount();

  document
    .querySelector<HTMLButtonElement>("#blocking-bottom-sheet-close-button")
    ?.addEventListener("click", () => {
      bottomSheet.close();
    });

  return {
    blockingBottomSheet: bottomSheet,
  };
}
