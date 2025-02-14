import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, eslintConfigPrettier, ...tseslint.configs.strictTypeChecked],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            "react-compiler": reactCompiler,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "react-compiler/react-compiler": "error",
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
);
