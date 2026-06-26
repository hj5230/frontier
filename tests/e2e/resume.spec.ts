import { test, expect } from './fixtures'

test.describe('Resume page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume')
  })

  test('renders the Education section', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Education' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'State University',
      }),
    ).toBeVisible()
    await expect(
      page.getByText('CS', { exact: true }),
    ).toBeVisible()
  })

  test('renders the Languages section with level badges', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Languages' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'English' }),
    ).toBeVisible()
    await expect(
      page.getByText('Native', { exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Chinese' }),
    ).toBeVisible()
  })

  test('renders the Work Experience section', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Work Experience',
      }),
    ).toBeVisible()
    await expect(
      page
        .getByRole('heading', { name: 'Acme Corp' })
        .first(),
    ).toBeVisible()
  })

  test('renders the Tech Stack section', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Tech Stack' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Frontend' }),
    ).toBeVisible()
  })
})
