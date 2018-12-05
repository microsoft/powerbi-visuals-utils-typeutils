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

import powerbi from "powerbi-visuals-api";
import ValueTypeDescriptor = powerbi.ValueTypeDescriptor;
import IEnumType = powerbi.IEnumType;
import ScriptTypeDescriptor = powerbi.ScriptTypeDescriptor;
import TemporalTypeDescriptor = powerbi.TemporalTypeDescriptor;
import GeographyTypeDescriptor = powerbi.GeographyTypeDescriptor;
import MiscellaneousTypeDescriptor = powerbi.MiscellaneousTypeDescriptor;
import FormattingTypeDescriptor = powerbi.FormattingTypeDescriptor;
// powerbi.extensibility.utils.type
import { EnumExtensions } from "./extensions/enumExtensions";
import { equals } from "./jsonComparer";

export interface IValueTypeDescriptor extends ValueTypeDescriptor {
    extendedType?: ExtendedType;
}

/** Describes a data value type, including a primitive type and extended type if any (derived from data category). */
export class ValueType implements IValueTypeDescriptor {
    private static typeCache: { [id: string]: ValueType } = {};

    private underlyingType: ExtendedType;
    private category: string;

    private temporalType: TemporalType;
    private geographyType: GeographyType;
    private miscType: MiscellaneousType;
    private formattingType: FormattingType;
    private enumType: IEnumType;
    private scriptingType: ScriptType;
    private variationTypes: ValueType[];

