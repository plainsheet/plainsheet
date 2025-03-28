/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@internal/eslint-config/library.js"],
  files: ["**/*.{ts,tsx}"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["./__tests__/**/*.test.ts", "./vite.config.ts"] },
    ],
  },
};
