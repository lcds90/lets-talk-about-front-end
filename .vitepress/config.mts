import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'LCDS',
	description: 'Blog pessoal',
	head: [],
	appearance: 'force-dark',
	markdown: {
		lineNumbers: true,
	},
	themeConfig: {

		// https://vitepress.dev/reference/default-theme-config
		search: {
			provider: 'local',
		},
/* 		nav: [
			{ text: 'Home', link: '/' },
			{
				text: 'CSS',
				items: [
					{ text: 'Todos os assuntos', link: '/posts/' },
					{
						text: 'Layout',
						items: [
							{ text: 'Flexbox', link: '/posts/css/flexbox' },
							{ text: 'Grid', link: '/posts/css/grid' },
							{ text: 'Clamp', link: '/posts/css/clamp' },
						],
					},
				],
			},
			{
				text: 'Testes',
				items: [
					{ text: 'Todos os assuntos', link: '/posts/' },
					{
						text: 'Testes unitários',
						items: [{ link: '/posts/tests', text: 'Jest' }],
					},
					{
						text: 'Testes E2E',
						items: [{ link: '/posts/tests/e2e', text: 'Cypress' }],
					},
				],
			},
		], */

		sidebar: [
			{
				items: [
					{
						text: 'CSS',
						link: '/posts/css',
						collapsed: true,
						items: [
							{ text: 'Flexbox', link: '/posts/css/flexbox' },
							{ text: 'Grid', link: '/posts/css/grid' },
							{ text: 'Clamp', link: '/posts/css/clamp' },
						],
					},
				],
			},
			{
				text: 'Testes',
				collapsed: true,
				items: [
					{ link: '/posts/tests', text: 'Jest' },
					{ link: '/posts/tests/e2e', text: 'Cypress' }
				],
			},
		],
		aside: 'left',
		outline: {
			label: 'Nessa página',
		},
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/lcds90' },
			{ icon: 'linkedin', link: 'https://www.linkedin.com/in/lcds90/' },
			{ icon: 'youtube', link: 'https://www.linkedin.com/in/lcds90/' },
		],
	},
});