    /** Do not call the ValueType constructor directly. Use the ValueType.fromXXX methods. */
    constructor(underlyingType: ExtendedType, category?: string, enumType?: IEnumType, variantTypes?: ValueType[]) {
        this.underlyingType = underlyingType;
        this.category = category;

        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Temporal)) {
            this.temporalType = new TemporalType(underlyingType);
        }
        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Geography)) {
            this.geographyType = new GeographyType(underlyingType);
        }
        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Miscellaneous)) {
            this.miscType = new MiscellaneousType(underlyingType);
        }
        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Formatting)) {
            this.formattingType = new FormattingType(underlyingType);
        }
        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Enumeration)) {
            this.enumType = enumType;
        }
        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Scripting)) {
            this.scriptingType = new ScriptType(underlyingType);
        }
        if (EnumExtensions.hasFlag(underlyingType, ExtendedType.Variant)) {
            this.variationTypes = variantTypes;
        }
    }

    /** Creates or retrieves a ValueType object based on the specified ValueTypeDescriptor. */
    public static fromDescriptor(descriptor: IValueTypeDescriptor): ValueType {
        descriptor = descriptor || {};

        // Simplified primitive types
        if (descriptor.text) return ValueType.fromExtendedType(ExtendedType.Text);
        if (descriptor.integer) return ValueType.fromExtendedType(ExtendedType.Integer);
        if (descriptor.numeric) return ValueType.fromExtendedType(ExtendedType.Double);
        if (descriptor.bool) return ValueType.fromExtendedType(ExtendedType.Boolean);
        if (descriptor.dateTime) return ValueType.fromExtendedType(ExtendedType.DateTime);
        if (descriptor.duration) return ValueType.fromExtendedType(ExtendedType.Duration);
        if (descriptor.binary) return ValueType.fromExtendedType(ExtendedType.Binary);
        if (descriptor.none) return ValueType.fromExtendedType(ExtendedType.None);

        // Extended types
        if (descriptor.scripting) {
            if (descriptor.scripting.source) return ValueType.fromExtendedType(ExtendedType.ScriptSource);
        }
        if (descriptor.enumeration) return ValueType.fromEnum(descriptor.enumeration);
        if (descriptor.temporal) {
            if (descriptor.temporal.year) return ValueType.fromExtendedType(ExtendedType.Years_Integer);
            if ((<any>descriptor.temporal).quarter) return ValueType.fromExtendedType(ExtendedType.Quarters_Integer);
            if (descriptor.temporal.month) return ValueType.fromExtendedType(ExtendedType.Months_Integer);
            if ((<any>descriptor.temporal).day) return ValueType.fromExtendedType(ExtendedType.DayOfMonth_Integer);
            if ((<any>descriptor.temporal).paddedDateTableDate) return ValueType.fromExtendedType(ExtendedType.PaddedDateTableDates);
        }
        if (descriptor.geography) {
            if (descriptor.geography.address) return ValueType.fromExtendedType(ExtendedType.Address);
            if (descriptor.geography.city) return ValueType.fromExtendedType(ExtendedType.City);
            if (descriptor.geography.continent) return ValueType.fromExtendedType(ExtendedType.Continent);
            if (descriptor.geography.country) return ValueType.fromExtendedType(ExtendedType.Country);
            if (descriptor.geography.county) return ValueType.fromExtendedType(ExtendedType.County);
            if (descriptor.geography.region) return ValueType.fromExtendedType(ExtendedType.Region);
            if (descriptor.geography.postalCode) return ValueType.fromExtendedType(ExtendedType.PostalCode_Text);
            if (descriptor.geography.stateOrProvince) return ValueType.fromExtendedType(ExtendedType.StateOrProvince);
            if (descriptor.geography.place) return ValueType.fromExtendedType(ExtendedType.Place);
            if (descriptor.geography.latitude) return ValueType.fromExtendedType(ExtendedType.Latitude_Double);
            if (descriptor.geography.longitude) return ValueType.fromExtendedType(ExtendedType.Longitude_Double);
        }
        if (descriptor.misc) {
            if (descriptor.misc.image) return ValueType.fromExtendedType(ExtendedType.Image);
            if (descriptor.misc.imageUrl) return ValueType.fromExtendedType(ExtendedType.ImageUrl);
            if (descriptor.misc.webUrl) return ValueType.fromExtendedType(ExtendedType.WebUrl);
            if (descriptor.misc.barcode) return ValueType.fromExtendedType(ExtendedType.Barcode_Text);
        }
        if (descriptor.formatting) {
            if (descriptor.formatting.color) return ValueType.fromExtendedType(ExtendedType.Color);
            if (descriptor.formatting.formatString) return ValueType.fromExtendedType(ExtendedType.FormatString);
            if (descriptor.formatting.alignment) return ValueType.fromExtendedType(ExtendedType.Alignment);
            if (descriptor.formatting.labelDisplayUnits) return ValueType.fromExtendedType(ExtendedType.LabelDisplayUnits);
            if (descriptor.formatting.fontSize) return ValueType.fromExtendedType(ExtendedType.FontSize);
            if (descriptor.formatting.labelDensity) return ValueType.fromExtendedType(ExtendedType.LabelDensity);
        }
        if (descriptor.extendedType) {
            return ValueType.fromExtendedType(descriptor.extendedType);
        }
        if (descriptor.operations) {
            if (descriptor.operations.searchEnabled) return ValueType.fromExtendedType(ExtendedType.SearchEnabled);
        }
        if ((<any>descriptor).variant) {
            let variantTypes = (<any>descriptor).variant.map((variantType) => ValueType.fromDescriptor(variantType));
            return ValueType.fromVariant(variantTypes);
        }

        return ValueType.fromExtendedType(ExtendedType.Null);
    }

    /** Advanced: Generally use fromDescriptor instead. Creates or retrieves a ValueType object for the specified ExtendedType. */
    public static fromExtendedType(extendedType: ExtendedType): ValueType {
        extendedType = extendedType || ExtendedType.Null;

        let primitiveType = getPrimitiveType(extendedType),
            category = getCategoryFromExtendedType(extendedType);

        return ValueType.fromPrimitiveTypeAndCategory(primitiveType, category);
    }

    /** Creates or retrieves a ValueType object for the specified PrimitiveType and data category. */
    public static fromPrimitiveTypeAndCategory(primitiveType: PrimitiveType, category?: string): ValueType {
        primitiveType = primitiveType || PrimitiveType.Null;
        category = category || null;

        let id = primitiveType.toString();
        if (category)
            id += "|" + category;

        return ValueType.typeCache[id] || (ValueType.typeCache[id] = new ValueType(toExtendedType(primitiveType, category), category));
    }

    /** Creates a ValueType to describe the given IEnumType. */
    public static fromEnum(enumType: IEnumType): ValueType {
        return new ValueType(ExtendedType.Enumeration, null, enumType);
    }

    /** Creates a ValueType to describe the given Variant type. */
    public static fromVariant(variantTypes: ValueType[]): ValueType {
        return new ValueType(ExtendedType.Variant, /* category */null, /* enumType */null, variantTypes);
    }

    /** Determines if the specified type is compatible from at least one of the otherTypes. */
    public static isCompatibleTo(typeDescriptor: IValueTypeDescriptor, otherTypes: IValueTypeDescriptor[]): boolean {
        let valueType = ValueType.fromDescriptor(typeDescriptor);
        for (let otherType of otherTypes) {
            let otherValueType = ValueType.fromDescriptor(otherType);

            if (otherValueType.isCompatibleFrom(valueType))
                return true;
        }

        return false;
    }

    /** Determines if the instance ValueType is convertable from the 'other' ValueType. */
    public isCompatibleFrom(other: ValueType): boolean {
        let otherPrimitiveType = other.primitiveType;
        if (this === other ||
            this.primitiveType === otherPrimitiveType ||
            otherPrimitiveType === PrimitiveType.Null ||
            // Return true if both types are numbers
            (this.numeric && other.numeric)
        )
            return true;
        return false;
    }

    /**
     * Determines if the instance ValueType is equal to the 'other' ValueType
     * @param {ValueType} other the other ValueType to check equality against
     * @returns True if the instance ValueType is equal to the 'other' ValueType
     */
    public equals(other: ValueType): boolean {
        return equals(this, other);
    }

    /** Gets the exact primitive type of this ValueType. */
    public get primitiveType(): PrimitiveType {
        return getPrimitiveType(this.underlyingType);
    }

    /** Gets the exact extended type of this ValueType. */
    public get extendedType(): ExtendedType {
        return this.underlyingType;
    }

    /** Gets the data category string (if any) for this ValueType. */
    public get categoryString(): string {
        return this.category;
    }

    // Simplified primitive types

    /** Indicates whether the type represents text values. */
    public get text(): boolean {
        return this.primitiveType === PrimitiveType.Text;
    }

    /** Indicates whether the type represents any numeric value. */
    public get numeric(): boolean {
        return EnumExtensions.hasFlag(this.underlyingType, ExtendedType.Numeric);
    }

    /** Indicates whether the type represents integer numeric values. */
    public get integer(): boolean {
        return this.primitiveType === PrimitiveType.Integer;
    }

    /** Indicates whether the type represents Boolean values. */
    public get bool(): boolean {
        return this.primitiveType === PrimitiveType.Boolean;
    }

    /** Indicates whether the type represents any date/time values. */
    public get dateTime(): boolean {
        return this.primitiveType === PrimitiveType.DateTime ||
            this.primitiveType === PrimitiveType.Date ||
            this.primitiveType === PrimitiveType.Time;
    }

    /** Indicates whether the type represents duration values. */
    public get duration(): boolean {
        return this.primitiveType === PrimitiveType.Duration;
    }

    /** Indicates whether the type represents binary values. */
    public get binary(): boolean {
        return this.primitiveType === PrimitiveType.Binary;
    }

    /** Indicates whether the type represents none values. */
    public get none(): boolean {
        return this.primitiveType === PrimitiveType.None;
    }

    // Extended types

    /** Returns an object describing temporal values represented by the type, if it represents a temporal type. */
    public get temporal(): TemporalType {
        return this.temporalType;
    }

    /** Returns an object describing geographic values represented by the type, if it represents a geographic type. */
    public get geography(): GeographyType {
        return this.geographyType;
    }

    /** Returns an object describing the specific values represented by the type, if it represents a miscellaneous extended type. */
    public get misc(): MiscellaneousType {
        return this.miscType;
    }

    /** Returns an object describing the formatting values represented by the type, if it represents a formatting type. */
    public get formatting(): FormattingType {
        return this.formattingType;
    }

    /** Returns an object describing the enum values represented by the type, if it represents an enumeration type. */
    public get enumeration(): IEnumType {
        return this.enumType;
    }

    public get scripting(): ScriptType {
        return this.scriptingType;
    }

    /** Returns an array describing the variant values represented by the type, if it represents an Variant type. */
    public get variant(): ValueType[] {
        return this.variationTypes;
    }
}

