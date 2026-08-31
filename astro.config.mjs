// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://dylanzhang.tech',
	integrations: [mdx(), sitemap(), vercel({ analytics: { enabled: true } })],
});
