import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index",
        },
        outDir: "lib",
        sourcemap: true,
        rollupOptions: {
            external: ["powerbi-visuals-api"],
        },
    },
    test: {
        globals: true,
        include: ["test/**/*.ts"],
        coverage: {
            provider: "v8",
            reportsDirectory: "coverage",
            reporter: ["html", "lcov", "text-summary"],
            include: ["src/**/*.ts"],
        },
    },
});