export class ScriptType implements ScriptTypeDescriptor {
    private underlyingType: ExtendedType;

    constructor(underlyingType: ExtendedType) {
        this.underlyingType = underlyingType;
    }

    public get source(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.ScriptSource);
    }
}

export class TemporalType implements TemporalTypeDescriptor {
    private underlyingType: ExtendedType;

    constructor(underlyingType: ExtendedType) {
        this.underlyingType = underlyingType;
    }

    public get year(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Years);
    }
    public get quarter(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Quarters);
    }
    public get month(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Months);
    }
    public get day(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.DayOfMonth);
    }
    public get paddedDateTableDate(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.PaddedDateTableDates);
    }
}

export class GeographyType implements GeographyTypeDescriptor {
    private underlyingType: ExtendedType;

    constructor(underlyingType: ExtendedType) {
        this.underlyingType = underlyingType;
    }

    public get address(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Address);
    }
    public get city(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.City);
    }
    public get continent(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Continent);
    }
    public get country(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Country);
    }
    public get county(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.County);
    }
    public get region(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Region);
    }
    public get postalCode(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.PostalCode);
    }
    public get stateOrProvince(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.StateOrProvince);
    }
    public get place(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Place);
    }
    public get latitude(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Latitude);
    }
    public get longitude(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Longitude);
    }
}

