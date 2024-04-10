import { addClassName, removeClassName } from "./classNames";

const OPEN = "open";

export function setVisibility(
  element: Element | Element[],
  visibility: boolean
) {
  const shouldOpen = visibility === true;

  if (Array.isArray(element)) {
    element.forEach((el) => {
      shouldOpen ? addClassName(el, OPEN) : removeClassName(el, OPEN);
      el.setAttribute("aria-hidden", shouldOpen ? "true" : "false");
    });

    return;
  }

  shouldOpen ? addClassName(element, OPEN) : removeClassName(element, OPEN);
  element.setAttribute("aria-hidden", shouldOpen ? "true" : "false");
}
