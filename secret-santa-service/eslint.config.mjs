import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["src/**/*.{js,mjs,cjs,ts}", "test/**/*.{js,mjs,cjs,ts}"],
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
			semi: ["warn", "always"],
			eqeqeq: "warn",
			"no-unused-vars": "error",
			"no-trailing-spaces": "warn",
			"eol-last": [
				"error",
				"always"
			],
			"no-multiple-empty-lines": [
				"error",
				{
					"max": 2,
					"maxEOF": 1
				}
			],
			"complexity": [
				"error",
				5
			]
		},
	}
];