export class MiscellaneousType implements MiscellaneousTypeDescriptor {
    private underlyingType: ExtendedType;

    constructor(underlyingType: ExtendedType) {
        this.underlyingType = underlyingType;
    }

    public get image(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Image);
    }
    public get imageUrl(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.ImageUrl);
    }
    public get webUrl(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.WebUrl);
    }
    public get barcode(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Barcode);
    }
}

export class FormattingType implements FormattingTypeDescriptor {
    private underlyingType: ExtendedType;

    constructor(underlyingType: ExtendedType) {
        this.underlyingType = underlyingType;
    }

    public get color(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Color);
    }

    public get formatString(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.FormatString);
    }

    public get alignment(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Alignment);
    }

    public get labelDisplayUnits(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.LabelDisplayUnits);
    }

    public get fontSize(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.FontSize);
    }

    public get labelDensity(): boolean {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.LabelDensity);
    }
}

/** Defines primitive value types. Must be consistent with types defined by server conceptual schema. */
export enum PrimitiveType {
    Null = 0,
    Text = 1,
    Decimal = 2,
    Double = 3,
    Integer = 4,
    Boolean = 5,
    Date = 6,
    DateTime = 7,
    DateTimeZone = 8,
    Time = 9,
    Duration = 10,
    Binary = 11,
    None = 12,
    Variant = 13,
}

enum PrimitiveTypeStrings {
    Null = PrimitiveType.Null,
    Text = PrimitiveType.Text,
    Decimal = PrimitiveType.Decimal,
    Double = PrimitiveType.Double,
    Integer = PrimitiveType.Integer,
    Boolean = PrimitiveType.Boolean,
    Date = PrimitiveType.Date,
    DateTime = PrimitiveType.DateTime,
    DateTimeZone = PrimitiveType.DateTimeZone,
    Time = PrimitiveType.Time,
    Duration = PrimitiveType.Duration,
    Binary = PrimitiveType.Binary,
    None = PrimitiveType.None,
    Variant = PrimitiveType.Variant,
}

/** Defines extended value types, which include primitive types and known data categories constrained to expected primitive types. */
export enum ExtendedType {
    // Flags (1 << 8-15 range [0xFF00])
    // Important: Enum members must be declared before they are used in TypeScript.
    Numeric = 1 << 8,
    Temporal = 1 << 9,
    Geography = 1 << 10,
    Miscellaneous = 1 << 11,
    Formatting = 1 << 12,
    Scripting = 1 << 13,

    // Primitive types (0-255 range [0xFF] | flags)
    // The member names and base values must match those in PrimitiveType.
    Null = 0,
    Text = 1,
    Decimal = Numeric | 2,
    Double = Numeric | 3,
    Integer = Numeric | 4,
    Boolean = 5,
    Date = Temporal | 6,
    DateTime = Temporal | 7,
    DateTimeZone = Temporal | 8,
    Time = Temporal | 9,
    Duration = 10,
    Binary = 11,
    None = 12,
    Variant = 13,

    // Extended types (0-32767 << 16 range [0xFFFF0000] | corresponding primitive type | flags)
    // Temporal
    Years = Temporal | (1 << 16),
    Years_Text = Years | Text,
    Years_Integer = Years | Integer,
    Years_Date = Years | Date,
    Years_DateTime = Years | DateTime,
    Months = Temporal | (2 << 16),
    Months_Text = Months | Text,
    Months_Integer = Months | Integer,
    Months_Date = Months | Date,
    Months_DateTime = Months | DateTime,
    PaddedDateTableDates = Temporal | DateTime | (3 << 16),
    Quarters = Temporal | (4 << 16),
    Quarters_Text = Quarters | Text,
    Quarters_Integer = Quarters | Integer,
    Quarters_Date = Quarters | Date,
    Quarters_DateTime = Quarters | DateTime,
    DayOfMonth = Temporal | (5 << 16),
    DayOfMonth_Text = DayOfMonth | Text,
    DayOfMonth_Integer = DayOfMonth | Integer,
    DayOfMonth_Date = DayOfMonth | Date,
    DayOfMonth_DateTime = DayOfMonth | DateTime,

