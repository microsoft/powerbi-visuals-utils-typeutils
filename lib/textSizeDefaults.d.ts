/**
 * Values are in terms of 'pt'
 * Convert to pixels using PixelConverter.fromPoint
 */
/**
 * Stored in terms of 'pt'
 * Convert to pixels using PixelConverter.fromPoint
 */
export declare const TextSizeMin: number;
/**
 * Stored in terms of 'pt'
 * Convert to pixels using PixelConverter.fromPoint
 */
export declare const TextSizeMax: number;
/**
 * Returns the percentage of this value relative to the TextSizeMax
 * @param textSize - should be given in terms of 'pt'
 */
export declare function getScale(textSize: number): number;
