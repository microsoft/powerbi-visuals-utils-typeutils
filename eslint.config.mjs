import pbiPlugin from "eslint-plugin-powerbi-visuals";

export default [
    {
        ignores: [
            "node_modules/",
            "dist/",
            "coverage/",
            "test/",
            ".tmp/",
            "vite.config.ts",
            "lib/",
        ],
    },
    pbiPlugin.configs.recommended,
];
