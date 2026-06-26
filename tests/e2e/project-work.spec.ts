import { test, expect } from './fixtures'

test.describe('Project page', () => {
  test('renders project cards from the project module', async ({
    page,
  }) => {
    await page.goto('/project')
    await expect(
      page.getByRole('heading', { name: 'Frontier' }),
    ).toBeVisible()
    await expect(page.getByText('2024')).toBeVisible()
  })
})

test.describe('Work page', () => {
  test('renders work cards with role and keyword badges', async ({
    page,
  }) => {
    await page.goto('/work')
    await expect(
      page.getByRole('heading', { name: 'Acme Corp' }),
    ).toBeVisible()
    await expect(page.getByText('Platform')).toBeVisible()
    await expect(
      page.getByText('Senior Engineer'),
    ).toBeVisible()
    await expect(
      page.getByText('Frontend', { exact: true }),
    ).toBeVisible()
  })
})
