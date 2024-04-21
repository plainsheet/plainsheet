import { pxToNumber } from "../math/unit";
import {
  stringToTransforms,
  getTransformValues,
  pickTransformValue,
  TransformValue,
} from "./transform";

const TRANSLATE = "translate";

export function getTranslate(element: HTMLElement) {
  const currentTransform = element.style.transform;
  const currentTransformValues = stringToTransforms(currentTransform);

  const currentTranslate = pickTransformValue(
    currentTransformValues,
    TRANSLATE
  );

  const defaultTranslate = {
    type: TRANSLATE,
    values: [],
  };

  return getCoordinatesFromTranslateValue(currentTranslate ?? defaultTranslate);
}

export function setTranslate(
  element: HTMLElement,
  {
    x,
    y,
  }: {
    x?: number;
    y?: number;
  }
) {
  const {
    transform: currentTransform,
    transformValues: currentTransformValues,
  } = getTransformValues(element);

  const currentTranslate = pickTransformValue(
    currentTransformValues,
    TRANSLATE
  );

  // Has "translate"
  if (currentTranslate) {
    const currentCoordinates =
      getCoordinatesFromTranslateValue(currentTranslate);

    // TODO: Keep the previous transformValues along with translate
    // const transformValues = currentTransformValues.filter(
    //   (transformValue) => !transformValue.type.startsWith(TRANSLATE)
    // );
    element.style.transform = `translate(${x ?? currentCoordinates.x ?? 0}px,${y ?? currentCoordinates.y ?? 0}px)`;
    return;
  }

  // Doesn't have  "translate", but have other transform values
  if (currentTransform) {
    element.style.transform = `${currentTransform}, translate(${x ?? 0}px,${y ?? 0}px)`;

    return;
  }

  element.style.transform = `translate(${x ?? 0}px,${y ?? 0}px)`;
}

export function getCoordinatesFromTranslateValue(
  transformValue: TransformValue
) {
  if (transformValue.type !== "translate") {
    throw new Error(
      `Could not get coordinates from ${transformValue.type}, since is not translate.`
    );
  }

  const currentTranslateX = transformValue.values?.[0];
  const currentTranslateY = transformValue.values?.[1];

  return {
    x: pxToNumber(currentTranslateX) ?? 0,
    y: pxToNumber(currentTranslateY) ?? 0,
  };
}
