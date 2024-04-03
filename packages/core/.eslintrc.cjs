/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@internal/eslint-config/library.js"],
  excludes: ["./vite.config.ts"],
};
