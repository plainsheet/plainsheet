import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "pbs-utility",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `pbs-utility.${format}.js`,
    },
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
  ],
});
