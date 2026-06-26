import { test, expect } from './fixtures'

test.describe('Routing', () => {
  const routes = [
    {
      link: 'Resume',
      path: '/resume',
      heading: 'Education',
    },
    {
      link: 'Project',
      path: '/project',
      heading: 'Frontier',
    },
    { link: 'Work', path: '/work', heading: 'Acme Corp' },
    {
      link: 'Contact',
      path: '/contact',
      heading: 'Contact',
    },
  ]

  for (const route of routes) {
    test(`navigates to ${route.path} via the navbar`, async ({
      page,
    }) => {
      await page.goto('/')
      // Scope to the first match (navbar entry); some labels also appear
      // as section-heading links elsewhere on the home page.
      await page
        .getByRole('link', {
          name: route.link,
          exact: true,
        })
        .first()
        .click()
      await expect(page).toHaveURL(
        new RegExp(`${route.path}$`),
      )
      await expect(
        page
          .getByRole('heading', { name: route.heading })
          .first(),
      ).toBeVisible()
    })
  }

  test('loads a deep-linked route directly', async ({
    page,
  }) => {
    await page.goto('/resume')
    await expect(
      page.getByRole('heading', { name: 'Education' }),
    ).toBeVisible()
  })
})
