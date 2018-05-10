/**
 * Appends 'px' to the end of number value for use as pixel string in styles
 */
export declare function toString(px: number): string;
/**
 * Converts point value (pt) to pixels
 * Returns a string for font-size property
 * e.g. fromPoint(8) => '24px'
 */
export declare function fromPoint(pt: number): string;
/**
 * Converts point value (pt) to pixels
 * Returns a number for font-size property
 * e.g. fromPoint(8) => 24px
 */
export declare function fromPointToPixel(pt: number): number;
/**
 * Converts pixel value (px) to pt
 * e.g. toPoint(24) => 8
 */
export declare function toPoint(px: number): number;
