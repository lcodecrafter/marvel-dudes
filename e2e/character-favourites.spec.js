import { test, expect } from '@playwright/test';

async function addCharactersToFavorites(page, count = 2) {
  for (let i = 0; i < count; i++) {
    const character = await page.locator('[role="list"] > div').nth(i);
    const favoriteButton = character.locator('button[aria-label="Add favorite"]');

    await favoriteButton.waitFor({ state: 'visible' });
    await favoriteButton.click();
  }
}

test.describe('Favorites Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to the favorites page from the header', async ({ page }) => {
    await page.getByRole('link', { name: 'Favorites' }).click();

    await expect(page).toHaveURL('/favorites');

    await expect(page.getByRole('searchbox')).toBeVisible();
  });

  test('should display favorite characters', async ({ page }) => {
    await addCharactersToFavorites(page, 2);

    await page.getByRole('link', { name: 'Favorites' }).click();

    await expect(page.locator('[role="list"] > div')).toHaveCount(2);
  });

  test('should remove favorite characters', async ({ page }) => {
    await addCharactersToFavorites(page, 2);

    await page.getByRole('link', { name: 'Favorites' }).click();

    const firstFavorite = await page.locator('[role="list"] > div').nth(0);
    const removeButton = firstFavorite.locator('button[aria-label="Remove favorite"]');

    await removeButton.waitFor({ state: 'visible' });
    await removeButton.click();

    await expect(page.locator('[role="list"] > div')).toHaveCount(1);
  });
});
