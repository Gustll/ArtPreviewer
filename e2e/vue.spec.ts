import { test, expect } from '@playwright/test';

test.describe('Assets Page', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to assets page
        await page.goto('/assets');
    });

    test('should toggle sidebar visibility', async ({ page }) => {
        // Sidebar should not be visible initially
        const sidebar = page.locator('#asset-filter');
        await expect(sidebar).toBeVisible();

        // Click filter switch button
        await page.locator('.filter-switch').click();

        // Sidebar should now be visible
        await expect(sidebar).not.toBeVisible();

        // Click again to hide
        await page.locator('.filter-switch').click();

        // Sidebar should be hidden again
        await expect(sidebar).toBeVisible();
    });
})