import { isElement, isHTMLElement } from "../types/is-element";
import { isNumber } from "../types/is-number";

export function focusOn(el: unknown) {
  if (isHTMLElement(el)) {
    el.focus();
  }
}

export function isFocusable(el: unknown): boolean {
  if (!isHTMLElement(el)) {
    return false;
  }

  const isDetached = el.offsetParent === null;
  if (isDetached) {
    return false;
  }
  if ("disabled" in el && el.disabled) {
    return false;
  }

  const tabIdxAttr = el.getAttribute("tabindex");
  const tabIndex = isNumber(tabIdxAttr) ? parseInt(tabIdxAttr, 10) : -1;

  const focusableTags = [
    "INPUT",
    "BUTTON",
    "SELECT",
    "TEXTAREA",
    "A",
    "AREA",
    "IFRAME",
  ];
  const isFocusableTag = focusableTags.includes(el.tagName);

  const isFocusableLink =
    (el instanceof HTMLAnchorElement && el.href !== "") ||
    (el instanceof HTMLAreaElement && el.href !== "");

  return isFocusableTag || isFocusableLink || tabIndex > -1;
}
