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
    import ArrayExtensions = powerbi.extensibility.utils.type.ArrayExtensions;
    import Prototype = powerbi.extensibility.utils.type.Prototype;

    interface TestIdType { id: number; }
    interface TestNamedType { name: string; }

    describe("ArrayExtensions", () => {

        it("ArrayIdItems_Extend", () => {
            const item0: TestIdType = { id: 123 };
            const item1: TestIdType = { id: 456 };
            const item2: TestIdType = { id: 789 };

            const array: { id: number }[] = [
                item0,
                item1,
                item2];

            let extendedArray = ArrayExtensions.extendWithId(array);
            expect(extendedArray).toBe(array);

            expect(extendedArray.withId(123)).toBe(item0);
            expect(extendedArray.withId(456)).toBe(item1);
            expect(extendedArray.withId(789)).toBe(item2);

            expect(extendedArray.withId(0)).not.toBeDefined();
        });

        it("ArrayNamedItems_Extend", () => {
            const item0: TestNamedType = { name: "abc" };
            const item1: TestNamedType = { name: "def" };
            const item2: TestNamedType = { name: "ghi" };

            const array: TestNamedType[] = [
                item0,
                item1,
                item2];

            let extendedArray = ArrayExtensions.extendWithName(array);
            expect(extendedArray).toBe(array);

            expect(extendedArray.withName("abc")).toBe(item0);
            expect(extendedArray.withName("def")).toBe(item1);
            expect(extendedArray.withName("ghi")).toBe(item2);

            expect(extendedArray.withName("xyz")).not.toBeDefined();
        });

        it("Clear an array with 4 items", () => {
            const array = ["a", "b", "c", "4"];

            ArrayExtensions.clear(array);

            expect(array.length).toEqual(0);
        });

        it("Intersection of 2 arrays", () => {
            const array: number[] = [1, 2, 3];

            let result = ArrayExtensions.intersect(array, [2, 4, 5]);

            expect(result.length).toEqual(1);
            expect(result).toEqual([2]);
        });

        it("Union of an array and an element", () => {
            const array: number[] = [1, 2];

            ArrayExtensions.unionSingle(array, 2);
            expect(array).toEqual([1, 2]);

            ArrayExtensions.unionSingle(array, 3);
            expect(array).toEqual([1, 2, 3]);
        });

        it("Union of 2 arrays", () => {
            const array: number[] = [1, 2];

            ArrayExtensions.union(array, [3, 1]);
            expect(array).toEqual([1, 2, 3]);
        });

        it("ArrayExtensionsRange", () => {
            const array: number[] = [1, 2, 3, 4];

            let result = ArrayExtensions.range(array, 2, 3);
            expect(result).toEqual([3, 4]);
        });

        it("ArrayExtensionsTake", () => {
            const array: number[] = [1, 2, 3];

            let result = ArrayExtensions.take(array, 2);
            expect(result).toEqual([1, 2]);
        });

        it("ArrayExtensionsEmptyToNull", () => {

            expect(ArrayExtensions.emptyToNull([])).toBeNull();
            expect(ArrayExtensions.emptyToNull([1, 2, 3])).toEqual([1, 2, 3]);
        });

        it("ArrayExtensionsSequenceEqual T === U", () => {
            let equalsNegativesComparison: (x: number, y: number) => boolean = (x, y) => (x === -y);

            expect(ArrayExtensions.sequenceEqual([1, 2], [-1, -2], equalsNegativesComparison)).toBeTruthy();
            expect(ArrayExtensions.sequenceEqual([1, 2], [-2, -1], equalsNegativesComparison)).toBeFalsy();
            expect(ArrayExtensions.sequenceEqual([], [], equalsNegativesComparison)).toBeTruthy();
            expect(ArrayExtensions.sequenceEqual(null, null, equalsNegativesComparison)).toBeTruthy();
            expect(ArrayExtensions.sequenceEqual([1], [1], equalsNegativesComparison)).toBeFalsy();
            expect(ArrayExtensions.sequenceEqual([1], null, equalsNegativesComparison)).toBeFalsy();
            expect(ArrayExtensions.sequenceEqual(null, [1], equalsNegativesComparison)).toBeFalsy();
            expect(ArrayExtensions.sequenceEqual(null, undefined, equalsNegativesComparison)).toBeTruthy();
        });

        it("ArrayExtensionsSequenceEqual, T !== U", () => {
            let numberAndBooleanComparison: (x: number, y: boolean) => boolean = (x, y) => ((x !== 0) === y);

            expect(ArrayExtensions.sequenceEqual([1, 2, 0], [true, true, false], numberAndBooleanComparison)).toBeTruthy();
            expect(ArrayExtensions.sequenceEqual([1, 2, 3], [true, true, false], numberAndBooleanComparison)).toBeFalsy();
        });

        it("ArrayExtensionsDistinct", () => {
            const array: number[] = [1, 1, 2, 3, 3, 4];

            let result = ArrayExtensions.distinct(array);

            expect(result.length).toEqual(4);
            expect(result).toEqual([1, 2, 3, 4]);
        });

        it("ArrayExtensions swap", () => {
            const array: number[] = [1, 2, 3];
            ArrayExtensions.swap(array, 1, 2);
            expect(array).toEqual([1, 3, 2]);
        });

        it("ArrayExtensions ensureArray", () => {
            expect(ArrayExtensions.ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
            expect(ArrayExtensions.ensureArray([1])).toEqual([1]);
            expect(ArrayExtensions.ensureArray(1)).toEqual([1]);
        });

        describe("insertSorted", () => {
            it("unsorted calls", () => {
                let list: number[] = [];
                expect(ArrayExtensions.insertSorted(list, 1)).toBe(true);
                expect(ArrayExtensions.insertSorted(list, 3)).toBe(true);
                expect(ArrayExtensions.insertSorted(list, 2)).toBe(true);
                expect(ArrayExtensions.insertSorted(list, 0)).toBe(true);
                expect(list).toEqual([0, 1, 2, 3]);
            });

            it("duplicates", () => {
                let list: number[] = [];
                expect(ArrayExtensions.insertSorted(list, 1)).toBe(true);
                expect(ArrayExtensions.insertSorted(list, 1)).toBe(false);
                expect(list).toEqual([1]);
            });
        });

        describe("removeFirst", () => {
            it("found", () => {
                let list = [1, 2, 3];
                expect(ArrayExtensions.removeFirst(list, 2)).toBe(true);
                expect(list).toEqual([1, 3]);
            });

            it("not found", () => {
                let list = [1, 3];
                expect(ArrayExtensions.removeFirst(list, 2)).toBe(false);
                expect(list).toEqual([1, 3]);
            });

            it("empty list", () => {
                expect(ArrayExtensions.removeFirst([], 2)).toBe(false);
            });
        });

        describe("isArrayOrInheritedArray", () => {
            it("array", () => {
                let emptyArray = [];
                let nonEmptyArray = [1, 2, 3, 4, 5];

                expect(ArrayExtensions.isArrayOrInheritedArray(emptyArray)).toBe(true);
                expect(ArrayExtensions.isArrayOrInheritedArray(nonEmptyArray)).toBe(true);
            });

            it("inherited array", () => {
                let emptyInheritedArray = Prototype.inherit([]);
                let nonEmptyInheritedArray = Prototype.inherit(["a", "b", "c", "d"]);
                let modifiedInheritedArray = Prototype.inherit(["a", "b", "c", "d"]);
                modifiedInheritedArray.push("e");

                expect(ArrayExtensions.isArrayOrInheritedArray(emptyInheritedArray)).toBe(true);
                expect(ArrayExtensions.isArrayOrInheritedArray(nonEmptyInheritedArray)).toBe(true);
                expect(ArrayExtensions.isArrayOrInheritedArray(modifiedInheritedArray)).toBe(true);
            });

            it("not array", () => {
                let emptyObj = {};
                let objLookingLikeArray = {
                    0: "a",
                    1: "b",
                    length: 2,
                };

                expect(ArrayExtensions.isArrayOrInheritedArray(emptyObj)).toBe(false);
                expect(ArrayExtensions.isArrayOrInheritedArray(objLookingLikeArray)).toBe(false);
            });
        });

        describe("isSorted", function () {
            function StringLengthComparer(a: string, b: string): number {
                return a.length - b.length;
            }

            it("isSorted - array with length 0", () => {
                let values: string[] = [];

                expect(ArrayExtensions.isSorted(values, StringLengthComparer)).toBe(true, "an empty array is always sorted");
            });

            it("isSorted - array with length 1", () => {
                let values: string[] = ["first"];

                expect(ArrayExtensions.isSorted(values, StringLengthComparer)).toBe(true, "an array of single element is always sorted");
            });

            it("isSorted - array sorted", () => {
                let values: string[] = ["long", "longer", "longest"];

                expect(ArrayExtensions.isSorted(values, StringLengthComparer)).toBe(true);
            });

            it("isSorted - array sorted in reverse order", () => {
                let values: string[] = ["longest", "longer", "long"];

                expect(ArrayExtensions.isSorted(values, StringLengthComparer)).toBe(false);
            });

            it("isSorted - array not sorted", () => {
                let values: string[] = ["longest", "long", "longer"];

                expect(ArrayExtensions.isSorted(values, StringLengthComparer)).toBe(false);
            });

            it("isSortedNumeric - array with length 0", () => {
                let values: number[] = [];
                expect(ArrayExtensions.isSortedNumeric(values)).toBe(true, "an empty array is in default (ascending) order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ false)).toBe(true, "an empty array is in ascending order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ true)).toBe(true, "an empty array is also in descending order");
            });

            it("isSortedNumeric - array with length 1", () => {
                let values: number[] = [111];
                expect(ArrayExtensions.isSortedNumeric(values)).toBe(true, "an array of single element is in default (ascending) order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ false)).toBe(true, "an array of single element is in ascending order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ true)).toBe(true, "an array of single element is also in descending order");
            });

            it("isSortedNumeric - array in ascending order", () => {
                let values: number[] = [1, 3, 3, 7];
                expect(ArrayExtensions.isSortedNumeric(values)).toBe(true, "checking if in default (ascending) order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ false)).toBe(true, "checking if in ascending order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ true)).toBe(false, "checking if in descending order");
            });

            it("isSortedNumeric - array in descending order", () => {
                let values: number[] = [1, -3, -3, -7];
                expect(ArrayExtensions.isSortedNumeric(values)).toBe(false, "checking if in default (ascending) order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ false)).toBe(false, "checking if in ascending order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ true)).toBe(true, "checking if in decending order");
            });

            it("isSortedNumeric - array not in any order", () => {
                let values: number[] = [3, 0, 6, 2, 4, 7, 0, 0];
                expect(ArrayExtensions.isSortedNumeric(values)).toBe(false, "checking if in default (ascending) order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ false)).toBe(false, "checking if in ascending order");
                expect(ArrayExtensions.isSortedNumeric(values, /* descendingOrder */ true)).toBe(false, "checking if in decending order");
            });
        });
    });
}
