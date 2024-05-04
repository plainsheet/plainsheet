import { isString } from "../types/is-string";
import { addClassName } from "./class-names";

export function createElement(
  tagName: keyof HTMLElementTagNameMap,
  className: string,
  testId?: string
): ReturnType<typeof document.createElement> {
  const element = document.createElement(tagName);

  const classNames = className.split(" ");
  classNames.forEach((cls) => {
    addClassName(element, cls);
  });

  if (isString(testId)) {
    element.setAttribute("data-testid", testId);
  }

  return element;
}
