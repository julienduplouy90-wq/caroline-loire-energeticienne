# Caroline Loire — énergéticienne à Bagnères-de-Bigorre

Site vitrine statique construit avec [Astro](https://astro.build) et Tailwind CSS 4,
hébergé chez Hostinger sur le domaine temporaire **https://purple-raven-386267.hostingersite.com**
(site PHP/HTML créé le 23/08/2026 dans le plan Unlimited).

> ⚠ Le domaine historique `carolineloire-energeticienne.fr` et son site WordPress (o2switch)
> **ne doivent pas être touchés** : ni DNS, ni redirection, ni suppression. Ce dépôt n'y fait
> jamais référence comme cible. Tant que ce site vit sur un domaine temporaire, il est en
> `noindex` (`INDEXABLE = false` dans `src/data/site.ts`, `robots.txt` en Disallow).

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site est servi sur http://localhost:4321.

## Mise en ligne (Hostinger)

Le déploiement est **automatique**, en deux temps, sans aucun mot de passe :

1. chaque `push` sur `main` déclenche le workflow
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), qui construit le site et pousse
   le contenu de `dist/` sur la branche **`hostinger`** du dépôt ;
2. Hostinger (hPanel → site → Avancé → **Git**) suit cette branche et la déploie dans
   `public_html` dès qu'il reçoit le webhook GitHub.

Pour relancer une publication sans modifier le code : onglet **Actions** → *Construire et
publier pour Hostinger* → **Run workflow**. Pour redéployer côté Hostinger : hPanel → Avancé →
Git → **Déployer**.

### Mise en place (faite le 23/08/2026)

- Site PHP/HTML `purple-raven-386267.hostingersite.com` créé dans hPanel (le site Horizons
  `caroline-loire-energy-540040` n'a pas de `public_html` et n'est pas utilisable pour Astro ;
  il est laissé tel quel).
- hPanel → Avancé → Git : dépôt `julienduplouy90-wq/caroline-loire-energeticienne`, branche
  `hostinger`, répertoire `public_html`.
- Webhook Hostinger ajouté dans GitHub (Settings → Webhooks) : chaque push sur `hostinger`
  redéploie.
- Si le dépôt passe en **privé** : hPanel → Git → copier la clé SSH → GitHub → Settings →
  Deploy keys (lecture seule), puis remplacer l'URL HTTPS par l'URL SSH dans hPanel.

Le fichier [`public/.htaccess`](public/.htaccess) force HTTPS, sert `404.html` et règle le cache.
Il ne contient **aucune** redirection de domaine.

### Le jour où un vrai domaine est décidé (pas maintenant)

Ce sera un choix explicite de Caroline et Julien, jamais automatique : `site` dans
`astro.config.mjs`, `INDEXABLE = true`, `robots.txt` en `Allow: /` + ligne `Sitemap`, puis
sitemap dans Google Search Console. Si ce domaine devait un jour être `carolineloire-energeticienne.fr`,
les anciennes adresses WordPress (`/energetique/`, `/enseignement/`, boutique…) devraient être
redirigées en 301 — liste dans l'historique git de `public/.htaccess` (commit « Héberger le site
sur carolineloire-energeticienne.fr »).

## Structure

```
public/.htaccess      HTTPS, 404, cache (aucune redirection de domaine)
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
.github/workflows/    Construction + publication de dist/ sur la branche hostinger
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

Depuis août 2026, **aucune adresse e-mail n'apparaît sur le site** : Caroline ne voulait plus la
voir affichée. Les visiteurs passent par le formulaire, le téléphone ou le SMS.

- Le formulaire poste sur **`public/envoi-message.php`**, déployé tel quel dans `public_html`
  (Hostinger exécute le PHP). C'est ce fichier — et lui seul — qui connaît l'adresse de réception ;
  elle y est écrite en base64 pour ne pas traîner en clair dans un dépôt public. Pour la changer :
  `echo -n "nouvelle@adresse.fr" | base64`, puis remplacer la constante `DESTINATAIRE`.
- Avec JavaScript, l'envoi se fait en arrière-plan et le visiteur reste sur la page. Sans
  JavaScript, le script renvoie sur `/contact/?message=envoye` (ou `?message=erreur`).
- **À tester après la mise en ligne** : envoyer un vrai message depuis `/contact/` et vérifier
  qu'il arrive bien. Si l'hébergement bloquait `mail()`, il faudrait basculer sur un service tiers
  (Formspree, ou l'envoi SMTP d'une boîte e-mail Hostinger).

## Points à compléter avant la mise en ligne publique

- Statut juridique et numéro SIRET dans les mentions légales.
- Horaires d'ouverture du cabinet.
- Avis clients nominatifs : seule la note globale Google (4,9/5 · 31 avis) est affichée,
  faute de textes d'avis réels disponibles.