    // Geography
    Address = Text | Geography | (100 << 16),
    City = Text | Geography | (101 << 16),
    Continent = Text | Geography | (102 << 16),
    Country = Text | Geography | (103 << 16),
    County = Text | Geography | (104 << 16),
    Region = Text | Geography | (105 << 16),
    PostalCode = Geography | (106 << 16),
    PostalCode_Text = PostalCode | Text,
    PostalCode_Integer = PostalCode | Integer,
    StateOrProvince = Text | Geography | (107 << 16),
    Place = Text | Geography | (108 << 16),
    Latitude = Geography | (109 << 16),
    Latitude_Decimal = Latitude | Decimal,
    Latitude_Double = Latitude | Double,
    Longitude = Geography | (110 << 16),
    Longitude_Decimal = Longitude | Decimal,
    Longitude_Double = Longitude | Double,
    // Miscellaneous
    Image = Binary | Miscellaneous | (200 << 16),
    ImageUrl = Text | Miscellaneous | (201 << 16),
    WebUrl = Text | Miscellaneous | (202 << 16),
    Barcode = Miscellaneous | (203 << 16),
    Barcode_Text = Barcode | Text,
    Barcode_Integer = Barcode | Integer,

    // Formatting
    Color = Text | Formatting | (300 << 16),
    FormatString = Text | Formatting | (301 << 16),
    Alignment = Text | Formatting | (306 << 16),
    LabelDisplayUnits = Text | Formatting | (307 << 16),
    FontSize = Double | Formatting | (308 << 16),
    LabelDensity = Double | Formatting | (309 << 16),
    // Enumeration
    Enumeration = Text | 400 << 16,
    // Scripting
    ScriptSource = Text | Scripting | (500 << 16),
    // NOTE: To avoid confusion, underscores should be used only to delimit primitive type variants of an extended type
    // (e.g. Year_Integer or Latitude_Double above)

    // Operations
    SearchEnabled = Boolean | (1 << 16),
}

