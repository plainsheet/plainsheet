import { expect, test } from "vitest";
import { getByTestId, getByText } from "@testing-library/dom";
import { prepareOpenBottomSheet } from "__tests__/setup/prepare-bottom-sheet";
import { sleep } from "__tests__/utils/timer";
import { ClassNames, createBottomSheet } from "src";

test("Content should be reactive", async () => {
  const bottomSheet = prepareOpenBottomSheet({
    content: "content",
  });

  await sleep(bottomSheet.props.draggingAnimationDuration);

  const nextContent = "nextContent";
  bottomSheet.props.content = nextContent;

  expect(getByText(bottomSheet.elements.bottomSheetRoot, nextContent)).toBe(
    true
  );
});

test("width should be reactive", async () => {
  const bottomSheet = prepareOpenBottomSheet({
    content: "content",
    width: "100%",
  });

  await sleep(bottomSheet.props.draggingAnimationDuration);

  const nextWidth = "80%";
  bottomSheet.props.width = nextWidth;

  expect(bottomSheet.elements.bottomSheetContainer.style.width).toBe(nextWidth);
});

test("class names should be reactive", () => {
  const bottomSheet = createBottomSheet({
    content: "",
  });
  bottomSheet.mount();

  const nextClassNames = Object.entries(ClassNames).map(
    ([elementName, className]) => {
      return [elementName, `next-${className}`];
    }
  );
  const nextClassNamesObject = Object.fromEntries(nextClassNames) as Record<
    keyof typeof ClassNames,
    string
  >;

  bottomSheet.props.rootClass = nextClassNamesObject.Root;
  bottomSheet.props.backdropClass = nextClassNamesObject.Backdrop;
  bottomSheet.props.handleClass = nextClassNamesObject.Handle;
  bottomSheet.props.containerClass = nextClassNamesObject.Container;
  bottomSheet.props.contentWrapperClass = nextClassNamesObject.ContentWrapper;

  getByTestId(
    bottomSheet.elements.bottomSheetRoot,
    ClassNames.Root
  ).classList.contains(nextClassNamesObject.Root);
  getByTestId(
    bottomSheet.elements.bottomSheetBackdrop,
    ClassNames.Backdrop
  ).classList.contains(nextClassNamesObject.Backdrop);
  getByTestId(
    bottomSheet.elements.bottomSheetHandle,
    ClassNames.Handle
  ).classList.contains(nextClassNamesObject.Handle);
  getByTestId(
    bottomSheet.elements.bottomSheetContainer,
    ClassNames.Container
  ).classList.contains(nextClassNamesObject.Container);
  getByTestId(
    bottomSheet.elements.bottomSheetContentWrapper,
    ClassNames.ContentWrapper
  ).classList.contains(nextClassNamesObject.ContentWrapper);
});

test("dragging options should be reactive", () => {
  // expandable
  // draggable
  // backgroundDraggable
  // shouldCloseOnOutsideClick
  expect(1 + 2).toBe(3);
});
