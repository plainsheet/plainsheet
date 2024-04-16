# Plain Bottom Sheet 🦭

The minimalistic, configurable bottom-sheet for the Web.

## Why would you use it?

- 🫙 Zero dependencies, pure JavaScript(though written in TypeScript),
- 🪶 Super Lightweight(Only 30 Kb, compressed),
- 📱 Mobile-friendly, works just like native bottom sheets.
- 🎛 Highly configurable. You can style anything and listen to any event from it.
- ⚡️ Performant by default.
- 🦾 Fully-typed.

## Key Features

- Configurations

  - Lifecycle callbacks
    - `beforeOpen`, `afterOpen`, `beforeClose`, `afterClose`, `onDragStart`, `onDragMove(direction, progress)`, `onDragEnd`
  - Behaviors
    - `expandable`
    - `snappingPoints`
    - `closeOnOutsideClick`
    - `backgroundScrollable`
  - Styling
    - `hideHandle`
    - `hideBackdrop`
    - `backdropColor`
    - `backdropAnim`
    - `containerBorderRadius`
  - Direct CSS customization
    - `rootClass`
    - `containerClass`
    - `handleClass`
    - `contentWrapperClass`
    - `backdropClass`

- Methods
  - `open`, `close`, `moveTo`, `snapTo`
- States

  - `isOpen`, `isClosed`, `position`, `height`

- Custom animations(CSS transition timing syntax)
  - `openAnim`, `closeAnim`, `snapAnim`.

### Commands

- `pnpm dev`
- `pnpm clean`
- `pnpm lint`
- `pnpm build`
- `pnpm changeset`
- `pnpm add --filter {workspace}`
- `pnpm add --filter {workspace} --save-dev`
