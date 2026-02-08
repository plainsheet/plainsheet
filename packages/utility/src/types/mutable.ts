export type Mutable<T> = { -readonly [P in keyof T]: Mutable<T[P]> };

type EqualTernary<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type GetNonMutableKeys<T> = {
  [P in keyof T]-?: EqualTernary<Pick<T, P>, Readonly<Pick<T, P>>, P, never>;
}[keyof T];

export type GetMutableKeys<T> = {
  [P in keyof T]-?: EqualTernary<Pick<T, P>, Readonly<Pick<T, P>>, never, P>;
}[keyof T];
