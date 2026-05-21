# Microsoft Power BI visuals TypeUtils
[![Build](https://github.com/microsoft/powerbi-visuals-utils-typeutils/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/microsoft/powerbi-visuals-utils-typeutils/actions/workflows/build.yml) [![npm version](https://img.shields.io/npm/v/powerbi-visuals-utils-typeutils.svg)](https://www.npmjs.com/package/powerbi-visuals-utils-typeutils) [![npm](https://img.shields.io/npm/dm/powerbi-visuals-utils-typeutils.svg)](https://www.npmjs.com/package/powerbi-visuals-utils-typeutils)

> TypeUtils is a set of functions and classes in order to extend the basic types for Power BI custom visuals

## Usage
Learn how to install and use the TypeUtils in your custom visuals:
* [Usage Guide](https://docs.microsoft.com/en-us/power-bi/developer/visuals/utils-type)

## Development

Common scripts:

| Command | Description |
| --- | --- |
| `npm ci` | Install pinned dependencies from `package-lock.json` |
| `npm run build` | Compile `src/` into `lib/` with TypeScript declarations and source maps |
| `npm test` | Run the full Vitest suite once (used by CI) |
| `npm run test:watch` | Run Vitest in watch mode — re-runs affected tests on file change |
| `npm run test:coverage` | Run Vitest once and produce a coverage report under `coverage/` |
| `npm run test:typecheck` | Type-check the `test/` tree with TypeScript using `test/tsconfig.json` (run on CI) |
| `npm run lint` | Lint the codebase with ESLint (flat config in `eslint.config.mjs`) |
| `npm run lint:fix` | Auto-fix lint issues where possible |

### TypeScript configs

* [`tsconfig.json`](./tsconfig.json) — production build of `src/` → `lib/` only
* [`test/tsconfig.json`](./test/tsconfig.json) — extends the main config, adds `vitest/globals` types and includes the `test/` tree so the IDE recognizes `describe` / `it` / `expect` in tests

### Tests

Tests live under `test/` and are executed by Vitest in a Node environment (no browser). The configuration is in [`vitest.config.mts`](./vitest.config.mts).

## Contributing
* Read our [contribution guideline](./CONTRIBUTING.md) to find out how to contribute bugs fixes and improvements
* [Issue Tracker](https://github.com/Microsoft/powerbi-visuals-utils-typeutils/issues)

## License
See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).
