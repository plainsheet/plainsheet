import { isNumber } from "../types/is-number";

/**
 * Points that express the timing of animations as a cubic Bezier curve.
 */
export interface AnimationTimingPoints {
  p1x: number;
  p1y: number;
  p2x: number;
  p2y: number;
}

export type AnimationTimingFunction = (x: number) => number;

export type CommonAnimationKeys = typeof COMMON_ANIMATION_KEYS;
export type CommonAnimationKey = keyof CommonAnimationKeys;
export type CommonAnimation = CommonAnimationKeys[CommonAnimationKey];

export const COMMON_ANIMATION_KEYS = {
  EASE: "ease",
  EASE_IN: "ease-in",
  EASE_OUT: "ease-out",
  EASE_IN_OUT: "ease-in-out",
  SPRING: "spring",
} as const;

export function isCommonAnimationTimingsKey(
  value: unknown
): value is CommonAnimationKey {
  for (const animName of Object.values(COMMON_ANIMATION_KEYS)) {
    if (animName === value) {
      return true;
    }
  }

  return false;
}

export function isAnimationTimingPoints(
  value: unknown
): value is AnimationTimingPoints {
  if (
    value instanceof Object &&
    "p1x" in value &&
    "p1y" in value &&
    "p2x" in value &&
    "p2y" in value &&
    isNumber(value.p1x) &&
    isNumber(value.p1y) &&
    isNumber(value.p2x) &&
    isNumber(value.p2y)
  ) {
    return true;
  }

  return false;
}
