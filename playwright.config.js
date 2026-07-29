const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
  testDir: './test/browser',
  timeout: 60_000,
  expect: {timeout: 10_000},
  fullyParallel: false,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:8080',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve.js',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium-1440',
      use: {...devices['Desktop Chrome'], viewport: {width: 1440, height: 900}},
    },
    {
      name: 'chromium-768',
      use: {...devices['Desktop Chrome'], viewport: {width: 768, height: 900}},
    },
    {
      name: 'chromium-390',
      use: {...devices['Desktop Chrome'], viewport: {width: 390, height: 844}},
    },
    {
      name: 'firefox-1440',
      use: {...devices['Desktop Firefox'], viewport: {width: 1440, height: 900}},
    },
    {
      name: 'firefox-768',
      use: {...devices['Desktop Firefox'], viewport: {width: 768, height: 900}},
    },
    {
      name: 'firefox-390',
      use: {...devices['Desktop Firefox'], viewport: {width: 390, height: 844}},
    },
  ],
});
