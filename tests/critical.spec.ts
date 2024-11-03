import { test, expect } from '@playwright/test';

test('InCo home page loads', async ({ page }) => {
  await page.goto('https://incocollective.com/');

  await expect(page).toHaveTitle(/Interconnected Collective/);

  await page.getByRole('link', { name: 'ABOUT US' }).nth(1).click();

  await page.getByText("Contributors").isVisible()

});
