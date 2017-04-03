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

module powerbi.extensibility.utils.type {
    export module PixelConverter {
        const PxPtRatio: number = 4 / 3;
        const PixelString: string = "px";

        /**
         * Appends 'px' to the end of number value for use as pixel string in styles
         */
        export function toString(px: number): string {
            return px + PixelString;
        }

        /**
         * Converts point value (pt) to pixels
         * Returns a string for font-size property
         * e.g. fromPoint(8) => '24px'
         */
        export function fromPoint(pt: number): string {
            return toString(fromPointToPixel(pt));
        }

       /**
        * Converts point value (pt) to pixels
        * Returns a number for font-size property
        * e.g. fromPoint(8) => 24px
        */
        export function fromPointToPixel(pt: number): number {
            return (PxPtRatio * pt);
        }

        /**
         * Converts pixel value (px) to pt
         * e.g. toPoint(24) => 8
         */
        export function toPoint(px: number): number {
            return px / PxPtRatio;
        }
    }
}
