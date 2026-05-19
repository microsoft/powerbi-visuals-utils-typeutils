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

        expect(EnumExtensions.getBitCount(TestEnumType.None), "TestEnumType.None").toBe(0);
        expect(EnumExtensions.getBitCount(TestEnumType.A), "TestEnumType.A").toBe(1);
        expect(EnumExtensions.getBitCount(TestEnumType.B), "TestEnumType.B").toBe(1);
        expect(EnumExtensions.getBitCount(TestEnumType.C), "TestEnumType.C").toBe(1);
        expect(EnumExtensions.getBitCount(TestEnumType.D), "TestEnumType.D").toBe(1);
        expect(EnumExtensions.getBitCount(TestEnumType.E), "TestEnumType.E").toBe(1);
        expect(EnumExtensions.getBitCount(TestEnumType.Negative1), "TestEnumType.Negative1").toBe(1);
        expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.B), "TestEnumType.A | TestEnumType.B").toBe(2);
        expect(EnumExtensions.getBitCount(TestEnumType.B | TestEnumType.E), "TestEnumType.B | TestEnumType.E").toBe(2);
        expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.Negative1), "TestEnumType.A | TestEnumType.Negative1").toBe(2);
        expect(EnumExtensions.getBitCount(TestEnumType.B | TestEnumType.C | TestEnumType.E), "TestEnumType.B | TestEnumType.C | TestEnumType.E").toBe(3);
        expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.C | TestEnumType.D | TestEnumType.E), "TestEnumType.A | TestEnumType.C | TestEnumType.D | TestEnumType.E").toBe(4);
        expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.B | TestEnumType.C | TestEnumType.D | TestEnumType.E), "TestEnumType.A | TestEnumType.B | TestEnumType.C | TestEnumType.D | TestEnumType.E").toBe(5);
        expect(EnumExtensions.getBitCount(TestEnumType.A | TestEnumType.C | TestEnumType.Negative1), "TestEnumType.A | TestEnumType.C | TestEnumType.Negative1").toBe(3);
    });

    it("getBitCount - invalid values", () => {
        expect(EnumExtensions.getBitCount(undefined), "undefined").toBe(0);
        expect(EnumExtensions.getBitCount(null), "null").toBe(0);
        expect(EnumExtensions.getBitCount(<any>{}), "object").toBe(0);
        expect(EnumExtensions.getBitCount(3.14), "floating point number 3.14").toBe(0);
    });
});
