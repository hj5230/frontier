import { test, expect } from './fixtures'

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('renders all contact fields', async ({ page }) => {
    await expect(
      page.getByText('+1 555 0100'),
    ).toBeVisible()
    await expect(
      page.getByText('jane@example.com'),
    ).toBeVisible()
    await expect(
      page.getByText('jane_doe_wx'),
    ).toBeVisible()
    await expect(
      page.getByText('https://linkedin.com/in/janedoe'),
    ).toBeVisible()
    await expect(
      page.getByRole('link', {
        name: 'https://github.com/hj5230',
      }),
    ).toBeVisible()
  })

  test('exposes a copy button per copyable field', async ({
    page,
  }) => {
    // phone, email, wechat are copyable (linkedin/github are not)
    await expect(
      page.locator('button.rt-variant-outline'),
    ).toHaveCount(3)
  })

  test('copies a field to the clipboard and shows feedback', async ({
    page,
  }) => {
    const copyButton = page
      .locator('button.rt-variant-outline')
      .first()
    await copyButton.click()

    await expect(page.getByText('Copied')).toBeVisible()
    const clipboard = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboard).toBe('+1 555 0100')
  })
})
