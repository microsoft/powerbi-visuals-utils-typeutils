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
export var RegExpExtensions;
(function (RegExpExtensions) {
    /**
     * Runs exec on regex starting from 0 index
     * This is the expected behavior but RegExp actually remember
     * the last index they stopped at (found match at) and will
     * return unexpected results when run in sequence.
     * @param regex - regular expression object
     * @param value - string to search wiht regex
     * @param start - index within value to start regex
     */
    function run(regex, value, start) {
        regex.lastIndex = start || 0;
        return regex.exec(value);
    }
    RegExpExtensions.run = run;
})(RegExpExtensions || (RegExpExtensions = {}));
//# sourceMappingURL=regExpExtensions.js.map