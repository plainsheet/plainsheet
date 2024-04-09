export enum ClassNames {
  /**
   * @description The dark background that appears when the bottom sheet is open.
   */
  Backdrop = "pbs-backdrop",

  /**
   * @description The root element that is beside the backdrop.
   */
  Root = "pbs-root",
  /**
   * @description The actual bottom sheet element.
   * It holds the handle and content, and moves up and down.
   */
  Container = "pbs-container",

  /**
   * @description The handle to drag the bottom sheet.
   * It wraps the handle bar and provide a touch area.
   */
  Handle = "pbs-handle",
  /**
   * @description The handle bar to move the bottom sheet
   * using arrow keys.
   */
  HandleBar = "pbs-handle-bar",

  /**
   * @description The wrapper that holds the user-provided content.
   * It is used to measure the content and provide a stable layout.
   */
  ContentWrapper = "pbs-content-wrapper",
}
