import { EventPhase, eventPhaseToEnum } from "./EventPhase";

export interface AddEventListenersParams {
  onStart?: EventCallback;
  onStartOptions?: EventCallbackOptions;
  onMove?: EventCallback;
  onEnd?: EventCallback;
}
interface AddMouseEventListenersParams extends AddEventListenersParams {
  onStartOptions: EventCallbackOptions;
}
interface AddTouchEventListenersParams extends AddEventListenersParams {
  onStartOptions: EventCallbackOptions;
}

export type TabEvent = MouseEvent | TouchEvent;

export type EventCallback = (event: TabEvent) => void;

export interface EventCallbackOptions {
  eventPhase: EventPhase;
}

export const defaultEventOptions = {
  eventPhase: EventPhase.All,
} as const;

export class TabEventListener {
  private currentTarget: HTMLElement;

  constructor(currentTarget: HTMLElement) {
    this.currentTarget = currentTarget;
  }

  public addEventListeners({
    onStart,
    onStartOptions = defaultEventOptions,
    onMove,
    onEnd,
  }: AddEventListenersParams): void {
    this.addTouchEventListeners({ onStart, onStartOptions, onMove, onEnd });

    this.addMouseEventListeners({ onStart, onStartOptions, onMove, onEnd });
  }

  private addTouchEventListeners({
    onStart,
    onStartOptions,
    onMove,
    onEnd,
  }: AddTouchEventListenersParams) {
    if (onStart) {
      this.currentTarget.addEventListener(
        "touchstart",
        (event) => {
          if (onStartOptions.eventPhase === EventPhase.All) {
            onStart(event);
            return;
          }

          if (
            eventPhaseToEnum(event.eventPhase) === onStartOptions.eventPhase
          ) {
            onStart(event);
          }
        },
        {
          passive: true,
        }
      );
    }

    if (onMove) {
      this.currentTarget.addEventListener("touchmove", onMove);
    }

    if (onEnd) {
      this.currentTarget.addEventListener("touchend", onEnd);
    }
  }

  private addMouseEventListeners({
    onStart,
    onStartOptions,
    onMove,
    onEnd,
  }: AddMouseEventListenersParams) {
    if (onStart) {
      this.currentTarget.addEventListener(
        "mousedown",
        (event) => {
          if (onStartOptions.eventPhase === EventPhase.All) {
            onStart(event);
            return;
          }

          if (
            eventPhaseToEnum(event.eventPhase) === onStartOptions.eventPhase
          ) {
            onStart(event);
          }
        },
        {
          passive: true,
        }
      );
    }

    if (onMove) {
      this.currentTarget.addEventListener("mousemove", onMove);
    }

    if (onEnd) {
      this.currentTarget.addEventListener("mouseup", (event) => {
        onEnd(event);
      });
    }
  }

  public removeEventListeners({
    onStart,
    onMove,
    onEnd,
  }: {
    onStart?: EventCallback;
    onMove?: EventCallback;
    onEnd?: EventCallback;
  }): void {
    onStart && this.currentTarget.removeEventListener("touchstart", onStart);
    onEnd && this.currentTarget.removeEventListener("touchend", onEnd);
    onMove && this.currentTarget.removeEventListener("touchmove", onMove);

    onStart && this.currentTarget.removeEventListener("mousedown", onStart);
    onMove && this.currentTarget.removeEventListener("mousemove", onMove);
    onEnd && this.currentTarget.removeEventListener("mouseup", onEnd);
  }

  public getCoordinates(event: TabEvent) {
    if (event.type === "touchstart" || event.type === "mousedown") {
      if (event instanceof TouchEvent) {
        return {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      } else if (event instanceof MouseEvent) {
        return {
          x: event.clientX,
          y: event.clientY,
        };
      }
    }

    if (
      event.type === "touchend" ||
      event.type === "mouseup" ||
      event.type === "mousemove" ||
      event.type === "touchmove"
    ) {
      if (event instanceof TouchEvent) {
        return {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        };
      } else if (event instanceof MouseEvent) {
        return {
          x: event.clientX,
          y: event.clientY,
        };
      }
    }

    return {
      x: 0,
      y: 0,
    };
  }
}
