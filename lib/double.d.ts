/**
 * Module Double contains a set of constants and precision based utility methods
 * for dealing with doubles and their decimal garbage in the javascript.
 */
export declare const MIN_VALUE: number;
export declare const MAX_VALUE: number;
export declare const MIN_EXP = -308;
export declare const MAX_EXP = 308;
export declare const EPSILON = 1e-323;
export declare const DEFAULT_PRECISION = 0.0001;
export declare const DEFAULT_PRECISION_IN_DECIMAL_DIGITS = 12;
export declare const LOG_E_10: number;
export declare const POSITIVE_POWERS: number[];
export declare const NEGATIVE_POWERS: number[];
/**
 * Returns powers of 10.
 * Unlike the Math.pow this function produces no decimal garbage.
 * @param exp Exponent.
 */
export declare function pow10(exp: number): number;
/**
 * Returns the 10 base logarithm of the number.
 * Unlike Math.log function this produces integer results with no decimal garbage.
 * @param val Positive value or zero.
 */
export declare function log10(val: number): number;
/**
 * Returns a power of 10 representing precision of the number based on the number of meaningful decimal digits.
 * For example the precision of 56,263.3767 with the 6 meaningful decimal digit is 0.1.
 * @param x Value.
 * @param decimalDigits How many decimal digits are meaningfull.
 */
export declare function getPrecision(x: number, decimalDigits?: number): number;
/**
 * Checks if a delta between 2 numbers is less than provided precision.
 * @param x One value.
 * @param y Another value.
 * @param precision Precision value.
 */
export declare function equalWithPrecision(x: number, y: number, precision?: number): boolean;
/**
 * Checks if a first value is less than another taking
 * into account the loose precision based equality.
 * @param x One value.
 * @param y Another value.
 * @param precision Precision value.
 */
export declare function lessWithPrecision(x: number, y: number, precision?: number): boolean;
/**
 * Checks if a first value is less or equal than another taking
 * into account the loose precision based equality.
 * @param x One value.
 * @param y Another value.
 * @param precision Precision value.
 */
export declare function lessOrEqualWithPrecision(x: number, y: number, precision?: number): boolean;
/**
 * Checks if a first value is greater than another taking
 * into account the loose precision based equality.
 * @param x One value.
 * @param y Another value.
 * @param precision Precision value.
 */
export declare function greaterWithPrecision(x: number, y: number, precision?: number): boolean;
/**
 * Checks if a first value is greater or equal to another taking
 * into account the loose precision based equality.
 * @param x One value.
 * @param y Another value.
 * @param precision Precision value.
 */
export declare function greaterOrEqualWithPrecision(x: number, y: number, precision?: number): boolean;
/**
 * Floors the number unless it's withing the precision distance from the higher int.
 * @param x One value.
 * @param precision Precision value.
 */
export declare function floorWithPrecision(x: number, precision?: number): number;
/**
 * Ceils the number unless it's withing the precision distance from the lower int.
 * @param x One value.
 * @param precision Precision value.
 */
export declare function ceilWithPrecision(x: number, precision?: number): number;
/**
 * Floors the number to the provided precision.
 * For example 234,578 floored to 1,000 precision is 234,000.
 * @param x One value.
 * @param precision Precision value.
 */
export declare function floorToPrecision(x: number, precision?: number): number;
/**
 * Ceils the number to the provided precision.
 * For example 234,578 floored to 1,000 precision is 235,000.
 * @param x One value.
 * @param precision Precision value.
 */
export declare function ceilToPrecision(x: number, precision?: number): number;
/**
 * Rounds the number to the provided precision.
 * For example 234,578 floored to 1,000 precision is 235,000.
 * @param x One value.
 * @param precision Precision value.
 */
export declare function roundToPrecision(x: number, precision?: number): number;
/**
 * Returns the value making sure that it's restricted to the provided range.
 * @param x One value.
 * @param min Range min boundary.
 * @param max Range max boundary.
 */
export declare function ensureInRange(x: number, min: number, max: number): number;
/**
 * Rounds the value - this method is actually faster than Math.round - used in the graphics utils.
 * @param x Value to round.
 */
export declare function round(x: number): number;
/**
 * Projects the value from the source range into the target range.
 * @param value Value to project.
 * @param fromMin Minimum of the source range.
 * @param toMin Minimum of the target range.
 * @param toMax Maximum of the target range.
 */
export declare function project(value: number, fromMin: number, fromSize: number, toMin: number, toSize: number): number;
/**
 * Removes decimal noise.
 * @param value Value to be processed.
 */
export declare function removeDecimalNoise(value: number): number;
/**
 * Checks whether the number is integer.
 * @param value Value to be checked.
 */
export declare function isInteger(value: number): boolean;
/**
 * Dividing by increment will give us count of increments
 * Round out the rough edges into even integer
 * Multiply back by increment to get rounded value
 * e.g. Rounder.toIncrement(0.647291, 0.05) => 0.65
 * @param value - value to round to nearest increment
 * @param increment - smallest increment to round toward
 */
export declare function toIncrement(value: number, increment: number): number;
/**
 * Overrides the given precision with defaults if necessary. Exported only for tests
 *
 * precision defined returns precision
 * x defined with y undefined returns twelve digits of precision based on x
 * x defined but zero with y defined; returns twelve digits of precision based on y
 * x and y defined retursn twelve digits of precision based on the minimum of the two
 * if no applicable precision is found based on those (such as x and y being zero), the default precision is used
 */
export declare function detectPrecision(precision: number, x: number, y?: number): number;
