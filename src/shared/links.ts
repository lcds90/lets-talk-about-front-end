import { DefaultTheme } from 'vitepress'
export const items: DefaultTheme.SidebarItem[] = [
  {
    text: 'Detalhando APIs da Web',
    collapsed: true,
    link: '/posts/apis/',
    items: [{ link: '/posts/apis/url-api', text: 'URL API' }],
  },
  {
    text: 'Estilização com CSS',
    collapsed: true,
    link: '/posts/css/',
    items: [
      { text: 'Flexbox', link: '/posts/css/flexbox' },
      { text: 'Grid', link: '/posts/css/grid' },
      { text: 'Clamp', link: '/posts/css/clamp' },
    ],
  },
  {
    text: 'Métricas e analises',
    collapsed: true,
    link: '/posts/metrics/',
    items: [
      {
        link: '/posts/metrics',
        text: 'Métricas',
      },
      {
        link: '/posts/metrics/graphs',
        text: 'Graficos',
      },
    ],
  },
  {
    text: 'Bibliotecas NPM',
    collapsed: true,
    link: '/posts/libs/',
    items: [{ link: '/posts/libs/eslint-prettier', text: 'Eslint + Prettier' }],
  },
  {
    text: 'Testes',
    collapsed: true,
    link: '/posts/tests/',
    items: [
      { link: '/posts/tests', text: 'Jest' },
      { link: '/posts/tests/e2e', text: 'Cypress' },
    ],
  },
  {
    text: 'Vue',
    collapsed: true,
    link: '/posts/vue/',
    items: [],
  },
]

/* export const itemsNav: DefaultTheme.NavItem[] = useRouter().route.path === '/' ? items.map(
	({ text, link }) => ({ text, link } as DefaultTheme.NavItem)
) : []; */

// export const itemsNav: DefaultTheme.NavItem[] = items.map(
// 	({ items: subItems, text, link }) =>
// 		({
// 			items: [{ text: 'Todos os Assuntos', link }, ...(subItems as DefaultTheme.NavItem[])],
// 		text,
// 		} as DefaultTheme.NavItem)
// );

export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: 'https://github.com/lcds90' },
  { icon: 'linkedin', link: 'https://www.linkedin.com/in/lcds90/' },
  { icon: 'youtube', link: 'https://www.linkedin.com/in/lcds90/' },
]
