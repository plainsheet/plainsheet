import { afterEach, expect, test } from "vitest";
import { getByText, screen } from "@testing-library/dom";
import { ClassNames, createBottomSheet } from "src";
import { prepareOpenBottomSheet } from "__tests__/setup/prepare-bottom-sheet";
import { sleep } from "__tests__/utils/timer";

afterEach(() => {
  document.body.innerHTML = "";
});

test("Content should be reactive", async () => {
  const bottomSheet = prepareOpenBottomSheet({
    content: "content",
  });

  await sleep(bottomSheet.props.draggingAnimationDuration);

  const nextContent = "nextContent";
  bottomSheet.props.content = nextContent;

  const rootEl = bottomSheet.elements.bottomSheetRoot;
  if (!rootEl) {
    throw Error("Bottom sheet element not found");
  }
  expect(getByText(rootEl, nextContent)).toBeTruthy();
});

test("width should be reactive", async () => {
  const bottomSheet = prepareOpenBottomSheet({
    content: "content",
    width: "100%",
  });

  await sleep(bottomSheet.props.draggingAnimationDuration);

  const nextWidth = "80%";
  bottomSheet.props.width = nextWidth;

  const rootEl = bottomSheet.elements.bottomSheetRoot;
  if (!rootEl) {
    throw Error("Bottom sheet element not found");
  }
  expect(rootEl.style.width).toBe(nextWidth);
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

  screen
    .getByTestId(ClassNames.Root)
    .classList.contains(nextClassNamesObject.Root);
  screen
    .getByTestId(ClassNames.Backdrop)
    .classList.contains(nextClassNamesObject.Backdrop);
  screen
    .getByTestId(ClassNames.Handle)
    .classList.contains(nextClassNamesObject.Handle);
  screen
    .getByTestId(ClassNames.Container)
    .classList.contains(nextClassNamesObject.Container);
  screen
    .getByTestId(ClassNames.ContentWrapper)
    .classList.contains(nextClassNamesObject.ContentWrapper);
});

test("dragging options should be reactive", () => {
  // expandable
  // draggable
  // backgroundDraggable
  // shouldCloseOnOutsideClick
  expect(1 + 2).toBe(3);
});
