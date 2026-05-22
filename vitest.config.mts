import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["test/**/*.ts"],
        // Enables describe/it/expect as globals.
        // Their TypeScript types are made available to the IDE via test/tsconfig.json
        // (`"types": ["vitest/globals"]`). Set to false and use explicit imports
        // (`import { describe, it, expect } from "vitest"`) if you prefer.
        globals: true,
        // typeutils is environment-agnostic, so tests run in plain Node for speed.
        // For utilities that touch DOM APIs (document, window, SVG), switch to:
        //   - "happy-dom" (add `happy-dom` devDependency) — lightweight, recommended
        //   - "jsdom"     (add `jsdom` devDependency)     — heavier, more spec-compliant
        // For tests that must run in a real browser, see @vitest/browser.
        environment: "node",
        coverage: {
            provider: "v8",
            include: ["src/**/*.ts"],
            reporter: ["text", "html", "lcov"]
        }
    }
});
