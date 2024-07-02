import { createBottomSheet } from "plain-bottom-sheet-core";
import cat from "../../public/images/cat.avif";
import clownFish from "../../public/images/clown-fish.avif";
import iguana from "../../public/images/iguana.avif";
import mandarinDuck from "../../public/images/mandarin-duck.avif";
import swan from "../../public/images/swan.avif";

export function setupLargeContents() {
  const largeBottomSheet = createBottomSheet({
    content: `<div class="large-bottom-sheet"> 
                <h2>Cool Animals</h2>
                <section> 
                  <img 
                    src=${cat}
                    draggable="false"
                  />
                  <img 
                    src=${clownFish}
                    draggable="false"
                  />
                  <img 
                    src=${iguana}
                    draggable="false"
                  />
                  <img 
                    src=${mandarinDuck}
                    draggable="false"
                  />
                  <img 
                    src=${swan}
                    draggable="false"
                  />
                  <img 
                    src=${swan}
                    draggable="false"
                  />
                </section>
            </div>`,
    draggable: true,
    dragTriggers: [".large-bottom-sheet img"],
    shouldCloseOnOutsideClick: false,
  });

  largeBottomSheet.mount();

  return {
    largeBottomSheet,
  };
}
