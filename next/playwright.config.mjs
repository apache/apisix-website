import { defineConfig } from '@playwright/test';

const port = Number(process.env.PORT ?? 4321);
const baseURL = (process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`).replace(/\/$/, '');
const webServerCommand = process.env.PLAYWRIGHT_WEB_SERVER_COMMAND
  ?? `npm run preview -- --host 127.0.0.1 --port ${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  reporter: 'line',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL,
    channel: process.env.PLAYWRIGHT_CHANNEL ?? 'chrome',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: webServerCommand,
    url: `${baseURL}/ai-gateway/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-chrome',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
