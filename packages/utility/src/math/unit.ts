export function pxToNumber(px: string): number {
  return Number(px.replace("px", ""));
}

export function toFixedNumber(
  value: number,
  ...toFixedParams: Parameters<typeof Number.prototype.toFixed>
): number {
  return Number(value.toFixed(...toFixedParams));
}
