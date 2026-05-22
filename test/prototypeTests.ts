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
import * as Prototype from "../src/prototype";

describe("Prototype", () => {
    it("inherit: base", () => {
        const base = { prop: "abc" };
        let inherited = Prototype.inherit(base);

        expect(Object.getPrototypeOf(inherited)).toBe(base);
        expect(inherited.prop).toBe("abc");
    });

    it("inherit: including override func", () => {
        const base = { prop: "abc", prop2: "def" };
        let inherited = Prototype.inherit(base, arg => arg.prop2 = "ghi");

        expect(Object.getPrototypeOf(inherited)).toBe(base);
        expect(inherited.prop).toBe("abc");
        expect(inherited.prop2).toBe("ghi");
    });

    it("inheritSingle: base", () => {
        const base = { prop: "abc" };

        let inherited = Prototype.inheritSingle(base);
        let proto = Object.getPrototypeOf(inherited);

        expect(proto).toBe(base);
        expect(inherited.prop).toBe("abc");
    });

    it("inheritSingle: existing object prototype", () => {
        const existingProto = { prop: "abc" };
        let base = Prototype.inherit(existingProto);

        expect(Object.getPrototypeOf(base)).toBe(existingProto);

        let inherited = Prototype.inheritSingle(base);
        let proto = Object.getPrototypeOf(inherited);
        expect(proto).toBe(existingProto);
        expect(Object.getPrototypeOf(proto)).toBe(Object.prototype);
    });

    it("inheritSingle: existing array prototype", () => {
        const existingProto = ["a", "b", "c"];
        let base = Prototype.inherit(existingProto);

        expect(Object.getPrototypeOf(base)).toBe(existingProto);

        let inherited = Prototype.inheritSingle(base);
        let proto = Object.getPrototypeOf(inherited);
        expect(proto).toBe(existingProto);
        expect(Object.getPrototypeOf(proto)).toBe(Array.prototype);
    });

    // Tests verifying that inherit() (now Object.create-based in 7.0.0) preserves
    // prototypal lookup semantics: changes to the base must be visible through
    // the inherited object, and own-property writes on the inherited object
    // must not mutate the base.
    describe("inherit: prototype-chain semantics (7.0.0)", () => {
        it("reflects later changes made to the base", () => {
            const base: { prop: string; added?: string } = { prop: "abc" };
            const inherited = Prototype.inherit(base);

            base.added = "xyz";
            expect(inherited.added).toBe("xyz");
        });

        it("writes on the inherited object do not mutate the base", () => {
            const base = { prop: "abc" };
            const inherited = Prototype.inherit(base);

            inherited.prop = "overridden";
            expect(inherited.prop).toBe("overridden");
            expect(base.prop).toBe("abc");
            expect(Object.prototype.hasOwnProperty.call(inherited, "prop")).toBe(true);
            expect(Object.prototype.hasOwnProperty.call(base, "prop")).toBe(true);
        });
    });

    describe("overrideArray", () => {
        it("returns undefined when no callback produces a replacement", () => {
            const base = [1, 2, 3];
            const result = Prototype.overrideArray<number, number[]>(base, () => undefined);
            expect(result).toBeUndefined();
        });

        it("returns undefined for a falsy prototype", () => {
            expect(Prototype.overrideArray<number, number[]>(null as unknown as number[], () => 1)).toBeUndefined();
            expect(Prototype.overrideArray<number, number[]>(undefined as unknown as number[], () => 1)).toBeUndefined();
        });

        it("returns a new array inheriting from the original with only overridden indices replaced", () => {
            const base = [1, 2, 3, 4];
            const result = Prototype.overrideArray<number, number[]>(base, value => value % 2 === 0 ? value * 10 : undefined);

            expect(result).toBeDefined();
            // Original array must not be mutated.
            expect(base).toEqual([1, 2, 3, 4]);
            // Replaced indices on the result.
            expect(result![1]).toBe(20);
            expect(result![3]).toBe(40);
            // Non-replaced indices fall through to the prototype.
            expect(result![0]).toBe(1);
            expect(result![2]).toBe(3);
            // Result inherits from the original (prototypal lookup).
            expect(Object.getPrototypeOf(result)).toBe(base);
        });
    });
});
