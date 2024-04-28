import { exists } from "../types/exists";

export function boundNumber(
  value: number,
  {
    min,
    max,
  }: {
    min?: number;
    max?: number;
  }
) {
  if (exists(max) && value >= max) {
    return max;
  }
  if (exists(min) && value <= min) {
    return min;
  }

  return value;
}
