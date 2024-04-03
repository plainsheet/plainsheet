import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PlainBottomSheetCore",
      formats: ["es", "cjs"],
      fileName: (format) => `plain-bottom-sheet-core.${format}.js`,
    },
    cssCodeSplit: true,
    cssMinify: true,
  },
  plugins: [dts()],
});
