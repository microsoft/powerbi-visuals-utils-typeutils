export var ArrayExtensions;
(function (ArrayExtensions) {
    /**
     * Returns items that exist in target and other.
     */
    function intersect(target, other) {
        let result = [];
        for (let i = target.length - 1; i >= 0; --i) {
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
        let result = [];
        for (let i = target.length - 1; i >= 0; --i) {
            let value = target[i];
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
        let result = [];
        for (let i = 0, len = source.length; i < len; i++) {
            let value = source[i];
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
        for (let i = 0, len = source.length; i < len; ++i) {
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
        let result = [];
        for (let i = startIndex; i <= endIndex; ++i) {
            result.push(source[i]);
        }
        return result;
    }
    ArrayExtensions.range = range;
    /**
     * Returns an array that includes items from source, up to the specified count.
     */
    function take(source, count) {
        let result = [];
        for (let i = 0; i < count; ++i) {
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
        let len = left.length;
        if (len !== right.length) {
            return false;
        }
        let i = 0;
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
        for (let i = 0, len = array.length; i < len; ++i) {
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
        let rotated = array.slice(offset);
        Array.prototype.push.apply(rotated, array.slice(0, offset));
        return rotated;
    }
    ArrayExtensions.rotate = rotate;
    function createWithId() {
        return extendWithId([]);
    }
    ArrayExtensions.createWithId = createWithId;
    function extendWithId(array) {
        let extended = array;
        extended.withId = withId;
        return extended;
    }
    ArrayExtensions.extendWithId = extendWithId;
    /**
     * Finds and returns the first item with a matching ID.
     */
    function findWithId(array, id) {
        for (let i = 0, len = array.length; i < len; i++) {
            let item = array[i];
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
        let extended = array;
        extended.withName = withName;
        return extended;
    }
    ArrayExtensions.extendWithName = extendWithName;
    function findItemWithName(array, name) {
        let index = indexWithName(array, name);
        if (index >= 0)
            return array[index];
    }
    ArrayExtensions.findItemWithName = findItemWithName;
    function indexWithName(array, name) {
        for (let i = 0, len = array.length; i < len; i++) {
            let item = array[i];
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
        let len = list.length;
        // NOTE: iterate backwards because incoming values tend to be sorted already.
        for (let i = len - 1; i >= 0; i--) {
            let diff = list[i] - value;
            if (diff === 0)
                return false;
            if (diff > 0)
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
        let index = list.indexOf(value);
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
        let array = this;
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
        let temp = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = temp;
    }
    ArrayExtensions.swap = swap;
    function isInArray(array, lookupItem, compareCallback) {
        return array.some(item => compareCallback(item, lookupItem));
    }
    ArrayExtensions.isInArray = isInArray;
    /** Checks if the given object is an Array, and looking all the way up the prototype chain. */
    function isArrayOrInheritedArray(obj) {
        let nextPrototype = obj;
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
        let ilen = values.length;
        if (ilen >= 2) {
            for (let i = 1; i < ilen; i++) {
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
        let compareFunction = descendingOrder ?
            (a, b) => b - a :
            (a, b) => a - b;
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
})(ArrayExtensions || (ArrayExtensions = {}));
//# sourceMappingURL=arrayExtensions.js.map