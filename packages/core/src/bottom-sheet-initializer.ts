import { BottomSheetProps } from "./bottom-sheet";
import { ClassNames, ResetClassNames } from "./style/class-names";
import { createElement } from "./utils/dom/element";
import { mergeClassNames } from "./utils/dom/classNames";
import {
  CrossPlatformMouseEventListener,
  EventCallback,
} from "./utils/event-listeners/CrossPlatformMouseEventListener";
import {
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  handleDragTriggerClick,
} from "./event-handlers/dragging-handler";
import { AnimationFrame } from "./utils/animation/AnimationFrame";
import { calcContentWrapperBottomFillerHeight } from "./calculator/size-calculator";

export type InitializerOptions = {
  animationFrame: AnimationFrame;
};

export function initializeBottomSheetElements(
  props: Required<BottomSheetProps>,
  options: InitializerOptions
) {
  const elements = createElements();
  combineElements(elements);

  // NOTE: Mounts the user-provided content.
  // TODO: Sanitize the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = props.content ?? "";
  elements.bottomSheetContentWrapper.appendChild(contentElement);
  // NOTE: To make the content expandable, we add an extra space below it,
  // Extra space height = viewport height - content height
  elements.bottomSheetContainer.style.paddingBottom =
    calcContentWrapperBottomFillerHeight(
      elements.bottomSheetContentWrapper,
      props.marginTop
    );

  const eventHandlers = initializeEvents({
    bottomSheetElements: elements,
    bottomSheetProps: props,
    options,
  });

  return { elements, eventHandlers };
}

type BottomSheetElements = ReturnType<typeof createElements>;

function createElements() {
  const bottomSheetRoot = createElement(
    "dialog",
    mergeClassNames([ClassNames.Root, ResetClassNames.Dialog])
  );

  const bottomSheetContainer = createElement("section", ClassNames.Container);

  const bottomSheetContainerGapFiller = createElement(
    "div",
    ClassNames.GapFiller
  );

  const bottomSheetHandle = createElement(
    "button",
    mergeClassNames([ClassNames.Handle, ResetClassNames.Button])
  );
  bottomSheetHandle.setAttribute("type", "button");

  const bottomSheetHandleBar = createElement("span", ClassNames.HandleBar);

  const bottomSheetContentWrapper = createElement(
    "article",
    ClassNames.ContentWrapper
  );
  const bottomSheetBackdrop = createElement("div", ClassNames.Backdrop);

  return {
    bottomSheetRoot,
    bottomSheetBackdrop,
    bottomSheetContainer,
    bottomSheetHandle,
    bottomSheetHandleBar,
    bottomSheetContentWrapper,
    bottomSheetContainerGapFiller,
  };
}

function combineElements({
  bottomSheetRoot,
  bottomSheetContainer,
  bottomSheetHandle,
  bottomSheetHandleBar,
  bottomSheetContentWrapper,
  bottomSheetContainerGapFiller,
}: BottomSheetElements) {
  bottomSheetRoot.appendChild(bottomSheetContainer);

  bottomSheetHandle.appendChild(bottomSheetHandleBar);
  bottomSheetContainer.appendChild(bottomSheetHandle);

  bottomSheetContainer.appendChild(bottomSheetContentWrapper);
  bottomSheetContainer.appendChild(bottomSheetContainerGapFiller);
}

export type InitializeEventsParams = {
  bottomSheetElements: BottomSheetElements;
  bottomSheetProps: BottomSheetProps;
  options: InitializerOptions;
};

function initializeEvents({
  bottomSheetElements,
  bottomSheetProps,
  options,
}: InitializeEventsParams) {
  const { bottomSheetContainer, bottomSheetHandle } = bottomSheetElements;
  const { marginTop, snapPoints } = bottomSheetProps;
  const { animationFrame } = options;

  const documentBodyMouseEventListener = new CrossPlatformMouseEventListener(
    window.document.body
  );
  const handleEventListener = new CrossPlatformMouseEventListener(
    bottomSheetHandle
  );

  const onDragStart: EventCallback = handleDragStart(
    documentBodyMouseEventListener,
    bottomSheetContainer
  );

  const onDragMove: EventCallback = handleDragMove(
    documentBodyMouseEventListener,
    bottomSheetContainer,
    animationFrame,
    marginTop ?? 0
  );

  const onDragEnd: EventCallback = handleDragEnd(
    documentBodyMouseEventListener,
    bottomSheetContainer,
    animationFrame,
    snapPoints,
    close
  );

  function attachEventListeners() {
    handleEventListener.addEventListeners({
      onStart: handleDragTriggerClick,
    });

    documentBodyMouseEventListener.addEventListeners({
      onStart: onDragStart,
      onMove: onDragMove,
      onEnd: onDragEnd,
    });
  }

  function clearEventListeners() {
    handleEventListener.removeEventListeners({
      onMove: handleDragTriggerClick,
    });

    documentBodyMouseEventListener.removeEventListeners({
      onStart: onDragStart,
      onMove: onDragMove,
      onEnd: onDragEnd,
    });
  }

  return {
    attachEventListeners,
    clearEventListeners,
  };
}
