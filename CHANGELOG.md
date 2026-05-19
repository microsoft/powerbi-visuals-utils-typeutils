## 7.0.0
* **Migrated test runner from Karma + Jasmine to Vitest** with V8 coverage provider; removed 15+ Karma/Webpack-related dependencies (karma, karma-*, webpack, ts-loader, playwright-chromium, jasmine, ts-node, etc.).
* **Breaking change:** updated public API return types to reflect actual nullability. Functions that could return `undefined` or `null` now declare it explicitly (e.g. `findWithId<T>(): T | undefined`, `emptyToNull<T>(): T[] | null`, `regExpExtensions.run(): RegExpExecArray | null`, `inherit<T extends object>()`).
* **Breaking change:** `Object.create()` is now used in `prototype.inherit()` instead of a custom constructor wrapper. The `T` parameter now must extend `object`.
* Upgraded linting to ESLint 10 with flat config (`eslint.config.mjs`, ESM) and updated TypeScript ESLint tooling to v8.
* Modernized TypeScript configuration: TypeScript 6, `module`/`target` raised to `ES2020`, `moduleResolution` changed from deprecated `"node"` to `"bundler"`, enabled `strict` mode (with `strictNullChecks`/`strictPropertyInitialization` off as pragmatic step). Removed unused `experimentalDecorators` and `emitDecoratorMetadata`.
* Updated GitHub Actions workflows to current versions (`checkout@v4`, `setup-node@v4`) with npm cache; CI matrix raised to Node.js 20.x/22.x.
* Custom `codeql-analysis.yml` workflow removed in favor of GitHub default Code scanning setup (configured at the repository level).
* Added Dependabot configuration for npm and GitHub Actions dependency update automation.
* Updated runtime peer: `powerbi-visuals-api` ^5.11.0.


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
