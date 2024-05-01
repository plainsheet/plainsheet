export function observe<T extends object>(obj: T): T {
  const handler: ProxyHandler<T> = {
    set(target, property, value, receiver) {
      return Reflect.set(target, property, value, receiver);
    },
  };

  return new Proxy(obj, handler);
}
