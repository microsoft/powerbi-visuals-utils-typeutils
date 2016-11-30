# PixelConverter
> The ```PixelConverter``` provides an ability to convert pixels to points, and vice versa.

The ```powerbi.extensibility.utils.type.PixelConverter``` provides the following functions:

* [toString](#tostring)
* [fromPoint](#frompoint)
* [fromPointToPixel](#frompointtopixel)
* [toPoint](#topoint)

## toString

This function converts the pixel value to a string.

```typescript
function toString(px: number): string;
```

### Example

```typescript
import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

PixelConverter.toString(25);

// returns: 25px
```

## fromPoint

This function converts the provided point value to the pixel value and returns the string interpretation.

```typescript
function fromPoint(pt: number): string;
```

### Example

```typescript
import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

PixelConverter.fromPoint(8);

// returns: 33.33333333333333px
```

## fromPointToPixel

This function converts the provided point value to the pixel value.

```typescript
function fromPointToPixel(pt: number): number;
```

### Example

```typescript
import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

PixelConverter.fromPointToPixel(8);

// returns: 10.666666666666666
```

## toPoint

This function converts the pixel value to the point value.

```typescript
function toPoint(px: number): number;
```

### Example

```typescript
import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

PixelConverter.toPoint(8);

// returns: 6
```
