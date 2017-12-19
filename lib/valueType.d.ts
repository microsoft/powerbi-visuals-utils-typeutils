import ValueTypeDescriptor = powerbi.ValueTypeDescriptor;
import IEnumType = powerbi.IEnumType;
import ScriptTypeDescriptor = powerbi.ScriptTypeDescriptor;
import TemporalTypeDescriptor = powerbi.TemporalTypeDescriptor;
import GeographyTypeDescriptor = powerbi.GeographyTypeDescriptor;
import MiscellaneousTypeDescriptor = powerbi.MiscellaneousTypeDescriptor;
import FormattingTypeDescriptor = powerbi.FormattingTypeDescriptor;
export interface IValueTypeDescriptor extends ValueTypeDescriptor {
    extendedType?: ExtendedType;
}
/** Describes a data value type, including a primitive type and extended type if any (derived from data category). */
export declare class ValueType implements IValueTypeDescriptor {
    private static typeCache;
    private underlyingType;
    private category;
    private temporalType;
    private geographyType;
    private miscType;
    private formattingType;
    private enumType;
    private scriptingType;
    private variationTypes;
    /** Do not call the ValueType constructor directly. Use the ValueType.fromXXX methods. */
    constructor(underlyingType: ExtendedType, category?: string, enumType?: IEnumType, variantTypes?: ValueType[]);
    /** Creates or retrieves a ValueType object based on the specified ValueTypeDescriptor. */
    static fromDescriptor(descriptor: IValueTypeDescriptor): ValueType;
    /** Advanced: Generally use fromDescriptor instead. Creates or retrieves a ValueType object for the specified ExtendedType. */
    static fromExtendedType(extendedType: ExtendedType): ValueType;
    /** Creates or retrieves a ValueType object for the specified PrimitiveType and data category. */
    static fromPrimitiveTypeAndCategory(primitiveType: PrimitiveType, category?: string): ValueType;
    /** Creates a ValueType to describe the given IEnumType. */
    static fromEnum(enumType: IEnumType): ValueType;
    /** Creates a ValueType to describe the given Variant type. */
    static fromVariant(variantTypes: ValueType[]): ValueType;
    /** Determines if the specified type is compatible from at least one of the otherTypes. */
    static isCompatibleTo(typeDescriptor: IValueTypeDescriptor, otherTypes: IValueTypeDescriptor[]): boolean;
    /** Determines if the instance ValueType is convertable from the 'other' ValueType. */
    isCompatibleFrom(other: ValueType): boolean;
    /**
     * Determines if the instance ValueType is equal to the 'other' ValueType
     * @param {ValueType} other the other ValueType to check equality against
     * @returns True if the instance ValueType is equal to the 'other' ValueType
     */
    equals(other: ValueType): boolean;
    /** Gets the exact primitive type of this ValueType. */
    readonly primitiveType: PrimitiveType;
    /** Gets the exact extended type of this ValueType. */
    readonly extendedType: ExtendedType;
    /** Gets the data category string (if any) for this ValueType. */
    readonly categoryString: string;
    /** Indicates whether the type represents text values. */
    readonly text: boolean;
    /** Indicates whether the type represents any numeric value. */
    readonly numeric: boolean;
    /** Indicates whether the type represents integer numeric values. */
    readonly integer: boolean;
    /** Indicates whether the type represents Boolean values. */
    readonly bool: boolean;
    /** Indicates whether the type represents any date/time values. */
    readonly dateTime: boolean;
    /** Indicates whether the type represents duration values. */
    readonly duration: boolean;
    /** Indicates whether the type represents binary values. */
    readonly binary: boolean;
    /** Indicates whether the type represents none values. */
    readonly none: boolean;
    /** Returns an object describing temporal values represented by the type, if it represents a temporal type. */
    readonly temporal: TemporalType;
    /** Returns an object describing geographic values represented by the type, if it represents a geographic type. */
    readonly geography: GeographyType;
    /** Returns an object describing the specific values represented by the type, if it represents a miscellaneous extended type. */
    readonly misc: MiscellaneousType;
    /** Returns an object describing the formatting values represented by the type, if it represents a formatting type. */
    readonly formatting: FormattingType;
    /** Returns an object describing the enum values represented by the type, if it represents an enumeration type. */
    readonly enumeration: IEnumType;
    readonly scripting: ScriptType;
    /** Returns an array describing the variant values represented by the type, if it represents an Variant type. */
    readonly variant: ValueType[];
}
export declare class ScriptType implements ScriptTypeDescriptor {
    private underlyingType;
    constructor(underlyingType: ExtendedType);
    readonly source: boolean;
}
export declare class TemporalType implements TemporalTypeDescriptor {
    private underlyingType;
    constructor(underlyingType: ExtendedType);
    readonly year: boolean;
    readonly quarter: boolean;
    readonly month: boolean;
    readonly day: boolean;
    readonly paddedDateTableDate: boolean;
}
export declare class GeographyType implements GeographyTypeDescriptor {
    private underlyingType;
    constructor(underlyingType: ExtendedType);
    readonly address: boolean;
    readonly city: boolean;
    readonly continent: boolean;
    readonly country: boolean;
    readonly county: boolean;
    readonly region: boolean;
    readonly postalCode: boolean;
    readonly stateOrProvince: boolean;
    readonly place: boolean;
    readonly latitude: boolean;
    readonly longitude: boolean;
}
export declare class MiscellaneousType implements MiscellaneousTypeDescriptor {
    private underlyingType;
    constructor(underlyingType: ExtendedType);
    readonly image: boolean;
    readonly imageUrl: boolean;
    readonly webUrl: boolean;
    readonly barcode: boolean;
}
export declare class FormattingType implements FormattingTypeDescriptor {
    private underlyingType;
    constructor(underlyingType: ExtendedType);
    readonly color: boolean;
    readonly formatString: boolean;
    readonly alignment: boolean;
    readonly labelDisplayUnits: boolean;
    readonly fontSize: boolean;
    readonly labelDensity: boolean;
}
/** Defines primitive value types. Must be consistent with types defined by server conceptual schema. */
export declare enum PrimitiveType {
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
/** Defines extended value types, which include primitive types and known data categories constrained to expected primitive types. */
export declare enum ExtendedType {
    Numeric = 256,
    Temporal = 512,
    Geography = 1024,
    Miscellaneous = 2048,
    Formatting = 4096,
    Scripting = 8192,
    Null = 0,
    Text = 1,
    Decimal = 258,
    Double = 259,
    Integer = 260,
    Boolean = 5,
    Date = 518,
    DateTime = 519,
    DateTimeZone = 520,
    Time = 521,
    Duration = 10,
    Binary = 11,
    None = 12,
    Variant = 13,
    Years = 66048,
    Years_Text = 66049,
    Years_Integer = 66308,
    Years_Date = 66054,
    Years_DateTime = 66055,
    Months = 131584,
    Months_Text = 131585,
    Months_Integer = 131844,
    Months_Date = 131590,
    Months_DateTime = 131591,
    PaddedDateTableDates = 197127,
    Quarters = 262656,
    Quarters_Text = 262657,
    Quarters_Integer = 262916,
    Quarters_Date = 262662,
    Quarters_DateTime = 262663,
    DayOfMonth = 328192,
    DayOfMonth_Text = 328193,
    DayOfMonth_Integer = 328452,
    DayOfMonth_Date = 328198,
    DayOfMonth_DateTime = 328199,
    Address = 6554625,
    City = 6620161,
    Continent = 6685697,
    Country = 6751233,
    County = 6816769,
    Region = 6882305,
    PostalCode = 6947840,
    PostalCode_Text = 6947841,
    PostalCode_Integer = 6948100,
    StateOrProvince = 7013377,
    Place = 7078913,
    Latitude = 7144448,
    Latitude_Decimal = 7144706,
    Latitude_Double = 7144707,
    Longitude = 7209984,
    Longitude_Decimal = 7210242,
    Longitude_Double = 7210243,
    Image = 13109259,
    ImageUrl = 13174785,
    WebUrl = 13240321,
    Barcode = 13305856,
    Barcode_Text = 13305857,
    Barcode_Integer = 13306116,
    Color = 19664897,
    FormatString = 19730433,
    Alignment = 20058113,
    LabelDisplayUnits = 20123649,
    FontSize = 20189443,
    LabelDensity = 20254979,
    Enumeration = 26214401,
    ScriptSource = 32776193,
    SearchEnabled = 65541,
}
