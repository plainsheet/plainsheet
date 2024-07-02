import { isString } from "../types/is-string";

export function hasClassName(el: Element, className: string): boolean {
  return el.classList.contains(cleanClassName(className));
}

export function addClassName(el: Element, className: string): void {
  el.classList.add(cleanClassName(className));
}

export function removeClassName(el: Element, className: string): void {
  el.classList.remove(cleanClassName(className));
}

export function replaceClassName(
  el: Element,
  prevClassName: string | null | undefined,
  nextClassName: string | null | undefined
): void {
  if (!isString(nextClassName)) {
    return;
  }

  if (isString(prevClassName)) {
    removeClassName(el, prevClassName);
  }

  addClassName(el, nextClassName);
}

export function toggleClassName(el: Element, className: string): void {
  const validClassName = cleanClassName(className);

  if (el.classList.contains(validClassName)) {
    removeClassName(el, validClassName);
  } else {
    addClassName(el, validClassName);
  }
}

export function cleanClassName(className: string | undefined | null): string {
  if (!isString(className)) {
    return "";
  }

  const trimmedClassName = className.trim();
  const cleanedClassName = trimmedClassName.replace(/\./g, "");

  return cleanedClassName;
}

export function mergeClassNames(
  classNames: (string | undefined | null)[]
): string {
  return classNames
    .map((className) => cleanClassName(className))
    .filter(Boolean)
    .join(" ");
}

export function classesToSelector(
  classNames: (string | undefined | null)[]
): string {
  return classNames
    .map((className) => className?.trim())
    .filter(Boolean)
    .map((className) => `.${className}`)
    .join(" ");
}
