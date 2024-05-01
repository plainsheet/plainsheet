import type { AnimationTimingFunction } from "./animation.type";

export type CubicBezierReturnType = ReturnType<typeof cubicBezier>;

export function cubicBezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): AnimationTimingFunction {
  // Precision of the solution
  const precision = 0.00001;

  return function (x: number): number {
    return sampleCurveY(solveCurveX(x));
  };

  function solveCurveX(x: number): number {
    let t0 = 0;
    let t1 = 1;
    let t2: number = x;
    let x2: number;

    if (x === 0 || x === 1) {
      return x; // x is 0 or 1, return it directly (corner cases)
    }

    // Perform binary search to find the correct t
    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < precision) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 + t0) / 2; // update t2 to the midpoint
    }

    // Return the best t found
    return t2;
  }

  // Sampling functions
  function sampleCurveX(t: number): number {
    return (
      3 * p1x * t * Math.pow(1 - t, 2) +
      3 * p2x * Math.pow(t, 2) * (1 - t) +
      Math.pow(t, 3)
    );
  }
  function sampleCurveY(t: number): number {
    return (
      3 * p1y * t * Math.pow(1 - t, 2) +
      3 * p2y * Math.pow(t, 2) * (1 - t) +
      Math.pow(t, 3)
    );
  }
}
