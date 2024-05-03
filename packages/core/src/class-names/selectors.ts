import { classesToSelector } from "../utils/dom/class-names";
import { ClassNames } from "./class-names";

export const BOTTOM_SHEET_SELECTORS = {
  CONTENTS_WRAPPER: classesToSelector([
    ClassNames.Root,
    ClassNames.ContentWrapper,
  ]),
};
