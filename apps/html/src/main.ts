import "./style.css";
import { setupButton } from "./button.ts";
import { createBottomSheet } from "plain-bottom-sheet-core";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Good old HTML Website Example</h1>

    <p>
      See how Plain Bottom Sheet can be used on a classic HTML website.
    </p>

    <div class="card">
      <button id="button-open" type="button">Open</button>

      <button id="button-close" type="button">Close</button>
    
    </div>
  </div>
`;

const bottomSheet = createBottomSheet({
  content: `<p> Hi! </p>`,
});

bottomSheet.mount();

setupButton(document.querySelector<HTMLButtonElement>("#button-open")!, () => {
  bottomSheet.open();
});
setupButton(document.querySelector<HTMLButtonElement>("#button-close")!, () => {
  bottomSheet.close();
});
