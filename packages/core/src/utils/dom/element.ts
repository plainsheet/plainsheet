import { addClassName } from "./classNames";

export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  className: string
) {
  const element = document.createElement(tagName);

  const classNames = className.split(" ");
  classNames.forEach((cls) => {
    addClassName(element, cls);
  });

  return element;
}
