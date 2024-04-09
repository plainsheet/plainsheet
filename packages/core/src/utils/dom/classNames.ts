export function mergeClassNames(classNames: (string | undefined | null)[]) {
  return classNames
    .map((className) => className?.trimStart().trimEnd())
    .filter(Boolean)
    .join(" ");
}

export function addClassName(el: Element, className: string) {
  el.classList.add(className);
}
export function removeClassName(el: Element, className: string) {
  el.classList.remove(className);
}
export function toggleClassName(el: Element, className: string) {
  if (el.classList.contains(className)) {
    removeClassName(el, className);
  } else {
    addClassName(el, className);
  }
}
