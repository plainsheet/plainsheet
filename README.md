<p align="center">
  <img src="./documents/assets/header.png">
</p>

The minimalistic, configurable bottom-sheet for the Web.

# Why would you use it?

- 🫙 <strong>Has zero dependencies</strong>, so your app does not depend on any other libraries that you don't need.
- 🪶 <strong>Super Lightweight(Only 30 Kb, compressed)</strong>, so you don't have to compromise loading speed.
- 📱 <strong>Mobile-friendly</strong>, works just like the native bottom sheet.
- 🎛 <strong>Highly configurable</strong>, so you don't have to build another Bottom Sheet again.
  - Style it anyway you want.
  - Change its behaviors.
  - Hook into life-cycle events, and states.
- 🍰 <strong>Works out of the box</strong> without any configs.
- 🦾 <strong>Fully-typed</strong>, and every prop is documented.
- ⚡️ <strong>Performant</strong> by default.

# Examples

TODO: Add the link to the example.

- HTML website example

# Installation

### Using NPM

```
npm install plain-bottom-sheet-core
```

### Using CDN

```
<script src="https://cdn.jsdelivr.net/npm/plain-bottom-sheet-core@1.0.0/dist/plain-bottom-sheet-core.umd.js">
</script>
```

# Getting Started

```ts
const bottomSheet = createBottomSheet({
  content: `<div> 
        Your content
        </div>`,
});

bottomSheet.mount(); // Mounts the bottom sheet to DOM.

bottomSheet.open();
```

# API References

## `createBottomSheet` Options

> 🚙 The new documentation website is on the way!

> ℹ️ Most of the parameters have TypeScript descriptions.

### `content: string`

Required. The main content of the bottom sheet.

### `width?: string`

Optional. Specifies the width of the bottom sheet. Default is 100%.

### `marginTop?: number`

Optional. Space between the top of the bottom sheet and the viewport's top. Default is `20`.

### `defaultPosition?: BottomSheetPosition`

Optional. The initial position where the bottom sheet should appear.

### `shouldCloseOnOutsideClick?: boolean`

Optional. Determines if the bottom sheet should close when clicking outside of it.

### `snapPoints?: SnapPoints`

Optional. Defines preset stopping points for draggable states of the bottom sheet.

### `expandable?: boolean`

Optional. If true, the bottom sheet can be dragged up above its content height. Default is `true`.

### `draggable?: boolean`

Optional. If true, the bottom sheet can be dragged. Default is `true`.

### `backgroundDraggable?: boolean`

Optional. If true, the content's background can be dragged. Default is `true`.

### `dragTriggers?: HTMLElement[]`

Optional. Elements that will trigger dragging of the bottom sheet.

### `beforeOpen?: () => void`

Optional. Function called before the bottom sheet opens.

### `afterOpen?: () => void`

Optional. Function called after the bottom sheet opens.

### `beforeClose?: () => void`

Optional. Function called before the bottom sheet closes.

### `afterClose?: () => void`

Optional. Function called after the bottom sheet closes.

### `onDragStart?: () => void`

Optional. Function called when dragging starts.

### `onDragMove?: (direction: DraggingDirection, progress: number) => void`

Optional. Function called during dragging. Parameters:

- `direction`: Current direction based on pointer start.
- `progress`: A number from 0 to 1 representing how far the bottom sheet is dragged.

### `onDragEnd?: () => void`

Optional. Function called when dragging ends.

### `shouldShowHandle?: boolean`

Optional. Determines if a handle should be shown at the top of the bottom sheet.

### `shouldShowBackdrop?: boolean`

Optional. Determines if a backdrop is shown behind the bottom sheet.

### `containerBorderRadius?: CSSUnit | null`

Optional. Defines the border radius of the container.

### `backdropColor?: CSSColor | string | null`

Optional. Sets the color of the backdrop.

### `backDropTransition?: string | null`

Optional. Defines the transition for the backdrop appearance.

### `rootClass?: string | null`

Optional. Custom class for the root element of the bottom sheet.

### `containerClass?: string | null`

Optional. Custom class for the container element.

### `handleClass?: string | null`

Optional. Custom class for the handle element.

### `contentWrapperClass?: string | null`

Optional. Custom class for the content wrapper element.

### `backdropClass?: string | null`

Optional. Custom class for the backdrop element.

### `draggingAnimationTimings?: CommonAnimation | AnimationTimingPoints | null`

Optional. Specifies the animation timings using a common preset or custom Bezier points.

### `draggingAnimationDuration?: number`

Optional. Duration of the dragging animation in milliseconds.
