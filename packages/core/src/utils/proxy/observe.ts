export function observe<T extends object>(
  obj: T,
  onSet: (property: string | symbol, value: unknown) => void
): T {
  const handler: ProxyHandler<T> = {
    set(target, property, value, receiver) {
      onSet(property, value);
      return Reflect.set(target, property, value, receiver);
    },
  };

  return new Proxy(obj, handler);
}
