export declare module Prototype {
    /**
     * Returns a new object with the provided obj as its prototype.
     */
    function inherit<T>(obj: T, extension?: (inherited: T) => void): T;
    /**
     * Returns a new object with the provided obj as its prototype
     * if, and only if, the prototype has not been previously set
     */
    function inheritSingle<T>(obj: T): T;
    /**
     * Uses the provided callback function to selectively replace contents in the provided array.
     * @return A new array with those values overriden
     * or undefined if no overrides are necessary.
     */
    function overrideArray<T, TArray>(prototype: TArray, override: (T) => T): TArray;
}
