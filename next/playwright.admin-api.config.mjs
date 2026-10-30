import { defineConfig } from '@playwright/test';
import config from './playwright.config.mjs';

// Serve the assembled production site first: Astro alone has no archives.
export default defineConfig({
  ...config,
  testDir: './tests/admin-api',
  // The successful-path cases intentionally exercise Scalar's pinned CDN
  // bundle. Serialize the desktop and mobile projects so this focused suite
  // does not turn an external dependency into a self-inflicted rate-limit.
  workers: 1,
  webServer: undefined,
  use: {
    ...config.use,
    baseURL: process.env.ADMIN_API_BASE_URL ?? 'http://127.0.0.1:4322',
  },
});
