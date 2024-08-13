import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ReactPlainBottomSheet",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `react-plain-bottom-sheet.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssMinify: true,
    cssCodeSplit: true,
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
