import type { AnimationTimingFunction } from "./animation.type";

export type CubicBezierReturnType = ReturnType<typeof cubicBezier>;

// Creates a ratio(0 ~ 1) that can be used to represent a smooth curve when multiplied by the value.
// P0 is (0, 0) and P3 is (1,1), to represent th ratio.
// So it only accepts P1 and P2, although it draws a cubic Bezier curve.
export function cubicBezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): AnimationTimingFunction {
  // Limit the range of the change from the function.
  const limit = 0.001;

  // t varies from 0 to 1.
  return function (t: number): number {
    return sampleCurveY(solveCurveX(t));
  };

  function solveCurveX(timing: number): number {
    let t0 = 0;
    let t1 = 1;

    let t2: number = timing;
    let x2: number;

    if (timing === 0 || timing === 1) {
      return timing;
    }

    // Binary search to find the output x within the limit
    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - timing) < limit) {
        return t2;
      }
      if (timing > x2) {
        // Current x is less than the original(input x)
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 + t0) / 2;
    }
    // return the found timing that matches the x coordinate with the given input t
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
