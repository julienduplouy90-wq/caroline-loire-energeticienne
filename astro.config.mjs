// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Site publié sur GitHub Pages (projet) :
// https://julienduplouy90-wq.github.io/caroline-loire-energeticienne/
// Pour un nom de domaine personnalisé plus tard : mettre `site` sur le domaine
// et repasser `base` à '/'.
export default defineConfig({
  site: 'https://julienduplouy90-wq.github.io',
  base: '/caroline-loire-energeticienne',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
