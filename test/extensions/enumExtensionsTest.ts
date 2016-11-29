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

/// <reference path="../_references.ts" />

module powerbi.extensibility.utils.type.test {
    import EnumExtensions = powerbi.extensibility.utils.type.EnumExtensions;

    describe("EnumExtensions", () => {
        it("getBitCount", () => {
            const enum TestEnumType {
                None = 0,
                A = 1,
                B = 1 << 1,
                C = 1 << 2,
                D = 1 << 3,
                E = 1 << 4,
                Negative1 = 1 << 31,
            }

            expect(EnumExtensions.getBitCount(TestEnumType.None)).toBe(0, "TestEnumType.None");
            expect(EnumExtensions.getBitCount(TestEnumType.A)).toBe(1, "TestEnumType.A");
            expect(EnumExtensions.getBitCount(TestEnumType.B)).toBe(1, "TestEnumType.B");
            expect(EnumExtensions.getBitCount(TestEnumType.C)).toBe(1, "TestEnumType.C");
            expect(EnumExtensions.getBitCount(TestEnumType.D)).toBe(1, "TestEnumType.D");
            expect(EnumExtensions.getBitCount(TestEnumType.E)).toBe(1, "TestEnumType.E");
            expect(EnumExtensions.getBitCount(TestEnumType.Negative1)).toBe(1, "TestEnumType.Negative1");
            expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.B)).toBe(2, "TestEnumType.A | TestEnumType.B");
            expect(EnumExtensions.getBitCount(TestEnumType.B | TestEnumType.E)).toBe(2, "TestEnumType.B | TestEnumType.E");
            expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.Negative1)).toBe(2, "TestEnumType.A | TestEnumType.Negative1");
            expect(EnumExtensions.getBitCount(TestEnumType.B | TestEnumType.C | TestEnumType.E)).toBe(3, "TestEnumType.B | TestEnumType.C | TestEnumType.E");
            expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.C | TestEnumType.D | TestEnumType.E)).toBe(4, "TestEnumType.A | TestEnumType.C | TestEnumType.D | TestEnumType.E");
            expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.B | TestEnumType.C | TestEnumType.D | TestEnumType.E)).toBe(5, "TestEnumType.A | TestEnumType.B | TestEnumType.C | TestEnumType.D | TestEnumType.E");
            expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.C | TestEnumType.Negative1)).toBe(3, "TestEnumType.A | TestEnumType.C | TestEnumType.Negative1");
        });

        it("getBitCount - invalid values", () => {
            expect(EnumExtensions.getBitCount(undefined)).toBe(0, "undefined");
            expect(EnumExtensions.getBitCount(null)).toBe(0, "null");
            expect(EnumExtensions.getBitCount(<any>{})).toBe(0, "object");
            expect(EnumExtensions.getBitCount(3.14)).toBe(0, "floating point number 3.14");
        });
    });
}
