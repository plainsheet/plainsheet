export function exists<T = unknown>(
  value: T
): value is Exclude<T, undefined | null> {
  return value !== null && value !== undefined;
}
