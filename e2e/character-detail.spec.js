import { test, expect } from '@playwright/test';

test.describe('Character Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/character/1009148');
    await page.waitForSelector('h1', { state: 'visible' });
  });

  test('should display character details', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await expect(page.getByRole('img', { name: /Absorbing Man/ })).toBeVisible();

    const description = page.locator('p');
    await expect(description).toBeVisible();
  });

  test('should display a comics slider', async ({ page }) => {
    await page.waitForSelector('[aria-label^="Comic:"]', { state: 'visible' });

    const comics = await page.locator('[aria-label^="Comic:"]');
    const comicsCount = await comics.count();
    expect(comicsCount).toBeGreaterThan(0);
  });

  test('should allow adding and removing the character from favorites', async ({ page }) => {
    const favoriteButton = page.getByRole('button', { name: /favorite/i });

    await favoriteButton.click();
    await expect(page.getByRole('button', { name: 'Remove favorite' })).toBeVisible();

    await favoriteButton.click();
    await expect(page.getByRole('button', { name: 'Add favorite' })).toBeVisible();
  });
});
