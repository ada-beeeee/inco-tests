import { test, expect } from '@playwright/test';


let test_env: string;

if (process.env.TEST_ENV) {
  test_env = process.env.TEST_ENV
} else {
  test_env = "local"
}

let home_url: string;

switch (test_env) {
  case "prod":
    home_url = "https://incocollective.com/"
    break;
  default:
    home_url = "http://localhost:3000/"
    break;
}

test('InCo home page loads', async ({ page }) => {
  await page.goto(home_url);

  await expect(page).toHaveTitle(/Interconnected Collective/);

  await page.getByRole('link', { name: 'ABOUT US' }).nth(1).click();

  await page.getByText("Contributors").isVisible()

});
