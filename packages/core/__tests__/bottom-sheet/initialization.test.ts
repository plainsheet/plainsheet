import { expect, test } from "vitest";
import { createBottomSheet } from "src";

test("Every prop should be initialized with default value when the value is not provided", () => {
  const bottomSheet = createBottomSheet({
    content: "content",
  });

  Object.values(bottomSheet.props).forEach((value) => {
    expect(value).not.toBe(undefined);
  });
});

test("Bottom sheet elements should be created", () => {
  const bottomSheet = createBottomSheet({
    content: "content",
  });

  Object.values(bottomSheet.elements).forEach((el) => {
    expect(el).not.toBe(undefined);
  });
});

test("Bottom sheet should be mounted", () => {
  const bottomSheet = createBottomSheet({
    content: "content",
  });

  bottomSheet.mount();

  expect(bottomSheet.getIsMounted()).toBe(true);
});

test("Bottom sheet should be open", () => {
  const bottomSheet = createBottomSheet({
    content: "content",
  });

  bottomSheet.mount();

  bottomSheet.open();

  setTimeout(() => {
    expect(bottomSheet.getIsOpen()).toBe(true);
  }, bottomSheet.props.draggingAnimationDuration);
});
