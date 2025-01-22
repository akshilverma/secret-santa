import secretSantaServiceEslintConfig from "./secret-santa-service/eslint.config.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ["node_modules/", "dist/", "collections/", "**/eslint.config.mjs"],
	},
	...secretSantaServiceEslintConfig,
];
