// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,

    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    // Start dev server before tests
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },

    // Run only in Chromium for simplicity
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});