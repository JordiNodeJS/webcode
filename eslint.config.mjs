import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			// Reglas personalizadas del proyecto
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"react/no-unescaped-entities": "warn",
			"react-hooks/exhaustive-deps": "warn",
		},
	},
	// Override default ignores of eslint-config-next
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
		// Additional project ignores:
		"node_modules/**",
		"pnpm-lock.yaml",
		"public/**",
		"scripts/**", // Ignore CommonJS scripts
	]),
]);

export default eslintConfig;
