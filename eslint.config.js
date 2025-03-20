import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    parser: tsParser,
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:prettier/recommended",
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: ["@typescript-eslint", "react-hooks", "react-refresh", "prettier"],
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
    },
  },
);
