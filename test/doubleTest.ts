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
import * as Double from "../src/double";

describe("Double", () => {

    it("Double Constants", function () {
        expect(Double.MIN_VALUE).toBe(-1.7976931348623157e+308);
        expect(Double.MAX_VALUE).toBe(1.7976931348623157e+308);
        expect(Double.MIN_EXP).toBe(-308);
        expect(Double.MAX_EXP).toBe(308);
        expect(Double.EPSILON).toBe(1E-323);
        expect(Double.DEFAULT_PRECISION).toBe(0.0001);
        expect(Double.DEFAULT_PRECISION_IN_DECIMAL_DIGITS).toBe(12);
        expect(Double.LOG_E_10).toBe(Math.log(10));
    });

    it("Double pow10()", function () {
        const positivePowers = [1E0, 1E1, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9, 1E10, 1E11, 1E12, 1E13, 1E14, 1E15, 1E16, 1E17, 1E18, 1E19, 1E20, 1E21, 1E22, 1E23, 1E24, 1E25, 1E26, 1E27, 1E28, 1E29, 1E30, 1E31, 1E32];
        const negativePowers = [1E0, 1E-1, 1E-2, 1E-3, 1E-4, 1E-5, 1E-6, 1E-7, 1E-8, 1E-9, 1E-10, 1E-11, 1E-12, 1E-13, 1E-14, 1E-15, 1E-16, 1E-17, 1E-18, 1E-19, 1E-20, 1E-21, 1E-22, 1E-23, 1E-24, 1E-25, 1E-26, 1E-27, 1E-28, 1E-29, 1E-30, 1E-31, 1E-32];
        for (let i = 0; i < 33; i++) {
            expect(Double.pow10(-i)).toBe(negativePowers[i]);
            expect(Double.pow10(i)).toBe(positivePowers[i]);
        }

        expect(Double.pow10(-308)).toBe(1E-308);
        expect(Double.pow10(308)).toBe(1E308);
        expect(Double.pow10(3.3)).not.toBeDefined();
    });

    it("Double log10()", function () {
        const positivePowers = [1E0, 1E1, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9, 1E10, 1E11, 1E12, 1E13, 1E14, 1E15, 1E16, 1E17, 1E18, 1E19, 1E20, 1E21, 1E22, 1E23, 1E24, 1E25, 1E26, 1E27, 1E28, 1E29, 1E30, 1E31, 1E32];
        const negativePowers = [1E0, 1E-1, 1E-2, 1E-3, 1E-4, 1E-5, 1E-6, 1E-7, 1E-8, 1E-9, 1E-10, 1E-11, 1E-12, 1E-13, 1E-14, 1E-15, 1E-16, 1E-17, 1E-18, 1E-19, 1E-20, 1E-21, 1E-22, 1E-23, 1E-24, 1E-25, 1E-26, 1E-27, 1E-28, 1E-29, 1E-30, 1E-31, 1E-32];
        for (let i = 0; i < 33; i++) {
            expect(Double.log10(negativePowers[i])).toBe(-i);
            expect(Double.log10(positivePowers[i])).toBe(i);
        }

        expect(Double.log10(1E-308)).toBe(-308);
        expect(Double.log10(1E308)).toBe(308);
        expect(Double.log10(756)).toBe(2);
        expect(Double.log10(0.0756)).toBe(-2);
        expect(Double.log10(0)).toBe(-Infinity);
    });

    it("Double getPrecision()", function () {
        expect(Double.getPrecision(562344, 0)).toBe(100000);
        expect(Double.getPrecision(562344, 3)).toBe(100);
        expect(Double.getPrecision(562344, 6)).toBe(0.1);
        expect(Double.getPrecision(562344)).toBe(1E-7); // Default precision is 12 digits

        expect(Double.getPrecision(Double.MAX_VALUE)).toBe(1E296);
        expect(Double.getPrecision(Double.MIN_VALUE)).toBe(1E296);
        expect(Double.getPrecision(Double.EPSILON)).toBe(0);
        expect(Double.getPrecision(0)).toBe(undefined);
        expect(Double.getPrecision(undefined)).toBe(undefined);
        expect(Double.getPrecision(null)).toBe(undefined);
        expect(Double.getPrecision(null)).toBe(undefined);
        expect(Double.getPrecision(Infinity)).toBe(undefined);
    });

    it("Double equalWithPrecision()", function () {
        expect(Double.equalWithPrecision(1, 1.005, 0.01)).toBe(true);
        expect(Double.equalWithPrecision(1, 0.995, 0.01)).toBe(true);
        expect(Double.equalWithPrecision(1, 1.005, 0.001)).toBe(false);
        expect(Double.equalWithPrecision(1, 0.995, 0.001)).toBe(false);
        expect(Double.equalWithPrecision(1, 0.995, 0)).toBe(false);
    });

    it("Double lessWithPrecision()", function () {
        expect(Double.lessWithPrecision(1, 1, 0.01)).toBe(false);
        expect(Double.lessWithPrecision(0.995, 1, 0)).toBe(true);
        expect(Double.lessWithPrecision(1.005, 1, 0.01)).toBe(false);
        expect(Double.lessWithPrecision(0.995, 1, 0.01)).toBe(false);
        expect(Double.lessWithPrecision(0.995, 1, 0.001)).toBe(true);
    });

    it("Double lessOrEqualWithPrecision()", function () {
        expect(Double.lessOrEqualWithPrecision(1, 1, 0.01)).toBe(true);
        expect(Double.lessOrEqualWithPrecision(1.005, 1, 0.01)).toBe(true);
        expect(Double.lessOrEqualWithPrecision(0.995, 1, 0.01)).toBe(true);
        expect(Double.lessOrEqualWithPrecision(1.005, 1, 0.001)).toBe(false);
        expect(Double.lessOrEqualWithPrecision(0.995, 1, 0.001)).toBe(true);
    });

    it("Double greaterWithPrecision()", function () {
        expect(Double.greaterWithPrecision(1, 1, 0.01)).toBe(false);
        expect(Double.greaterWithPrecision(1, 1.005, 0.01)).toBe(false);
        expect(Double.greaterWithPrecision(1, 0.995, 0.01)).toBe(false);
        expect(Double.greaterWithPrecision(1, 0.995, 0.001)).toBe(true);
        expect(Double.greaterWithPrecision(1, 0.995, 0)).toBe(true);
    });

    it("Double greaterOrEqualWithPrecision()", function () {
        expect(Double.greaterOrEqualWithPrecision(1, 1, 0.01)).toBe(true);
        expect(Double.greaterOrEqualWithPrecision(1, 1.005, 0.01)).toBe(true);
        expect(Double.greaterOrEqualWithPrecision(1, 0.995, 0.01)).toBe(true);
        expect(Double.greaterOrEqualWithPrecision(1, 1.005, 0.001)).toBe(false);
        expect(Double.greaterOrEqualWithPrecision(1, 0.995, 0.001)).toBe(true);
        expect(Double.greaterOrEqualWithPrecision(1, 0.995, 0)).toBe(true);
    });

    it("Double floorWithPrecision()", function () {
        expect(Double.floorWithPrecision(-5.06, 0.001)).toBe(-6);
        expect(Double.floorWithPrecision(5.96, 0.001)).toBe(5);

        expect(Double.floorWithPrecision(-5.06, 0.1)).toBe(-5);
        expect(Double.floorWithPrecision(5.96, 0.1)).toBe(6);
    });

    it("Double floorToPrecision()", function () {
        const espilon = 0.0000000001;
        expect(Double.floorToPrecision(-5.06, 0.001)).toBeCloseTo(-5.06, espilon);
        expect(Double.floorToPrecision(5.96, 0.001)).toBeCloseTo(5.96, espilon);

        expect(Double.floorToPrecision(-5.06, 0.1)).toBeCloseTo(-5.1, espilon);
        expect(Double.floorToPrecision(5.96, 0.1)).toBeCloseTo(5.9, espilon);

        expect(Double.floorToPrecision(-0.2, 0)).toBeCloseTo(-0.2, espilon);
        expect(Double.floorToPrecision(Infinity, 0)).toBe(Infinity);
    });

    it("Double ceilWithPrecision()", function () {
        expect(Double.ceilWithPrecision(-5.96, 0.001)).toBe(-5);
        expect(Double.ceilWithPrecision(5.06, 0.001)).toBe(6);

        expect(Double.ceilWithPrecision(-5.96, 0.1)).toBe(-6);
        expect(Double.ceilWithPrecision(5.06, 0.1)).toBe(5);
        expect(Double.ceilWithPrecision(Infinity, 0)).toBe(Infinity);
    });

    it("Double ceilToPrecision()", function () {
        expect(Double.ceilToPrecision(-506, 1)).toBe(-506);
        expect(Double.ceilToPrecision(596, 1)).toBe(596);

        expect(Double.ceilToPrecision(-506, 10)).toBe(-500);
        expect(Double.ceilToPrecision(596, 10)).toBe(600);

        expect(Double.ceilToPrecision(-0.2, 0)).toBe(-0.2);
        expect(Double.ceilToPrecision(Infinity, 0)).toBe(Infinity);
    });

    it("Double roundToPrecision()", function () {
        expect(Double.roundToPrecision(-506, 1)).toBe(-506);
        expect(Double.roundToPrecision(596, 1)).toBe(596);

        expect(Double.roundToPrecision(-506, 10)).toBe(-510);
        expect(Double.roundToPrecision(596, 10)).toBe(600);

        expect(Double.roundToPrecision(-0.20003, 0.1)).toBe(-0.2);
        expect(Double.roundToPrecision(-0.2, 0)).toBe(-0.2);
        expect(Double.roundToPrecision(Infinity, 0)).toBe(Infinity);

        expect(Double.roundToPrecision(1.40000000001E207, 1E206)).toBe(1.4E207);
        expect(Double.roundToPrecision(1.40000000001E-207, 1E-208)).toBe(1.4E-207);
        expect(Double.roundToPrecision(1.41E-207, 1E-208)).toBe(1.4E-207);
        expect(Double.roundToPrecision(1.41E-207, 1E-209)).toBe(1.41E-207);
    });

    it("Double removeDecimalNoise()", () => {
        let roundedNumber = 21493 * 0.001; // 21.493000000000002
        expect(Double.removeDecimalNoise(roundedNumber).toString()).toBe("21.493");
    });

    it("Double ensureInRange()", function () {
        expect(Double.ensureInRange(-27.2, -100, -10)).toBe(-27.2);
        expect(Double.ensureInRange(-27.2, -100, -50)).toBe(-50);
        expect(Double.ensureInRange(-27.2, -10, -5)).toBe(-10);
        expect(Double.ensureInRange(undefined, -77, 55)).toBe(undefined);
    });

    it("Double round()", function () {
        expect(Double.round(27.2)).toBe(27);
        expect(Double.round(27.45)).toBe(27);
        expect(Double.round(27.5)).toBe(28);
        expect(Double.round(27.51)).toBe(28);

    });

    it("Double isInteger()", () => {
        expect(Double.isInteger(undefined)).toBe(false);
        expect(Double.isInteger(null)).toBe(false);
        expect(Double.isInteger(3)).toBe(true);
        expect(Double.isInteger(-3)).toBe(true);
        expect(Double.isInteger(0)).toBe(true);
        expect(Double.isInteger(3.5)).toBe(false);
    });

    it("Double toIncrement()", () => {
        expect(Double.toIncrement(0.6383723, 0.05)).toBe(0.65);
        expect(Double.toIncrement(73, 5)).toBe(75);
        expect(Double.toIncrement(58472623, 500)).toBe(58472500);
    });

    it("Double detectPrecision()", () => {
        expect(Double.detectPrecision(0.00001, 0.1, 0.2)).toBe(0.00001);
        expect(Double.detectPrecision(undefined, 20)).toBe(1E-11);
        expect(Double.detectPrecision(undefined, 20, 20000)).toBe(1E-11);
        expect(Double.detectPrecision(undefined, 0, 20)).toBe(1E-11);
        expect(Double.detectPrecision(undefined, 0, 0)).toBe(0.0001);
    });
});
