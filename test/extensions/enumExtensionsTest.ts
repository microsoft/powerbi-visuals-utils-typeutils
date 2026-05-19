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
import * as EnumExtensions from "../../src/extensions/enumExtensions";

describe("EnumExtensions", () => {
    enum TestEnumType {
        None = 0,
        A = 1,
        B = 1 << 1,
        C = 1 << 2,
        D = 1 << 3,
        E = 1 << 4,
        Negative1 = 1 << 31,
    }

    describe("getBitCount - valid values", () => {
        test.each<{ label: string; value: TestEnumType; bits: number }>([
            { label: "TestEnumType.None", value: TestEnumType.None, bits: 0 },
            { label: "TestEnumType.A", value: TestEnumType.A, bits: 1 },
            { label: "TestEnumType.B", value: TestEnumType.B, bits: 1 },
            { label: "TestEnumType.C", value: TestEnumType.C, bits: 1 },
            { label: "TestEnumType.D", value: TestEnumType.D, bits: 1 },
            { label: "TestEnumType.E", value: TestEnumType.E, bits: 1 },
            { label: "TestEnumType.Negative1", value: TestEnumType.Negative1, bits: 1 },
            { label: "TestEnumType.A | TestEnumType.B", value: TestEnumType.A | TestEnumType.B, bits: 2 },
            { label: "TestEnumType.B | TestEnumType.E", value: TestEnumType.B | TestEnumType.E, bits: 2 },
            { label: "TestEnumType.A | TestEnumType.Negative1", value: TestEnumType.A | TestEnumType.Negative1, bits: 2 },
            { label: "TestEnumType.B | TestEnumType.C | TestEnumType.E", value: TestEnumType.B | TestEnumType.C | TestEnumType.E, bits: 3 },
            { label: "TestEnumType.A | TestEnumType.C | TestEnumType.D | TestEnumType.E", value: TestEnumType.A | TestEnumType.C | TestEnumType.D | TestEnumType.E, bits: 4 },
            { label: "TestEnumType.A | TestEnumType.B | TestEnumType.C | TestEnumType.D | TestEnumType.E", value: TestEnumType.A | TestEnumType.B | TestEnumType.C | TestEnumType.D | TestEnumType.E, bits: 5 },
            { label: "TestEnumType.A | TestEnumType.C | TestEnumType.Negative1", value: TestEnumType.A | TestEnumType.C | TestEnumType.Negative1, bits: 3 },
        ])("$label has $bits bit(s)", ({ value, bits }) => {
            expect(EnumExtensions.getBitCount(value)).toBe(bits);
        });
    });

    describe("getBitCount - invalid values returns 0", () => {
        test.each<{ label: string; value: unknown }>([
            { label: "undefined", value: undefined },
            { label: "null", value: null },
            { label: "object", value: {} },
            { label: "floating point 3.14", value: 3.14 },
        ])("$label", ({ value }) => {
            expect(EnumExtensions.getBitCount(value as number)).toBe(0);
        });
    });
});
