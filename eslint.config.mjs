import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/", "storybook-static/", "docs/", "test/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.config.{js,mjs,cjs}", "babel.config.js", "jest.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // Storybook's `render` functions are components from Storybook's point of
    // view and legitimately call Hooks; eslint-plugin-react-hooks cannot detect
    // them as components (the render prop is invoked with lowercase names).
    // Turn the (classic) Hooks rules off for Storybook and test scaffolding.
    files: ["**/*.stories.{ts,tsx}", "**/*.test.{ts,tsx}", "**/*.mdx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react/jsx-key": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^React$",
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/setupTests.ts"],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      // We deliberately do NOT enable the React Compiler candidate rules
      // (immutability, purity, set-state-in-effect, ...). This project does not
      // run the compiler, and those rules are noisy for a component library.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["**/*.stories.{ts,tsx}", "**/*.stories.mdx"],
    rules: {
      // Storybook render functions are components from Storybook's perspective;
      // ESLint cannot statically prove that, so it would report every story that
      // legitimately calls hooks in its render callback.
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  eslintConfigPrettier,
);