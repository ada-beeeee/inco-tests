import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHtmlReport } from 'axe-html-reporter'

test.describe('Test pages with axe', () => {

  const scanPages = [ "https://incocollective.com/" ]

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
