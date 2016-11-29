# Prototype
> The ```Prototype``` provides abilities to inherit objects.

The ```powerbi.extensibility.utils.type.Prototype``` provides the following functions:

* [inherit](#inherit)
* [inheritSingle](#inheritsingle)

## inherit

This function returns a new object with the provided object as its prototype.

```typescript
function inherit<T>(obj: T, extension?: (inherited: T) => void): T;
```

### Example

```typescript
import Prototype = powerbi.extensibility.utils.type.Prototype;

let base = { Microsoft: "Power BI" };

Prototype.inherit(base);

/* returns: {
    __proto__: {
        Microsoft: "Power BI"
    }
}*/
```

## inheritSingle

This function returns a new object with the provided object as its prototype if, and only if, the prototype hasn't been set.

```typescript
function inheritSingle<T>(obj: T): T;
```

### Example

```typescript
import Prototype = powerbi.extensibility.utils.type.Prototype;

let base = { Microsoft: "Power BI" };

Prototype.inheritSingle(base);

/* returns: {
    __proto__: {
        Microsoft: "Power BI"
    }
}*/
```
