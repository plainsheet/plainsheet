export function mergeClassNames(classNames: (string | undefined | null)[]) {
  return classNames
    .map((className) => className?.trimStart().trimEnd())
    .filter(Boolean)
    .join(" ");
}

export function addClassName(el: HTMLElement, className: string) {
  el.classList.add(className);
}
export function removeClassName(el: HTMLElement, className: string) {
  el.classList.remove(className);
}
