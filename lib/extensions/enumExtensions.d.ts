/**
 * Extensions for Enumerations.
 */
export declare module EnumExtensions {
    /**
     * Gets a value indicating whether the value has the bit flags set.
     */
    function hasFlag(value: number, flag: number): boolean;
    /**
     * Sets a value of a flag without modifying any other flags.
     */
    function setFlag(value: number, flag: number): number;
    /**
     * Resets a value of a flag without modifying any other flags.
     */
    function resetFlag(value: number, flag: number): number;
    /**
     * According to the TypeScript Handbook, this is safe to do.
     */
    function toString(enumType: any, value: number): string;
    /**
     * Returns the number of 1's in the specified value that is a set of binary bit flags.
     */
    function getBitCount(value: number): number;
}
