/**
 * Values are in terms of 'pt'
 * Convert to pixels using PixelConverter.fromPoint
 */
export declare module TextSizeDefaults {
    /**
     * Stored in terms of 'pt'
     * Convert to pixels using PixelConverter.fromPoint
     */
    const TextSizeMin: number;
    /**
     * Stored in terms of 'pt'
     * Convert to pixels using PixelConverter.fromPoint
     */
    const TextSizeMax: number;
    /**
     * Returns the percentage of this value relative to the TextSizeMax
     * @param textSize - should be given in terms of 'pt'
     */
    function getScale(textSize: number): number;
}
