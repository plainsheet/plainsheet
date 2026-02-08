import type { BottomSheetState, DraggingState } from "src/types";
import { focusOn, isFocusable } from "src/utils/dom/focus";
import {
  ClassNames,
  ResetClassNames,
  UtilClassNames,
} from "../class-names/class-names";
import { createElement } from "../utils/dom/element";
import { mergeClassNames } from "../utils/dom/class-names";
import {
  handleDragEnd,
  handleDragLeave,
  handleDragMove,
  handleDragStart,
  handleDragTriggerClick,
} from "../event-handlers/dragging-handler";
import type { AnimationFrame } from "../utils/animation/animation-frame";
import type {
  EventCallback,
  TabEvent,
} from "../utils/event-listeners/TabEventListener";
import { TabEventListener } from "../utils/event-listeners/TabEventListener";
import { EventPhase } from "../utils/event-listeners/EventPhase";
import type { BottomSheetCoreProps } from "../types/bottom-sheet-props.type";
import { initializeBorderRadius } from "./style/style-initializer";

export interface InitializerOptions {
  animationFrame: AnimationFrame;
  bottomSheetState: BottomSheetState;
  onClose: () => void;
  draggingState: DraggingState;
  moveUp: () => void;
  moveDown: () => void;
}

interface InitializeBottomSheetElementsReturnType {
  elements: BottomSheetElements;
  eventHandlers: InitializeEventsReturnType;
}

export function initializeBottomSheetElements(
  props: Required<BottomSheetCoreProps>,
  options: InitializerOptions,
): InitializeBottomSheetElementsReturnType {
  const elements = createElements(props);
  combineElements(elements);

  elements.bottomSheetContainer.style.width = props.width;

  // NOTE: Mounts the user-provided content to the content wrapper.
  const contentElement = document.createElement("div");
  // TODO: Sanitize the content
  contentElement.innerHTML = props.content ?? "";

  const viewportHeight = window.innerHeight;
  elements.bottomSheetContainer.style.maxHeight = `${viewportHeight}px`;

  elements.bottomSheetContentWrapper.appendChild(contentElement);

  const eventHandlers = initializeEvents({
    bottomSheetElements: elements,
    bottomSheetProps: props,
    options,
  });

  // User-provided Styling
  if (props.rootStyle) {
    Object.assign(elements.bottomSheetRoot.style, props.rootStyle);
  }
  if (props.backdropStyle) {
    Object.assign(elements.bottomSheetBackdrop.style, props.backdropStyle);
  }
  if (props.containerGapFillerStyle) {
    Object.assign(elements.bottomSheetContainer.style, props.containerStyle);
  }
  if (props.containerStyle) {
    Object.assign(
      elements.bottomSheetContainerGapFiller.style,
      props.containerGapFillerStyle,
    );
  }
  if (props.handleStyle) {
    Object.assign(elements.bottomSheetHandleBar.style, props.handleStyle);
  }
  if (props.contentWrapperStyle) {
    Object.assign(
      elements.bottomSheetContentWrapper.style,
      props.contentWrapperStyle,
    );
  }

  return { elements, eventHandlers };
}

export interface BottomSheetElements {
  bottomSheetRoot: HTMLElement;
  bottomSheetBackdrop: HTMLElement;
  bottomSheetContainer: HTMLElement;
  bottomSheetHandle: HTMLElement;
  bottomSheetHandleBar: HTMLElement;
  bottomSheetContentWrapper: HTMLElement;
  bottomSheetContainerGapFiller: HTMLElement;
}

