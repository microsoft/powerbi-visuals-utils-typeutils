export declare module PixelConverter {
    /**
     * Appends 'px' to the end of number value for use as pixel string in styles
     */
    function toString(px: number): string;
    /**
     * Converts point value (pt) to pixels
     * Returns a string for font-size property
     * e.g. fromPoint(8) => '24px'
     */
    function fromPoint(pt: number): string;
    /**
     * Converts point value (pt) to pixels
     * Returns a number for font-size property
     * e.g. fromPoint(8) => 24px
     */
    function fromPointToPixel(pt: number): number;
    /**
     * Converts pixel value (px) to pt
     * e.g. toPoint(24) => 8
     */
    function toPoint(px: number): number;
}
