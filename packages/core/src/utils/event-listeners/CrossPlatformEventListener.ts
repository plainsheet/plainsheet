export type EventCallback = (event: MouseEvent | TouchEvent) => void;
export type CrossPlatFormMouseEvent = MouseEvent | TouchEvent;

export class CrossPlatformEventListener {
  private currentTarget: HTMLElement;

  constructor(currentTarget: HTMLElement) {
    this.currentTarget = currentTarget;
  }

  public addEventListeners(onStart: EventCallback, onEnd: EventCallback): void {
    // Touch events
    this.currentTarget.addEventListener("touchstart", onStart, {
      passive: true,
    });
    this.currentTarget.addEventListener("touchend", onEnd, { passive: true });

    // Mouse events
    this.currentTarget.addEventListener("mousedown", (event) => {
      if (event.type !== "touchstart") {
        onStart(event);
      }
    });
    this.currentTarget.addEventListener("mouseup", (event) => {
      if (event.type !== "touchend") {
        onEnd(event);
      }
    });
  }

  public removeEventListeners(
    onStart: EventCallback,
    onEnd: EventCallback
  ): void {
    this.currentTarget.removeEventListener("touchstart", onStart);
    this.currentTarget.removeEventListener("touchend", onEnd);
    this.currentTarget.removeEventListener("mousedown", onStart);
    this.currentTarget.removeEventListener("mouseup", onEnd);
  }

  public getCoordinates(event: CrossPlatFormMouseEvent) {
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

    if (event.type === "touchend" || event.type === "mouseup") {
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
