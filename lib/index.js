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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                /**
                 * Module Double contains a set of constants and precision based utility methods
                 * for dealing with doubles and their decimal garbage in the javascript.
                 */
                var Double;
                (function (Double) {
                    // Constants.
                    Double.MIN_VALUE = -Number.MAX_VALUE;
                    Double.MAX_VALUE = Number.MAX_VALUE;
                    Double.MIN_EXP = -308;
                    Double.MAX_EXP = 308;
                    Double.EPSILON = 1E-323;
                    Double.DEFAULT_PRECISION = 0.0001;
                    Double.DEFAULT_PRECISION_IN_DECIMAL_DIGITS = 12;
                    Double.LOG_E_10 = Math.log(10);
                    Double.POSITIVE_POWERS = [
                        1E0, 1E1, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9, 1E10, 1E11, 1E12, 1E13, 1E14, 1E15, 1E16, 1E17, 1E18, 1E19, 1E20, 1E21, 1E22, 1E23, 1E24, 1E25, 1E26, 1E27, 1E28, 1E29, 1E30, 1E31, 1E32, 1E33, 1E34, 1E35, 1E36, 1E37, 1E38, 1E39, 1E40, 1E41, 1E42, 1E43, 1E44, 1E45, 1E46, 1E47, 1E48, 1E49, 1E50, 1E51, 1E52, 1E53, 1E54, 1E55, 1E56, 1E57, 1E58, 1E59, 1E60, 1E61, 1E62, 1E63, 1E64, 1E65, 1E66, 1E67, 1E68, 1E69, 1E70, 1E71, 1E72, 1E73, 1E74, 1E75, 1E76, 1E77, 1E78, 1E79, 1E80, 1E81, 1E82, 1E83, 1E84, 1E85, 1E86, 1E87, 1E88, 1E89, 1E90, 1E91, 1E92, 1E93, 1E94, 1E95, 1E96, 1E97, 1E98, 1E99,
                        1E100, 1E101, 1E102, 1E103, 1E104, 1E105, 1E106, 1E107, 1E108, 1E109, 1E110, 1E111, 1E112, 1E113, 1E114, 1E115, 1E116, 1E117, 1E118, 1E119, 1E120, 1E121, 1E122, 1E123, 1E124, 1E125, 1E126, 1E127, 1E128, 1E129, 1E130, 1E131, 1E132, 1E133, 1E134, 1E135, 1E136, 1E137, 1E138, 1E139, 1E140, 1E141, 1E142, 1E143, 1E144, 1E145, 1E146, 1E147, 1E148, 1E149, 1E150, 1E151, 1E152, 1E153, 1E154, 1E155, 1E156, 1E157, 1E158, 1E159, 1E160, 1E161, 1E162, 1E163, 1E164, 1E165, 1E166, 1E167, 1E168, 1E169, 1E170, 1E171, 1E172, 1E173, 1E174, 1E175, 1E176, 1E177, 1E178, 1E179, 1E180, 1E181, 1E182, 1E183, 1E184, 1E185, 1E186, 1E187, 1E188, 1E189, 1E190, 1E191, 1E192, 1E193, 1E194, 1E195, 1E196, 1E197, 1E198, 1E199,
                        1E200, 1E201, 1E202, 1E203, 1E204, 1E205, 1E206, 1E207, 1E208, 1E209, 1E210, 1E211, 1E212, 1E213, 1E214, 1E215, 1E216, 1E217, 1E218, 1E219, 1E220, 1E221, 1E222, 1E223, 1E224, 1E225, 1E226, 1E227, 1E228, 1E229, 1E230, 1E231, 1E232, 1E233, 1E234, 1E235, 1E236, 1E237, 1E238, 1E239, 1E240, 1E241, 1E242, 1E243, 1E244, 1E245, 1E246, 1E247, 1E248, 1E249, 1E250, 1E251, 1E252, 1E253, 1E254, 1E255, 1E256, 1E257, 1E258, 1E259, 1E260, 1E261, 1E262, 1E263, 1E264, 1E265, 1E266, 1E267, 1E268, 1E269, 1E270, 1E271, 1E272, 1E273, 1E274, 1E275, 1E276, 1E277, 1E278, 1E279, 1E280, 1E281, 1E282, 1E283, 1E284, 1E285, 1E286, 1E287, 1E288, 1E289, 1E290, 1E291, 1E292, 1E293, 1E294, 1E295, 1E296, 1E297, 1E298, 1E299,
                        1E300, 1E301, 1E302, 1E303, 1E304, 1E305, 1E306, 1E307, 1E308];
                    Double.NEGATIVE_POWERS = [
                        1E0, 1E-1, 1E-2, 1E-3, 1E-4, 1E-5, 1E-6, 1E-7, 1E-8, 1E-9, 1E-10, 1E-11, 1E-12, 1E-13, 1E-14, 1E-15, 1E-16, 1E-17, 1E-18, 1E-19, 1E-20, 1E-21, 1E-22, 1E-23, 1E-24, 1E-25, 1E-26, 1E-27, 1E-28, 1E-29, 1E-30, 1E-31, 1E-32, 1E-33, 1E-34, 1E-35, 1E-36, 1E-37, 1E-38, 1E-39, 1E-40, 1E-41, 1E-42, 1E-43, 1E-44, 1E-45, 1E-46, 1E-47, 1E-48, 1E-49, 1E-50, 1E-51, 1E-52, 1E-53, 1E-54, 1E-55, 1E-56, 1E-57, 1E-58, 1E-59, 1E-60, 1E-61, 1E-62, 1E-63, 1E-64, 1E-65, 1E-66, 1E-67, 1E-68, 1E-69, 1E-70, 1E-71, 1E-72, 1E-73, 1E-74, 1E-75, 1E-76, 1E-77, 1E-78, 1E-79, 1E-80, 1E-81, 1E-82, 1E-83, 1E-84, 1E-85, 1E-86, 1E-87, 1E-88, 1E-89, 1E-90, 1E-91, 1E-92, 1E-93, 1E-94, 1E-95, 1E-96, 1E-97, 1E-98, 1E-99,
                        1E-100, 1E-101, 1E-102, 1E-103, 1E-104, 1E-105, 1E-106, 1E-107, 1E-108, 1E-109, 1E-110, 1E-111, 1E-112, 1E-113, 1E-114, 1E-115, 1E-116, 1E-117, 1E-118, 1E-119, 1E-120, 1E-121, 1E-122, 1E-123, 1E-124, 1E-125, 1E-126, 1E-127, 1E-128, 1E-129, 1E-130, 1E-131, 1E-132, 1E-133, 1E-134, 1E-135, 1E-136, 1E-137, 1E-138, 1E-139, 1E-140, 1E-141, 1E-142, 1E-143, 1E-144, 1E-145, 1E-146, 1E-147, 1E-148, 1E-149, 1E-150, 1E-151, 1E-152, 1E-153, 1E-154, 1E-155, 1E-156, 1E-157, 1E-158, 1E-159, 1E-160, 1E-161, 1E-162, 1E-163, 1E-164, 1E-165, 1E-166, 1E-167, 1E-168, 1E-169, 1E-170, 1E-171, 1E-172, 1E-173, 1E-174, 1E-175, 1E-176, 1E-177, 1E-178, 1E-179, 1E-180, 1E-181, 1E-182, 1E-183, 1E-184, 1E-185, 1E-186, 1E-187, 1E-188, 1E-189, 1E-190, 1E-191, 1E-192, 1E-193, 1E-194, 1E-195, 1E-196, 1E-197, 1E-198, 1E-199,
                        1E-200, 1E-201, 1E-202, 1E-203, 1E-204, 1E-205, 1E-206, 1E-207, 1E-208, 1E-209, 1E-210, 1E-211, 1E-212, 1E-213, 1E-214, 1E-215, 1E-216, 1E-217, 1E-218, 1E-219, 1E-220, 1E-221, 1E-222, 1E-223, 1E-224, 1E-225, 1E-226, 1E-227, 1E-228, 1E-229, 1E-230, 1E-231, 1E-232, 1E-233, 1E-234, 1E-235, 1E-236, 1E-237, 1E-238, 1E-239, 1E-240, 1E-241, 1E-242, 1E-243, 1E-244, 1E-245, 1E-246, 1E-247, 1E-248, 1E-249, 1E-250, 1E-251, 1E-252, 1E-253, 1E-254, 1E-255, 1E-256, 1E-257, 1E-258, 1E-259, 1E-260, 1E-261, 1E-262, 1E-263, 1E-264, 1E-265, 1E-266, 1E-267, 1E-268, 1E-269, 1E-270, 1E-271, 1E-272, 1E-273, 1E-274, 1E-275, 1E-276, 1E-277, 1E-278, 1E-279, 1E-280, 1E-281, 1E-282, 1E-283, 1E-284, 1E-285, 1E-286, 1E-287, 1E-288, 1E-289, 1E-290, 1E-291, 1E-292, 1E-293, 1E-294, 1E-295, 1E-296, 1E-297, 1E-298, 1E-299,
                        1E-300, 1E-301, 1E-302, 1E-303, 1E-304, 1E-305, 1E-306, 1E-307, 1E-308, 1E-309, 1E-310, 1E-311, 1E-312, 1E-313, 1E-314, 1E-315, 1E-316, 1E-317, 1E-318, 1E-319, 1E-320, 1E-321, 1E-322, 1E-323, 1E-324];
                    /**
                     * Returns powers of 10.
                     * Unlike the Math.pow this function produces no decimal garbage.
                     * @param exp Exponent.
                     */
                    function pow10(exp) {
                        // Positive & zero
                        if (exp >= 0) {
                            if (exp < Double.POSITIVE_POWERS.length) {
                                return Double.POSITIVE_POWERS[exp];
                            }
                            else {
                                return Infinity;
                            }
                        }
                        // Negative
                        exp = -exp;
                        if (exp > 0 && exp < Double.NEGATIVE_POWERS.length) {
                            return Double.NEGATIVE_POWERS[exp];
                        }
                        else {
                            return 0;
                        }
                    }
                    Double.pow10 = pow10;
                    /**
                     * Returns the 10 base logarithm of the number.
                     * Unlike Math.log function this produces integer results with no decimal garbage.
                     * @param val Positive value or zero.
                     */
                    function log10(val) {
                        // Fast Log10() algorithm 
                        if (val > 1 && val < 1E16) {
                            if (val < 1E8) {
                                if (val < 1E4) {
                                    if (val < 1E2) {
                                        if (val < 1E1) {
                                            return 0;
                                        }
                                        else {
                                            return 1;
                                        }
                                    }
                                    else {
                                        if (val < 1E3) {
                                            return 2;
                                        }
                                        else {
                                            return 3;
                                        }
                                    }
                                }
                                else {
                                    if (val < 1E6) {
                                        if (val < 1E5) {
                                            return 4;
                                        }
                                        else {
                                            return 5;
                                        }
                                    }
                                    else {
                                        if (val < 1E7) {
                                            return 6;
                                        }
                                        else {
                                            return 7;
                                        }
                                    }
                                }
                            }
                            else {
                                if (val < 1E12) {
                                    if (val < 1E10) {
                                        if (val < 1E9) {
                                            return 8;
                                        }
                                        else {
                                            return 9;
                                        }
                                    }
                                    else {
                                        if (val < 1E11) {
                                            return 10;
                                        }
                                        else {
                                            return 11;
                                        }
                                    }
                                }
                                else {
                                    if (val < 1E14) {
                                        if (val < 1E13) {
                                            return 12;
                                        }
                                        else {
                                            return 13;
                                        }
                                    }
                                    else {
                                        if (val < 1E15) {
                                            return 14;
                                        }
                                        else {
                                            return 15;
                                        }
                                    }
                                }
                            }
                        }
                        if (val > 1E-16 && val < 1) {
                            if (val < 1E-8) {
                                if (val < 1E-12) {
                                    if (val < 1E-14) {
                                        if (val < 1E-15) {
                                            return -16;
                                        }
                                        else {
                                            return -15;
                                        }
                                    }
                                    else {
                                        if (val < 1E-13) {
                                            return -14;
                                        }
                                        else {
                                            return -13;
                                        }
                                    }
                                }
                                else {
                                    if (val < 1E-10) {
                                        if (val < 1E-11) {
                                            return -12;
                                        }
                                        else {
                                            return -11;
                                        }
                                    }
                                    else {
                                        if (val < 1E-9) {
                                            return -10;
                                        }
                                        else {
                                            return -9;
                                        }
                                    }
                                }
                            }
                            else {
                                if (val < 1E-4) {
                                    if (val < 1E-6) {
                                        if (val < 1E-7) {
                                            return -8;
                                        }
                                        else {
                                            return -7;
                                        }
                                    }
                                    else {
                                        if (val < 1E-5) {
                                            return -6;
                                        }
                                        else {
                                            return -5;
                                        }
                                    }
                                }
                                else {
                                    if (val < 1E-2) {
                                        if (val < 1E-3) {
                                            return -4;
                                        }
                                        else {
                                            return -3;
                                        }
                                    }
                                    else {
                                        if (val < 1E-1) {
                                            return -2;
                                        }
                                        else {
                                            return -1;
                                        }
                                    }
                                }
                            }
                        }
                        // JS Math provides only natural log function so we need to calc the 10 base logarithm:
                        // logb(x) = logk(x)/logk(b); 
                        var log10 = Math.log(val) / Double.LOG_E_10;
                        return Double.floorWithPrecision(log10);
                    }
                    Double.log10 = log10;
                    /**
                     * Returns a power of 10 representing precision of the number based on the number of meaningful decimal digits.
                     * For example the precision of 56,263.3767 with the 6 meaningful decimal digit is 0.1.
                     * @param x Value.
                     * @param decimalDigits How many decimal digits are meaningfull.
                     */
                    function getPrecision(x, decimalDigits) {
                        if (decimalDigits === undefined) {
                            decimalDigits = Double.DEFAULT_PRECISION_IN_DECIMAL_DIGITS;
                        }
                        if (!x || !isFinite(x)) {
                            return undefined;
                        }
                        var exp = Double.log10(Math.abs(x));
                        if (exp < Double.MIN_EXP) {
                            return 0;
                        }
                        var precisionExp = Math.max(exp - decimalDigits, -Double.NEGATIVE_POWERS.length + 1);
                        return Double.pow10(precisionExp);
                    }
                    Double.getPrecision = getPrecision;
                    /**
                     * Checks if a delta between 2 numbers is less than provided precision.
                     * @param x One value.
                     * @param y Another value.
                     * @param precision Precision value.
                     */
                    function equalWithPrecision(x, y, precision) {
                        precision = detectPrecision(precision, x, y);
                        return x === y || Math.abs(x - y) < precision;
                    }
                    Double.equalWithPrecision = equalWithPrecision;
                    /**
                     * Checks if a first value is less than another taking
                     * into account the loose precision based equality.
                     * @param x One value.
                     * @param y Another value.
                     * @param precision Precision value.
                     */
                    function lessWithPrecision(x, y, precision) {
                        precision = detectPrecision(precision, x, y);
                        return x < y && Math.abs(x - y) > precision;
                    }
                    Double.lessWithPrecision = lessWithPrecision;
                    /**
                     * Checks if a first value is less or equal than another taking
                     * into account the loose precision based equality.
                     * @param x One value.
                     * @param y Another value.
                     * @param precision Precision value.
                     */
                    function lessOrEqualWithPrecision(x, y, precision) {
                        precision = detectPrecision(precision, x, y);
                        return x < y || Math.abs(x - y) < precision;
                    }
                    Double.lessOrEqualWithPrecision = lessOrEqualWithPrecision;
                    /**
                     * Checks if a first value is greater than another taking
                     * into account the loose precision based equality.
                     * @param x One value.
                     * @param y Another value.
                     * @param precision Precision value.
                     */
                    function greaterWithPrecision(x, y, precision) {
                        precision = detectPrecision(precision, x, y);
                        return x > y && Math.abs(x - y) > precision;
                    }
                    Double.greaterWithPrecision = greaterWithPrecision;
                    /**
                     * Checks if a first value is greater or equal to another taking
                     * into account the loose precision based equality.
                     * @param x One value.
                     * @param y Another value.
                     * @param precision Precision value.
                     */
                    function greaterOrEqualWithPrecision(x, y, precision) {
                        precision = detectPrecision(precision, x, y);
                        return x > y || Math.abs(x - y) < precision;
                    }
                    Double.greaterOrEqualWithPrecision = greaterOrEqualWithPrecision;
                    /**
                     * Floors the number unless it's withing the precision distance from the higher int.
                     * @param x One value.
                     * @param precision Precision value.
                     */
                    function floorWithPrecision(x, precision) {
                        precision = precision != null ? precision : Double.DEFAULT_PRECISION;
                        var roundX = Math.round(x);
                        if (Math.abs(x - roundX) < precision) {
                            return roundX;
                        }
                        else {
                            return Math.floor(x);
                        }
                    }
                    Double.floorWithPrecision = floorWithPrecision;
                    /**
                     * Ceils the number unless it's withing the precision distance from the lower int.
                     * @param x One value.
                     * @param precision Precision value.
                     */
                    function ceilWithPrecision(x, precision) {
                        precision = detectPrecision(precision, Double.DEFAULT_PRECISION);
                        var roundX = Math.round(x);
                        if (Math.abs(x - roundX) < precision) {
                            return roundX;
                        }
                        else {
                            return Math.ceil(x);
                        }
                    }
                    Double.ceilWithPrecision = ceilWithPrecision;
                    /**
                     * Floors the number to the provided precision.
                     * For example 234,578 floored to 1,000 precision is 234,000.
                     * @param x One value.
                     * @param precision Precision value.
                     */
                    function floorToPrecision(x, precision) {
                        precision = detectPrecision(precision, Double.DEFAULT_PRECISION);
                        if (precision === 0 || x === 0) {
                            return x;
                        }
                        // Precision must be a Power of 10
                        return Math.floor(x / precision) * precision;
                    }
                    Double.floorToPrecision = floorToPrecision;
                    /**
                     * Ceils the number to the provided precision.
                     * For example 234,578 floored to 1,000 precision is 235,000.
                     * @param x One value.
                     * @param precision Precision value.
                     */
                    function ceilToPrecision(x, precision) {
                        precision = detectPrecision(precision, Double.DEFAULT_PRECISION);
                        if (precision === 0 || x === 0) {
                            return x;
                        }
                        // Precision must be a Power of 10
                        return Math.ceil(x / precision) * precision;
                    }
                    Double.ceilToPrecision = ceilToPrecision;
                    /**
                     * Rounds the number to the provided precision.
                     * For example 234,578 floored to 1,000 precision is 235,000.
                     * @param x One value.
                     * @param precision Precision value.
                     */
                    function roundToPrecision(x, precision) {
                        precision = detectPrecision(precision, Double.DEFAULT_PRECISION);
                        if (precision === 0 || x === 0) {
                            return x;
                        }
                        // Precision must be a Power of 10
                        var result = Math.round(x / precision) * precision;
                        var decimalDigits = Math.round(Double.log10(Math.abs(x)) - Double.log10(precision)) + 1;
                        if (decimalDigits > 0 && decimalDigits < 16) {
                            result = parseFloat(result.toPrecision(decimalDigits));
                        }
                        return result;
                    }
                    Double.roundToPrecision = roundToPrecision;
                    /**
                     * Returns the value making sure that it's restricted to the provided range.
                     * @param x One value.
                     * @param min Range min boundary.
                     * @param max Range max boundary.
                     */
                    function ensureInRange(x, min, max) {
                        if (x === undefined || x === null) {
                            return x;
                        }
                        if (x < min) {
                            return min;
                        }
                        if (x > max) {
                            return max;
                        }
                        return x;
                    }
                    Double.ensureInRange = ensureInRange;
                    /**
                     * Rounds the value - this method is actually faster than Math.round - used in the graphics utils.
                     * @param x Value to round.
                     */
                    function round(x) {
                        return (0.5 + x) << 0;
                    }
                    Double.round = round;
                    /**
                     * Projects the value from the source range into the target range.
                     * @param value Value to project.
                     * @param fromMin Minimum of the source range.
                     * @param toMin Minimum of the target range.
                     * @param toMax Maximum of the target range.
                     */
                    function project(value, fromMin, fromSize, toMin, toSize) {
                        if (fromSize === 0 || toSize === 0) {
                            if (fromMin <= value && value <= fromMin + fromSize) {
                                return toMin;
                            }
                            else {
                                return NaN;
                            }
                        }
                        var relativeX = (value - fromMin) / fromSize;
                        var projectedX = toMin + relativeX * toSize;
                        return projectedX;
                    }
                    Double.project = project;
                    /**
                     * Removes decimal noise.
                     * @param value Value to be processed.
                     */
                    function removeDecimalNoise(value) {
                        return roundToPrecision(value, getPrecision(value));
                    }
                    Double.removeDecimalNoise = removeDecimalNoise;
                    /**
                     * Checks whether the number is integer.
                     * @param value Value to be checked.
                     */
                    function isInteger(value) {
                        return value !== null && value % 1 === 0;
                    }
                    Double.isInteger = isInteger;
                    /**
                     * Dividing by increment will give us count of increments
                     * Round out the rough edges into even integer
                     * Multiply back by increment to get rounded value
                     * e.g. Rounder.toIncrement(0.647291, 0.05) => 0.65
                     * @param value - value to round to nearest increment
                     * @param increment - smallest increment to round toward
                     */
                    function toIncrement(value, increment) {
                        return Math.round(value / increment) * increment;
                    }
                    Double.toIncrement = toIncrement;
                    /**
                     * Overrides the given precision with defaults if necessary. Exported only for tests
                     *
                     * precision defined returns precision
                     * x defined with y undefined returns twelve digits of precision based on x
                     * x defined but zero with y defined; returns twelve digits of precision based on y
                     * x and y defined retursn twelve digits of precision based on the minimum of the two
                     * if no applicable precision is found based on those (such as x and y being zero), the default precision is used
                     */
                    function detectPrecision(precision, x, y) {
                        if (precision !== undefined) {
                            return precision;
                        }
                        var calculatedPrecision;
                        if (!y) {
                            calculatedPrecision = Double.getPrecision(x);
                        }
                        else if (!x) {
                            calculatedPrecision = Double.getPrecision(y);
                        }
                        else {
                            calculatedPrecision = Double.getPrecision(Math.min(Math.abs(x), Math.abs(y)));
                        }
                        return calculatedPrecision || Double.DEFAULT_PRECISION;
                    }
                    Double.detectPrecision = detectPrecision;
                })(Double = type.Double || (type.Double = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                var Prototype;
                (function (Prototype) {
                    /**
                     * Returns a new object with the provided obj as its prototype.
                     */
                    function inherit(obj, extension) {
                        function wrapCtor() { }
                        ;
                        wrapCtor.prototype = obj;
                        var inherited = new wrapCtor();
                        if (extension)
                            extension(inherited);
                        return inherited;
                    }
                    Prototype.inherit = inherit;
                    /**
                     * Returns a new object with the provided obj as its prototype
                     * if, and only if, the prototype has not been previously set
                     */
                    function inheritSingle(obj) {
                        var proto = Object.getPrototypeOf(obj);
                        if (proto === Object.prototype || proto === Array.prototype)
                            obj = inherit(obj);
                        return obj;
                    }
                    Prototype.inheritSingle = inheritSingle;
                    /**
                     * Uses the provided callback function to selectively replace contents in the provided array.
                     * @return A new array with those values overriden
                     * or undefined if no overrides are necessary.
                     */
                    function overrideArray(prototype, override) {
                        if (!prototype)
                            return;
                        var overwritten;
                        for (var i = 0, len = prototype.length; i < len; i++) {
                            var value = override(prototype[i]);
                            if (value) {
                                if (!overwritten)
                                    overwritten = inherit(prototype);
                                overwritten[i] = value;
                            }
                        }
                        return overwritten;
                    }
                    Prototype.overrideArray = overrideArray;
                })(Prototype = type.Prototype || (type.Prototype = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                var ArrayExtensions;
                (function (ArrayExtensions) {
                    /**
                     * Returns items that exist in target and other.
                     */
                    function intersect(target, other) {
                        var result = [];
                        for (var i = target.length - 1; i >= 0; --i) {
                            if (other.indexOf(target[i]) !== -1) {
                                result.push(target[i]);
                            }
                        }
                        return result;
                    }
                    ArrayExtensions.intersect = intersect;
                    /**
                     * Return elements exists in target but not exists in other.
                     */
                    function diff(target, other) {
                        var result = [];
                        for (var i = target.length - 1; i >= 0; --i) {
                            var value = target[i];
                            if (other.indexOf(value) === -1) {
                                result.push(value);
                            }
                        }
                        return result;
                    }
                    ArrayExtensions.diff = diff;
                    /**
                     * Return an array with only the distinct items in the source.
                     */
                    function distinct(source) {
                        var result = [];
                        for (var i = 0, len = source.length; i < len; i++) {
                            var value = source[i];
                            if (result.indexOf(value) === -1) {
                                result.push(value);
                            }
                        }
                        return result;
                    }
                    ArrayExtensions.distinct = distinct;
                    /**
                     * Pushes content of source onto target,
                     * for parts of course that do not already exist in target.
                     */
                    function union(target, source) {
                        for (var i = 0, len = source.length; i < len; ++i) {
                            unionSingle(target, source[i]);
                        }
                    }
                    ArrayExtensions.union = union;
                    /**
                     * Pushes value onto target, if value does not already exist in target.
                     */
                    function unionSingle(target, value) {
                        if (target.indexOf(value) < 0) {
                            target.push(value);
                        }
                    }
                    ArrayExtensions.unionSingle = unionSingle;
                    /**
                     * Returns an array with a range of items from source,
                     * including the startIndex & endIndex.
                     */
                    function range(source, startIndex, endIndex) {
                        var result = [];
                        for (var i = startIndex; i <= endIndex; ++i) {
                            result.push(source[i]);
                        }
                        return result;
                    }
                    ArrayExtensions.range = range;
                    /**
                     * Returns an array that includes items from source, up to the specified count.
                     */
                    function take(source, count) {
                        var result = [];
                        for (var i = 0; i < count; ++i) {
                            result.push(source[i]);
                        }
                        return result;
                    }
                    ArrayExtensions.take = take;
                    function copy(source) {
                        return take(source, source.length);
                    }
                    ArrayExtensions.copy = copy;
                    /**
                      * Returns a value indicating whether the arrays have the same values in the same sequence.
                      */
                    function sequenceEqual(left, right, comparison) {
                        // Normalize falsy to null
                        if (!left) {
                            left = null;
                        }
                        if (!right) {
                            right = null;
                        }
                        // T can be same as U, and it is possible for left and right to be the same array object...
                        if (left === right) {
                            return true;
                        }
                        if (!!left !== !!right) {
                            return false;
                        }
                        var len = left.length;
                        if (len !== right.length) {
                            return false;
                        }
                        var i = 0;
                        while (i < len && comparison(left[i], right[i])) {
                            ++i;
                        }
                        return i === len;
                    }
                    ArrayExtensions.sequenceEqual = sequenceEqual;
                    /**
                     * Returns null if the specified array is empty.
                     * Otherwise returns the specified array.
                     */
                    function emptyToNull(array) {
                        if (array && array.length === 0) {
                            return null;
                        }
                        return array;
                    }
                    ArrayExtensions.emptyToNull = emptyToNull;
                    function indexOf(array, predicate) {
                        for (var i = 0, len = array.length; i < len; ++i) {
                            if (predicate(array[i])) {
                                return i;
                            }
                        }
                        return -1;
                    }
                    ArrayExtensions.indexOf = indexOf;
                    /**
                     * Returns a copy of the array rotated by the specified offset.
                     */
                    function rotate(array, offset) {
                        if (offset === 0)
                            return array.slice();
                        var rotated = array.slice(offset);
                        Array.prototype.push.apply(rotated, array.slice(0, offset));
                        return rotated;
                    }
                    ArrayExtensions.rotate = rotate;
                    function createWithId() {
                        return extendWithId([]);
                    }
                    ArrayExtensions.createWithId = createWithId;
                    function extendWithId(array) {
                        var extended = array;
                        extended.withId = withId;
                        return extended;
                    }
                    ArrayExtensions.extendWithId = extendWithId;
                    /**
                     * Finds and returns the first item with a matching ID.
                     */
                    function findWithId(array, id) {
                        for (var i = 0, len = array.length; i < len; i++) {
                            var item = array[i];
                            if (item.id === id)
                                return item;
                        }
                    }
                    ArrayExtensions.findWithId = findWithId;
                    function withId(id) {
                        return ArrayExtensions.findWithId(this, id);
                    }
                    function createWithName() {
                        return extendWithName([]);
                    }
                    ArrayExtensions.createWithName = createWithName;
                    function extendWithName(array) {
                        var extended = array;
                        extended.withName = withName;
                        return extended;
                    }
                    ArrayExtensions.extendWithName = extendWithName;
                    function findItemWithName(array, name) {
                        var index = indexWithName(array, name);
                        if (index >= 0)
                            return array[index];
                    }
                    ArrayExtensions.findItemWithName = findItemWithName;
                    function indexWithName(array, name) {
                        for (var i = 0, len = array.length; i < len; i++) {
                            var item = array[i];
                            if (item.name === name)
                                return i;
                        }
                        return -1;
                    }
                    ArrayExtensions.indexWithName = indexWithName;
                    /**
                     * Inserts a number in sorted order into a list of numbers already in sorted order.
                     * @returns True if the item was added, false if it already existed.
                     */
                    function insertSorted(list, value) {
                        var len = list.length;
                        // NOTE: iterate backwards because incoming values tend to be sorted already.
                        for (var i = len - 1; i >= 0; i--) {
                            var diff_1 = list[i] - value;
                            if (diff_1 === 0)
                                return false;
                            if (diff_1 > 0)
                                continue;
                            // diff < 0
                            list.splice(i + 1, 0, value);
                            return true;
                        }
                        list.unshift(value);
                        return true;
                    }
                    ArrayExtensions.insertSorted = insertSorted;
                    /**
                     * Removes the first occurrence of a value from a list if it exists.
                     * @returns True if the value was removed, false if it did not exist in the list.
                     */
                    function removeFirst(list, value) {
                        var index = list.indexOf(value);
                        if (index < 0)
                            return false;
                        list.splice(index, 1);
                        return true;
                    }
                    ArrayExtensions.removeFirst = removeFirst;
                    /**
                     * Finds and returns the first item with a matching name.
                     */
                    function withName(name) {
                        var array = this;
                        return findItemWithName(array, name);
                    }
                    /**
                     * Deletes all items from the array.
                     */
                    function clear(array) {
                        if (!array)
                            return;
                        while (array.length > 0)
                            array.pop();
                    }
                    ArrayExtensions.clear = clear;
                    function isUndefinedOrEmpty(array) {
                        if (!array || array.length === 0) {
                            return true;
                        }
                        return false;
                    }
                    ArrayExtensions.isUndefinedOrEmpty = isUndefinedOrEmpty;
                    function swap(array, firstIndex, secondIndex) {
                        var temp = array[firstIndex];
                        array[firstIndex] = array[secondIndex];
                        array[secondIndex] = temp;
                    }
                    ArrayExtensions.swap = swap;
                    function isInArray(array, lookupItem, compareCallback) {
                        return array.some(function (item) { return compareCallback(item, lookupItem); });
                    }
                    ArrayExtensions.isInArray = isInArray;
                    /** Checks if the given object is an Array, and looking all the way up the prototype chain. */
                    function isArrayOrInheritedArray(obj) {
                        var nextPrototype = obj;
                        while (nextPrototype != null) {
                            if (Array.isArray(nextPrototype))
                                return true;
                            nextPrototype = Object.getPrototypeOf(nextPrototype);
                        }
                        return false;
                    }
                    ArrayExtensions.isArrayOrInheritedArray = isArrayOrInheritedArray;
                    /**
                     * Returns true if the specified values array is sorted in an order as determined by the specified compareFunction.
                     */
                    function isSorted(values, compareFunction) {
                        var ilen = values.length;
                        if (ilen >= 2) {
                            for (var i = 1; i < ilen; i++) {
                                if (compareFunction(values[i - 1], values[i]) > 0) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    ArrayExtensions.isSorted = isSorted;
                    /**
                     * Returns true if the specified number values array is sorted in ascending order
                     * (or descending order if the specified descendingOrder is truthy).
                     */
                    function isSortedNumeric(values, descendingOrder) {
                        var compareFunction = descendingOrder ?
                            function (a, b) { return b - a; } :
                            function (a, b) { return a - b; };
                        return isSorted(values, compareFunction);
                    }
                    ArrayExtensions.isSortedNumeric = isSortedNumeric;
                    /**
                     * Ensures that the given T || T[] is in array form, either returning the array or
                     * converting single items into an array of length one.
                     */
                    function ensureArray(value) {
                        if (Array.isArray(value)) {
                            return value;
                        }
                        return [value];
                    }
                    ArrayExtensions.ensureArray = ensureArray;
                })(ArrayExtensions = type.ArrayExtensions || (type.ArrayExtensions = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                // NOTE: this file includes standalone utilities that should have no dependencies on external libraries, including jQuery.
                var Double = powerbi.extensibility.utils.type.Double;
                /**
                 * Extensions for Enumerations.
                 */
                var EnumExtensions;
                (function (EnumExtensions) {
                    /**
                     * Gets a value indicating whether the value has the bit flags set.
                     */
                    function hasFlag(value, flag) {
                        return (value & flag) === flag;
                    }
                    EnumExtensions.hasFlag = hasFlag;
                    /**
                     * Sets a value of a flag without modifying any other flags.
                     */
                    function setFlag(value, flag) {
                        return value |= flag;
                    }
                    EnumExtensions.setFlag = setFlag;
                    /**
                     * Resets a value of a flag without modifying any other flags.
                     */
                    function resetFlag(value, flag) {
                        return value &= ~flag;
                    }
                    EnumExtensions.resetFlag = resetFlag;
                    /**
                     * According to the TypeScript Handbook, this is safe to do.
                     */
                    function toString(enumType, value) {
                        return enumType[value];
                    }
                    EnumExtensions.toString = toString;
                    /**
                     * Returns the number of 1's in the specified value that is a set of binary bit flags.
                     */
                    function getBitCount(value) {
                        if (!Double.isInteger(value))
                            return 0;
                        var bitCount = 0;
                        var shiftingValue = value;
                        while (shiftingValue !== 0) {
                            if ((shiftingValue & 1) === 1) {
                                bitCount++;
                            }
                            shiftingValue = shiftingValue >>> 1;
                        }
                        ;
                        return bitCount;
                    }
                    EnumExtensions.getBitCount = getBitCount;
                })(EnumExtensions = type.EnumExtensions || (type.EnumExtensions = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                var Double = powerbi.extensibility.utils.type.Double;
                var NumericSequenceRange = (function () {
                    function NumericSequenceRange() {
                    }
                    NumericSequenceRange.prototype._ensureIncludeZero = function () {
                        if (this.includeZero) {
                            // fixed min and max has higher priority than includeZero
                            if (this.min > 0 && !this.hasFixedMin) {
                                this.min = 0;
                            }
                            if (this.max < 0 && !this.hasFixedMax) {
                                this.max = 0;
                            }
                        }
                    };
                    NumericSequenceRange.prototype._ensureNotEmpty = function () {
                        if (this.min === this.max) {
                            if (!this.min) {
                                this.min = 0;
                                this.max = NumericSequenceRange.DEFAULT_MAX;
                                this.hasFixedMin = true;
                                this.hasFixedMax = true;
                            }
                            else {
                                // We are dealing with a single data value (includeZero is not set)
                                // In order to fix the range we need to extend it in both directions by half of the interval.
                                // Interval is calculated based on the number:
                                // 1. Integers below 10,000 are extended by 0.5: so the [2006-2006] empty range is extended to [2005.5-2006.5] range and the ForsedSingleStop=2006
                                // 2. Other numbers are extended by half of their power: [700,001-700,001] => [650,001-750,001] and the ForsedSingleStop=null as we want the intervals to be calculated to cover the range.
                                var value = this.min;
                                var exp = Double.log10(Math.abs(value));
                                var step = void 0;
                                if (exp >= 0 && exp < 4) {
                                    step = 0.5;
                                    this.forcedSingleStop = value;
                                }
                                else {
                                    step = Double.pow10(exp) / 2;
                                    this.forcedSingleStop = null;
                                }
                                this.min = value - step;
                                this.max = value + step;
                            }
                        }
                    };
                    NumericSequenceRange.prototype._ensureDirection = function () {
                        if (this.min > this.max) {
                            var temp = this.min;
                            this.min = this.max;
                            this.max = temp;
                        }
                    };
                    NumericSequenceRange.prototype.getSize = function () {
                        return this.max - this.min;
                    };
                    NumericSequenceRange.prototype.shrinkByStep = function (range, step) {
                        var oldCount = this.min / step;
                        var newCount = range.min / step;
                        var deltaCount = Math.floor(newCount - oldCount);
                        this.min += deltaCount * step;
                        oldCount = this.max / step;
                        newCount = range.max / step;
                        deltaCount = Math.ceil(newCount - oldCount);
                        this.max += deltaCount * step;
                    };
                    NumericSequenceRange.calculate = function (dataMin, dataMax, fixedMin, fixedMax, includeZero) {
                        var result = new NumericSequenceRange();
                        result.includeZero = includeZero ? true : false;
                        result.hasDataRange = ValueUtil.hasValue(dataMin) && ValueUtil.hasValue(dataMax);
                        result.hasFixedMin = ValueUtil.hasValue(fixedMin);
                        result.hasFixedMax = ValueUtil.hasValue(fixedMax);
                        dataMin = Double.ensureInRange(dataMin, NumericSequenceRange.MIN_SUPPORTED_DOUBLE, NumericSequenceRange.MAX_SUPPORTED_DOUBLE);
                        dataMax = Double.ensureInRange(dataMax, NumericSequenceRange.MIN_SUPPORTED_DOUBLE, NumericSequenceRange.MAX_SUPPORTED_DOUBLE);
                        // Calculate the range using the min, max, dataRange
                        if (result.hasFixedMin && result.hasFixedMax) {
                            result.min = fixedMin;
                            result.max = fixedMax;
                        }
                        else if (result.hasFixedMin) {
                            result.min = fixedMin;
                            result.max = dataMax > fixedMin ? dataMax : fixedMin;
                        }
                        else if (result.hasFixedMax) {
                            result.min = dataMin < fixedMax ? dataMin : fixedMax;
                            result.max = fixedMax;
                        }
                        else if (result.hasDataRange) {
                            result.min = dataMin;
                            result.max = dataMax;
                        }
                        else {
                            result.min = 0;
                            result.max = 0;
                        }
                        result._ensureIncludeZero();
                        result._ensureNotEmpty();
                        result._ensureDirection();
                        if (result.min === 0) {
                            result.hasFixedMin = true; // If the range starts from zero we should prevent extending the intervals into the negative range
                        }
                        else if (result.max === 0) {
                            result.hasFixedMax = true; // If the range ends at zero we should prevent extending the intervals into the positive range
                        }
                        return result;
                    };
                    NumericSequenceRange.calculateDataRange = function (dataMin, dataMax, includeZero) {
                        if (!ValueUtil.hasValue(dataMin) || !ValueUtil.hasValue(dataMax)) {
                            return NumericSequenceRange.calculateFixedRange(0, NumericSequenceRange.DEFAULT_MAX);
                        }
                        else {
                            return NumericSequenceRange.calculate(dataMin, dataMax, null, null, includeZero);
                        }
                    };
                    NumericSequenceRange.calculateFixedRange = function (fixedMin, fixedMax, includeZero) {
                        var result = new NumericSequenceRange();
                        result.hasDataRange = false;
                        result.includeZero = includeZero;
                        result.min = fixedMin;
                        result.max = fixedMax;
                        result._ensureIncludeZero();
                        result._ensureNotEmpty();
                        result._ensureDirection();
                        result.hasFixedMin = true;
                        result.hasFixedMax = true;
                        return result;
                    };
                    NumericSequenceRange.DEFAULT_MAX = 10;
                    NumericSequenceRange.MIN_SUPPORTED_DOUBLE = -1E307;
                    NumericSequenceRange.MAX_SUPPORTED_DOUBLE = 1E307;
                    return NumericSequenceRange;
                }());
                type.NumericSequenceRange = NumericSequenceRange;
                /** Note: Exported for testability */
                var ValueUtil;
                (function (ValueUtil) {
                    function hasValue(value) {
                        return value !== undefined && value !== null;
                    }
                    ValueUtil.hasValue = hasValue;
                })(ValueUtil = type.ValueUtil || (type.ValueUtil = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                var Double = powerbi.extensibility.utils.type.Double;
                var NumericSequenceRange = powerbi.extensibility.utils.type.NumericSequenceRange;
                var NumericSequence = (function () {
                    function NumericSequence() {
                    }
                    NumericSequence.calculate = function (range, expectedCount, maxAllowedMargin, minPower, useZeroRefPoint, steps) {
                        var result = new NumericSequence();
                        if (expectedCount === undefined)
                            expectedCount = 10;
                        else
                            expectedCount = Double.ensureInRange(expectedCount, NumericSequence.MIN_COUNT, NumericSequence.MAX_COUNT);
                        if (minPower === undefined)
                            minPower = Double.MIN_EXP;
                        if (useZeroRefPoint === undefined)
                            useZeroRefPoint = false;
                        if (maxAllowedMargin === undefined)
                            maxAllowedMargin = 1;
                        if (steps === undefined)
                            steps = [1, 2, 5];
                        // Handle single stop case
                        if (range.forcedSingleStop) {
                            result.interval = range.getSize();
                            result.intervalOffset = result.interval - (range.forcedSingleStop - range.min);
                            result.min = range.min;
                            result.max = range.max;
                            result.sequence = [range.forcedSingleStop];
                            return result;
                        }
                        var interval = 0;
                        var min = 0;
                        var max = 9;
                        var canExtendMin = maxAllowedMargin > 0 && !range.hasFixedMin;
                        var canExtendMax = maxAllowedMargin > 0 && !range.hasFixedMax;
                        var size = range.getSize();
                        var exp = Double.log10(size);
                        // Account for Exp of steps
                        var stepExp = Double.log10(steps[0]);
                        exp = exp - stepExp;
                        // Account for MaxCount
                        var expectedCountExp = Double.log10(expectedCount);
                        exp = exp - expectedCountExp;
                        // Account for MinPower
                        exp = Math.max(exp, minPower - stepExp + 1);
                        var count = undefined;
                        // Create array of "good looking" numbers
                        if (interval !== 0) {
                            // If explicit interval is defined - use it instead of the steps array.
                            var power = Double.pow10(exp);
                            var roundMin = Double.floorToPrecision(range.min, power);
                            var roundMax = Double.ceilToPrecision(range.max, power);
                            var roundRange = NumericSequenceRange.calculateFixedRange(roundMin, roundMax);
                            roundRange.shrinkByStep(range, interval);
                            min = roundRange.min;
                            max = roundRange.max;
                            count = Math.floor(roundRange.getSize() / interval);
                        }
                        else {
                            // No interval defined -> find optimal interval
                            var dexp = void 0;
                            for (dexp = 0; dexp < 3; dexp++) {
                                var e = exp + dexp;
                                var power = Double.pow10(e);
                                var roundMin = Double.floorToPrecision(range.min, power);
                                var roundMax = Double.ceilToPrecision(range.max, power);
                                // Go throught the steps array looking for the smallest step that produces the right interval count.
                                var stepsCount = steps.length;
                                var stepPower = Double.pow10(e - 1);
                                for (var i = 0; i < stepsCount; i++) {
                                    var step = steps[i] * stepPower;
                                    var roundRange = NumericSequenceRange.calculateFixedRange(roundMin, roundMax, useZeroRefPoint);
                                    roundRange.shrinkByStep(range, step);
                                    // If the range is based on Data we might need to extend it to provide nice data margins.
                                    if (canExtendMin && range.min === roundRange.min && maxAllowedMargin >= 1)
                                        roundRange.min -= step;
                                    if (canExtendMax && range.max === roundRange.max && maxAllowedMargin >= 1)
                                        roundRange.max += step;
                                    // Count the intervals
                                    count = Double.ceilWithPrecision(roundRange.getSize() / step, Double.DEFAULT_PRECISION);
                                    if (count <= expectedCount || (dexp === 2 && i === stepsCount - 1) || (expectedCount === 1 && count === 2 && (step > range.getSize() || (range.min < 0 && range.max > 0 && step * 2 >= range.getSize())))) {
                                        interval = step;
                                        min = roundRange.min;
                                        max = roundRange.max;
                                        break;
                                    }
                                }
                                // Increase the scale power until the interval is found
                                if (interval !== 0)
                                    break;
                            }
                        }
                        // Avoid extreme count cases (>1000 ticks)
                        if (count > expectedCount * 32 || count > NumericSequence.MAX_COUNT) {
                            count = Math.min(expectedCount * 32, NumericSequence.MAX_COUNT);
                            interval = (max - min) / count;
                        }
                        result.min = min;
                        result.max = max;
                        result.interval = interval;
                        result.intervalOffset = min - range.min;
                        result.maxAllowedMargin = maxAllowedMargin;
                        result.canExtendMin = canExtendMin;
                        result.canExtendMax = canExtendMax;
                        // Fill in the Sequence
                        var precision = Double.getPrecision(interval, 0);
                        result.precision = precision;
                        var sequence = [];
                        var x = Double.roundToPrecision(min, precision);
                        sequence.push(x);
                        for (var i = 0; i < count; i++) {
                            x = Double.roundToPrecision(x + interval, precision);
                            sequence.push(x);
                        }
                        result.sequence = sequence;
                        result.trimMinMax(range.min, range.max);
                        return result;
                    };
                    /**
                     * Calculates the sequence of int numbers which are mapped to the multiples of the units grid.
                     * @min - The minimum of the range.
                     * @max - The maximum of the range.
                     * @maxCount - The max count of intervals.
                     * @steps - array of intervals.
                     */
                    NumericSequence.calculateUnits = function (min, max, maxCount, steps) {
                        // Initialization actions
                        maxCount = Double.ensureInRange(maxCount, NumericSequence.MIN_COUNT, NumericSequence.MAX_COUNT);
                        if (min === max) {
                            max = min + 1;
                        }
                        var stepCount = 0;
                        var step = 0;
                        // Calculate step
                        for (var i = 0; i < steps.length; i++) {
                            step = steps[i];
                            var maxStepCount = Double.ceilWithPrecision(max / step);
                            var minStepCount = Double.floorWithPrecision(min / step);
                            stepCount = maxStepCount - minStepCount;
                            if (stepCount <= maxCount) {
                                break;
                            }
                        }
                        // Calculate the offset
                        var offset = -min;
                        offset = offset % step;
                        // Create sequence
                        var result = new NumericSequence();
                        result.sequence = [];
                        for (var x = min + offset;; x += step) {
                            result.sequence.push(x);
                            if (x >= max)
                                break;
                        }
                        result.interval = step;
                        result.intervalOffset = offset;
                        result.min = result.sequence[0];
                        result.max = result.sequence[result.sequence.length - 1];
                        return result;
                    };
                    NumericSequence.prototype.trimMinMax = function (min, max) {
                        var minMargin = (min - this.min) / this.interval;
                        var maxMargin = (this.max - max) / this.interval;
                        var marginPrecision = 0.001;
                        if (!this.canExtendMin || (minMargin > this.maxAllowedMargin && minMargin > marginPrecision)) {
                            this.min = min;
                        }
                        if (!this.canExtendMax || (maxMargin > this.maxAllowedMargin && maxMargin > marginPrecision)) {
                            this.max = max;
                        }
                    };
                    NumericSequence.MIN_COUNT = 1;
                    NumericSequence.MAX_COUNT = 1000;
                    return NumericSequence;
                }());
                type.NumericSequence = NumericSequence;
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                var PixelConverter;
                (function (PixelConverter) {
                    var PxPtRatio = 4 / 3;
                    var PixelString = "px";
                    /**
                     * Appends 'px' to the end of number value for use as pixel string in styles
                     */
                    function toString(px) {
                        return px + PixelString;
                    }
                    PixelConverter.toString = toString;
                    /**
                     * Converts point value (pt) to pixels
                     * Returns a string for font-size property
                     * e.g. fromPoint(8) => '24px'
                     */
                    function fromPoint(pt) {
                        return toString(fromPointToPixel(pt));
                    }
                    PixelConverter.fromPoint = fromPoint;
                    /**
                     * Converts point value (pt) to pixels
                     * Returns a number for font-size property
                     * e.g. fromPoint(8) => 24px
                     */
                    function fromPointToPixel(pt) {
                        return (PxPtRatio * pt);
                    }
                    PixelConverter.fromPointToPixel = fromPointToPixel;
                    /**
                     * Converts pixel value (px) to pt
                     * e.g. toPoint(24) => 8
                     */
                    function toPoint(px) {
                        return px / PxPtRatio;
                    }
                    PixelConverter.toPoint = toPoint;
                })(PixelConverter = type.PixelConverter || (type.PixelConverter = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                // NOTE: this file includes standalone utilities that should have no dependencies on external libraries, including jQuery.
                var RegExpExtensions;
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
                })(RegExpExtensions = type.RegExpExtensions || (type.RegExpExtensions = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                /**
                 * Extensions to String class.
                 */
                var StringExtensions;
                (function (StringExtensions) {
                    /**
                     * Checks if a string ends with a sub-string.
                     */
                    function endsWith(str, suffix) {
                        return str.indexOf(suffix, str.length - suffix.length) !== -1;
                    }
                    StringExtensions.endsWith = endsWith;
                })(StringExtensions = type.StringExtensions || (type.StringExtensions = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                // NOTE: this file includes standalone utilities that should have no dependencies on external libraries, including jQuery.
                var LogicExtensions;
                (function (LogicExtensions) {
                    function XOR(a, b) {
                        return (a || b) && !(a && b);
                    }
                    LogicExtensions.XOR = XOR;
                })(LogicExtensions = type.LogicExtensions || (type.LogicExtensions = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                // NOTE: this file includes standalone utilities that should have no dependencies on external libraries, including jQuery.
                var JsonComparer;
                (function (JsonComparer) {
                    /**
                     * Performs JSON-style comparison of two objects.
                     */
                    function equals(x, y) {
                        if (x === y)
                            return true;
                        return JSON.stringify(x) === JSON.stringify(y);
                    }
                    JsonComparer.equals = equals;
                })(JsonComparer = type.JsonComparer || (type.JsonComparer = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var type;
            (function (type) {
                // NOTE: this file includes standalone utilities that should have no dependencies on external libraries, including jQuery.
                /**
                 * Values are in terms of 'pt'
                 * Convert to pixels using PixelConverter.fromPoint
                 */
                var TextSizeDefaults;
                (function (TextSizeDefaults) {
                    /**
                     * Stored in terms of 'pt'
                     * Convert to pixels using PixelConverter.fromPoint
                     */
                    TextSizeDefaults.TextSizeMin = 8;
                    /**
                     * Stored in terms of 'pt'
                     * Convert to pixels using PixelConverter.fromPoint
                     */
                    TextSizeDefaults.TextSizeMax = 40;
                    var TextSizeRange = TextSizeDefaults.TextSizeMax - TextSizeDefaults.TextSizeMin;
                    /**
                     * Returns the percentage of this value relative to the TextSizeMax
                     * @param textSize - should be given in terms of 'pt'
                     */
                    function getScale(textSize) {
                        return (textSize - TextSizeDefaults.TextSizeMin) / TextSizeRange;
                    }
                    TextSizeDefaults.getScale = getScale;
                })(TextSizeDefaults = type.TextSizeDefaults || (type.TextSizeDefaults = {}));
            })(type = utils.type || (utils.type = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
