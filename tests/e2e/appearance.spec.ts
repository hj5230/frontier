import { test, expect } from './fixtures'

test.describe('Appearance & operation hub', () => {
  test('defaults to dark and toggles to light', async ({
    page,
  }) => {
    await page.goto('/')
    const theme = page.locator('.radix-themes').first()
    await expect(theme).toHaveClass(/dark/)

    // The operation hub holds: reload, home, github, appearance-toggle.
    // The appearance toggle is the last "surface" button.
    await page
      .locator('button.rt-variant-surface')
      .last()
      .click()
    await expect(theme).toHaveClass(/light/)
  })

  test('shows the draggable operation hub when not embedded', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByText('⋮⋮')).toBeVisible()
    await expect(page.locator('input')).toHaveCount(1)
  })
})

test.describe('Embedded mode (?embedded=1)', () => {
  test('uses light appearance and hides the hub and search', async ({
    page,
  }) => {
    await page.goto('/?embedded=1')
    const theme = page.locator('.radix-themes').first()
    await expect(theme).toHaveClass(/light/)
    await expect(page.getByText('⋮⋮')).toHaveCount(0)
    await expect(page.locator('input')).toHaveCount(0)
  })
})
