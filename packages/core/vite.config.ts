/* 
  eslint-disable import/no-default-export 
  -- Default functions should be empty.
*/
import path from "node:path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
/**
  TODO: Replace it with a built-in feature when it is merged
  @see https://github.com/vitejs/vite/pull/13565
 */
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PlainBottomSheetCore",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `plain-bottom-sheet-core.${format}.js`,
    },
    cssMinify: true,
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      __tests__: path.resolve(__dirname, "./__tests__"),
    },
  },
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
    }),
    cssInjectedByJsPlugin(),
  ],
  test: {
    environment: "jsdom",
    coverage: { reporter: ["text", "cobertura"] },
  },
});
