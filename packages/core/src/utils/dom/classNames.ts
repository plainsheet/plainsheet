import { isString } from "../types/isString";

export function addClassName(el: Element, className: string) {
  el.classList.add(cleanClassName(className));
}

export function removeClassName(el: Element, className: string) {
  el.classList.remove(cleanClassName(className));
}

export function toggleClassName(el: Element, className: string) {
  const validClassName = cleanClassName(className);

  if (el.classList.contains(validClassName)) {
    removeClassName(el, validClassName);
  } else {
    addClassName(el, validClassName);
  }
}

export function cleanClassName(className: string | undefined | null) {
  if (!isString(className)) {
    return "";
  }

  const trimmedClassName = className.trim();
  const cleanedClassName = trimmedClassName.replace(/\./g, "");

  return cleanedClassName;
}

export function mergeClassNames(classNames: (string | undefined | null)[]) {
  return classNames
    .map((className) => cleanClassName(className))
    .filter(Boolean)
    .join(" ");
}

export function classesToSelector(classNames: (string | undefined | null)[]) {
  return classNames
    .map((className) => className?.trim())
    .filter(Boolean)
    .map((className) => `.${className}`)
    .join(" ");
}
