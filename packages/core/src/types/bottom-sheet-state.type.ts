import type { translateContainerWithAnim } from "src/animation/animation";
import type { Coordinates, Position } from "src/animation/animation.type";

export interface BottomSheetState {
  isMounted: boolean;
  translateContainer: ReturnType<typeof translateContainerWithAnim>;
}

export interface DraggingState {
  /** @description Used to know how far the cursor moved. */
  startY: Position | null;

  /** @description Used to know where was the bottom sheet before dragging. */
  containerStartTranslate: Coordinates;

  isDragging: boolean;

  originalDocumentOverflowY: string;
}
