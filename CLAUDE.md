# Caroline Loire — site vitrine

Site vitrine de **Caroline Loire**, énergéticienne, praticienne en chamanisme et maître Reiki
enseignante à Bagnères-de-Bigorre (Hautes-Pyrénées).

Reprise de l'ancien site Hostinger Horizons (React + PocketBase) en site **statique Astro**,
hébergé chez **Hostinger** sur le domaine temporaire de Caroline.

**Interdit : toucher au WordPress historique** (`carolineloire-energeticienne.fr`, o2switch) —
ni DNS, ni redirection, ni référence comme domaine cible. Il reste le site de référence tant que
Julien et Caroline n'ont pas décidé autrement ; ce site est donc en `noindex` (`INDEXABLE`).

## Stack

| Sujet          | Choix                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Framework      | Astro 7 (sortie statique, zéro JS par défaut)                            |
| Styles         | Tailwind CSS 4 via `@tailwindcss/vite`, thème dans `src/styles/global.css` |
| Hébergement    | Hostinger, domaine temporaire `purple-raven-386267.hostingersite.com`. GitHub Actions pousse `dist/` sur la branche `hostinger` ; hPanel → Git la déploie dans `public_html` (webhook). Aucun secret. |
| URLs           | Racine du domaine, **barre oblique finale** (`/tarifs/`) ; `.htaccess` : HTTPS, 404, cache — aucune redirection de domaine |
| Indexation     | `INDEXABLE = false` (`src/data/site.ts`) → `noindex` + `robots.txt` Disallow tant que le domaine est temporaire |
| Formulaire     | Embed Systeme.io si `SYSTEME_CONTACT_FORM_EMBED` est renseigné ; sinon le formulaire du site poste sur `public/envoi-message.php` (PHP Hostinger), qui envoie le message à la boîte de Caroline. Aucune adresse e-mail n'est affichée sur le site. |
| Conversion     | Systeme.io (calendrier, CRM, emails) — config `src/data/systeme.ts`, doc `docs/systeme-io/` |
| Mesure         | Aucun outil chargé par défaut ; événements `clic_prendre_rdv`, `clic_reiki`, `clic_formation`, `formulaire_envoye` émis via `data-track` / `window.clTrack` (GA4 optionnel dans `src/data/analytics.ts`) |

## Commandes

```bash
npm run dev      # serveur local (http://localhost:4321)
npm run build    # génère dist/
npm run preview  # prévisualise dist/
```

La mise en ligne est automatique : tout push sur `main` déclenche
`.github/workflows/deploy.yml`, qui construit le site et pousse `dist/` sur la branche
`hostinger`, que Hostinger déploie. Jamais de fichier modifié à la main sur le serveur, jamais
de commit à la main sur la branche `hostinger` : tout passe par `main`.

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
3. **Écrire au positif, et pas de mention « ne remplace pas un avis médical ».** Retours de
   Caroline, août 2026 : la mention bien-être / suivi médical a été retirée de toutes les pages
   (elle ne subsiste que dans les mentions légales, à titre juridique), et les tournures qui
   disent ce qu'une pratique **n'est pas** (« pas une offre séparée », « pas une consultation
   commerciale », « sans promesse de résultat ») ont été remplacées par ce qu'elle **est** et
   comment elle s'intègre au soin. Ne pas les réintroduire.
4. **Aucune adresse e-mail sur le site.** Les visiteurs passent par le formulaire, le téléphone
   ou le SMS. Le destinataire des messages vit uniquement dans `public/envoi-message.php`.
5. **Réservation via Systeme.io** (sous-domaine `rdv-carolineloire-energeticienne.systeme.io`).
   Toutes les URLs Systeme.io vivent dans `src/data/systeme.ts` (`SYSTEME_URLS`) et les CTA
   passent par `systemeHref()` : tant qu'une URL est vide, le CTA retombe sur `/contact`.
   Jamais d'URL Systeme.io en dur dans un composant. Doc complète : `docs/systeme-io/`.

## Conventions techniques

- **Liens internes** : toujours `u('/chemin')` depuis `src/data/site.ts` (ajoute la barre oblique
  finale attendue par `trailingSlash: 'always'`) — jamais de `href` brut. Pour les fichiers de
  `public/`, utiliser `asset('...')`.
- **Anciennes URLs WordPress** : aucune redirection à écrire tant que ce site n'est pas sur le
  domaine historique (et ce n'est pas prévu).
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
- Aucun secret dans le dépôt ni dans GitHub Actions (déploiement par branche `hostinger`).
  Le dépôt peut repasser en **privé** (règle : un dépôt privé par cliente) : il faudra alors une
  clé de déploiement SSH dans hPanel → Git (voir README).

## À compléter avant une mise en ligne définitive

- Statut juridique et numéro SIRET dans les mentions légales.
- Horaires d'ouverture (non communiqués à ce jour).
- Hostinger : déploiement Git en place (voir README, section Mise en ligne).
