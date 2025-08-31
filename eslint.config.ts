import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import solid from "eslint-plugin-solid/configs/typescript";
import * as tsParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...solid,
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "solid/jsx-no-duplicate-props": "off",
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  tseslint.configs.recommended,
]);
