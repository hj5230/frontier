import { test, expect } from './fixtures'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the navbar with all primary routes', async ({
    page,
  }) => {
    // The navbar renders first in the DOM. Some labels (e.g. "Contact")
    // also appear as section-heading links lower on the page, so scope to
    // the first match, which is the navbar entry.
    for (const name of [
      'Home',
      'Resume',
      'Project',
      'Work',
      'Contact',
    ]) {
      await expect(
        page
          .getByRole('link', { name, exact: true })
          .first(),
      ).toBeVisible()
    }
  })

  test('renders the header with name and intro', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Jane Doe' }),
    ).toBeVisible()
    await expect(
      page.getByText(
        'Full-stack engineer & open-source enthusiast',
      ),
    ).toBeVisible()
  })

  test('renders the About Me section with skill badges', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: /About Me/ }),
    ).toBeVisible()
    for (const badge of ['TypeScript', 'Preact', 'Rust']) {
      await expect(
        page.getByText(badge, { exact: true }),
      ).toBeVisible()
    }
  })

  test('renders Projects, Experience and Contact sections', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: /Projects/ }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Experience/ }),
    ).toBeVisible()
    await expect(
      page.getByText('Senior Frontend Engineer'),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Contact/ }),
    ).toBeVisible()
  })

  test('exposes the GitHub profile link', async ({
    page,
  }) => {
    await expect(
      page
        .getByRole('link', {
          name: 'https://github.com/hj5230',
        })
        .first(),
    ).toBeVisible()
  })
})
