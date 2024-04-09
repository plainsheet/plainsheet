export type EventCallback = (event: MouseEvent | TouchEvent) => void;
export type CrossPlatFormMouseEvent = MouseEvent | TouchEvent;

export class CrossPlatformEventListener {
  private currentTarget: Window;

  constructor(currentTarget: Window) {
    this.currentTarget = currentTarget;
  }

  public addEventListeners(
    onStart: EventCallback,
    onMove: EventCallback,
    onEnd: EventCallback
  ): void {
    // Touch events
    this.currentTarget.addEventListener("touchstart", onStart, {
      passive: true,
    });
    this.currentTarget.addEventListener("touchmove", onMove, {
      passive: true,
    });
    this.currentTarget.addEventListener("touchend", onEnd, { passive: true });

    // Mouse events
    this.currentTarget.addEventListener("mousedown", (event) => {
      onStart(event);
    });
    this.currentTarget.addEventListener("mousemove", onMove, {
      passive: true,
    });
    this.currentTarget.addEventListener("mouseup", (event) => {
      onEnd(event);
    });
  }

  public removeEventListeners(
    onStart: EventCallback,
    onMove: EventCallback,
    onEnd: EventCallback
  ): void {
    this.currentTarget.removeEventListener("touchstart", onStart);
    this.currentTarget.removeEventListener("touchend", onEnd);
    this.currentTarget.removeEventListener("touchmove", onMove);
    this.currentTarget.removeEventListener("mousedown", onStart);
    this.currentTarget.removeEventListener("mousemove", onMove);
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
