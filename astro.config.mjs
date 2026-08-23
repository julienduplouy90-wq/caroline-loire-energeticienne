// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Site publié à la racine du domaine de Caroline, hébergé chez Hostinger
// (envoi FTPS de `dist/` par .github/workflows/deploy.yml).
// URLs avec barre oblique finale (/tarifs/), comme l'ancien WordPress :
// les adresses déjà indexées par Google restent valables sans redirection.
export default defineConfig({
  site: 'https://carolineloire-energeticienne.fr',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
