# Caroline Loire — énergéticienne à Bagnères-de-Bigorre

Site vitrine statique construit avec [Astro](https://astro.build) et Tailwind CSS 4,
hébergé chez Hostinger.

**Domaine :** https://carolineloire-energeticienne.fr (bascule DNS à faire, voir plus bas)

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

Le déploiement est **automatique** : chaque `push` sur `main` déclenche le workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), qui construit le site et envoie
`dist/` en FTPS dans `public_html` chez Hostinger. Aucune commande manuelle, aucun fichier
modifié à la main sur le serveur.

Pour relancer un déploiement sans modifier le code : onglet **Actions** du dépôt →
*Construire et déployer sur Hostinger* → **Run workflow**.

### Première mise en place (à faire une fois)

1. **hPanel Hostinger** → Sites web → Ajouter un site → « Domaine existant »
   `carolineloire-energeticienne.fr` (hébergement de Caroline, ou plan Elyo avec le domaine
   rattaché).
2. hPanel → Fichiers → **Comptes FTP** → créer un compte dédié, noter l'hôte, l'identifiant et
   le mot de passe.
3. GitHub → dépôt → Settings → Secrets and variables → Actions → **New repository secret** :
   `FTP_SERVEUR`, `FTP_UTILISATEUR`, `FTP_MOTDEPASSE`. (Variable facultative `FTP_DOSSIER` si le
   site n'est pas dans `/public_html/`.)
4. Actions → lancer le workflow à la main → vérifier le site sur l'URL temporaire Hostinger
   (ou via le fichier `hosts` local) : pages, images, formulaire, `/tarifs` → `/tarifs/`.
5. hPanel → Sécurité → **SSL** : activer le certificat gratuit (Let's Encrypt) pour le domaine et
   `www`.
6. **DNS** (chez le registrar actuel du domaine — aujourd'hui le site tourne chez o2switch, IP
   `109.234.161.194`) : soit pointer les serveurs de noms vers Hostinger (`ns1.dns-parking.com`,
   `ns2.dns-parking.com`), soit garder le registrar et changer l'enregistrement **A** de `@` et
   le **CNAME** de `www` vers les valeurs indiquées dans hPanel. Attention : si des **e-mails**
   sont rattachés au domaine, reporter les enregistrements MX / SPF avant de changer les serveurs
   de noms, sinon les mails s'arrêtent.
7. Après propagation (quelques heures) : tester https://carolineloire-energeticienne.fr,
   la version `www` (doit rediriger sans www), une ancienne URL WordPress
   (`/energetique/` → `/soins-energetiques/`), puis soumettre le nouveau sitemap dans Google
   Search Console (`https://carolineloire-energeticienne.fr/sitemap-index.xml`).
8. Seulement ensuite : résilier / couper l'ancien WordPress o2switch (Amelia, WooCommerce).

Le fichier [`public/.htaccess`](public/.htaccess) force HTTPS et le domaine sans `www`, redirige
en 301 toutes les anciennes adresses WordPress (boutique, `/energetique/`, `/enseignement/`…) et
sert `404.html`.

## Structure

```
public/.htaccess      HTTPS, domaine sans www, redirections 301 de l'ancien WordPress, 404
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
.github/workflows/    Construction + envoi FTPS vers Hostinger
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
