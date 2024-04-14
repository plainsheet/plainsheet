export type CrossPlatformMouseEvent = MouseEvent | TouchEvent;
export type EventCallback = (event: CrossPlatformMouseEvent) => void;

export enum EventPhase {
  All = -1,
  None = 0,
  Capture = 1,
  Target = 2,
  Bubble = 3,
}

interface EventCallbackOptions {
  eventPhase: EventPhase;
}

const defaultEventOptions = {
  eventPhase: EventPhase.All,
} as const;

export class CrossPlatformMouseEventListener {
  private currentTarget: HTMLElement;

  constructor(currentTarget: HTMLElement) {
    this.currentTarget = currentTarget;
  }

  public addEventListeners({
    onStart,
    onStartOptions = defaultEventOptions,
    onMove,
    onEnd,
  }: {
    onStart?: EventCallback;
    onStartOptions?: EventCallbackOptions;
    onMove?: EventCallback;
    onEnd?: EventCallback;
  }): void {
    // Touch events
    onStart &&
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
    onMove && this.currentTarget.addEventListener("touchmove", onMove);
    onEnd && this.currentTarget.addEventListener("touchend", onEnd);

    // Mouse events
    onStart &&
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
    onMove && this.currentTarget.addEventListener("mousemove", onMove);
    onEnd &&
      this.currentTarget.addEventListener("mouseup", (event) => {
        onEnd(event);
      });
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

  public getCoordinates(event: CrossPlatformMouseEvent) {
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

function eventPhaseToEnum(eventPhase: number) {
  switch (eventPhase) {
    case 0:
      return EventPhase.None;
    case 1:
      return EventPhase.Capture;
    case 2:
      return EventPhase.Target;
    case 3:
      return EventPhase.Bubble;
    default:
      return EventPhase.All;
  }
}
