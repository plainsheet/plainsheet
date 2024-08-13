export type CSSColor = RGB | RGBA | HEX | HSL;

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type HSL = `hsl(${string})`;

export type CSSUnit = Pixel | EM | REM | VW | VH;

export type Pixel = `${number}px`;
export type EM = `${number}em`;
export type REM = `${number}rem`;
export type VW = `${number}vw`;
export type VH = `${number}vh`;
