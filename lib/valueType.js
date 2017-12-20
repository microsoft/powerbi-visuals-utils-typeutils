// powerbi.extensibility.utils.type
import { EnumExtensions } from "./extensions/enumExtensions";
import { JsonComparer } from "./jsonComparer";
/** Describes a data value type, including a primitive type and extended type if any (derived from data category). */
export class ValueType {
    /** Do not call the ValueType constructor directly. Use the ValueType.fromXXX methods. */
    constructor(underlyingType, category, enumType, variantTypes) {
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
    static fromDescriptor(descriptor) {
        descriptor = descriptor || {};
        // Simplified primitive types
        if (descriptor.text)
            return ValueType.fromExtendedType(ExtendedType.Text);
        if (descriptor.integer)
            return ValueType.fromExtendedType(ExtendedType.Integer);
        if (descriptor.numeric)
            return ValueType.fromExtendedType(ExtendedType.Double);
        if (descriptor.bool)
            return ValueType.fromExtendedType(ExtendedType.Boolean);
        if (descriptor.dateTime)
            return ValueType.fromExtendedType(ExtendedType.DateTime);
        if (descriptor.duration)
            return ValueType.fromExtendedType(ExtendedType.Duration);
        if (descriptor.binary)
            return ValueType.fromExtendedType(ExtendedType.Binary);
        if (descriptor.none)
            return ValueType.fromExtendedType(ExtendedType.None);
        // Extended types
        if (descriptor.scripting) {
            if (descriptor.scripting.source)
                return ValueType.fromExtendedType(ExtendedType.ScriptSource);
        }
        if (descriptor.enumeration)
            return ValueType.fromEnum(descriptor.enumeration);
        if (descriptor.temporal) {
            if (descriptor.temporal.year)
                return ValueType.fromExtendedType(ExtendedType.Years_Integer);
            if (descriptor.temporal.quarter)
                return ValueType.fromExtendedType(ExtendedType.Quarters_Integer);
            if (descriptor.temporal.month)
                return ValueType.fromExtendedType(ExtendedType.Months_Integer);
            if (descriptor.temporal.day)
                return ValueType.fromExtendedType(ExtendedType.DayOfMonth_Integer);
            if (descriptor.temporal.paddedDateTableDate)
                return ValueType.fromExtendedType(ExtendedType.PaddedDateTableDates);
        }
        if (descriptor.geography) {
            if (descriptor.geography.address)
                return ValueType.fromExtendedType(ExtendedType.Address);
            if (descriptor.geography.city)
                return ValueType.fromExtendedType(ExtendedType.City);
            if (descriptor.geography.continent)
                return ValueType.fromExtendedType(ExtendedType.Continent);
            if (descriptor.geography.country)
                return ValueType.fromExtendedType(ExtendedType.Country);
            if (descriptor.geography.county)
                return ValueType.fromExtendedType(ExtendedType.County);
            if (descriptor.geography.region)
                return ValueType.fromExtendedType(ExtendedType.Region);
            if (descriptor.geography.postalCode)
                return ValueType.fromExtendedType(ExtendedType.PostalCode_Text);
            if (descriptor.geography.stateOrProvince)
                return ValueType.fromExtendedType(ExtendedType.StateOrProvince);
            if (descriptor.geography.place)
                return ValueType.fromExtendedType(ExtendedType.Place);
            if (descriptor.geography.latitude)
                return ValueType.fromExtendedType(ExtendedType.Latitude_Double);
            if (descriptor.geography.longitude)
                return ValueType.fromExtendedType(ExtendedType.Longitude_Double);
        }
        if (descriptor.misc) {
            if (descriptor.misc.image)
                return ValueType.fromExtendedType(ExtendedType.Image);
            if (descriptor.misc.imageUrl)
                return ValueType.fromExtendedType(ExtendedType.ImageUrl);
            if (descriptor.misc.webUrl)
                return ValueType.fromExtendedType(ExtendedType.WebUrl);
            if (descriptor.misc.barcode)
                return ValueType.fromExtendedType(ExtendedType.Barcode_Text);
        }
        if (descriptor.formatting) {
            if (descriptor.formatting.color)
                return ValueType.fromExtendedType(ExtendedType.Color);
            if (descriptor.formatting.formatString)
                return ValueType.fromExtendedType(ExtendedType.FormatString);
            if (descriptor.formatting.alignment)
                return ValueType.fromExtendedType(ExtendedType.Alignment);
            if (descriptor.formatting.labelDisplayUnits)
                return ValueType.fromExtendedType(ExtendedType.LabelDisplayUnits);
            if (descriptor.formatting.fontSize)
                return ValueType.fromExtendedType(ExtendedType.FontSize);
            if (descriptor.formatting.labelDensity)
                return ValueType.fromExtendedType(ExtendedType.LabelDensity);
        }
        if (descriptor.extendedType) {
            return ValueType.fromExtendedType(descriptor.extendedType);
        }
        if (descriptor.operations) {
            if (descriptor.operations.searchEnabled)
                return ValueType.fromExtendedType(ExtendedType.SearchEnabled);
        }
        if (descriptor.variant) {
            let variantTypes = descriptor.variant.map((variantType) => ValueType.fromDescriptor(variantType));
            return ValueType.fromVariant(variantTypes);
        }
        return ValueType.fromExtendedType(ExtendedType.Null);
    }
    /** Advanced: Generally use fromDescriptor instead. Creates or retrieves a ValueType object for the specified ExtendedType. */
    static fromExtendedType(extendedType) {
        extendedType = extendedType || ExtendedType.Null;
        let primitiveType = getPrimitiveType(extendedType), category = getCategoryFromExtendedType(extendedType);
        return ValueType.fromPrimitiveTypeAndCategory(primitiveType, category);
    }
    /** Creates or retrieves a ValueType object for the specified PrimitiveType and data category. */
    static fromPrimitiveTypeAndCategory(primitiveType, category) {
        primitiveType = primitiveType || PrimitiveType.Null;
        category = category || null;
        let id = primitiveType.toString();
        if (category)
            id += "|" + category;
        return ValueType.typeCache[id] || (ValueType.typeCache[id] = new ValueType(toExtendedType(primitiveType, category), category));
    }
    /** Creates a ValueType to describe the given IEnumType. */
    static fromEnum(enumType) {
        return new ValueType(ExtendedType.Enumeration, null, enumType);
    }
    /** Creates a ValueType to describe the given Variant type. */
    static fromVariant(variantTypes) {
        return new ValueType(ExtendedType.Variant, /* category */ null, /* enumType */ null, variantTypes);
    }
    /** Determines if the specified type is compatible from at least one of the otherTypes. */
    static isCompatibleTo(typeDescriptor, otherTypes) {
        let valueType = ValueType.fromDescriptor(typeDescriptor);
        for (let otherType of otherTypes) {
            let otherValueType = ValueType.fromDescriptor(otherType);
            if (otherValueType.isCompatibleFrom(valueType))
                return true;
        }
        return false;
    }
    /** Determines if the instance ValueType is convertable from the 'other' ValueType. */
    isCompatibleFrom(other) {
        let otherPrimitiveType = other.primitiveType;
        if (this === other ||
            this.primitiveType === otherPrimitiveType ||
            otherPrimitiveType === PrimitiveType.Null ||
            // Return true if both types are numbers
            (this.numeric && other.numeric))
            return true;
        return false;
    }
    /**
     * Determines if the instance ValueType is equal to the 'other' ValueType
     * @param {ValueType} other the other ValueType to check equality against
     * @returns True if the instance ValueType is equal to the 'other' ValueType
     */
    equals(other) {
        return JsonComparer.equals(this, other);
    }
    /** Gets the exact primitive type of this ValueType. */
    get primitiveType() {
        return getPrimitiveType(this.underlyingType);
    }
    /** Gets the exact extended type of this ValueType. */
    get extendedType() {
        return this.underlyingType;
    }
    /** Gets the data category string (if any) for this ValueType. */
    get categoryString() {
        return this.category;
    }
    // Simplified primitive types
    /** Indicates whether the type represents text values. */
    get text() {
        return this.primitiveType === PrimitiveType.Text;
    }
    /** Indicates whether the type represents any numeric value. */
    get numeric() {
        return EnumExtensions.hasFlag(this.underlyingType, ExtendedType.Numeric);
    }
    /** Indicates whether the type represents integer numeric values. */
    get integer() {
        return this.primitiveType === PrimitiveType.Integer;
    }
    /** Indicates whether the type represents Boolean values. */
    get bool() {
        return this.primitiveType === PrimitiveType.Boolean;
    }
    /** Indicates whether the type represents any date/time values. */
    get dateTime() {
        return this.primitiveType === PrimitiveType.DateTime ||
            this.primitiveType === PrimitiveType.Date ||
            this.primitiveType === PrimitiveType.Time;
    }
    /** Indicates whether the type represents duration values. */
    get duration() {
        return this.primitiveType === PrimitiveType.Duration;
    }
    /** Indicates whether the type represents binary values. */
    get binary() {
        return this.primitiveType === PrimitiveType.Binary;
    }
    /** Indicates whether the type represents none values. */
    get none() {
        return this.primitiveType === PrimitiveType.None;
    }
    // Extended types
    /** Returns an object describing temporal values represented by the type, if it represents a temporal type. */
    get temporal() {
        return this.temporalType;
    }
    /** Returns an object describing geographic values represented by the type, if it represents a geographic type. */
    get geography() {
        return this.geographyType;
    }
    /** Returns an object describing the specific values represented by the type, if it represents a miscellaneous extended type. */
    get misc() {
        return this.miscType;
    }
    /** Returns an object describing the formatting values represented by the type, if it represents a formatting type. */
    get formatting() {
        return this.formattingType;
    }
    /** Returns an object describing the enum values represented by the type, if it represents an enumeration type. */
    get enumeration() {
        return this.enumType;
    }
    get scripting() {
        return this.scriptingType;
    }
    /** Returns an array describing the variant values represented by the type, if it represents an Variant type. */
    get variant() {
        return this.variationTypes;
    }
}
ValueType.typeCache = {};
export class ScriptType {
    constructor(underlyingType) {
        this.underlyingType = underlyingType;
    }
    get source() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.ScriptSource);
    }
}
export class TemporalType {
    constructor(underlyingType) {
        this.underlyingType = underlyingType;
    }
    get year() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Years);
    }
    get quarter() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Quarters);
    }
    get month() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Months);
    }
    get day() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.DayOfMonth);
    }
    get paddedDateTableDate() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.PaddedDateTableDates);
    }
}
export class GeographyType {
    constructor(underlyingType) {
        this.underlyingType = underlyingType;
    }
    get address() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Address);
    }
    get city() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.City);
    }
    get continent() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Continent);
    }
    get country() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Country);
    }
    get county() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.County);
    }
    get region() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Region);
    }
    get postalCode() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.PostalCode);
    }
    get stateOrProvince() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.StateOrProvince);
    }
    get place() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Place);
    }
    get latitude() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Latitude);
    }
    get longitude() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Longitude);
    }
}
export class MiscellaneousType {
    constructor(underlyingType) {
        this.underlyingType = underlyingType;
    }
    get image() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Image);
    }
    get imageUrl() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.ImageUrl);
    }
    get webUrl() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.WebUrl);
    }
    get barcode() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Barcode);
    }
}
export class FormattingType {
    constructor(underlyingType) {
        this.underlyingType = underlyingType;
    }
    get color() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Color);
    }
    get formatString() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.FormatString);
    }
    get alignment() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Alignment);
    }
    get labelDisplayUnits() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.LabelDisplayUnits);
    }
    get fontSize() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.FontSize);
    }
    get labelDensity() {
        return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.LabelDensity);
    }
}
/** Defines primitive value types. Must be consistent with types defined by server conceptual schema. */
export var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType[PrimitiveType["Null"] = 0] = "Null";
    PrimitiveType[PrimitiveType["Text"] = 1] = "Text";
    PrimitiveType[PrimitiveType["Decimal"] = 2] = "Decimal";
    PrimitiveType[PrimitiveType["Double"] = 3] = "Double";
    PrimitiveType[PrimitiveType["Integer"] = 4] = "Integer";
    PrimitiveType[PrimitiveType["Boolean"] = 5] = "Boolean";
    PrimitiveType[PrimitiveType["Date"] = 6] = "Date";
    PrimitiveType[PrimitiveType["DateTime"] = 7] = "DateTime";
    PrimitiveType[PrimitiveType["DateTimeZone"] = 8] = "DateTimeZone";
    PrimitiveType[PrimitiveType["Time"] = 9] = "Time";
    PrimitiveType[PrimitiveType["Duration"] = 10] = "Duration";
    PrimitiveType[PrimitiveType["Binary"] = 11] = "Binary";
    PrimitiveType[PrimitiveType["None"] = 12] = "None";
    PrimitiveType[PrimitiveType["Variant"] = 13] = "Variant";
})(PrimitiveType || (PrimitiveType = {}));
var PrimitiveTypeStrings;
(function (PrimitiveTypeStrings) {
    PrimitiveTypeStrings[PrimitiveTypeStrings["Null"] = 0] = "Null";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Text"] = 1] = "Text";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Decimal"] = 2] = "Decimal";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Double"] = 3] = "Double";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Integer"] = 4] = "Integer";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Boolean"] = 5] = "Boolean";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Date"] = 6] = "Date";
    PrimitiveTypeStrings[PrimitiveTypeStrings["DateTime"] = 7] = "DateTime";
    PrimitiveTypeStrings[PrimitiveTypeStrings["DateTimeZone"] = 8] = "DateTimeZone";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Time"] = 9] = "Time";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Duration"] = 10] = "Duration";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Binary"] = 11] = "Binary";
    PrimitiveTypeStrings[PrimitiveTypeStrings["None"] = 12] = "None";
    PrimitiveTypeStrings[PrimitiveTypeStrings["Variant"] = 13] = "Variant";
})(PrimitiveTypeStrings || (PrimitiveTypeStrings = {}));
/** Defines extended value types, which include primitive types and known data categories constrained to expected primitive types. */
export var ExtendedType;
(function (ExtendedType) {
    // Flags (1 << 8-15 range [0xFF00])
    // Important: Enum members must be declared before they are used in TypeScript.
    ExtendedType[ExtendedType["Numeric"] = 256] = "Numeric";
    ExtendedType[ExtendedType["Temporal"] = 512] = "Temporal";
    ExtendedType[ExtendedType["Geography"] = 1024] = "Geography";
    ExtendedType[ExtendedType["Miscellaneous"] = 2048] = "Miscellaneous";
    ExtendedType[ExtendedType["Formatting"] = 4096] = "Formatting";
    ExtendedType[ExtendedType["Scripting"] = 8192] = "Scripting";
    // Primitive types (0-255 range [0xFF] | flags)
    // The member names and base values must match those in PrimitiveType.
    ExtendedType[ExtendedType["Null"] = 0] = "Null";
    ExtendedType[ExtendedType["Text"] = 1] = "Text";
    ExtendedType[ExtendedType["Decimal"] = 258] = "Decimal";
    ExtendedType[ExtendedType["Double"] = 259] = "Double";
    ExtendedType[ExtendedType["Integer"] = 260] = "Integer";
    ExtendedType[ExtendedType["Boolean"] = 5] = "Boolean";
    ExtendedType[ExtendedType["Date"] = 518] = "Date";
    ExtendedType[ExtendedType["DateTime"] = 519] = "DateTime";
    ExtendedType[ExtendedType["DateTimeZone"] = 520] = "DateTimeZone";
    ExtendedType[ExtendedType["Time"] = 521] = "Time";
    ExtendedType[ExtendedType["Duration"] = 10] = "Duration";
    ExtendedType[ExtendedType["Binary"] = 11] = "Binary";
    ExtendedType[ExtendedType["None"] = 12] = "None";
    ExtendedType[ExtendedType["Variant"] = 13] = "Variant";
    // Extended types (0-32767 << 16 range [0xFFFF0000] | corresponding primitive type | flags)
    // Temporal
    ExtendedType[ExtendedType["Years"] = 66048] = "Years";
    ExtendedType[ExtendedType["Years_Text"] = 66049] = "Years_Text";
    ExtendedType[ExtendedType["Years_Integer"] = 66308] = "Years_Integer";
    ExtendedType[ExtendedType["Years_Date"] = 66054] = "Years_Date";
    ExtendedType[ExtendedType["Years_DateTime"] = 66055] = "Years_DateTime";
    ExtendedType[ExtendedType["Months"] = 131584] = "Months";
    ExtendedType[ExtendedType["Months_Text"] = 131585] = "Months_Text";
    ExtendedType[ExtendedType["Months_Integer"] = 131844] = "Months_Integer";
    ExtendedType[ExtendedType["Months_Date"] = 131590] = "Months_Date";
    ExtendedType[ExtendedType["Months_DateTime"] = 131591] = "Months_DateTime";
    ExtendedType[ExtendedType["PaddedDateTableDates"] = 197127] = "PaddedDateTableDates";
    ExtendedType[ExtendedType["Quarters"] = 262656] = "Quarters";
    ExtendedType[ExtendedType["Quarters_Text"] = 262657] = "Quarters_Text";
    ExtendedType[ExtendedType["Quarters_Integer"] = 262916] = "Quarters_Integer";
    ExtendedType[ExtendedType["Quarters_Date"] = 262662] = "Quarters_Date";
    ExtendedType[ExtendedType["Quarters_DateTime"] = 262663] = "Quarters_DateTime";
    ExtendedType[ExtendedType["DayOfMonth"] = 328192] = "DayOfMonth";
    ExtendedType[ExtendedType["DayOfMonth_Text"] = 328193] = "DayOfMonth_Text";
    ExtendedType[ExtendedType["DayOfMonth_Integer"] = 328452] = "DayOfMonth_Integer";
    ExtendedType[ExtendedType["DayOfMonth_Date"] = 328198] = "DayOfMonth_Date";
    ExtendedType[ExtendedType["DayOfMonth_DateTime"] = 328199] = "DayOfMonth_DateTime";
    // Geography
    ExtendedType[ExtendedType["Address"] = 6554625] = "Address";
    ExtendedType[ExtendedType["City"] = 6620161] = "City";
    ExtendedType[ExtendedType["Continent"] = 6685697] = "Continent";
    ExtendedType[ExtendedType["Country"] = 6751233] = "Country";
    ExtendedType[ExtendedType["County"] = 6816769] = "County";
    ExtendedType[ExtendedType["Region"] = 6882305] = "Region";
    ExtendedType[ExtendedType["PostalCode"] = 6947840] = "PostalCode";
    ExtendedType[ExtendedType["PostalCode_Text"] = 6947841] = "PostalCode_Text";
    ExtendedType[ExtendedType["PostalCode_Integer"] = 6948100] = "PostalCode_Integer";
    ExtendedType[ExtendedType["StateOrProvince"] = 7013377] = "StateOrProvince";
    ExtendedType[ExtendedType["Place"] = 7078913] = "Place";
    ExtendedType[ExtendedType["Latitude"] = 7144448] = "Latitude";
    ExtendedType[ExtendedType["Latitude_Decimal"] = 7144706] = "Latitude_Decimal";
    ExtendedType[ExtendedType["Latitude_Double"] = 7144707] = "Latitude_Double";
    ExtendedType[ExtendedType["Longitude"] = 7209984] = "Longitude";
    ExtendedType[ExtendedType["Longitude_Decimal"] = 7210242] = "Longitude_Decimal";
    ExtendedType[ExtendedType["Longitude_Double"] = 7210243] = "Longitude_Double";
    // Miscellaneous
    ExtendedType[ExtendedType["Image"] = 13109259] = "Image";
    ExtendedType[ExtendedType["ImageUrl"] = 13174785] = "ImageUrl";
    ExtendedType[ExtendedType["WebUrl"] = 13240321] = "WebUrl";
    ExtendedType[ExtendedType["Barcode"] = 13305856] = "Barcode";
    ExtendedType[ExtendedType["Barcode_Text"] = 13305857] = "Barcode_Text";
    ExtendedType[ExtendedType["Barcode_Integer"] = 13306116] = "Barcode_Integer";
    // Formatting
    ExtendedType[ExtendedType["Color"] = 19664897] = "Color";
    ExtendedType[ExtendedType["FormatString"] = 19730433] = "FormatString";
    ExtendedType[ExtendedType["Alignment"] = 20058113] = "Alignment";
    ExtendedType[ExtendedType["LabelDisplayUnits"] = 20123649] = "LabelDisplayUnits";
    ExtendedType[ExtendedType["FontSize"] = 20189443] = "FontSize";
    ExtendedType[ExtendedType["LabelDensity"] = 20254979] = "LabelDensity";
    // Enumeration
    ExtendedType[ExtendedType["Enumeration"] = 26214401] = "Enumeration";
    // Scripting
    ExtendedType[ExtendedType["ScriptSource"] = 32776193] = "ScriptSource";
    // NOTE: To avoid confusion, underscores should be used only to delimit primitive type variants of an extended type
    // (e.g. Year_Integer or Latitude_Double above)
    // Operations
    ExtendedType[ExtendedType["SearchEnabled"] = 65541] = "SearchEnabled";
})(ExtendedType || (ExtendedType = {}));
var ExtendedTypeStrings;
(function (ExtendedTypeStrings) {
    ExtendedTypeStrings[ExtendedTypeStrings["Numeric"] = 256] = "Numeric";
    ExtendedTypeStrings[ExtendedTypeStrings["Temporal"] = 512] = "Temporal";
    ExtendedTypeStrings[ExtendedTypeStrings["Geography"] = 1024] = "Geography";
    ExtendedTypeStrings[ExtendedTypeStrings["Miscellaneous"] = 2048] = "Miscellaneous";
    ExtendedTypeStrings[ExtendedTypeStrings["Formatting"] = 4096] = "Formatting";
    ExtendedTypeStrings[ExtendedTypeStrings["Scripting"] = 8192] = "Scripting";
    ExtendedTypeStrings[ExtendedTypeStrings["Null"] = 0] = "Null";
    ExtendedTypeStrings[ExtendedTypeStrings["Text"] = 1] = "Text";
    ExtendedTypeStrings[ExtendedTypeStrings["Decimal"] = 258] = "Decimal";
    ExtendedTypeStrings[ExtendedTypeStrings["Double"] = 259] = "Double";
    ExtendedTypeStrings[ExtendedTypeStrings["Integer"] = 260] = "Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["Boolean"] = 5] = "Boolean";
    ExtendedTypeStrings[ExtendedTypeStrings["Date"] = 518] = "Date";
    ExtendedTypeStrings[ExtendedTypeStrings["DateTime"] = 519] = "DateTime";
    ExtendedTypeStrings[ExtendedTypeStrings["DateTimeZone"] = 520] = "DateTimeZone";
    ExtendedTypeStrings[ExtendedTypeStrings["Time"] = 521] = "Time";
    ExtendedTypeStrings[ExtendedTypeStrings["Duration"] = 10] = "Duration";
    ExtendedTypeStrings[ExtendedTypeStrings["Binary"] = 11] = "Binary";
    ExtendedTypeStrings[ExtendedTypeStrings["None"] = 12] = "None";
    ExtendedTypeStrings[ExtendedTypeStrings["Variant"] = 13] = "Variant";
    ExtendedTypeStrings[ExtendedTypeStrings["Years"] = 66048] = "Years";
    ExtendedTypeStrings[ExtendedTypeStrings["Years_Text"] = 66049] = "Years_Text";
    ExtendedTypeStrings[ExtendedTypeStrings["Years_Integer"] = 66308] = "Years_Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["Years_Date"] = 66054] = "Years_Date";
    ExtendedTypeStrings[ExtendedTypeStrings["Years_DateTime"] = 66055] = "Years_DateTime";
    ExtendedTypeStrings[ExtendedTypeStrings["Months"] = 131584] = "Months";
    ExtendedTypeStrings[ExtendedTypeStrings["Months_Text"] = 131585] = "Months_Text";
    ExtendedTypeStrings[ExtendedTypeStrings["Months_Integer"] = 131844] = "Months_Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["Months_Date"] = 131590] = "Months_Date";
    ExtendedTypeStrings[ExtendedTypeStrings["Months_DateTime"] = 131591] = "Months_DateTime";
    ExtendedTypeStrings[ExtendedTypeStrings["PaddedDateTableDates"] = 197127] = "PaddedDateTableDates";
    ExtendedTypeStrings[ExtendedTypeStrings["Quarters"] = 262656] = "Quarters";
    ExtendedTypeStrings[ExtendedTypeStrings["Quarters_Text"] = 262657] = "Quarters_Text";
    ExtendedTypeStrings[ExtendedTypeStrings["Quarters_Integer"] = 262916] = "Quarters_Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["Quarters_Date"] = 262662] = "Quarters_Date";
    ExtendedTypeStrings[ExtendedTypeStrings["Quarters_DateTime"] = 262663] = "Quarters_DateTime";
    ExtendedTypeStrings[ExtendedTypeStrings["DayOfMonth"] = 328192] = "DayOfMonth";
    ExtendedTypeStrings[ExtendedTypeStrings["DayOfMonth_Text"] = 328193] = "DayOfMonth_Text";
    ExtendedTypeStrings[ExtendedTypeStrings["DayOfMonth_Integer"] = 328452] = "DayOfMonth_Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["DayOfMonth_Date"] = 328198] = "DayOfMonth_Date";
    ExtendedTypeStrings[ExtendedTypeStrings["DayOfMonth_DateTime"] = 328199] = "DayOfMonth_DateTime";
    ExtendedTypeStrings[ExtendedTypeStrings["Address"] = 6554625] = "Address";
    ExtendedTypeStrings[ExtendedTypeStrings["City"] = 6620161] = "City";
    ExtendedTypeStrings[ExtendedTypeStrings["Continent"] = 6685697] = "Continent";
    ExtendedTypeStrings[ExtendedTypeStrings["Country"] = 6751233] = "Country";
    ExtendedTypeStrings[ExtendedTypeStrings["County"] = 6816769] = "County";
    ExtendedTypeStrings[ExtendedTypeStrings["Region"] = 6882305] = "Region";
    ExtendedTypeStrings[ExtendedTypeStrings["PostalCode"] = 6947840] = "PostalCode";
    ExtendedTypeStrings[ExtendedTypeStrings["PostalCode_Text"] = 6947841] = "PostalCode_Text";
    ExtendedTypeStrings[ExtendedTypeStrings["PostalCode_Integer"] = 6948100] = "PostalCode_Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["StateOrProvince"] = 7013377] = "StateOrProvince";
    ExtendedTypeStrings[ExtendedTypeStrings["Place"] = 7078913] = "Place";
    ExtendedTypeStrings[ExtendedTypeStrings["Latitude"] = 7144448] = "Latitude";
    ExtendedTypeStrings[ExtendedTypeStrings["Latitude_Decimal"] = 7144706] = "Latitude_Decimal";
    ExtendedTypeStrings[ExtendedTypeStrings["Latitude_Double"] = 7144707] = "Latitude_Double";
    ExtendedTypeStrings[ExtendedTypeStrings["Longitude"] = 7209984] = "Longitude";
    ExtendedTypeStrings[ExtendedTypeStrings["Longitude_Decimal"] = 7210242] = "Longitude_Decimal";
    ExtendedTypeStrings[ExtendedTypeStrings["Longitude_Double"] = 7210243] = "Longitude_Double";
    ExtendedTypeStrings[ExtendedTypeStrings["Image"] = 13109259] = "Image";
    ExtendedTypeStrings[ExtendedTypeStrings["ImageUrl"] = 13174785] = "ImageUrl";
    ExtendedTypeStrings[ExtendedTypeStrings["WebUrl"] = 13240321] = "WebUrl";
    ExtendedTypeStrings[ExtendedTypeStrings["Barcode"] = 13305856] = "Barcode";
    ExtendedTypeStrings[ExtendedTypeStrings["Barcode_Text"] = 13305857] = "Barcode_Text";
    ExtendedTypeStrings[ExtendedTypeStrings["Barcode_Integer"] = 13306116] = "Barcode_Integer";
    ExtendedTypeStrings[ExtendedTypeStrings["Color"] = 19664897] = "Color";
    ExtendedTypeStrings[ExtendedTypeStrings["FormatString"] = 19730433] = "FormatString";
    ExtendedTypeStrings[ExtendedTypeStrings["Alignment"] = 20058113] = "Alignment";
    ExtendedTypeStrings[ExtendedTypeStrings["LabelDisplayUnits"] = 20123649] = "LabelDisplayUnits";
    ExtendedTypeStrings[ExtendedTypeStrings["FontSize"] = 20189443] = "FontSize";
    ExtendedTypeStrings[ExtendedTypeStrings["LabelDensity"] = 20254979] = "LabelDensity";
    ExtendedTypeStrings[ExtendedTypeStrings["Enumeration"] = 26214401] = "Enumeration";
    ExtendedTypeStrings[ExtendedTypeStrings["ScriptSource"] = 32776193] = "ScriptSource";
    ExtendedTypeStrings[ExtendedTypeStrings["SearchEnabled"] = 65541] = "SearchEnabled";
})(ExtendedTypeStrings || (ExtendedTypeStrings = {}));
const PrimitiveTypeMask = 0xFF;
const PrimitiveTypeWithFlagsMask = 0xFFFF;
const PrimitiveTypeFlagsExcludedMask = 0xFFFF0000;
function getPrimitiveType(extendedType) {
    return extendedType & PrimitiveTypeMask;
}
function isPrimitiveType(extendedType) {
    return (extendedType & PrimitiveTypeWithFlagsMask) === extendedType;
}
function getCategoryFromExtendedType(extendedType) {
    if (isPrimitiveType(extendedType))
        return null;
    let category = ExtendedTypeStrings[extendedType];
    if (category) {
        // Check for ExtendedType declaration without a primitive type.
        // If exists, use it as category (e.g. Longitude rather than Longitude_Double)
        // Otherwise use the ExtendedType declaration with a primitive type (e.g. Address)
        let delimIdx = category.lastIndexOf("_");
        if (delimIdx > 0) {
            let baseCategory = category.slice(0, delimIdx);
            if (ExtendedTypeStrings[baseCategory]) {
                category = baseCategory;
            }
        }
    }
    return category || null;
}
function toExtendedType(primitiveType, category) {
    let primitiveString = PrimitiveTypeStrings[primitiveType];
    let t = ExtendedTypeStrings[primitiveString];
    if (t == null) {
        t = ExtendedType.Null;
    }
    if (primitiveType && category) {
        let categoryType = ExtendedTypeStrings[category];
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
function matchesExtendedTypeWithAnyPrimitive(a, b) {
    return (a & PrimitiveTypeFlagsExcludedMask) === (b & PrimitiveTypeFlagsExcludedMask);
}
//# sourceMappingURL=valueType.js.map