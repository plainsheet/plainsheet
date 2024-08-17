// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///Users/peter/repos/plainsheet/node_modules/.pnpm/vitest@1.6.0_@types+node@20.12.3_@vitest+ui@1.6.0_jsdom@24.0.0/node_modules/vitest/dist/config.js";
import dts from "file:///Users/peter/repos/plainsheet/node_modules/.pnpm/vite-plugin-dts@3.8.1_@types+node@20.12.3_typescript@5.3.3_vite@5.2.8/node_modules/vite-plugin-dts/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///Users/peter/repos/plainsheet/node_modules/.pnpm/vite-plugin-css-injected-by-js@3.5.0_vite@5.2.8/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname = "/Users/peter/repos/plainsheet/packages/core";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "BottomSheet",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `plainsheet-core.${format}.js`
    },
    cssMinify: true,
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      src: path.resolve(__vite_injected_original_dirname, "./src"),
      __tests__: path.resolve(__vite_injected_original_dirname, "./__tests__")
    }
  },
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json"
    }),
    cssInjectedByJsPlugin()
  ],
  test: {
    environment: "jsdom",
    coverage: { reporter: ["text", "cobertura"] }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGV0ZXIvcmVwb3MvcGxhaW5zaGVldC9wYWNrYWdlcy9jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGV0ZXIvcmVwb3MvcGxhaW5zaGVldC9wYWNrYWdlcy9jb3JlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wZXRlci9yZXBvcy9wbGFpbnNoZWV0L3BhY2thZ2VzL2NvcmUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXN0L2NvbmZpZ1wiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG4vKipcbiAgVE9ETzogUmVwbGFjZSBpdCB3aXRoIGEgYnVpbHQtaW4gZmVhdHVyZSB3aGVuIGl0IGlzIG1lcmdlZFxuICBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9wdWxsLzEzNTY1XG4gKi9cbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJCb3R0b21TaGVldFwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIiwgXCJ1bWRcIl0sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHBsYWluc2hlZXQtY29yZS4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzcmM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICBfX3Rlc3RzX186IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9fX3Rlc3RzX19cIiksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGR0cyh7XG4gICAgICB0c2NvbmZpZ1BhdGg6IFwiLi90c2NvbmZpZy5qc29uXCIsXG4gICAgfSksXG4gICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXG4gIF0sXG4gIHRlc3Q6IHtcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIGNvdmVyYWdlOiB7IHJlcG9ydGVyOiBbXCJ0ZXh0XCIsIFwiY29iZXJ0dXJhXCJdIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsT0FBTyxVQUFVO0FBQ3BVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUtoQixPQUFPLDJCQUEyQjtBQVBsQyxJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sT0FBTyxLQUFLO0FBQUEsTUFDNUIsVUFBVSxDQUFDLFdBQVcsbUJBQW1CLE1BQU07QUFBQSxJQUNqRDtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDcEMsV0FBVyxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLElBQ2xEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsV0FBVyxFQUFFO0FBQUEsRUFDOUM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
