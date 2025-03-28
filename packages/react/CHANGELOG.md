# @plainsheet/react-plain-bottom-sheet

## 0.4.11

### Patch Changes

- Updated dependencies [6b4fc74]
  - @plainsheet/core@0.7.11

## 0.4.10

### Patch Changes

- 7f01005: - `close` methods of `useButtonSheet` properly closes the bottom sheet. Previously, only setting `isOpen` to false would close the bottom sheet.
  - `draggable` should prevent dragging.
  - `dragTriggers` should work with elements created after the bottom sheet is mounted
  - `isClosed` is added to the `useButtonSheet`'s return object to determine if the bottom sheet is closed.
- Updated dependencies [7f01005]
  - @plainsheet/core@0.7.10

## 0.4.9

### Patch Changes

- 25eb87f: Feat: React 19 support
- Updated dependencies [25eb87f]
  - @plainsheet/core@0.7.9

## 0.4.8

### Patch Changes

- 4f6ed0d: Feat: adding a prop to control if the bottom sheet can be closed or not
- Updated dependencies [4f6ed0d]
  - @plainsheet/core@0.7.8

## 0.4.7

### Patch Changes

- b4de797: Feat: add descriptions for the style API, improve the useBottomSheet interface
- Updated dependencies [b4de797]
  - @plainsheet/core@0.7.7

## 0.4.6

### Patch Changes

- 890a1f4: feat(core): style customization feature
- Updated dependencies [890a1f4]
  - @plainsheet/core@0.7.6

## 0.4.5

### Patch Changes

- 8b1af49: feat(core): make the draggable reactive
- Updated dependencies [8b1af49]
  - @plainsheet/core@0.7.5

## 0.4.4

### Patch Changes

- 11657e8: Feat: Nextjs examples - Mutable props
- Updated dependencies [11657e8]
  - @plainsheet/core@0.7.4

## 0.4.3

### Patch Changes

- b32460b: Fix: shouldCloseOnOutside should not break the open method
- Updated dependencies [b32460b]
  - @plainsheet/core@0.7.3

## 0.4.2

### Patch Changes

- dd3122b: Fix: closeOnUutsideClick should close the bottom sheet only when it is open
- Updated dependencies [dd3122b]
  - @plainsheet/core@0.7.2

## 0.4.1

### Patch Changes

- Updated dependencies [c0dd419]
  - @plainsheet/core@0.7.1

## 0.4.0

### Minor Changes

- prevent scrolling on ios devices when the bottom sheet is open

### Patch Changes

- Updated dependencies
  - @plainsheet/core@0.7.0

## 0.3.1

### Patch Changes

- Updated dependencies [dcdda0e]
  - @plainsheet/utility@0.0.3

## 0.3.0

### Minor Changes

- rename interfaces for better consistency

### Patch Changes

- Updated dependencies
  - @plainsheet/core@0.6.0

## 0.2.1

### Patch Changes

- readme updates
- Updated dependencies
  - @plainsheet/core@0.5.1

## 0.2.0

### Minor Changes

- rename packges under plainsheet to keep them simple

### Patch Changes

- Updated dependencies
  - @plainsheet/core@0.5.0

## 0.1.0

### Minor Changes

- change the prop's type name

## 0.0.4

### Patch Changes

- readme image

## 0.0.3

### Patch Changes

- update readme files
- Updated dependencies
  - @plainsheet/plain-bottom-sheet-core@0.4.3

## 0.0.2

### Patch Changes

- improve reactivity of props
- Updated dependencies
  - @plainsheet/utility@0.0.2
  - @plainsheet/plain-bottom-sheet-core@0.4.2
