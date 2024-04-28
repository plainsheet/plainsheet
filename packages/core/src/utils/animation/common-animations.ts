import { cubicBezier } from "./cubic-bezier";

export const easeIn = cubicBezier(0.42, 0.0, 1.0, 1.0);
export const easeOut = cubicBezier(0.0, 0.0, 0.58, 1.0);
export const easeInOut = cubicBezier(0.17, 0.67, 0.83, 0.67);

export const spring = cubicBezier(0.45, 1.5, 0.55, 1.0);