enum ExtendedTypeStrings {
    Numeric = ExtendedType.Numeric,
    Temporal = ExtendedType.Temporal,
    Geography = ExtendedType.Geography,
    Miscellaneous = ExtendedType.Miscellaneous,
    Formatting = ExtendedType.Formatting,
    Scripting = ExtendedType.Scripting,
    Null = ExtendedType.Null,
    Text = ExtendedType.Text,
    Decimal = ExtendedType.Decimal,
    Double = ExtendedType.Double,
    Integer = ExtendedType.Integer,
    Boolean = ExtendedType.Boolean,
    Date = ExtendedType.Date,
    DateTime = ExtendedType.DateTime,
    DateTimeZone = ExtendedType.DateTimeZone,
    Time = ExtendedType.Time,
    Duration = ExtendedType.Duration,
    Binary = ExtendedType.Binary,
    None = ExtendedType.None,
    Variant = ExtendedType.Variant,
    Years = ExtendedType.Years,
    Years_Text = ExtendedType.Years_Text,
    Years_Integer = ExtendedType.Years_Integer,
    Years_Date = ExtendedType.Years_Date,
    Years_DateTime = ExtendedType.Years_DateTime,
    Months = ExtendedType.Months,
    Months_Text = ExtendedType.Months_Text,
    Months_Integer = ExtendedType.Months_Integer,
    Months_Date = ExtendedType.Months_Date,
    Months_DateTime = ExtendedType.Months_DateTime,
    PaddedDateTableDates = ExtendedType.PaddedDateTableDates,
    Quarters = ExtendedType.Quarters,
    Quarters_Text = ExtendedType.Quarters_Text,
    Quarters_Integer = ExtendedType.Quarters_Integer,
    Quarters_Date = ExtendedType.Quarters_Date,
    Quarters_DateTime = ExtendedType.Quarters_DateTime,
    DayOfMonth = ExtendedType.DayOfMonth,
    DayOfMonth_Text = ExtendedType.DayOfMonth_Text,
    DayOfMonth_Integer = ExtendedType.DayOfMonth_Integer,
    DayOfMonth_Date = ExtendedType.DayOfMonth_Date,
    DayOfMonth_DateTime = ExtendedType.DayOfMonth_DateTime,
    Address = ExtendedType.Address,
    City = ExtendedType.City,
    Continent = ExtendedType.Continent,
    Country = ExtendedType.Country,
    County = ExtendedType.County,
    Region = ExtendedType.Region,
    PostalCode = ExtendedType.PostalCode,
    PostalCode_Text = ExtendedType.PostalCode_Text,
    PostalCode_Integer = ExtendedType.PostalCode_Integer,
    StateOrProvince = ExtendedType.StateOrProvince,
    Place = ExtendedType.Place,
    Latitude = ExtendedType.Latitude,
    Latitude_Decimal = ExtendedType.Latitude_Decimal,
    Latitude_Double = ExtendedType.Latitude_Double,
    Longitude = ExtendedType.Longitude,
    Longitude_Decimal = ExtendedType.Longitude_Decimal,
    Longitude_Double = ExtendedType.Longitude_Double,
    Image = ExtendedType.Image,
    ImageUrl = ExtendedType.ImageUrl,
    WebUrl = ExtendedType.WebUrl,
    Barcode = ExtendedType.Barcode,
    Barcode_Text = ExtendedType.Barcode_Text,
    Barcode_Integer = ExtendedType.Barcode_Integer,
    Color = ExtendedType.Color,
    FormatString = ExtendedType.FormatString,
    Alignment = ExtendedType.Alignment,
    LabelDisplayUnits = ExtendedType.LabelDisplayUnits,
    FontSize = ExtendedType.FontSize,
    LabelDensity = ExtendedType.LabelDensity,
    Enumeration = ExtendedType.Enumeration,
    ScriptSource = ExtendedType.ScriptSource,
    SearchEnabled = ExtendedType.SearchEnabled,
}

const PrimitiveTypeMask = 0xFF;
const PrimitiveTypeWithFlagsMask = 0xFFFF;
const PrimitiveTypeFlagsExcludedMask = 0xFFFF0000;

function getPrimitiveType(extendedType: ExtendedType): PrimitiveType {
    return extendedType & PrimitiveTypeMask;
}

function isPrimitiveType(extendedType: ExtendedType): boolean {
    return (extendedType & PrimitiveTypeWithFlagsMask) === extendedType;
}

function getCategoryFromExtendedType(extendedType: ExtendedType): string {
    if (isPrimitiveType(extendedType))
        return null;

    let category = ExtendedTypeStrings[extendedType];
    if (category) {
        // Check for ExtendedType declaration without a primitive type.
        // If exists, use it as category (e.g. Longitude rather than Longitude_Double)
        // Otherwise use the ExtendedType declaration with a primitive type (e.g. Address)
        let delimIdx = category.lastIndexOf("_");
        if (delimIdx > 0) {
            let baseCategory: string = category.slice(0, delimIdx);
            if (ExtendedTypeStrings[baseCategory]) {
                category = baseCategory;
            }
        }
    }
    return category || null;
}

function toExtendedType(primitiveType: PrimitiveType, category?: string): ExtendedType {
    let primitiveString = PrimitiveTypeStrings[primitiveType];
    let t = ExtendedTypeStrings[primitiveString];
    if (t == null) {
        t = ExtendedType.Null;
    }

    if (primitiveType && category) {
        let categoryType: ExtendedType = ExtendedTypeStrings[category];
        if (categoryType) {
            let categoryPrimitiveType = getPrimitiveType(categoryType);
            if (categoryPrimitiveType === PrimitiveType.Null) {
                // Category supports multiple primitive types, check if requested primitive type is supported
                // (note: important to use t here rather than primitiveType as it may include primitive type flags)
                categoryType = t | categoryType;
                if (ExtendedTypeStrings[categoryType]) {
                    t = categoryType;
                }
            }
            else if (categoryPrimitiveType === primitiveType) {
                // Primitive type matches the single supported type for the category
                t = categoryType;
            }
        }
    }

    return t;
}

function matchesExtendedTypeWithAnyPrimitive(a: ExtendedType, b: ExtendedType): boolean {
    return (a & PrimitiveTypeFlagsExcludedMask) === (b & PrimitiveTypeFlagsExcludedMask);
}
