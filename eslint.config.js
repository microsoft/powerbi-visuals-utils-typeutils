const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const powerbiVisualsPlugin = require("eslint-plugin-powerbi-visuals");

module.exports = [
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "coverage/**",
            "test/**",
            "lib/**",
            "eslint.config.js"
        ]
    },
    js.configs.recommended,
    ...tsPlugin.configs["flat/recommended"],
    powerbiVisualsPlugin.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname
            }
        },
        rules: {
            // Keep parity with previous repo lint behavior under plugin:powerbi-visuals/recommended.
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-var-requires": "off",
            // New in modern ESLint recommended; disabled to avoid unrelated code churn in this migration.
            "no-useless-assignment": "off"
        }
    }
];