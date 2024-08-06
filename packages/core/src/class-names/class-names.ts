export enum ClassNames {
  /**
   * The dark background that appears when the bottom sheet is open.
   */
  Backdrop = "pbs-backdrop",

  /**
   * The root element that is beside the backdrop.
   */
  Root = "pbs-root",
  /**
   * The actual bottom sheet element.
   * It holds the handle and content, and moves up and down.
   */
  Container = "pbs-container",
  /**
   * Fills the gap between the bottom of the sheet and the bottom of the viewport,
   * when the sheet is animated to show a bouncing effect.
   */
  GapFiller = "pbs-gap-filler",

  /**
   * The handle to drag the bottom sheet.
   * It wraps the handle bar and provide a touch area.
   */
  Handle = "pbs-handle",
  /**
   * The handle bar to move the bottom sheet
   * using arrow keys.
   */
  HandleBar = "pbs-handle-bar",

  /**
   * The wrapper that holds the user-provided content.
   * It is used to measure the content and provide a stable layout.
   */
  ContentWrapper = "pbs-content-wrapper",
}

export enum ResetClassNames {
  Button = "pbs-button-reset",
  Dialog = "pbs-dialog-reset",
}

export enum UtilClassNames {
  Hidden = "hidden",
}
