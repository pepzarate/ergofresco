// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://ergofresco.com',
  integrations: [mdx(), sitemap()],

  vite: {
  },

  adapter: cloudflare(),
});