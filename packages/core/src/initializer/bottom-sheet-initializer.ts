import type { TranslateContainer } from "src/animation/animation";
import type { DraggingState } from "src/types";
import {
  ClassNames,
  ResetClassNames,
  UtilClassNames,
} from "../class-names/class-names";
import { createElement } from "../utils/dom/element";
import { mergeClassNames } from "../utils/dom/classNames";
import {
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  handleDragTriggerClick,
} from "../event-handlers/dragging-handler";
import type { AnimationFrame } from "../utils/animation/animation-frame";
import type { EventCallback } from "../utils/event-listeners/TabEventListener";
import { TabEventListener } from "../utils/event-listeners/TabEventListener";
import { EventPhase } from "../utils/event-listeners/EventPhase";
import type { BottomSheetProps } from "../types/bottom-sheet-props.type";

export interface InitializerOptions {
  animationFrame: AnimationFrame;
  translateContainer: TranslateContainer;
  onClose: () => void;
  draggingState: DraggingState;
}

interface InitializeBottomSheetElementsReturnType {
  elements: BottomSheetElements;
  eventHandlers: InitializeEventsReturnType;
}

export function initializeBottomSheetElements(
  props: Required<BottomSheetProps>,
  options: InitializerOptions
): InitializeBottomSheetElementsReturnType {
  const elements = createElements(props);
  combineElements(elements);

  elements.bottomSheetContainer.style.width = props.width;
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

interface BottomSheetElements {
  bottomSheetRoot: HTMLElement;
  bottomSheetBackdrop: HTMLElement;
  bottomSheetContainer: HTMLElement;
  bottomSheetHandle: HTMLElement;
  bottomSheetHandleBar: HTMLElement;
  bottomSheetContentWrapper: HTMLElement;
  bottomSheetContainerGapFiller: HTMLElement;
}

function createElements(
  bottomSheetProps: Required<BottomSheetProps>
): BottomSheetElements {
  const bottomSheetRoot = createElement(
    "dialog",
    mergeClassNames([
      ClassNames.Root,
      ResetClassNames.Dialog,
      bottomSheetProps.rootClass,
    ])
  );

  const bottomSheetContainer = createElement(
    "section",
    mergeClassNames([ClassNames.Container, bottomSheetProps.containerClass])
  );
  if (bottomSheetProps.containerBorderRadius) {
    bottomSheetContainer.style.borderRadius =
      bottomSheetProps.containerBorderRadius;
  }

  const bottomSheetContainerGapFiller = createElement(
    "div",
    ClassNames.GapFiller
  );

  const bottomSheetHandle = createElement(
    "button",
    mergeClassNames([
      ClassNames.Handle,
      ResetClassNames.Button,
      bottomSheetProps.shouldShowHandle ? null : UtilClassNames.Hidden,
      bottomSheetProps.handleClass,
    ])
  );
  bottomSheetHandle.setAttribute("type", "button");

  const bottomSheetHandleBar = createElement(
    "span",
    mergeClassNames([
      ClassNames.HandleBar,
      bottomSheetProps.shouldShowHandle ? null : UtilClassNames.Hidden,
    ])
  );

  const bottomSheetContentWrapper = createElement(
    "article",
    mergeClassNames([
      ClassNames.ContentWrapper,
      bottomSheetProps.contentWrapperClass,
    ])
  );

  const bottomSheetBackdrop = createElement(
    "div",
    mergeClassNames([
      ClassNames.Backdrop,
      bottomSheetProps.backdropClass,
      bottomSheetProps.shouldShowBackdrop ? null : UtilClassNames.Hidden,
    ])
  );
  if (bottomSheetProps.backdropColor) {
    bottomSheetBackdrop.style.backgroundColor = bottomSheetProps.backdropColor;
  }
  if (bottomSheetProps.backDropTransition) {
    bottomSheetBackdrop.style.transition = bottomSheetProps.backDropTransition;
  }

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
}: BottomSheetElements): void {
  bottomSheetRoot.appendChild(bottomSheetContainer);

  bottomSheetHandle.appendChild(bottomSheetHandleBar);
  bottomSheetContainer.appendChild(bottomSheetHandle);

  bottomSheetContainer.appendChild(bottomSheetContentWrapper);
  bottomSheetContainer.appendChild(bottomSheetContainerGapFiller);
}

