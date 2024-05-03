export interface TransformValue {
  type: string;
  values: string[];
}

export function stringToTransforms(transformString: string): TransformValue[] {
  // NOTE: The regex catches this format: propertyName(valueOne, valueTwo)
  // - First group: propertyName
  // - Second group: (valueOne, valueTwo)
  const regex = /(?<type>\w+)\((?<values>[^)]+)\)/g;
  const transforms: TransformValue[] = [];
  let match;

  while ((match = regex.exec(transformString)) !== null) {
    const transformType = match[1];
    const transformValues = match[2].split(",").map((value) => value.trim());
    transforms.push({ type: transformType, values: transformValues });
  }

  return transforms;
}

export function getTransformValues(element: HTMLElement): {
  transform: string;
  transformValues: TransformValue[];
} {
  const transform = element.style.transform;
  const transformValues = stringToTransforms(transform);

  return { transform, transformValues };
}

export function pickTransformValue(
  currentTransformValues: TransformValue[],
  valueName: string
): TransformValue | null {
  const currentTranslate = currentTransformValues.find((transformValue) =>
    transformValue.type.startsWith(valueName)
  );

  if (!currentTranslate) {
    return null;
  }

  return currentTranslate;
}
