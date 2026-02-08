import { addClassName, hasClassName, removeClassName } from "./class-names";

const OPEN = "open";
const HIDDEN = "hidden";

export function getVisibility(element: Element): boolean {
  return getHiddenClass(element);
}

export function setVisibility(
  element: Element | Element[],
  visibility: boolean,
): void {
  const shouldOpen = visibility;

  if (Array.isArray(element)) {
    element.forEach((el) => {
      setHiddenClass(el, shouldOpen);

      el.setAttribute("aria-modal", shouldOpen ? "true" : "false");
    });

    return;
  }

  setHiddenClass(element, shouldOpen);

  element.setAttribute("aria-modal", shouldOpen ? "true" : "false");
}

export function setHiddenClass(element: Element, shouldOpen: boolean): void {
  if (shouldOpen) {
    addClassName(element, OPEN);
    removeClassName(element, HIDDEN);
  } else {
    addClassName(element, HIDDEN);
    removeClassName(element, OPEN);
  }
}

export function getHiddenClass(element: Element): boolean {
  return hasClassName(element, OPEN) && !hasClassName(element, HIDDEN);
}
