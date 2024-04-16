import { ClassNames } from "./class-names";

export const BOTTOM_SHEET_SELECTORS = {
  CONTENTS_WRAPPER: classesToSelector([
    ClassNames.Root,
    ClassNames.ContentWrapper,
  ]),
};

function classesToSelector(classNames: (string | undefined | null)[]) {
  return classNames
    .map((className) => className?.trimStart().trimEnd())
    .filter(Boolean)
    .map((className) => `.${className}`)
    .join(" ");
}
