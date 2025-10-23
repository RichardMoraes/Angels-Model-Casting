import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Disable Tailwind CSS class warnings for gradient classes
      "tailwindcss/no-custom-classname": "off",
      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Import rules
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/default": "off",
      "import/namespace": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        React: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Disable Tailwind CSS class warnings for gradient classes
      "tailwindcss/no-custom-classname": "off",
      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      // Import rules
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/default": "off",
      "import/namespace": "off",
    },
  },
  {
    files: ["**/*.config.{js,ts}", "**/next.config.{js,ts}", "**/postcss.config.{js,ts}", "**/tailwind.config.{js,ts}"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
