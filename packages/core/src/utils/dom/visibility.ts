import { addClassName, removeClassName } from "./class-names";

const OPEN = "open";

export function setVisibility(
  element: Element | Element[],
  visibility: boolean
): void {
  const shouldOpen = visibility;

  if (Array.isArray(element)) {
    element.forEach((el) => {
      setHiddenClass(el, shouldOpen);

      el.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
    });

    return;
  }

  setHiddenClass(element, shouldOpen);

  element.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
}

export function setHiddenClass(element: Element, hidden: boolean): void {
  hidden ? addClassName(element, OPEN) : removeClassName(element, OPEN);
}
