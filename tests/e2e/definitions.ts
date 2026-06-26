/**
 * Fixture definition payloads, keyed by module name. These mirror the
 * `*.json` files the app fetches at runtime from the CDN, and satisfy the
 * Zod schemas in `src/typings/definition.ts`. Served to the app via request
 * interception (see `fixtures.ts`) so tests need no network or env config.
 */
export const definitions: Record<string, unknown> = {
  app: {
    path: [
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/resume' },
      { name: 'Project', path: '/project' },
      { name: 'Work', path: '/work' },
      { name: 'Contact', path: '/contact' },
    ],
    defaultThemeColor: 'teal',
    defaultAppearance: 'dark',
    $error_title: '404 - Page Not Found',
    $error_description:
      'The page you are looking for does not exist.',
    $error_redirect: 'Redirecting to home in $ seconds...',
  },
  index: {
    avatar_uri: '/favicon.ico',
    name: 'Jane Doe',
    intro: 'Full-stack engineer & open-source enthusiast',
    _about_me: 'About Me',
    about_me:
      'I build delightful web experiences with TypeScript and modern tooling.',
    _experience: 'Experience',
    badges: [
      { text: 'TypeScript', color: 'blue' },
      { text: 'Preact', color: 'iris' },
      { text: 'Rust', color: 'orange' },
    ],
    experience: [
      {
        title: 'Senior Frontend Engineer',
        period: '2022 - Present',
        description: [
          'Led the migration to a component-driven architecture.',
        ],
      },
      {
        title: 'Software Engineer',
        period: '2020 - 2022',
        description: [
          'Shipped the core design system used across products.',
        ],
      },
    ],
    _project: 'Projects',
    project: [
      {
        title: 'Frontier',
        description: [
          'A customizable personal website template.',
        ],
        link: 'https://github.com/hj5230/frontier',
        image_uri: '/favicon.ico',
      },
    ],
    _contact: 'Contact',
    _phone: 'Phone',
    phone: ['+1 555 0100'],
    _email: 'Email',
    email: 'jane@example.com',
    _wechat: 'WeChat',
    wechat: 'jane_doe_wx',
    _github: 'GitHub',
    github: 'https://github.com/hj5230',
    _langlevel: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      native: 'Native',
    },
  },
  navbar: {
    site_icon_uri: '/favicon.ico',
    navigator_items: [
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/resume' },
      { name: 'Project', path: '/project' },
      { name: 'Work', path: '/work' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  resume: {
    _education: 'Education',
    education: [
      {
        institution: 'State University',
        period: '2016 - 2020',
        degree: 'B.Sc. in Computer Science',
        comment: 'Graduated with honors.',
        themeColor: 'teal',
      },
    ],
    education_keywords: [{ text: 'CS', color: 'jade' }],
    _work: 'Work Experience',
    work: [
      {
        company: 'Acme Corp',
        department: 'Platform',
        role: 'Senior Engineer',
        period: '2022 - Present',
        description: [
          'Owned the front-end platform and tooling.',
        ],
        comment: 'Promoted twice.',
        themeColor: 'iris',
      },
    ],
    work_keywords: [{ text: 'Frontend', color: 'blue' }],
    _tech_stack: 'Tech Stack',
    tech_stack: [
      {
        title: 'Frontend',
        description: 'TypeScript, Preact, React, Radix UI',
        comment: 'Daily drivers.',
        themeColor: 'violet',
      },
    ],
    _language: 'Languages',
    language: [
      {
        lang: 'English',
        level: 4,
        comment: 'Native speaker.',
      },
      {
        lang: 'Chinese',
        level: 2,
        comment: 'Conversational.',
      },
    ],
    language_keywords: [
      { text: 'Bilingual', color: 'grass' },
    ],
  },
  project: {
    project: [
      {
        name: 'Frontier',
        period: '2024',
        description: [
          'A flexible personal website template powered by Radix UI.',
        ],
        media_uri: '/favicon.ico',
        media_type: 'img',
        comment: 'Open source on GitHub.',
        themeColor: 'teal',
        keywords: [{ text: 'Preact', color: 'iris' }],
      },
    ],
  },
  work: {
    work: [
      {
        company: 'Acme Corp',
        department: 'Platform',
        role: 'Senior Engineer',
        period: '2022 - Present',
        description: [
          'Owned the front-end platform and developer tooling.',
        ],
        comment: 'Promoted twice.',
        themeColor: 'iris',
        keywords: [{ text: 'Frontend', color: 'blue' }],
      },
    ],
  },
  contact: {
    _contact: 'Contact',
    _phone: 'Phone',
    phone: ['+1 555 0100'],
    _email: 'Email',
    email: 'jane@example.com',
    _wechat: 'WeChat',
    wechat: 'jane_doe_wx',
    _github: 'GitHub',
    github: 'https://github.com/hj5230',
    _linkedin: 'LinkedIn',
    linkedin: 'https://linkedin.com/in/janedoe',
    comment: 'Feel free to reach out anytime.',
  },
}
