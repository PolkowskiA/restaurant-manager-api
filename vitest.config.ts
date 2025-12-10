import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // must have for resolvers and mongoose mocks
    include: ["**/*.test.ts"],
    exclude: ["dist", "node_modules"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
