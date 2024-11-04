import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHtmlReport } from 'axe-html-reporter'

test.describe('Test pages with axe', () => {

  const test_env: string = "local";
  let home_url: string;

  switch (test_env) {
    case "prod":
      home_url = "https://incocollective.com/"
      break;
    default:
      home_url = "http://localhost:3000/"
      break;
  }
  const scanPages = [ home_url ]

  for (const scanPage of scanPages) {
    test(`Scan page: ${scanPage}`, async ({ page }) => {
      await page.goto(scanPage, { waitUntil: "networkidle" })

      const pageTitle = (await page.title()).replace(/\W/g, '')

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      createHtmlReport({
        results: accessibilityScanResults,
        options: {
          outputDir: 'test-results',
          reportFileName: pageTitle + ' - axe report.html'
        }
      })

      expect(accessibilityScanResults.violations.length).toEqual(0)
   })
  }
})
