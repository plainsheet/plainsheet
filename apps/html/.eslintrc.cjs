/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@internal/eslint-config/library.js"],
  ignorePatterns: ["./vite.config.ts"],
};
