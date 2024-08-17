import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "BottomSheet",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `plainsheet-react.${format}.js`,
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
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
