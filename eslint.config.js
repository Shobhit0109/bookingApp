import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "error",
      "prefer-const": ["error", { "ignoreReadBeforeAssign": true }],
      "use-isnan": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unsafe-negation": "error",
      "no-unused-private-class-members": "error",
      "require-atomic-updates": "error",
      "no-console": "warn", // Disallow the use of console
      // "no-debugger": "warn", // Disallow the use of debugger
      "no-undef": "error", // Disallow the use of undeclared variables unless mentioned in /*global */ comments
      "no-var": "error", // Require let or const instead of var
      "no-unreachable": "error", // Disallow unreachable code after return, throw, continue, and break statements
      "valid-typeof": "error", // Ensure that the results of typeof are compared against a valid string
    }
  }
];