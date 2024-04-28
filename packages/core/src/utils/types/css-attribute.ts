export type CSSColor = RGB | RGBA | HEX;

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type CSSUnit = Pixel | EM | REM | VW | VH | string;

export type Pixel = `${number}px`;
export type EM = `${number}em`;
export type REM = `${number}rem`;
export type VW = `${number}vw`;
export type VH = `${number}vh`;
