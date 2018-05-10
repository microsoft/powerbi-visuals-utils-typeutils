/**
 * Returns a new object with the provided obj as its prototype.
 */
export declare function inherit<T>(obj: T, extension?: (inherited: T) => void): T;
/**
 * Returns a new object with the provided obj as its prototype
 * if, and only if, the prototype has not been previously set
 */
export declare function inheritSingle<T>(obj: T): T;
/**
 * Uses the provided callback function to selectively replace contents in the provided array.
 * @return A new array with those values overriden
 * or undefined if no overrides are necessary.
 */
export declare function overrideArray<T, TArray>(prototype: TArray, override: (T) => T): TArray;
