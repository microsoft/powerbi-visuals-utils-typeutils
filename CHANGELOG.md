## 7.0.0
 
### Breaking changes
* `arrayExtensions.findWithId<T>()` and `findItemWithName<T>()` now return `T | undefined` instead of `T`.
* `arrayExtensions.emptyToNull<T>()` now returns `T[] | null` instead of `T[]`.
* `arrayExtensions.clear()` and `isUndefinedOrEmpty()` now accept `unknown[] | null | undefined`.
* `regExpExtensions.run()` now returns `RegExpExecArray | null` instead of `RegExpExecArray`.
* `prototype.inherit<T>()` now constrains `T` to `extends object` and is implemented via `Object.create()`.
 
### Changed
* `powerbi-visuals-api` peer updated to ^5.11.0.
* Minimum supported Node.js for development raised to 20.x.
 
### Infrastructure
* Test runner replaced: Karma + Jasmine → Vitest with V8 coverage.
* Lint stack upgraded to ESLint 10 (flat config) with TypeScript ESLint 8.
* TypeScript 4.x → 6.
* Custom CodeQL workflow removed in favor of GitHub default Code scanning setup.

## 6.0.3
* powerbi-visuals-api update to 5.9.0

## 6.0.2
* Packages update

## 6.0.1
* Packages update
* Removed coveralls

## 6.0.0
* Migrated to playwright
* Packages update
* Vulnerabilities patched

## 2.4.0 - 3.0.0
* Migrated to ESlint
* Vulnerabilities patched

## 2.3.1
* Packages update
* Vulnerabilities patched

## 2.3.0
* Packages update, npm audit fixes 
* Github actions added
* Outdated packages removed
* Obsolete docs removed

## 2.2.1
* Packages update

## 2.2.0
* Update packages to fix vulnerabilities
* Update powerbi-visuals-api to 2.6.0

## 2.1.0
* Update packages to fix vulnerabilities

## 2.0.0
* Moved to webpack 4, es6 modules

## 1.1.0
* Removed `lodash`
* Updated dependencies
