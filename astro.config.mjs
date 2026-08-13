// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://personal-site-azure-xi.vercel.app',
  redirects: {
    '/about': '/',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});