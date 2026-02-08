import type { GetMutableKeys } from "@plainsheet/utility";

export type Position = number;

export interface Coordinates {
  x: Position;
  y: Position;
}

export type StyleCreators = Partial<
  Record<Extract<GetMutableKeys<CSSStyleDeclaration>, string>, StyleCreator>
>;
type StyleCreator = (percent: number) => string;
