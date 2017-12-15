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
import RegExpExtensions = powerbi.extensibility.utils.type.RegExpExtensions;

describe("Regexr", () => {

    describe("run", () => {
        let T = "@";
        let regex = new RegExp(T, "g");
        // let targets = '@--------@----@--@';
        let targets = `${T}--------${T}----${T}--${T}`;

        function verifyMatch(match: RegExpExecArray, index: number): void {
            expect(match[0]).toBe(T);
            expect(match.index).toBe(index);
        }

        it("finds match", () => {
            verifyMatch(RegExpExtensions.run(regex, targets), 0);
        });

        it("always starts at index 0", () => {
            verifyMatch(RegExpExtensions.run(regex, targets), 0);
            verifyMatch(RegExpExtensions.run(regex, targets), 0);
        });

        describe("with start", () => {
            it("finds match", () => {
                let match = RegExpExtensions.run(regex, targets, 10);
                verifyMatch(match, 14);
            });

            it("starts at specified index", () => {
                let match = RegExpExtensions.run(regex, targets, 2);
                verifyMatch(match, 9);

                match = RegExpExtensions.run(regex, targets, 10);
                verifyMatch(match, 14);

                match = RegExpExtensions.run(regex, targets, 15);
                verifyMatch(match, 17);

                match = RegExpExtensions.run(regex, targets, 18);
                expect(match).toBe(null);
            });
        });
    });
});
