const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", ".env"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  {
    files: ["**/*.ts"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "error",
    },
  },
];
