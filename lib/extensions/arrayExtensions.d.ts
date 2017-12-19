export interface ArrayIdItems<T> extends Array<T> {
    withId(id: number): T;
}
export interface ArrayNamedItems<T> extends Array<T> {
    withName(name: string): T;
}
/**
 * Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.
 */
export interface IComparer<T> {
    /**
     * Returns a signed number that indicates the relative values of x and y, as shown in the following table.
     *
     *         Value     |       Meaning
     * ------------------|--------------------
     * Less than zero    | a is less than b
     * Zero              | a equals b
     * Greater than zero | a is greater than b
     */
    (a: T, b: T): number;
}
export declare module ArrayExtensions {
    /**
     * Returns items that exist in target and other.
     */
    function intersect<T>(target: T[], other: T[]): T[];
    /**
     * Return elements exists in target but not exists in other.
     */
    function diff<T>(target: T[], other: T[]): T[];
    /**
     * Return an array with only the distinct items in the source.
     */
    function distinct<T>(source: T[]): T[];
    /**
     * Pushes content of source onto target,
     * for parts of course that do not already exist in target.
     */
    function union<T>(target: T[], source: T[]): void;
    /**
     * Pushes value onto target, if value does not already exist in target.
     */
    function unionSingle<T>(target: T[], value: T): void;
    /**
     * Returns an array with a range of items from source,
     * including the startIndex & endIndex.
     */
    function range<T>(source: T[], startIndex: number, endIndex: number): T[];
    /**
     * Returns an array that includes items from source, up to the specified count.
     */
    function take<T>(source: T[], count: number): T[];
    function copy<T>(source: T[]): T[];
    /**
      * Returns a value indicating whether the arrays have the same values in the same sequence.
      */
    function sequenceEqual<T, U>(left: T[], right: U[], comparison: (x: T, y: U) => boolean): boolean;
    /**
     * Returns null if the specified array is empty.
     * Otherwise returns the specified array.
     */
    function emptyToNull<T>(array: T[]): T[];
    function indexOf<T>(array: T[], predicate: (T) => boolean): number;
    /**
     * Returns a copy of the array rotated by the specified offset.
     */
    function rotate<T>(array: T[], offset: number): T[];
    function createWithId<T>(): ArrayIdItems<T>;
    function extendWithId<T>(array: {
        id: number;
    }[]): ArrayIdItems<T>;
    /**
     * Finds and returns the first item with a matching ID.
     */
    function findWithId<T>(array: T[], id: number): T;
    function createWithName<T>(): ArrayNamedItems<T>;
    function extendWithName<T>(array: {
        name: string;
    }[]): ArrayNamedItems<T>;
    function findItemWithName<T>(array: T[], name: string): T;
    function indexWithName<T>(array: T[], name: string): number;
    /**
     * Inserts a number in sorted order into a list of numbers already in sorted order.
     * @returns True if the item was added, false if it already existed.
     */
    function insertSorted(list: number[], value: number): boolean;
    /**
     * Removes the first occurrence of a value from a list if it exists.
     * @returns True if the value was removed, false if it did not exist in the list.
     */
    function removeFirst<T>(list: T[], value: T): boolean;
    /**
     * Deletes all items from the array.
     */
    function clear(array: any[]): void;
    function isUndefinedOrEmpty(array: any[]): boolean;
    function swap<T>(array: T[], firstIndex: number, secondIndex: number): void;
    function isInArray<T>(array: T[], lookupItem: T, compareCallback: (item1: T, item2: T) => boolean): boolean;
    /** Checks if the given object is an Array, and looking all the way up the prototype chain. */
    function isArrayOrInheritedArray(obj: {}): obj is Array<any>;
    /**
     * Returns true if the specified values array is sorted in an order as determined by the specified compareFunction.
     */
    function isSorted<T>(values: T[], compareFunction: IComparer<T>): boolean;
    /**
     * Returns true if the specified number values array is sorted in ascending order
     * (or descending order if the specified descendingOrder is truthy).
     */
    function isSortedNumeric(values: number[], descendingOrder?: boolean): boolean;
    /**
     * Ensures that the given T || T[] is in array form, either returning the array or
     * converting single items into an array of length one.
     */
    function ensureArray<T>(value: T | T[]): T[];
}
