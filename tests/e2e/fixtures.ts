import { test as base, expect } from '@playwright/test'

import { definitions } from './definitions'

/**
 * Extends the base Playwright `test` so every test automatically intercepts
 * the app's runtime definition fetches
 * (`.../Frontier/definitions/<module>.json`) and serves local fixtures.
 *
 * This keeps the suite hermetic: no external CDN access and no env/CDN
 * configuration are required, regardless of what `GITHUB_USERNAME` /
 * `CDN_BASE_URL` the dev server was started with.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(
      '**/definitions/*.json',
      async route => {
        const url = route.request().url()
        const match = url.match(
          /\/([a-z]+)\.json(?:[?#]|$)/,
        )
        const moduleName = match?.[1]
        const body = moduleName && definitions[moduleName]

        if (body) {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(body),
          })
        } else {
          await route.fulfill({
            status: 404,
            body: 'fixture not found',
          })
        }
      },
    )
    await use(page)
  },
})

export { expect }
