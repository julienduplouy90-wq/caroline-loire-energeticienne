# Caroline Loire — énergéticienne à Bagnères-de-Bigorre

Site vitrine statique construit avec [Astro](https://astro.build) et Tailwind CSS 4,
hébergé sur GitHub Pages.

**En ligne :** https://julienduplouy90-wq.github.io/caroline-loire-energeticienne/

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site est servi sur http://localhost:4321/caroline-loire-energeticienne (le chemin
`/caroline-loire-energeticienne` est la « base » du site de projet GitHub Pages).

## Mise en ligne

Le déploiement est **automatique** : chaque `push` sur `main` déclenche le workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), qui construit le site et le
publie sur GitHub Pages. Aucune commande manuelle n'est nécessaire.

Pour relancer un déploiement sans modifier le code : onglet **Actions** du dépôt →
*Déployer sur GitHub Pages* → **Run workflow**.

## Structure

```
public/images/        Photos et logos (aucun CDN externe)
src/data/site.ts      Coordonnées, navigation, tarifs, helpers d'URL
src/data/resources.ts Contenu des 8 pages « Ressources »
src/data/systeme.ts   URLs et réglages Systeme.io (réservation, formulaires, UTM, avis Google)
src/data/analytics.ts Identifiants de mesure (GA4 / Meta Pixel), vides par défaut
docs/systeme-io/      Architecture, workflows, emails, charte et checklist Systeme.io
src/layouts/          Gabarit de page (SEO, en-tête, pied de page)
src/components/       En-tête, pied de page, héros, bandeau CTA, FAQ, note Google
src/pages/            Une page = un fichier ; `[slug].astro` génère les ressources
src/styles/global.css Charte graphique (tokens Tailwind `@theme`)
.github/workflows/    Déploiement automatique sur GitHub Pages
```

## Modifier le contenu

- **Coordonnées, tarifs, menu** → `src/data/site.ts`
- **Pages Ressources** (Reiki, Shamballa, LaHoChi…) → `src/data/resources.ts`
- **Texte d'une page** → le fichier correspondant dans `src/pages/`
- **Couleurs et polices** → le bloc `@theme` de `src/styles/global.css`

## Réservation, CRM et emails (Systeme.io)

Le site reste statique ; la prise de rendez-vous, la collecte de contacts, le CRM et les emails
automatiques sont confiés à Systeme.io sur le sous-domaine
`rdv-carolineloire-energeticienne.systeme.io`.

- **Activer un bouton** : coller l'URL de la page Systeme.io publiée dans `SYSTEME_URLS`
  (`src/data/systeme.ts`). Vide = le bouton mène à la page Contact.
- **Formulaire de contact Systeme.io** : coller le code d'intégration dans
  `SYSTEME_CONTACT_FORM_EMBED` (même fichier).
- **Tout le reste** (pages à créer, workflows, tags, pipelines, textes des emails, charte,
  checklist) : [`docs/systeme-io/README.md`](docs/systeme-io/README.md).

## Formulaire de contact

Le site est statique : il n'y a pas de serveur pour recevoir les messages.

- **Par défaut** : le formulaire ouvre le logiciel de messagerie du visiteur avec un message
  pré-rempli adressé à `carolinenergies@yahoo.com`.
- **Option recommandée** : créer un formulaire gratuit sur [Formspree](https://formspree.io),
  puis coller l'URL de l'endpoint dans `SITE.formEndpoint` (`src/data/site.ts`). Les messages
  arrivent alors directement par e-mail, sans quitter le site.

## Points à compléter avant la mise en ligne publique

- Statut juridique et numéro SIRET dans les mentions légales.
- Horaires d'ouverture du cabinet.
- Avis clients nominatifs : seule la note globale Google (4,9/5 · 31 avis) est affichée,
  faute de textes d'avis réels disponibles.
