const TRANSLATE = "translate";

export function getTranslate(element: HTMLElement) {
  const currentTransform = element.style.transform;
  const currentTransformValues = extractTransforms(currentTransform);
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
  const { currentTransform, currentTransformValues } =
    getTransformValues(element);

  const currentTranslate = pickTransformValue(
    currentTransformValues,
    TRANSLATE
  );

  // Has "translate"
  if (currentTranslate) {
    const currentCoordinates =
      getCoordinatesFromTranslateValue(currentTranslate);

    // Current transform values except translate

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

type TransformValue = {
  type: string;
  values: string[];
};
function getTransformValues(element: HTMLElement) {
  const currentTransform = element.style.transform;
  const currentTransformValues = extractTransforms(currentTransform);

  return { currentTransform, currentTransformValues };
}
function extractTransforms(transformString: string): TransformValue[] {
  const regex = /(\w+)\(([^)]+)\)/g;
  const transforms: TransformValue[] = [];
  let match;

  while ((match = regex.exec(transformString)) !== null) {
    const transformType = match[1];
    const transformValues = match[2].split(",").map((value) => value.trim());
    transforms.push({ type: transformType, values: transformValues });
  }

  return transforms;
}

function pickTransformValue(
  currentTransformValues: TransformValue[],
  value: string
) {
  const currentTranslate = currentTransformValues.find((transformValue) =>
    transformValue.type.startsWith(value)
  );

  if (!currentTranslate) {
    return null;
  }

  return currentTranslate;
}

function getCoordinatesFromTranslateValue(transformValue: TransformValue) {
  const currentTranslateX = transformValue.values?.[0];
  const currentTranslateY = transformValue.values?.[1];

  return {
    x: pxToNumber(currentTranslateX) ?? 0,
    y: pxToNumber(currentTranslateY) ?? 0,
  };
}

function pxToNumber(px: string) {
  return Number(px.replace("px", ""));
}
