# Caroline Loire — site vitrine

Site vitrine de **Caroline Loire**, énergéticienne, praticienne en chamanisme et maître Reiki
enseignante à Bagnères-de-Bigorre (Hautes-Pyrénées).

Reprise de l'ancien site Hostinger Horizons (React + PocketBase) en site **statique Astro**,
hébergé chez **Hostinger** sur `carolineloire-energeticienne.fr` (remplace le WordPress o2switch
historique).

## Stack

| Sujet          | Choix                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Framework      | Astro 7 (sortie statique, zéro JS par défaut)                            |
| Styles         | Tailwind CSS 4 via `@tailwindcss/vite`, thème dans `src/styles/global.css` |
| Hébergement    | Hostinger (`public_html`), envoi FTPS par GitHub Actions à chaque push sur `main` (secrets `FTP_*`) |
| URLs           | Racine du domaine, **barre oblique finale** (`/tarifs/`) comme l'ancien WordPress ; `.htaccess` : HTTPS, www → apex, 301 des anciennes adresses |
| Formulaire     | Embed Systeme.io si `SYSTEME_CONTACT_FORM_EMBED` est renseigné ; sinon statique (`mailto:` / Formspree via `SITE.formEndpoint`) |
| Conversion     | Systeme.io (calendrier, CRM, emails) — config `src/data/systeme.ts`, doc `docs/systeme-io/` |
| Mesure         | Aucun outil chargé par défaut ; événements `clic_prendre_rdv`, `clic_reiki`, `clic_formation`, `formulaire_envoye` émis via `data-track` / `window.clTrack` (GA4 optionnel dans `src/data/analytics.ts`) |

## Commandes

```bash
npm run dev      # serveur local (http://localhost:4321)
npm run build    # génère dist/
npm run preview  # prévisualise dist/
```

La mise en ligne est automatique : tout push sur `main` déclenche
`.github/workflows/deploy.yml`, qui construit le site et l'envoie en FTPS chez Hostinger.
Jamais de fichier modifié à la main sur le serveur : tout passe par le dépôt.

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
4. **Réservation via Systeme.io** (sous-domaine `rdv-carolineloire-energeticienne.systeme.io`).
   Toutes les URLs Systeme.io vivent dans `src/data/systeme.ts` (`SYSTEME_URLS`) et les CTA
   passent par `systemeHref()` : tant qu'une URL est vide, le CTA retombe sur `/contact`.
   Jamais d'URL Systeme.io en dur dans un composant. Doc complète : `docs/systeme-io/`.

## Conventions techniques

- **Liens internes** : toujours `u('/chemin')` depuis `src/data/site.ts` (ajoute la barre oblique
  finale attendue par `trailingSlash: 'always'`) — jamais de `href` brut. Pour les fichiers de
  `public/`, utiliser `asset('...')`.
- **Anciennes URLs WordPress** : toute page renommée doit recevoir une ligne `Redirect 301` dans
  `public/.htaccess` (les URLs déjà indexées par Google ne doivent jamais tomber en 404).
- **Données centralisées** : coordonnées, navigation et tarifs dans `src/data/site.ts` ;
  contenu des pages Ressources dans `src/data/resources.ts` ; URLs et réglages Systeme.io dans
  `src/data/systeme.ts` ; identifiants de mesure dans `src/data/analytics.ts`. Modifier la
  donnée, pas le gabarit.
- **CTA mesurés** : poser `data-track="<événement>"` (+ `data-track-label`) sur le lien ; le
  script de `BaseLayout.astro` fait le reste. Ne pas appeler `gtag` directement.
- **Images** : servies depuis `public/images/`, jamais depuis un CDN externe.
- **Animations** : attribut `data-reveal` sur l'élément à faire apparaître. Un filet de sécurité
  affiche tout au bout de 2,5 s si l'IntersectionObserver ne se déclenche pas.
- **Accessibilité** : contrastes conformes, focus visible, cibles tactiles ≥ 44 px, un seul `h1`
  par page, `alt` sur chaque image.

## Git

- Une modification = une branche `claude/...`, jamais de commit direct sur `main`.
- `main` est la branche de production : tout ce qui y est fusionné part en ligne automatiquement.
- Aucun secret dans le dépôt : les identifiants FTP vivent dans les secrets GitHub Actions.
  Le dépôt peut repasser en **privé** dès que GitHub Pages n'est plus utilisé (règle : un dépôt
  privé par cliente).

## À compléter avant une mise en ligne définitive

- Statut juridique et numéro SIRET dans les mentions légales.
- Horaires d'ouverture (non communiqués à ce jour).
- Hostinger : compte FTP + secrets GitHub `FTP_SERVEUR` / `FTP_UTILISATEUR` / `FTP_MOTDEPASSE`,
  puis bascule DNS du domaine (actuellement o2switch) — voir README, section Hébergement.
