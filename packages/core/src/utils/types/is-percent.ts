import { isNumber } from "./is-number";

export function isPercent(value: unknown): value is number {
  if (!isNumber(value)) {
    return false;
  }
  if (value > 1) {
    return false;
  }
  if (value < 0) {
    return false;
  }

  return true;
}
