import { test, expect } from '@playwright/test';

test.describe('Character List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the search bar and initial characters', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('img', { state: 'visible' });

    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByText(/results/i)).toBeVisible();
    await expect(page.locator('img')).toHaveCount(50);
  });

  test.skip('should filter characters when searching', async () => {});

  test.skip('should navigate to character details when clicking a character', async () => {});

  test.skip('should toggle favorite characters', async () => {});
});
