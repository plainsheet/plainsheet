export type TransformValue = {
  type: string;
  values: string[];
};
export function getTransformValues(element: HTMLElement) {
  const currentTransform = element.style.transform;
  const currentTransformValues = extractTransforms(currentTransform);

  return { currentTransform, currentTransformValues };
}

export function extractTransforms(transformString: string): TransformValue[] {
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

export function pickTransformValue(
  currentTransformValues: TransformValue[],
  valueName: string
) {
  const currentTranslate = currentTransformValues.find((transformValue) =>
    transformValue.type.startsWith(valueName)
  );

  if (!currentTranslate) {
    return null;
  }

  return currentTranslate;
}
