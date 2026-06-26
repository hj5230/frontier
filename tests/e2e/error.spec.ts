import { test, expect } from './fixtures'

test.describe('404 / unknown routes', () => {
  test('renders the error page with a countdown', async ({
    page,
  }) => {
    await page.goto('/this-route-does-not-exist')
    await expect(
      page.getByRole('heading', {
        name: '404 - Page Not Found',
      }),
    ).toBeVisible()
    await expect(
      page.getByText(/Redirecting to home in \d+ seconds/),
    ).toBeVisible()
    await expect(
      page.getByText(
        'The page you are looking for does not exist.',
      ),
    ).toBeVisible()
  })

  test('redirects back to home after the countdown', async ({
    page,
  }) => {
    await page.goto('/this-route-does-not-exist')
    await expect(
      page.getByRole('heading', {
        name: '404 - Page Not Found',
      }),
    ).toBeVisible()
    // countdown starts at 5s; allow generous slack for the redirect
    await page.waitForURL(/localhost:\d+\/$/, {
      timeout: 15_000,
    })
    await expect(
      page.getByRole('heading', { name: 'Jane Doe' }),
    ).toBeVisible()
  })
})
