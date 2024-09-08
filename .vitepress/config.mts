import { defineConfig } from 'vitepress';
import { items as sidebar, socialLinks } from '../shared/links';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'LCDS',
	description: 'Blog pessoal',
	head: [
	//   ['script', { async: "true", src: 'https://www.tiktok.com/embed.js' }],
	],
	appearance: 'force-dark',
	markdown: {
		lineNumbers: true,
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		search: {
			provider: 'local',
		},
		nav: [],
		sidebar,
		outline: {
			label: 'Nessa página',
		},
		socialLinks,
	},
	vite: {
		resolve: {
			alias: {
				'@': __dirname + '/src',
				'@components': __dirname + '/src/components/',
			}
		},
		server: {
			proxy: {
				'/api': {
					target: 'https://api.linkedin.com',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	},
});
