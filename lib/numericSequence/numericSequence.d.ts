import { NumericSequenceRange } from "./numericSequenceRange";
export declare class NumericSequence {
    private static MIN_COUNT;
    private static MAX_COUNT;
    private maxAllowedMargin;
    private canExtendMin;
    private canExtendMax;
    interval: number;
    intervalOffset: number;
    min: number;
    max: number;
    precision: number;
    sequence: number[];
    static calculate(range: NumericSequenceRange, expectedCount: number, maxAllowedMargin?: number, minPower?: number, useZeroRefPoint?: boolean, steps?: number[]): NumericSequence;
    /**
     * Calculates the sequence of int numbers which are mapped to the multiples of the units grid.
     * @min - The minimum of the range.
     * @max - The maximum of the range.
     * @maxCount - The max count of intervals.
     * @steps - array of intervals.
     */
    static calculateUnits(min: number, max: number, maxCount: number, steps: number[]): NumericSequence;
    trimMinMax(min: number, max: number): void;
}