export interface InitializeEventsParams {
  bottomSheetElements: BottomSheetElements;
  bottomSheetProps: Required<BottomSheetProps>;
  // TODO: Change this to "bottom sheet state"
  options: InitializerOptions;
}

interface InitializeEventsReturnType {
  attachEventListeners: () => void;
  clearEventListeners: () => void;
}
function initializeEvents({
  bottomSheetElements,
  bottomSheetProps,
  options,
}: InitializeEventsParams): InitializeEventsReturnType {
  const {
    bottomSheetRoot,
    bottomSheetContainer,
    bottomSheetHandle,
    bottomSheetContainerGapFiller,
    bottomSheetContentWrapper,
  } = bottomSheetElements;
  const { animationFrame } = options;

  const handleEventListener = new TabEventListener(bottomSheetHandle);
  const contentsWrapperEventListener = new TabEventListener(
    bottomSheetContentWrapper
  );
  const gapFillerEventListener = new TabEventListener(
    bottomSheetContainerGapFiller
  );
  const draggingTriggerEventListeners: TabEventListener[] =
    bottomSheetProps.dragTriggers
      .map((selector) => {
        const element = bottomSheetRoot.querySelector(selector);
        if (element instanceof HTMLElement) {
          return new TabEventListener(element);
        }
        return null;
      })
      .filter((listener): listener is TabEventListener => {
        return Boolean(listener);
      });

  const windowEventListener = new TabEventListener(
    window as unknown as HTMLElement
  );

  const onDragStart: EventCallback = handleDragStart(
    windowEventListener,
    bottomSheetContainer,
    bottomSheetProps,
    options.draggingState
  );

  const onDragMove: EventCallback = handleDragMove(
    windowEventListener,
    bottomSheetContainer,
    bottomSheetProps,
    options.draggingState,
    animationFrame
  );

  const onDragEnd: EventCallback = handleDragEnd(
    windowEventListener,
    bottomSheetContainer,
    bottomSheetProps,
    options.draggingState,
    animationFrame,
    options.onClose,
    options.translateContainer
  );

  function handleWindowClick(e: MouseEvent): void {
    if (e.target instanceof Element && !bottomSheetRoot.contains(e.target)) {
      options.onClose();
    }
  }

  function handleDragTriggerClickWithDragState(): void {
    handleDragTriggerClick(options.draggingState);
  }

  function attachEventListeners(): void {
    if (bottomSheetProps.draggable) {
      handleEventListener.addEventListeners({
        onStart: handleDragTriggerClickWithDragState,
      });
      draggingTriggerEventListeners.forEach((listener) => {
        listener.addEventListeners({
          onStart: handleDragTriggerClickWithDragState,
          onStartOptions: {
            eventPhase: EventPhase.Target,
          },
        });
      });
    }
    if (bottomSheetProps.draggable && bottomSheetProps.backgroundDraggable) {
      contentsWrapperEventListener.addEventListeners({
        onStart: handleDragTriggerClickWithDragState,
        onStartOptions: {
          eventPhase: EventPhase.Target,
        },
      });
      gapFillerEventListener.addEventListeners({
        onStart: handleDragTriggerClickWithDragState,
      });
    }

    if (bottomSheetProps.draggable) {
      windowEventListener.addEventListeners({
        onStart: onDragStart,
        onMove: onDragMove,
        onEnd: onDragEnd,
      });
    }

    if (bottomSheetProps.shouldCloseOnOutsideClick) {
      window.document.addEventListener("click", handleWindowClick);
    }
  }

  function clearEventListeners(): void {
    handleEventListener.removeEventListeners({
      onStart: handleDragTriggerClickWithDragState,
    });
    contentsWrapperEventListener.removeEventListeners({
      onStart: handleDragTriggerClickWithDragState,
    });
    gapFillerEventListener.removeEventListeners({
      onStart: handleDragTriggerClickWithDragState,
    });
    draggingTriggerEventListeners.forEach((listener) => {
      listener.removeEventListeners({
        onStart: handleDragTriggerClickWithDragState,
      });
    });

    windowEventListener.removeEventListeners({
      onStart: onDragStart,
      onMove: onDragMove,
      onEnd: onDragEnd,
    });

    window.removeEventListener("click", handleWindowClick);
  }

  return {
    attachEventListeners,
    clearEventListeners,
  };
}
