import { defineConfig } from "astro/config";
export default defineConfig({
  output: "static",
  devToolbar: { enabled: false },
  site: process.env.PUBLIC_SITE_URL || undefined,
  base: process.env.PUBLIC_BASE_PATH || "/",
  trailingSlash: "always",
  server: { host: "127.0.0.1", port: 4321 },
  vite: { server: { strictPort: true } },
});
