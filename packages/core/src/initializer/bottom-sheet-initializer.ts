import { ClassNames, ResetClassNames } from "../class-names/class-names";
import { createElement } from "../utils/dom/element";
import { mergeClassNames } from "../utils/dom/classNames";
import {
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  handleDragTriggerClick,
} from "../event-handlers/dragging-handler";
import { AnimationFrame } from "../utils/animation/AnimationFrame";
import {
  EventCallback,
  TabEventListener,
} from "../utils/event-listeners/TabEventListener";
import { EventPhase } from "../utils/event-listeners/EventPhase";
import { BottomSheetProps } from "../types/bottom-sheet-props.type";

export type InitializerOptions = {
  animationFrame: AnimationFrame;
  onClose: () => void;
};

export function initializeBottomSheetElements(
  props: Required<BottomSheetProps>,
  options: InitializerOptions
) {
  const elements = createElements();
  combineElements(elements);

  // NOTE: Mounts the user-provided content to the content wrapper.
  const contentElement = document.createElement("div");
  // TODO: Sanitize the content
  contentElement.innerHTML = props.content ?? "";
  elements.bottomSheetContentWrapper.appendChild(contentElement);

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
  bottomSheetProps: Required<BottomSheetProps>;
  // TODO: Change this to "bottom sheet state"
  options: InitializerOptions;
};

function initializeEvents({
  bottomSheetElements,
  bottomSheetProps,
  options,
}: InitializeEventsParams) {
  const {
    bottomSheetContainer,
    bottomSheetHandle,
    bottomSheetContainerGapFiller,
    bottomSheetContentWrapper,
  } = bottomSheetElements;
  const { snapPoints, dragTriggers, marginTop } = bottomSheetProps;
  const { animationFrame } = options;

  const handleEventListener = new TabEventListener(bottomSheetHandle);
  const contentsWrapperEventListener = new TabEventListener(
    bottomSheetContentWrapper
  );
  const gapFillerEventListener = new TabEventListener(
    bottomSheetContainerGapFiller
  );
  const draggingTriggerEventListeners = dragTriggers.map(
    (el) => new TabEventListener(el)
  );

  const windowEventListener = new TabEventListener(
    window as unknown as HTMLElement
  );

  const onDragStart: EventCallback = handleDragStart(
    windowEventListener,
    bottomSheetContainer
  );

  const onDragMove: EventCallback = handleDragMove(
    windowEventListener,
    bottomSheetContainer,
    animationFrame,
    marginTop
  );

  const onDragEnd: EventCallback = handleDragEnd(
    windowEventListener,
    bottomSheetContainer,
    animationFrame,
    snapPoints,
    bottomSheetProps.marginTop,
    options.onClose
  );

  function attachEventListeners() {
    handleEventListener.addEventListeners({
      onStart: handleDragTriggerClick,
    });
    contentsWrapperEventListener.addEventListeners({
      onStart: handleDragTriggerClick,
      onStartOptions: {
        eventPhase: EventPhase.Target,
      },
    });
    gapFillerEventListener.addEventListeners({
      onStart: handleDragTriggerClick,
    });
    draggingTriggerEventListeners.forEach((listener) =>
      listener.addEventListeners({
        onStart: handleDragTriggerClick,
        onStartOptions: {
          eventPhase: EventPhase.Target,
        },
      })
    );

    windowEventListener.addEventListeners({
      onStart: onDragStart,
      onMove: onDragMove,
      onEnd: onDragEnd,
    });
  }

  function clearEventListeners() {
    handleEventListener.removeEventListeners({
      onStart: handleDragTriggerClick,
    });
    contentsWrapperEventListener.removeEventListeners({
      onStart: handleDragTriggerClick,
    });
    gapFillerEventListener.removeEventListeners({
      onStart: handleDragTriggerClick,
    });
    draggingTriggerEventListeners.forEach((listener) =>
      listener.removeEventListeners({
        onStart: handleDragTriggerClick,
      })
    );

    windowEventListener.removeEventListeners({
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
