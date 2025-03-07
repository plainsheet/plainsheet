# plain-bottom-sheet-core

## 0.7.10

### Patch Changes

- 7f01005: - `close` methods of `useButtonSheet` properly closes the bottom sheet. Previously, only setting `isOpen` to false would close the bottom sheet.
  - `draggable` should prevent dragging.
  - `dragTriggers` should work with elements created after the bottom sheet is mounted
  - `isClosed` is added to the `useButtonSheet`'s return object to determine if the bottom sheet is closed.

## 0.7.9

### Patch Changes

- 25eb87f: Feat: React 19 support

## 0.7.8

### Patch Changes

- 4f6ed0d: Feat: adding a prop to control if the bottom sheet can be closed or not

## 0.7.7

### Patch Changes

- b4de797: Feat: add descriptions for the style API, improve the useBottomSheet interface

## 0.7.6

### Patch Changes

- 890a1f4: feat(core): style customization feature

## 0.7.5

### Patch Changes

- 8b1af49: feat(core): make the draggable reactive

## 0.7.4

### Patch Changes

- 11657e8: Feat: Nextjs examples - Mutable props

## 0.7.3

### Patch Changes

- b32460b: Fix: shouldCloseOnOutside should not break the open method

## 0.7.2

### Patch Changes

- dd3122b: Fix: closeOnUutsideClick should close the bottom sheet only when it is open

## 0.7.1

### Patch Changes

- c0dd419: Feat: Set the default animation timing function to ease, and add more examples

## 0.7.0

### Minor Changes

- prevent scrolling on ios devices when the bottom sheet is open

## 0.6.0

### Minor Changes

- rename interfaces for better consistency

## 0.5.1

### Patch Changes

- readme updates

## 0.5.0

### Minor Changes

- rename packges under plainsheet to keep them simple

## 0.4.3

### Patch Changes

- update readme files

## 0.4.2

### Patch Changes

- improve reactivity of props

## 0.4.1

### Patch Changes

- make the handle larger for better dragging experience

## 0.4.0

### Minor Changes

- default animation timing function works like ios

## 0.3.2

### Patch Changes

- fixed the initiail translate Y on iOS Safari

## 0.3.1

### Patch Changes

- 9f9c776: Accessibility improvements

## 0.3.0

### Minor Changes

- 72a87b2: docs(core) readme

## 0.2.1

### Patch Changes

- 0520f35: Large content scroll behavior improvement

## 0.2.0

### Minor Changes

- eef32f3: Make it closable with the esc key and add tests.

## 0.1.2

### Patch Changes

- 6c1b8b8: changed the default width to fit the width of the screen

## 0.1.1

### Patch Changes

- f5fd703: Prevent the background being scrolled when it is being dragged

## 0.1.0

### Minor Changes

- 08ecff8: Make all the props reactive, and fix ESLint errors
