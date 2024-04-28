/**
 * @description Points that express the timing of animations as a Bezier curve.
 */
export type AnimationTimingPoints = {
  p1x: number;
  p1y: number;
  p2x: number;
  p2y: number;
};

export type CommonAnimations = EasingAnimations | SpringAnimations;
export type EasingAnimations =
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "spring";
export type SpringAnimations = "spring";
