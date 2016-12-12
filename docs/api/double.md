# Double
> The ```Double``` provides abilities to manipulate precision of the numbers.

The ```powerbi.extensibility.utils.type.Double``` provides the following functions:

* [pow10](#pow10)
* [log10](#log10)
* [getPrecision](#getprecision)
* [equalWithPrecision](#equalwithprecision)
* [lessWithPrecision](#lesswithprecision)
* [lessOrEqualWithPrecision](#lessorequalwithprecision)
* [greaterWithPrecision](#greaterwithprecision)
* [greaterOrEqualWithPrecision](#greaterorequalwithprecision)
* [floorWithPrecision](#floorwithprecision)
* [ceilWithPrecision](#ceilwithprecision)
* [floorToPrecision](#floortoprecision)
* [ceilToPrecision](#ceiltoprecision)
* [roundToPrecision](#roundtoprecision)
* [ensureInRange](#ensureinrange)
* [round](#round)
* [removeDecimalNoise](#removedecimalnoise)
* [isInteger](#isinteger)
* [toIncrement](#toincrement)

## pow10

This function returns power of 10.

```typescript
function pow10(exp: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.pow10(25);

// returns: 1e+25
```

## log10

This function returns a 10 base logarithm of the number.

```typescript
function log10(val: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.log10(25);

// returns: 1
```

## getPrecision

This function returns a power of 10 representing precision of the number.

```typescript
function getPrecision(x: number, decimalDigits?: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.getPrecision(562344, 6);

// returns: 0.1
```

## equalWithPrecision

This function checks if a delta between 2 numbers is less than provided precision.

```typescript
function equalWithPrecision(x: number, y: number, precision?: number): boolean;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.equalWithPrecision(1, 1.005, 0.01);

// returns: true
```

## lessWithPrecision

This function checks if the first value is less than the second value.

```typescript
function lessWithPrecision(x: number, y: number, precision?: number): boolean;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.lessWithPrecision(0.995, 1, 0.001);

// returns: true
```

## lessOrEqualWithPrecision

This function checks if the first value is less or equal than the second value.

```typescript
function lessOrEqualWithPrecision(x: number, y: number, precision?: number): boolean;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.lessOrEqualWithPrecision(1.005, 1, 0.01);

// returns: true
```

## greaterWithPrecision

This function checks if the first value it greater than the second value.

```typescript
function greaterWithPrecision(x: number, y: number, precision?: number): boolean;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.greaterWithPrecision(1, 0.995, 0.01);

// returns: false
```

## greaterOrEqualWithPrecision

This function checks if the first value is greater or equal to the second value.

```typescript
function greaterOrEqualWithPrecision(x: number, y: number, precision?: number): boolean;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.greaterOrEqualWithPrecision(1, 1.005, 0.01);

// returns: true
```

## floorWithPrecision

This function floors the number with the provided precision.

```typescript
function floorWithPrecision(x: number, precision?: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.floorWithPrecision(5.96, 0.001);

// returns: 5
```

## ceilWithPrecision

This function ceils the number with the provided precision.

```typescript
function ceilWithPrecision(x: number, precision?: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.ceilWithPrecision(5.06, 0.001);

// returns: 6
```

## floorToPrecision

This function floors the number to the provided precision.

```typescript
function floorToPrecision(x: number, precision?: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.floorToPrecision(5.96, 0.1);

// returns: 5.9
```

## ceilToPrecision

This function ceils the number to the provided precision.

```typescript
function ceilToPrecision(x: number, precision?: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.ceilToPrecision(-506, 10);

// returns: -500
```

## roundToPrecision

This function rounds the number to the provided precision.

```typescript
function roundToPrecision(x: number, precision?: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.roundToPrecision(596, 10);

// returns: 600
```

## ensureInRange

This function returns a number that is between min and max.

```typescript
function ensureInRange(x: number, min: number, max: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.ensureInRange(-27.2, -10, -5);

// returns: -10
```

## round

This function rounds the number.

```typescript
function round(x: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.round(27.45);

// returns: 27
```

## removeDecimalNoise

This function removes the decimal noise.

```typescript
function removeDecimalNoise(value: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.removeDecimalNoise(21.493000000000002);

// returns: 21.493
```

## isInteger

This function checks if the number is integer.

```typescript
function isInteger(value: number): boolean;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.isInteger(21.493000000000002);

// returns: false
```

## toIncrement

This function increments the number by the provided number and returns the rounded number.

```typescript
function toIncrement(value: number, increment: number): number;
```

### Example

```typescript
import Double = powerbi.extensibility.utils.type.Double;

Double.toIncrement(0.6383723, 0.05);

// returns: 0.65
```
