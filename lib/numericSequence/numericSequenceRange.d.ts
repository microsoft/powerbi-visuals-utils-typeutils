export declare class NumericSequenceRange {
    private static DEFAULT_MAX;
    private static MIN_SUPPORTED_DOUBLE;
    private static MAX_SUPPORTED_DOUBLE;
    min: number;
    max: number;
    includeZero: boolean;
    forcedSingleStop: number;
    hasDataRange: boolean;
    hasFixedMin: boolean;
    hasFixedMax: boolean;
    private _ensureIncludeZero();
    private _ensureNotEmpty();
    private _ensureDirection();
    getSize(): number;
    shrinkByStep(range: NumericSequenceRange, step: number): void;
    static calculate(dataMin: number, dataMax: number, fixedMin?: number, fixedMax?: number, includeZero?: boolean): NumericSequenceRange;
    static calculateDataRange(dataMin: number, dataMax: number, includeZero?: boolean): NumericSequenceRange;
    static calculateFixedRange(fixedMin: number, fixedMax: number, includeZero?: boolean): NumericSequenceRange;
}
/** Note: Exported for testability */
export declare module ValueUtil {
    function hasValue(value: any): boolean;
}
