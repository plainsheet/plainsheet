export function pxToNumber(px: string) {
  return Number(px.replace("px", ""));
}

export function toFixedInNumber(
  value: number,
  ...toFixedParams: Parameters<typeof Number.prototype.toFixed>
) {
  return Number(value.toFixed(...toFixedParams));
}
