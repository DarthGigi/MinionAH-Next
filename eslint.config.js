import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { fileURLToPath } from "node:url";
import { dirname } from "path";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default ts.config(
  includeIgnoreFile(gitignorePath),
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  ts.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false }
        }
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@next/next/no-img-element": "off",
      "@jsx-a11y/alt-text": "off"
    }
  }
);
