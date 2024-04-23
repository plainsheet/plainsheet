- Configurations

  - Lifecycle callbacks

    - `onDragMove(direction, progress)`

  - Behaviors

    - `expandable`: Can you drag it up above the content-height?
    - `closeOnOutsideClick`: Add an event listener to the backdrop, and close the bottom sheet when it is clicked.
    - `backgroundDraggable`: short-circuit the background's click event handler when enabled.

  - Styling

    - `hideHandle`: Add a 'hidden' CSS class to the handle.
    - `hideBackdrop`: Add a 'hidden' CSS class to the backdrop.
    - `backdropColor`: Inline-style the backdrop
    - `backdropAnim`: Inline style the backdrop
    - `containerBorderRadius`: Inline style the container.

  - Direct CSS Customization: pass user defined classes to the initializer directory, and add them to elements when provided.
    - `rootClass`
    - `containerClass`
    - `handleClass`
    - `contentWrapperClass`
    - `backdropClass`

- Custom animations(CSS transition timing syntax): Refactor the animation timing-related functions and use the user-defined functions when provided.
  - `openAnim`, `closeAnim`, `snapAnim`.
