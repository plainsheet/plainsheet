export function isElement(el: unknown): el is Element {
  return el instanceof Element;
}

export function isHTMLElement(el: unknown): el is HTMLElement {
  return el instanceof HTMLElement;
}
