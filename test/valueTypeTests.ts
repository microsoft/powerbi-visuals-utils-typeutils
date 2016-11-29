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

/// <reference path="_references.ts"/>

module powerbi.extensibility.utils.type.test {
    import ValueType = powerbi.extensibility.utils.type.ValueType;
    import ExtendedType = powerbi.extensibility.utils.type.ExtendedType;

    describe("isCompatibleFrom", () => {
        it("Both numbers is true", () => {
            let number1 = ValueType.fromDescriptor({ numeric: true});
            let number2 = ValueType.fromDescriptor({ numeric: true});

            expect(number1.isCompatibleFrom(number2)).toBeTruthy();
        });

        it("Both numbers but different extended type is true.", () => {
            let number1 = ValueType.fromExtendedType(ExtendedType.Decimal);
            let number2 = ValueType.fromExtendedType(ExtendedType.Double);

            expect(number1.isCompatibleFrom(number2)).toBeTruthy();
        });

        it("One is number other is not", () => {
            let number1 = ValueType.fromExtendedType(ExtendedType.Decimal);
            let number2 = ValueType.fromExtendedType(ExtendedType.Boolean);

            expect(number1.isCompatibleFrom(number2)).toBeFalsy();
        });
    });

    describe("Variant ValueType", () => {
        it("Create variant ValueType and check the variationTypes", () => {
            let variantType = ValueType.fromDescriptor({ variant: [{ numeric: true }, { dateTime: true }] } as any);

            expect(variantType.extendedType).toBe(ExtendedType.Variant);
            expect(variantType.variant).toBeDefined();
            expect(variantType.variant).toEqual([ValueType.fromDescriptor({ numeric: true }), ValueType.fromDescriptor({ dateTime: true })]);
        });
    });
}
