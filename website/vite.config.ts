import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5199,
    watch: {
      // File-system events are unreliable in some sandboxed/VM setups;
      // polling guarantees edits invalidate Vite's module cache.
      usePolling: true,
      interval: 300,
    },
  },
});