function createElements(
  bottomSheetProps: Required<BottomSheetCoreProps>,
): BottomSheetElements {
  const bottomSheetRoot = createElement(
    "dialog",
    mergeClassNames([
      ClassNames.Root,
      ResetClassNames.Dialog,
      bottomSheetProps.rootClass,
    ]),
    ClassNames.Root,
  );
  bottomSheetRoot.ariaLabel = bottomSheetProps.ariaLabel;

  const bottomSheetContainer = createElement(
    "section",
    mergeClassNames([ClassNames.Container, bottomSheetProps.containerClass]),
    ClassNames.Container,
  );
  if (bottomSheetProps.containerBorderRadius) {
    bottomSheetContainer.style.borderRadius = initializeBorderRadius(
      bottomSheetProps.containerBorderRadius,
    );
  }

  const bottomSheetContainerGapFiller = createElement(
    "div",
    ClassNames.GapFiller,
    ClassNames.GapFiller,
  );
  if (bottomSheetProps.containerBackgroundColor) {
    bottomSheetContainer.style.backgroundColor =
      bottomSheetProps.containerBackgroundColor;
    bottomSheetContainerGapFiller.style.backgroundColor =
      bottomSheetProps.containerBackgroundColor;
  }

  const bottomSheetHandle = createElement(
    "button",
    mergeClassNames([
      ClassNames.Handle,
      ResetClassNames.Button,
      bottomSheetProps.shouldShowHandle ? null : UtilClassNames.Hidden,
      bottomSheetProps.handleClass,
    ]),
    ClassNames.Handle,
  );
  bottomSheetHandle.setAttribute("type", "button");
  bottomSheetHandle.ariaLabel = "bottom sheet close button";

  const bottomSheetHandleBar = createElement(
    "span",
    mergeClassNames([
      ClassNames.HandleBar,
      bottomSheetProps.shouldShowHandle ? null : UtilClassNames.Hidden,
    ]),
    ClassNames.HandleBar,
  );

  const bottomSheetContentWrapper = createElement(
    "article",
    mergeClassNames([
      ClassNames.ContentWrapper,
      bottomSheetProps.contentWrapperClass,
    ]),
    ClassNames.ContentWrapper,
  );

  const bottomSheetBackdrop = createElement(
    "div",
    mergeClassNames([
      ClassNames.Backdrop,
      bottomSheetProps.backdropClass,
      UtilClassNames.Hidden,
    ]),
    ClassNames.Backdrop,
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
  bottomSheetProps: Required<BottomSheetCoreProps>;
  options: InitializerOptions;
}

export interface InitializeEventsReturnType {
  attachEventListeners: (
    updatedProps?: InitializeEventsParams["bottomSheetProps"],
  ) => void;
  clearEventListeners: () => void;
  attacheOnOpenEventListeners: (
    updatedProps?: InitializeEventsParams["bottomSheetProps"],
  ) => void;
  clearOnOpenEventListeners: () => void;
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
    bottomSheetBackdrop,
  } = bottomSheetElements;
  const { animationFrame } = options;

  const handleEventListener = new TabEventListener(bottomSheetHandle);
  const contentsWrapperEventListener = new TabEventListener(
    bottomSheetContentWrapper,
  );
  const gapFillerEventListener = new TabEventListener(
    bottomSheetContainerGapFiller,
  );
  let draggingTriggerEventListeners: TabEventListener[] = [];

  const windowEventListener = new TabEventListener(
    window as unknown as HTMLElement,
  );

  const onDragStart: EventCallback = handleDragStart(
    windowEventListener,
    bottomSheetContainer,
    bottomSheetProps,
    options.draggingState,
  );

  const onDragMove: EventCallback = handleDragMove(
    windowEventListener,
    bottomSheetContainer,
    bottomSheetProps,
    options.draggingState,
    animationFrame,
  );

  const onDragEnd: EventCallback = handleDragEnd(
    windowEventListener,
    bottomSheetContainer,
    bottomSheetProps,
    options.draggingState,
    animationFrame,
    options.onClose,
    options.bottomSheetState,
  );
  const onDragLeave = handleDragLeave(
    bottomSheetProps,
    options.draggingState,
    options.onClose,
  );

  function handleWindowClick(e: MouseEvent): void {
    if (e.target instanceof Element && !bottomSheetRoot.contains(e.target)) {
      options.onClose();
    }
  }

  function handleDragTriggerClickWithDragState(tabEvent: TabEvent): void {
    handleDragTriggerClick(
      options.draggingState,
      tabEvent.target,
      bottomSheetElements.bottomSheetContentWrapper,
    );
  }

  function attachEventListeners(
    updatedProps?: InitializeEventsParams["bottomSheetProps"],
  ): void {
    const propsForEventHandlers = updatedProps ?? bottomSheetProps;

    if (
      propsForEventHandlers.draggable &&
      propsForEventHandlers.backgroundDraggable
    ) {
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

    if (propsForEventHandlers.draggable) {
      windowEventListener.addEventListeners({
        onStart: onDragStart,
        onMove: onDragMove,
        onEnd: onDragEnd,
      });
      window.addEventListener("mouseout", onDragLeave);
      window.addEventListener("touchcancel", onDragLeave);
    }
    if (propsForEventHandlers.draggable) {
      window.document.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          options.onClose();
        }
      });
    }

    bottomSheetHandle.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") {
        options.moveUp();
        return;
      }
      if (e.key === "ArrowDown") {
        options.moveDown();
        return;
      }
      if (e.shiftKey && e.key === "Tab") {
        const lastFocusableElement = findLastFocusableElement(
          bottomSheetElements.bottomSheetContentWrapper,
        );
        focusOn(lastFocusableElement);
      }
    });
  }

  function attacheOnOpenEventListeners(
    updatedProps?: InitializeEventsParams["bottomSheetProps"],
  ): void {
    const propsForEventHandlers = updatedProps ?? bottomSheetProps;

    if (
      bottomSheetProps.shouldCloseOnOutsideClick &&
      !bottomSheetProps.preventClosing
    ) {
      bottomSheetBackdrop.addEventListener("click", handleWindowClick);
    } else {
      bottomSheetBackdrop.style.pointerEvents = "none";
    }

    if (propsForEventHandlers.draggable) {
      handleEventListener.addEventListeners({
        onStart: handleDragTriggerClickWithDragState,
      });

      draggingTriggerEventListeners.forEach((listener) => {
        listener.removeEventListeners({
          onStart: handleDragTriggerClickWithDragState,
        });
      });
      draggingTriggerEventListeners = bottomSheetProps.dragTriggers.reduce<
        TabEventListener[]
      >((listeners, selector) => {
        const elements = bottomSheetRoot.querySelectorAll(selector);

        if (!elements.length) {
          return listeners;
        }

        const listenersToAdd = Array.from(elements)
          .map((el) => {
            if (el instanceof HTMLElement) {
              return new TabEventListener(el);
            }
            return null;
          })
          .filter((listener): listener is TabEventListener => {
            return Boolean(listener);
          });

        return [...listeners, ...listenersToAdd];
      }, []);

      draggingTriggerEventListeners.forEach((listener) => {
        listener.addEventListeners({
          onStart: handleDragTriggerClickWithDragState,
          onStartOptions: {
            eventPhase: EventPhase.Target,
          },
        });
      });
    }
  }

  function clearOnOpenEventListeners(): void {
    bottomSheetBackdrop.removeEventListener("click", handleWindowClick);
  }

  function findLastFocusableElement(el: Element): ChildNode | undefined | null {
    let allChildNodes = [...Array.from(el.childNodes).reverse()];
    // NOTE : DFS is used to completely search the last element first.
    while (allChildNodes.length) {
      const childNode = allChildNodes.shift();
      if (isFocusable(childNode)) {
        return childNode;
      }
      if (!childNode) {
        continue;
      }

      allChildNodes = [
        ...allChildNodes,
        ...Array.from(childNode.childNodes).reverse(),
      ];
    }

    return null;
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
    window.removeEventListener("mouseout", onDragLeave);
    window.removeEventListener("touchcancel", onDragLeave);
  }

  return {
    attachEventListeners,
    clearEventListeners,
    attacheOnOpenEventListeners,
    clearOnOpenEventListeners,
  };
}
