import { defineConfig } from "vitest/config";

export default defineConfig({
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
