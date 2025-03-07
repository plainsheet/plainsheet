---
"@plainsheet/core": patch
"@plainsheet/react": patch
---

- `close` methods of `useButtonSheet` properly closes the bottom sheet. Previously, only setting `isOpen` to false would close the bottom sheet.
- `draggable` should prevent dragging.
- `dragTriggers` should work with elements created after the bottom sheet is mounted
- `isClosed` is added to the `useButtonSheet`'s return object to determine if the bottom sheet is closed.
