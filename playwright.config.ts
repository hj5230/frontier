import { defineConfig, devices } from '@playwright/test'

/**
 * E2E test configuration for Frontier.
 *
 * The app fetches its content (definitions) at runtime from a CDN. The tests
 * intercept those requests and serve local fixtures (see
 * `tests/e2e/fixtures.ts`), so the suite is hermetic — no external network
 * access or CDN/env configuration is required.
 *
 * Chromium is taken from the system install via `executablePath`
 * (override with the CHROMIUM_PATH env var) so no browser download is needed.
 */
const PORT = 10331
const BASE_URL = `http://localhost:${PORT}`
const CHROMIUM_PATH =
  process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'line' : [['list']],
  use: {
    baseURL: BASE_URL,
    permissions: ['clipboard-read', 'clipboard-write'],
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { executablePath: CHROMIUM_PATH },
      },
    },
  ],
  webServer: {
    command: 'bun run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
