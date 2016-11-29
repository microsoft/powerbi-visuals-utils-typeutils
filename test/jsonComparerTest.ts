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

/// <reference path="_references.ts" />

module powerbi.extensibility.utils.type.test {
    import JsonComparer = powerbi.extensibility.utils.type.JsonComparer;

    describe("JsonComparer", () => {

        it("Undefined_Undefined_ShouldBeEqual", () => {
            let x;
            let y;

            expect(JsonComparer.equals(x, y)).toBe(true);
        });

        it("Null_Null_ShouldBeEqual", () => {
            let x = null;
            let y = null;

            expect(JsonComparer.equals(x, y)).toBe(true);
        });

        it("Null_Undefined_ShouldBeEqual", () => {
            let x = null;
            let y;

            expect(JsonComparer.equals(x, y)).toBe(false);
        });

        it("String_String_ShouldBeEqual", () => {
            const x = "abc";
            const y = "abc";

            expect(JsonComparer.equals(x, y)).toBe(true);
        });

        it("String_DifferentString_ShouldBeEqual", () => {
            const x = "";
            const y = " ";

            expect(JsonComparer.equals(x, y)).toBe(false);
        });

        it("Number_Number_ShouldBeEqual", () => {
            const x = 123;
            const y = 123;

            expect(JsonComparer.equals(x, y)).toBe(true);
        });

        it("Number_DifferentNumber_ShouldNotBeEqual", () => {
            const x = 123;
            const y = 321;

            expect(JsonComparer.equals(x, y)).toBe(false);
        });

        it("Object_String_ShouldNotBeEqual", () => {
            const x = {};
            const y = "";

            expect(JsonComparer.equals(x, y)).toBe(false);
        });

        it("Object_Number_ShouldNotBeEqual", () => {
            const x = {};
            const y = 321;

            expect(JsonComparer.equals(x, y)).toBe(false);
        });

        it("ObjectEmpty_ObjectEmpty_ShouldBeEqual", () => {
            const x = {};
            const y = {};

            expect(JsonComparer.equals(x, y)).toBe(true);
        });

        it("Object_Object_ShouldBeEqual", () => {
            const x = { prop: { nested: "abc" } };
            const y = { prop: { nested: "abc" } };

            expect(JsonComparer.equals(x, y)).toBe(true);
        });

        it("Object_Object_ShouldNotBeEqual", () => {
            const x = { prop: { nested: "abc" } };
            const y = { prop: { nested: "def" } };

            expect(JsonComparer.equals(x, y)).toBe(false);
        });
    });
}
