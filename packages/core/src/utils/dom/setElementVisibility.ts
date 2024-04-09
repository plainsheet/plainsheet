import { toggleClassName } from "./classNames";

const OPEN = "open";

export function setElementVisibility(
  element: Element | Element[],
  visibility: boolean
) {
  const shouldOpen = visibility === true;

  if (Array.isArray(element)) {
    element.forEach((el) => {
      toggleClassName(el, OPEN);
      el.setAttribute("aria-hidden", shouldOpen ? "true" : "false");
    });

    return;
  }

  toggleClassName(element, OPEN);
  element.setAttribute("aria-hidden", shouldOpen ? "true" : "false");
}
