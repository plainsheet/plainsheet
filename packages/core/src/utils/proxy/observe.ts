export type ObserverSetHandler = (
  property: string | symbol,
  value: unknown
) => void;

export function observe<T extends object>(
  obj: T,
  onSet: ObserverSetHandler
): T {
  const handler: ProxyHandler<T> = {
    set(target, property, value, receiver) {
      onSet(property, value);
      return Reflect.set(target, property, value, receiver);
    },
  };

  return new Proxy(obj, handler);
}
