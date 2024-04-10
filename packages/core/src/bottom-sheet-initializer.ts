import { BottomSheetProps } from "./bottom-sheet";
import { ClassNames } from "./style/class-names";
import { createElement } from "./utils/dom/element";
import { mergeClassNames } from "./utils/dom/classNames";

export function initializeBottomSheetElements(props: BottomSheetProps) {
  const bottomSheetRoot = createElement(
    "dialog",
    mergeClassNames([ClassNames.Root, "root-reset-style"])
  );
  const bottomSheetContainer = createElement("section", ClassNames.Container);
  const bottomSheetHandle = createElement("button", ClassNames.Handle);
  bottomSheetHandle.setAttribute("type", "button");
  const bottomSheetHandleBar = createElement("span", ClassNames.HandleBar);
  const bottomSheetContentWrapper = createElement(
    "article",
    ClassNames.ContentWrapper
  );

  bottomSheetRoot.appendChild(bottomSheetContainer);
  bottomSheetHandle.appendChild(bottomSheetHandleBar);
  bottomSheetContainer.appendChild(bottomSheetHandle);
  bottomSheetContainer.appendChild(bottomSheetContentWrapper);

  // TODO: Sanitize the content.
  const contentElement = document.createElement("div");
  contentElement.innerHTML = props.content ?? "";
  bottomSheetContentWrapper.appendChild(contentElement);
  const bottomSheetBackdrop = createElement("div", ClassNames.Backdrop);

  return {
    bottomSheetRoot,
    bottomSheetBackdrop,
    bottomSheetContainer,
    bottomSheetHandle,
    bottomSheetContentWrapper,
  };
}
