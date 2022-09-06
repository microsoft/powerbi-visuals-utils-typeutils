/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
// NOTE: this file includes standalone utilities that should have no dependencies on external libraries, including jQuery.

import { isInteger } from "../double";

/**
 * Extensions for Enumerations.
 */
/**
 * Gets a value indicating whether the value has the bit flags set.
 */
export function hasFlag(value: number, flag: number): boolean {
    return (value & flag) === flag;
}

/**
 * Sets a value of a flag without modifying any other flags.
 */
export function setFlag(value: number, flag: number): number {
    return value |= flag;
}

/**
 * Resets a value of a flag without modifying any other flags.
 */
export function resetFlag(value: number, flag: number): number {
    return value &= ~flag;
}

/**
 * According to the TypeScript Handbook, this is safe to do.
 */
export function toString(enumType: any, value: number): string {
    return enumType[value];
}

/**
 * Returns the number of 1's in the specified value that is a set of binary bit flags.
 */
export function getBitCount(value: number): number {
    if (!isInteger(value))
        return 0;

    let bitCount = 0;
    let shiftingValue = value;
    while (shiftingValue !== 0) {
        if ((shiftingValue & 1) === 1) {
            bitCount++;
        }

        shiftingValue = shiftingValue >>> 1;
    }
    return bitCount;
}
