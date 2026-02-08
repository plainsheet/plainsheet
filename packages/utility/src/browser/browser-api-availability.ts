export function canUseHistory(): boolean {
  return typeof window !== "undefined" && typeof window.history !== "undefined";
}

export function canUseSessionStorage(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
}
