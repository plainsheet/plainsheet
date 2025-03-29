import type { AnimationTimingFunction } from "./animation.type";

export type CubicBezierReturnType = ReturnType<typeof cubicBezier>;

/**
 * Overview: BezierCurve(t) = (x(t), y(t)), where t is within 0 ~ 1
 * For more on cubic Bezier curves, see:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/cubic-bezier#description
 *

 * How does it work?
 * 1. Define a graph(Bezier curve) using two points, P1 and P2. P0(0,0) and P3(1,1) are implicit
 * 2. With the time input(t1), solve for the x axis in the graph.
 *  x(t1) → t2(time progress)
 *  here, we try to find the approximate value to the input t1
 * 3. With the time progress in the graph, we solve for y, which is the actual output progress.
 *  y(t2) → output progress
 */

export function cubicBezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): AnimationTimingFunction {
  // Limit for acceptable error margin when solving x(t) ≈ input
  const limit = 0.001;

  return function (t: number): number {
    return sampleCurveY(solveCurveX(t));
  };

  function solveCurveX(timing: number): number {
    if (timing === 0 || timing === 1) {
      return timing;
    }
    // TODO: variable names could be more self-explanatory.
    // for now I'm keeping them as-is to avoid errors.
    let t0 = 0;
    let t1 = 1;

    let t2: number = timing;
    let x2: number;

    // Binary search to find the time progress.
    // with the input value and the x-axis formula,
    // it tries to find the t2 that produces a value(x2) approximate to the original input.
    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - timing) < limit) {
        // Within the error margin, so exit the function.
        return t2;
      }

      // Outside the error margin, hence perform the error correction to get the x closer to the original input.
      if (timing > x2) {
        // x is less than the input
        // Raise the floor
        t0 = t2;
      } else {
        // x is greater than or equals to the input
        // Lower the ceiling
        t1 = t2;
      }
      // Set t2 to median
      t2 = (t1 + t0) / 2;
    }
    // Return the found timing that matches the x coordinate with the given input t
    // the newly found timing then can be used to find the corresponding y coordinate.
    return t2;
  }

  function sampleCurveX(t: number): number {
    // Using the cubic Bezier curve formula, solve for x of all points.
    return (
      3 * p1x * t * Math.pow(1 - t, 2) +
      3 * p2x * Math.pow(t, 2) * (1 - t) +
      Math.pow(t, 3)
    );
  }
  function sampleCurveY(t: number): number {
    // Solve for y of all points.
    return (
      3 * p1y * t * Math.pow(1 - t, 2) +
      3 * p2y * Math.pow(t, 2) * (1 - t) +
      Math.pow(t, 3)
    );
  }
}
