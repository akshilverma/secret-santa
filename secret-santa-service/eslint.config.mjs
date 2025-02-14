import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            "node_modules/",
            "dist/",
            "collections/",
            "eslint.config.mjs",
        ],
    },
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            globals: globals.node,
            parser: "@typescript-eslint/parser",
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    eslintConfigPrettier,
    {
        rules: {
            indent: ["warn", 4],
            semi: ["warn", "always"],
            eqeqeq: "warn",
            "no-unused-vars": "error",
            "no-trailing-spaces": "warn",
            "eol-last": ["error", "always"],
            "no-multiple-empty-lines": [
                "error",
                {
                    max: 2,
                    maxEOF: 1,
                },
            ],
            complexity: ["error", 5],
        },
    },
];
