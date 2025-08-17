import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,ts,mjs,cjs}"], 
    ignores: ["__tests__/**", "node_modules"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-undef": "error"
    } 
  },
]);
