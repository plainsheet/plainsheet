import type {
  AnimationTimingFunction,
  CommonAnimation,
} from "./animation.type";
import { COMMON_ANIMATION_KEYS } from "./animation.type";
import { cubicBezier } from "./cubic-bezier";

export const ease = cubicBezier(0.25, 0.1, 0.25, 1);
export const easeIn = cubicBezier(0.42, 0.0, 1.0, 1.0);
export const easeOut = cubicBezier(0.42, 0.0, 0.58, 1.0);
export const easeInOut = cubicBezier(0.4, 0.1, 0.6, 1.0);
export const spring = cubicBezier(0.45, 1.5, 0.55, 1.0);

export function commonAnimationTimingsNameToFunction(
  key: CommonAnimation
): AnimationTimingFunction {
  switch (key) {
    case COMMON_ANIMATION_KEYS.EASE:
      return ease;

    case COMMON_ANIMATION_KEYS.EASE_IN:
      return easeIn;

    case COMMON_ANIMATION_KEYS.EASE_OUT:
      return easeOut;

    case COMMON_ANIMATION_KEYS.EASE_IN_OUT:
      return easeInOut;

    case COMMON_ANIMATION_KEYS.SPRING:
      return spring;

    default:
      return ease;
  }
}
