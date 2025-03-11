import { test, expect } from '@playwright/test';

async function searchCharacter(page, name) {
  const searchInput = page.getByRole('searchbox');
  await searchInput.fill(name);
  await page.waitForTimeout(500);
  const character = await page.locator(`text=${name}`).first();
  await expect(character).toBeVisible();
  return character;
}

test.describe('Character List Page', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.title !== 'should display the search bar and initial characters') {
      await page.goto('/');
      await page.waitForSelector('img', { state: 'visible' });
      await searchCharacter(page, 'Spider-Man');
    }
  });

  test('should display the search bar and initial characters', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('img', { state: 'visible' });

    await expect(page.getByRole('searchbox')).toBeVisible();
    await expect(page.getByText(/results/i)).toBeVisible();
    await expect(page.locator('img')).toHaveCount(50);
  });

  test('should filter characters when searching', async ({ page }) => {
    await searchCharacter(page, 'Spider-Man');
  });

  test('should navigate to character details when clicking a character', async ({ page }) => {
    await searchCharacter(page, 'Spider-Man');

    const characterImage = await page.locator('img').nth(0);
    await characterImage.click();

    await page.waitForSelector('h1', { state: 'visible' });

    await expect(page).toHaveURL(/character\/\d+/);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Spider-Man/i);
  });

  test('should toggle favorite characters', async ({ page }) => {
    const favoriteButton = page.getByRole('button', { name: 'Add favorite' }).first();

    await favoriteButton.click();
    const removeFavoriteButton = page.getByRole('button', { name: 'Remove favorite' }).first();
    await expect(removeFavoriteButton).toBeVisible();

    await removeFavoriteButton.click();
    await expect(favoriteButton).toBeVisible();
  });
});
