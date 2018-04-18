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
/**
 * Returns a new object with the provided obj as its prototype.
 */
export function inherit(obj, extension) {
    function wrapCtor() { }
    wrapCtor.prototype = obj;
    let inherited = new wrapCtor();
    if (extension)
        extension(inherited);
    return inherited;
}
/**
 * Returns a new object with the provided obj as its prototype
 * if, and only if, the prototype has not been previously set
 */
export function inheritSingle(obj) {
    let proto = Object.getPrototypeOf(obj);
    if (proto === Object.prototype || proto === Array.prototype)
        obj = inherit(obj);
    return obj;
}
/**
 * Uses the provided callback function to selectively replace contents in the provided array.
 * @return A new array with those values overriden
 * or undefined if no overrides are necessary.
 */
export function overrideArray(prototype, override) {
    if (!prototype)
        return;
    let overwritten;
    for (let i = 0, len = prototype.length; i < len; i++) {
        let value = override(prototype[i]);
        if (value) {
            if (!overwritten)
                overwritten = inherit(prototype);
            overwritten[i] = value;
        }
    }
    return overwritten;
}
//# sourceMappingURL=prototype.js.map