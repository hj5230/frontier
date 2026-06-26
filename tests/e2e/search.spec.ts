import { test, expect } from './fixtures'

test.describe('Search shortcut', () => {
  test('Ctrl/Cmd+F focuses the search field', async ({
    page,
  }) => {
    await page.goto('/')
    const search = page.locator('input')
    await expect(search).toBeVisible()

    await page.keyboard.press('Control+f')
    await expect(search).toBeFocused()
  })

  test('search field accepts typed input', async ({
    page,
  }) => {
    await page.goto('/')
    const search = page.locator('input')
    await search.fill('hello')
    await expect(search).toHaveValue('hello')
  })
})
