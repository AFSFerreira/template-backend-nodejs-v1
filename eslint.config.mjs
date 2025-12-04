import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import importPlugin from "eslint-plugin-import"
import promise from "eslint-plugin-promise"
import n from "eslint-plugin-n"
import unicorn from "eslint-plugin-unicorn"
import prettier from "eslint-config-prettier"
import globals from "globals"

export default [
  {
    files: ["src/**/*.{js,mjs,cjs,ts}", "prisma/**/*.{js,mjs,cjs,ts}"],
    ignores: ["uploads", "node_modules", "dist"],
    languageOptions: {
      globals: {
        // ...js.configs.recommended.languageOptions.globals,
        ...globals.node
      },
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        sourceType: "module"
      }
    },

    plugins: {
      ...js.configs.recommended.plugins,
      "@typescript-eslint": tseslint,
      import: importPlugin,
      promise,
      n,
      unicorn
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettier.rules,

      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-dupe-class-members": "off",

      "no-console": "error",
      semi: ["error", "never"],

      "@typescript-eslint/no-unused-vars": [
      "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          "prefer": "type-imports",
          "fixStyle": "separate-type-imports"
        }
      ],

      "@typescript-eslint/consistent-type-exports": "error",

      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase"
        }
      ],

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ]
    }
  },
]
