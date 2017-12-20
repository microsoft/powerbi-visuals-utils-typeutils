export declare module RegExpExtensions {
    /**
     * Runs exec on regex starting from 0 index
     * This is the expected behavior but RegExp actually remember
     * the last index they stopped at (found match at) and will
     * return unexpected results when run in sequence.
     * @param regex - regular expression object
     * @param value - string to search wiht regex
     * @param start - index within value to start regex
     */
    function run(regex: RegExp, value: string, start?: number): RegExpExecArray;
}
