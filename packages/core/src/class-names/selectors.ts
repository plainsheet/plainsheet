import { classesToSelector } from "src/utils/dom/classNames";
import { ClassNames } from "./class-names";

export const BOTTOM_SHEET_SELECTORS = {
  CONTENTS_WRAPPER: classesToSelector([
    ClassNames.Root,
    ClassNames.ContentWrapper,
  ]),
};
