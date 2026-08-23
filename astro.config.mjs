// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hébergé chez Hostinger (envoi FTPS de `dist/` par .github/workflows/deploy.yml)
// sur le domaine temporaire Hostinger de Caroline. Le domaine historique
// carolineloire-energeticienne.fr (WordPress chez o2switch) n'est PAS touché.
//
// Quand un vrai domaine sera décidé : changer `site` ici et passer
// `INDEXABLE` à true dans src/data/site.ts.
export default defineConfig({
  site: 'https://purple-raven-386267.hostingersite.com',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
