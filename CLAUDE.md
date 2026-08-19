# Caroline Loire — site vitrine

Site vitrine de **Caroline Loire**, énergéticienne, praticienne en chamanisme et maître Reiki
enseignante à Bagnères-de-Bigorre (Hautes-Pyrénées).

Reprise de l'ancien site Hostinger Horizons (React + PocketBase) en site **statique Astro**,
hébergé sur **GitHub Pages**.

## Stack

| Sujet          | Choix                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Framework      | Astro 7 (sortie statique, zéro JS par défaut)                            |
| Styles         | Tailwind CSS 4 via `@tailwindcss/vite`, thème dans `src/styles/global.css` |
| Hébergement    | GitHub Pages, branche `gh-pages` (build publié par `npm run deploy`)      |
| Base URL       | `/caroline-loire-energeticienne` (site de projet GitHub Pages)            |
| Formulaire     | 100 % statique : `mailto:` par défaut, Formspree si `SITE.formEndpoint` est renseigné |

## Commandes

```bash
npm run dev      # serveur local (http://localhost:4321/caroline-loire-energeticienne)
npm run build    # génère dist/
npm run preview  # prévisualise dist/
npm run deploy   # build + publication sur la branche gh-pages
```

## Charte graphique

Toutes les couleurs sont déclarées une seule fois dans `@theme` (`src/styles/global.css`).
Ne jamais écrire une couleur en dur dans un composant : utiliser les utilitaires Tailwind générés.

| Rôle                                  | Token          | HEX       |
| ------------------------------------- | -------------- | --------- |
| Bleu canard — titres, boutons, footer | `forest`       | `#4DA0A8` |
| Bleu canard foncé — survols           | `forest-deep`  | `#428187` |
| Bleu canard très foncé — bloc avis    | `forest-darker`| `#143B40` |
| Terracotta pêche — accents, traits    | `peach`        | `#EEB1A0` |
| Terracotta foncé — texte d'accent     | `peach-deep`   | `#B95F3D` |
| Fond alterné poudré                   | `sand`         | `#FDF3EF` |
| Blanc crème                           | `cream`        | `#FBF7F4` |
| Nude clair — bordures                 | `line`         | `#F1DDD4` |
| Noir charcoal — texte                 | `ink`          | `#1A1A1A` |
| Gris texte secondaire                 | `slate-soft`   | `#5B5B5B` |

Typographie : **Poppins** pour les titres (`font-display`), **Inter** pour le texte courant.

## Règles de contenu

1. **Ne jamais inventer de fait métier.** Tarifs, durées, coordonnées, diplômes et déroulés de
   séance proviennent du site existant de Caroline. En cas de doute, demander plutôt qu'inventer.
2. **Aucun faux témoignage.** Seule la note globale Google réelle (4,9/5 · 31 avis) est affichée,
   avec un lien vers la fiche. Ne pas ajouter d'avis nominatif sans texte réel fourni par Caroline.
3. **Mention bien-être obligatoire.** Toute page décrivant une pratique rappelle que les
   accompagnements ne remplacent pas un avis ou un traitement médical ou psychologique
   (constante `DISCLAIMER` dans `src/data/site.ts`).
4. **Pas de calendrier de réservation** : aucun outil tiers n'est configuré. Les CTA « Prendre
   rendez-vous » pointent vers `/contact`, puis téléphone ou e-mail réels.

## Conventions techniques

- **Liens internes** : toujours `u('/chemin')` depuis `src/data/site.ts` — jamais de `href` brut,
  sinon la base GitHub Pages saute. Pour les fichiers de `public/`, utiliser `asset('...')`.
- **Données centralisées** : coordonnées, navigation et tarifs dans `src/data/site.ts` ;
  contenu des pages Ressources dans `src/data/resources.ts`. Modifier la donnée, pas le gabarit.
- **Images** : servies depuis `public/images/`, jamais depuis un CDN externe.
- **Animations** : attribut `data-reveal` sur l'élément à faire apparaître. Un filet de sécurité
  affiche tout au bout de 2,5 s si l'IntersectionObserver ne se déclenche pas.
- **Accessibilité** : contrastes conformes, focus visible, cibles tactiles ≥ 44 px, un seul `h1`
  par page, `alt` sur chaque image.

## Git

- Une modification = une branche `claude/...`, jamais de commit direct sur `main`.
- `main` porte le code source ; `gh-pages` porte uniquement le build (générée, ne pas éditer).
- Aucun secret dans le dépôt (celui-ci est public — contrainte de GitHub Pages en offre gratuite).

## À compléter avant une mise en ligne définitive

- Statut juridique et numéro SIRET dans les mentions légales.
- Horaires d'ouverture (non communiqués à ce jour).
- Nom de domaine personnalisé : renseigner `site` dans `astro.config.mjs`, repasser `base` à `/`,
  et ajouter un fichier `CNAME` dans `public/`.
