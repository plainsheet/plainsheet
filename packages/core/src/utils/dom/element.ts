import { addClassName } from "./class-names";

export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  className: string
): ReturnType<typeof document.createElement> {
  const element = document.createElement(tagName);

  const classNames = className.split(" ");
  classNames.forEach((cls) => {
    addClassName(element, cls);
  });

  return element;
}
