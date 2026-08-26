// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hébergé chez Hostinger sur carolineloire-energeticienne.fr (déploiement
// Git : branche `hostinger` → public_html). Cette configuration remplace
// l'ancien WordPress o2switch : les anciennes adresses sont redirigées en 301
// par public/.htaccess.
export default defineConfig({
  site: 'https://carolineloire-energeticienne.fr',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
