import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
/**
  TODO: Replace it with a built-in feature when it is merged
  @see https://github.com/vitejs/vite/pull/13565
 */
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

/* 
  eslint-disable-next-line import/no-default-export 
  -- Vite config does not accept named exports.
*/
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
  plugins: [dts(), cssInjectedByJsPlugin()],
});
