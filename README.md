# Caroline Loire — énergéticienne à Bagnères-de-Bigorre

Site vitrine statique construit avec [Astro](https://astro.build) et Tailwind CSS 4,
hébergé chez Hostinger sur **https://carolineloire-energeticienne.fr** (site PHP/HTML
`purple-raven-386267.hostingersite.com` créé le 23/08/2026 dans le plan Unlimited, domaine
rattaché lors de la bascule depuis l'ancien WordPress o2switch).

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

Le fichier [`public/.htaccess`](public/.htaccess) force HTTPS et le domaine sans `www`, redirige
en 301 toutes les anciennes adresses WordPress (boutique, `/energetique/`, `/enseignement/`…) et
sert `404.html`.

### Bascule du domaine depuis l'ancien WordPress (jour J)

Pré-requis : accès o2switch (DNS du domaine) **ou** code de transfert du domaine ; le domaine
expire le 26/10/2026 (registrar Scaleway via o2switch) → renouveler.

1. **Sauvegarde** du WordPress (export o2switch) et relevé des enregistrements **MX** du domaine
   (s'il existe une boîte mail sur le domaine, la recréer chez Hostinger avant de couper).
2. Fusionner la branche `claude/bascule-domaine` (cette config : domaine, indexation, 301).
3. hPanel → site `purple-raven-386267` → Noms de domaine → **Connecter un nom de domaine** →
   `carolineloire-energeticienne.fr` → Hostinger indique les serveurs de noms
   (`ns1.dns-parking.com`, `ns2.dns-parking.com`) ou les enregistrements A / CNAME.
4. Chez o2switch (ou au registrar) : changer les serveurs de noms → Hostinger. Propagation :
   quelques heures.
5. hPanel → Sécurité → **SSL** sur le domaine et `www`.
6. hPanel → Emails → créer `contact@carolineloire-energeticienne.fr` ; puis Systeme.io →
   Paramètres → Emails → ajouter l'adresse → copier les enregistrements **DKIM/SPF** dans la zone
   DNS Hostinger → les emails des workflows deviennent possibles.
7. Tests : https://carolineloire-energeticienne.fr, `www` → sans www, `/energetique/` →
   `/soins-energetiques/`, `/reservation` sur Systeme.io. Puis Google Search Console : nouveau
   sitemap `https://carolineloire-energeticienne.fr/sitemap-index.xml`.
8. Résilier o2switch seulement après quelques jours sans problème.

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
