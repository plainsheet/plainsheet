import type { Coordinates, Position } from "src/animation/animation.type";

export interface BottomSheetState {
  isMounted: boolean;
}

export interface DraggingState {
  /** @description Used to know how far the cursor moved. */
  startY: Position | null;

  /** @description Used to know where was the bottom sheet before dragging. */
  containerStartTranslate: Coordinates;

  isDragging: boolean;
}
