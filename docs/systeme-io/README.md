# Site principal ⇄ Systeme.io — architecture et mise en place

Dernière mise à jour : 23 août 2026.

```text
carolineloire-energeticienne.fr            ← site Astro statique (Hostinger), base SEO
        ↓
Pages soins / chamanisme / formations Reiki / tarifs / contact
        ↓
CTA « intelligents » (src/data/systeme.ts)
        ↓
rdv-carolineloire-energeticienne.systeme.io  ← sous-domaine Systeme.io de Caroline
        ↓
Calendrier · formulaires · CRM · emails automatiques
        ↓
Suivi client (confirmation, rappel, suivi, avis, relance, Reiki)
```

Principe : **Caroline possède ses actifs** (domaine, site, compte Systeme.io, compte Stripe,
Google Calendar, fiche Google). Le site Hostinger est indépendant ; Systeme.io est un moteur
marketing/commercial remplaçable ; Elyo configure et maintient sans rendre Caroline captive.

Documents associés :

- [`workflows.md`](workflows.md) — les 5 workflows, les tags, les pipelines CRM (à reproduire pas à pas).
- [`emails.md`](emails.md) — textes complets des emails automatiques.
- [`charte.md`](charte.md) — styles à reproduire dans Systeme.io pour rester dans l'univers du site.

---

## 1. Constats de l'audit (avant modification)

### Le dépôt Astro (ce projet)

| Point audité                         | Constat                                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Boutons « Prendre rendez-vous »      | Header (desktop + menu mobile), barre mobile, bandeau `CtaBand`, encarts tarifaires des pages Soins / Chamanisme / Tarifs. Tous pointaient vers `/contact` via `SITE.bookingPath`. |
| Formulaire de contact                | `/contact` : statique, `mailto:` par défaut, Formspree si `SITE.formEndpoint` est renseigné. Champs : prénom, nom, e-mail, téléphone (facultatif), objet, message, consentement. |
| Ancien système de réservation        | Aucune référence dans le dépôt. L'ancien `bookingUrl` Horizons avait déjà été retiré.     |
| Amelia / WordPress / Stripe          | Aucune référence dans le dépôt.                                                           |
| Pages Reiki                          | `/formations-reiki` (3 degrés, tarifs 180/280/380 €) + ressource `/reiki`. Pas de 4ᵉ degré proposé. |
| Pages soins / chamanisme / enfants   | `/soins-energetiques`, `/chamanisme`. Pas de page « enfants » dédiée : tarifs enfant intégrés aux pages et à `/tarifs`. |
| Coordonnées                          | Centralisées dans `src/data/site.ts` (adresse, téléphone, e-mail, réseaux, fiche Google). |
| Pages légales                        | `/mentions-legales` (hébergeur = GitHub Pages, SIRET à compléter), `/politique-de-confidentialite`. |
| Analytics                            | **Aucun** outil de mesure sur le site Astro.                                              |
| SEO                                  | `<title>`, description, canonical, Open Graph, JSON-LD `HealthAndBeautyBusiness` sur l'accueil, `@astrojs/sitemap`, `robots.txt` (Allow all + sitemap). |

### Le site actuellement en production sur le domaine

`carolineloire-energeticienne.fr` pointe aujourd'hui (IP 109.234.161.194) sur un **WordPress
hébergé chez o2switch**, pas sur Hostinger ni sur ce dépôt :

- WordPress 7.1 + Elementor, **Amelia** (réservation en ligne sur la page Tarifs, `#reservation`),
  **WooCommerce + Stripe** (clé publique live, paiement en 3× et **carte cadeau** `/produit/carte-cadeau/`),
  **Site Kit** avec le tag Google `GT-MQBLDX3`.
- Ce que Systeme.io doit donc remplacer fonctionnellement : réservation (Amelia), encaissement
  en ligne (WooCommerce/Stripe), mesure (Site Kit). La carte cadeau n'existe pas dans le site
  Astro : à recréer comme produit Systeme.io si Caroline y tient (voir § 7).

### Le compte Systeme.io de Caroline (observé le 23/08/2026, rien modifié)

- Espace de travail « Caroline Loire ». Prénom du profil orthographié « Catoline » → à corriger.
- Domaine : **`rdv-carolineloire-energeticienne.systeme.io`**, statut « Prêt ».
- CRM → Calendrier : 1 événement « Séance énergétique » (60 min, face à face). **Hôte = e-mail de
  Julien** (`julien.duplouy90@gmail.com`), nom d'hôte « rdv.carolineloire-energeticienne »,
  **aucune disponibilité** renseignée. À reprendre (§ 9).
- Aucun tunnel, aucun site web, aucun workflow. 1 contact. Passerelle de paiement : aucune
  connectée a priori (page Stripe non connectée visible).
- **Offre Startup (17 €/mois)** sur l'espace de Caroline : 5 000 contacts, 10 tunnels, **10 tags
  (tous utilisés)**, **5 workflows**, 10 règles d'automatisation, 10 campagnes email, 5 domaines.
  Les 5 workflows prévus rentrent pile ; au-delà, offre Webinaire (47 €/mois).

### Fait le 23/08/2026 dans Systeme.io (espace « Caroline Loire »)

- Tunnel **« Site — Réservation et formations »** (domaine `rdv-carolineloire-energeticienne.systeme.io`).
- Page **`/reservation`** (type Page de capture) : titre, élément Calendrier relié à l'événement
  « Séance énergétique » (prénom, nom, e-mail, téléphone), message de confirmation, Poppins /
  Inter, couleur `#4DA0A8`, SEO + **noindex**.
- Page **`/formations-reiki`** (Page de capture) : titre, formulaire prénom / nom / e-mail /
  téléphone + case consentement, bouton « Recevoir le programme et les dates », **règle :
  ajouter le tag `interet-reiki`**, message de confirmation, noindex.
- **10 tags** créés (voir `workflows.md`).
- Les deux URLs sont renseignées dans `src/data/systeme.ts` (`booking`, `reikiInfo`).

---

## 2. Modifications réalisées sur le site

| Fichier                                        | Rôle                                                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/data/systeme.ts` **(nouveau)**            | Configuration centrale : `SYSTEME_DOMAIN`, `SYSTEME_URLS`, embed du formulaire, UTM, URL avis Google, noms des événements, helpers `systemeHref()` / `hasSysteme()`. |
| `src/data/analytics.ts` **(nouveau)**          | Identifiants GA4 / Meta Pixel (vides = rien n'est chargé).                                         |
| `src/layouts/BaseLayout.astro`                 | Couche de suivi `window.clTrack` + clic sur `[data-track]` → `gtag` / `dataLayer` / `fbq`. Chargement GA4 conditionnel. |
| `src/components/Header.astro`                  | CTA « Prendre rendez-vous » (desktop + menu mobile) → `systemeHref('booking')`, événement `clic_prendre_rdv`. |
| `src/components/MobileBar.astro`               | Bouton « Prendre RDV » de la barre mobile → idem, label `barre-mobile`.                            |
| `src/components/CtaBand.astro`                 | Nouvelles props `primaryKey` (clé Systeme.io, cascade possible) et `primaryTrack`.                 |
| `src/pages/soins-energetiques.astro`           | Encart + bandeau → `['energeticSession', 'booking']`, libellé « Réserver un soin énergétique ».    |
| `src/pages/chamanisme.astro`                   | Encart + bandeau → `['shamanicSession', 'booking']`.                                               |
| `src/pages/tarifs.astro`                       | Bouton → `booking`, label `tarifs`.                                                                |
| `src/pages/formations-reiki.astro`             | Un bouton par degré → `['reiki1'|'reiki2'|'reiki3', 'reikiInfo']`, événement `clic_reiki` ; bandeau → `reikiInfo`, événement `clic_formation`. Libellés adaptés selon que la page Systeme.io existe. |
| `src/pages/index.astro`                        | Liens vers les formations mesurés (`clic_formation`). Aucun lien externe sur l'accueil.            |
| `src/pages/[slug].astro`                       | Bandeau des ressources explicitement interne (pas de Systeme.io, pas d'événement).                 |
| `src/pages/contact.astro`                      | Bouton « Réserver en ligne » si `booking` est configuré ; formulaire Systeme.io embarqué si `SYSTEME_CONTACT_FORM_EMBED` est renseigné (sinon formulaire statique inchangé) ; case facultative « recevoir des nouvelles » ; événement `formulaire_envoye`. |
| `src/pages/politique-de-confidentialite.astro` | Section « Prise de rendez-vous et inscriptions » (Systeme.io sous-traitant, données minimales, transactionnel vs commercial, désinscription, conservation). |

Aucune dépendance ajoutée. Aucune clé API dans le front. Tant que `SYSTEME_URLS` est vide, le
site se comporte **exactement comme avant** (tous les CTA → `/contact`).

---

## 3. URLs Systeme.io à renseigner (`src/data/systeme.ts`)

Créer dans Systeme.io un **tunnel** (Sites → Tunnels de vente → Créer, type « Collecter des
emails » ou « Personnalisé »), domaine `rdv-carolineloire-energeticienne.systeme.io`, avec les
pages suivantes. Le slug de chaque page est libre mais voici la convention recommandée :

```text
SYSTEME_URLS.booking          = https://rdv-carolineloire-energeticienne.systeme.io/reservation
SYSTEME_URLS.energeticSession = https://rdv-carolineloire-energeticienne.systeme.io/seance-energetique
SYSTEME_URLS.shamanicSession  = https://rdv-carolineloire-energeticienne.systeme.io/seance-chamanisme
SYSTEME_URLS.reikiInfo        = https://rdv-carolineloire-energeticienne.systeme.io/formations-reiki
SYSTEME_URLS.reiki1           = https://rdv-carolineloire-energeticienne.systeme.io/reiki-1
SYSTEME_URLS.reiki2           = https://rdv-carolineloire-energeticienne.systeme.io/reiki-2
SYSTEME_URLS.reiki3           = https://rdv-carolineloire-energeticienne.systeme.io/reiki-3
SYSTEME_URLS.reiki4           = (ne pas créer : pas de 4e degré proposé aujourd'hui)
SYSTEME_URLS.contact          = (optionnel — seulement si on préfère une page plutôt que l'embed)
```

Règles :

- **Ne coller une URL que lorsque la page est publiée et testée.** Vide = repli sur `/contact`.
- Cascade : `energeticSession` / `shamanicSession` vides → les boutons des pages Soins et
  Chamanisme utilisent `booking`. `reiki1/2/3` vides → les boutons de chaque degré utilisent
  `reikiInfo`. On peut donc démarrer avec **2 pages seulement** : `reservation` et
  `formations-reiki`.
- Chaque lien sortant porte `utm_source=site&utm_medium=cta&utm_campaign=<clé>&utm_content=<emplacement>`
  (désactivable via `SYSTEME_UTM.enabled`). Les UTM apparaissent dans les statistiques du tunnel.

Contenu minimal de chaque page Systeme.io :

| Page                 | Contenu                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `/reservation`       | Titre, 2–3 lignes, **élément Calendrier** avec choix de l'événement (Séance énergétique 1 h / 1 h 30, Chamanisme et énergies 2 h / 2 h 30, Enfant 1 h), rappel tarif complet / solidaire, lien retour vers le site. |
| `/seance-energetique`| Idem avec le seul événement « Séance énergétique » présélectionné.                                                            |
| `/seance-chamanisme` | Idem avec « Chamanisme et énergies ».                                                                                         |
| `/formations-reiki`  | Présentation des 3 degrés, **formulaire** (prénom, e-mail, téléphone facultatif, degré souhaité = liste déroulante, case consentement), bouton « Recevoir le programme et les prochaines dates ». |
| `/reiki-1` `/reiki-2` `/reiki-3` | Page d'inscription du degré : programme, tarif, prochaines dates, formulaire ou bouton de paiement (acompte ou totalité, § 7). |
| Page de remerciement | Une par tunnel : « Merci, c'est noté » + bouton « Retour au site » → URL du site principal (domaine temporaire Hostinger, ou WordPress tant qu'il reste la référence — à trancher).               |

Dans les paramètres de chaque page Systeme.io : **cocher « Ne pas indexer »** (noindex) — les
pages SEO restent sur le site principal.

---

## 4. Parcours principal — réservation d'une séance

```text
Site : CTA « Prendre rendez-vous » (header, barre mobile, encarts, bandeaux)
   ↓  clic_prendre_rdv (+ UTM)
Systeme.io /reservation : choix de l'événement → créneau → Prénom · Nom · E-mail · Téléphone
   ↓
Confirmation à l'écran (page de remerciement, bouton « Retour au site »)
   ↓
Contact créé/mis à jour dans le CRM + tag `rdv-reserve`
   ↓
Email de confirmation (immédiat)
   ↓
Rappel 24 h avant (+ rappel le matin même, optionnel)
   ↓
Après la séance : tag `seance-realisee` posé par Caroline → suivi → avis Google
```

Le formulaire de réservation ne demande **que** prénom, nom, e-mail, téléphone. Pas de
question de santé. Le téléphone sert au rappel SMS/appel de Caroline si besoin.

---

## 5. Formulaire de contact — décision

**Option retenue : A — formulaire Systeme.io embarqué dans la page `/contact` du site**
(`SYSTEME_CONTACT_FORM_EMBED`), avec le formulaire statique actuel conservé comme repli.

Pourquoi :

- Le site est 100 % statique : l'option B (webhook/API Systeme.io) exigerait une clé API
  secrète, donc un serveur ou une fonction intermédiaire à maintenir — contraire à « pas
  d'infrastructure custom ».
- Avec l'embed, le visiteur reste sur le site (même univers), le contact arrive directement
  dans le CRM avec le tag `prospect-contact` et déclenche le workflow « Prospect sans
  rendez-vous ». Zéro maintenance.
- Transférable : si Systeme.io disparaît, on vide la constante et le formulaire statique
  (mailto / Formspree) reprend instantanément.

À faire dans Systeme.io : créer le formulaire (dans une page du tunnel, élément « Formulaire »)
avec les champs prénom, nom, e-mail, téléphone (facultatif), objet (liste : Demande
d'informations / Soin énergétique / Chamanisme / Formation Reiki / Autre), message (champ
personnalisé texte long), case consentement obligatoire « répondre à ma demande », case
facultative « recevoir des nouvelles ». Récupérer le code d'intégration (embed) et le coller
dans `SYSTEME_CONTACT_FORM_EMBED`. Réglages de style : voir `charte.md`.

Limite connue : le formulaire embarqué charge un script Systeme.io sur la page Contact
uniquement (les autres pages restent sans JS tiers).

---

## 6. Tracking

Événements émis par le site (`src/layouts/BaseLayout.astro`) :

| Événement           | Quand                                                                   | `label` possible                                  |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| `clic_prendre_rdv`  | clic sur un CTA de réservation                                          | `header`, `menu-mobile`, `barre-mobile`, `bandeau`, `page-soins`, `page-chamanisme`, `tarifs`, `contact` |
| `clic_reiki`        | clic sur le bouton d'un degré Reiki                                     | `reiki1`, `reiki2`, `reiki3`                      |
| `clic_formation`    | clic vers la page / la demande de programme des formations              | `accueil-hero`, `accueil-formations`, `bandeau`   |
| `formulaire_envoye` | envoi réussi du formulaire statique (`mode` = `mailto` ou `formspree`)  | —                                                 |

Chaque événement contient aussi `page` (chemin) et `destination` (href).

Réception :

- **GA4** : renseigner `ANALYTICS.gaMeasurementId` → `gtag('event', …)` est appelé. ⚠ Nécessite
  une bannière de consentement (CNIL) avant activation — non installée à ce jour. L'ancien
  WordPress utilisait `GT-MQBLDX3` (tag Google via Site Kit) ; vérifier dans le compte Google
  de Caroline si une propriété GA4 y est rattachée et réutiliser son `G-…`.
- **GTM** : sans `gtag`, les événements sont poussés dans `window.dataLayer` (format
  `{ event, label, page, destination }`).
- **Meta Pixel** (futur) : si `fbq` existe, `fbq('trackCustom', …)` est appelé. Le chargeur
  n'est **pas** inclus ; `ANALYTICS.metaPixelId` est réservé.
- **Systeme.io** : les UTM des liens sortants permettent de voir d'où viennent les contacts.
  Pour le formulaire embarqué, l'événement `formulaire_envoye` n'est pas émis par le site
  (le script est celui de Systeme.io) : utiliser les statistiques du tunnel.

Alternative sans cookie ni bannière : Plausible / Umami (script léger) — les événements
`window.clTrack` peuvent y être reliés en 3 lignes si Julien le décide.

---

## 7. Paiements (Stripe de Caroline)

- Ne **jamais** connecter un compte Stripe Elyo. Le compte à utiliser est celui de Caroline,
  déjà en production sur l'ancien WordPress (clé publique live `pk_live_51Q…`).
- Dans Systeme.io : Paramètres → Passerelles de paiement → **Stripe → Connecter**. La connexion
  se fait par Stripe Connect (Caroline se connecte à son compte Stripe dans la fenêtre Stripe ;
  aucune clé à copier, aucune clé dans le site).
- Cas d'usage pertinents :
  1. **Formations Reiki** : produit « Reiki 1er degré » 180 € (idem 280 € / 380 €) avec option
     acompte (ex. 60 €) ou paiement en 3× (Systeme.io gère les plans de paiement).
  2. **Carte cadeau** (existait sur WordPress, 20 € → 100 €) : produit à montant variable ou
     3–4 montants fixes ; Caroline envoie le bon manuellement.
  3. **Séances** : rester **sans paiement en ligne** au départ (paiement au cabinet, comme
     l'indique le site). Ajouter un acompte uniquement si les absences deviennent un problème.
- Les emails de facturation sont envoyés par Systeme.io (renseigner l'adresse et les mentions
  de facturation dans Paramètres → Profil / Paramètres de paiement avec les infos de Caroline).

---

## 8. Configuration DNS

**Rien à faire côté Systeme.io pour démarrer** : `rdv-carolineloire-energeticienne.systeme.io`
est un sous-domaine fourni par Systeme.io, déjà « Prêt ». Aucune modification DNS n'a été faite.

1. **Site principal → Hostinger, sur le domaine temporaire de Caroline.** Le WordPress
   historique (`carolineloire-energeticienne.fr`, o2switch) **n'est pas touché** : pas de DNS,
   pas de redirection. Le site Astro est donc en `noindex` tant qu'il vit sur le domaine
   temporaire (`purple-raven-386267.hostingersite.com`). Déploiement Git Hostinger en place,
   sans secret — voir le README du dépôt, section « Mise en ligne (Hostinger) ».
   Conséquence pour Systeme.io : les liens « Retour au site » des pages Systeme.io doivent
   pointer vers le domaine temporaire (ou vers le WordPress, au choix de Julien) — à trancher
   avant de créer les pages.
2. **Sous-domaine personnalisé** (`rdv.carolineloire-energeticienne.fr`) : **exclu pour
   l'instant**, cela exigerait un enregistrement CNAME dans les DNS du domaine WordPress, qu'on
   ne touche pas. Le sous-domaine `…systeme.io` suffit.
3. **E-mails d'envoi** : pour que les emails automatiques partent de `contact@carolineloire-energeticienne.fr`
   (plutôt que de `carolinenergies@yahoo.com` — Yahoo rejette souvent l'envoi via des tiers,
   DMARC strict), créer cette adresse chez l'hébergeur mail et, dans Systeme.io → Paramètres →
   Emails, ajouter les enregistrements **SPF/DKIM** fournis. Fortement recommandé avant
   d'activer les workflows.

---

## 9. Google Calendar

```text
Systeme.io → CRM → Calendrier
  → Événements : « Séance énergétique », « Chamanisme et énergies », « Séance enfant »
  → Hôte : Caroline (nom « Caroline Loire », photo de Caroline, e-mail DE CAROLINE)
  → Disponibilité : créneaux hebdomadaires du cabinet + absences
  → Connexion Google Calendar : compte Google de Caroline (ajout automatique des RDV + blocage des créneaux déjà pris)
```

- L'événement actuel a pour hôte **l'adresse de Julien** : à remplacer par l'adresse Google de
  Caroline **avant** toute réservation réelle (les invitations partent de l'hôte).
- La connexion Google se fait depuis l'écran de l'événement / Disponibilité (bouton de connexion
  de calendrier) avec Caroline connectée à son compte Google. Si l'option n'apparaît pas dans
  son offre Systeme.io, solution de repli : Caroline reçoit l'e-mail de notification de chaque
  réservation et l'ajoute à son agenda (ou abonnement iCal si proposé).
- Régler : délai minimum avant réservation (ex. 24 h), limite journalière, temps tampon entre
  deux séances (ex. 30 min), fuseau Europe/Paris, annulation possible jusqu'à 24 h avant.

---

## 10. SEO

- Toutes les pages de contenu restent sur le site principal (énergéticienne Bagnères-de-Bigorre,
  soins, chamanisme, formations Reiki, ressources, tarifs, contact). Rien n'a été déplacé.
- Les pages Systeme.io sont des pages de conversion : **noindex** dans leurs paramètres, titre
  propre, et un lien « Retour au site » vers le domaine principal.
- Les liens sortants sont en `<a href>` standard (pas de redirection JS) : aucun impact sur le
  maillage interne ; les UTM ne concernent que Systeme.io.
- `sitemap-index.xml` et `robots.txt` inchangés (à mettre à jour uniquement lors du passage au
  domaine principal, § 8).

---

## 11. Expérience utilisateur et mobile

- Le passage site → Systeme.io se fait dans le même onglet (pas de `target="_blank"`), avec une
  page Systeme.io reprenant logo, couleurs, polices et ton (voir `charte.md`).
- Vérifié en viewport 375 px : aucun débordement horizontal, CTA ≥ 48 px de haut, barre mobile
  fixe « Appeler / Prendre RDV » présente sur toutes les pages, menu mobile avec CTA, formulaire
  embarqué affiché dans la carte « Écrire un message ».
- À tester une fois les pages Systeme.io créées : la page `/reservation` sur smartphone
  (calendrier lisible, boutons ≥ 44 px, formulaire court), puis la page de remerciement et le
  bouton « Retour au site ».

---

## 12. RGPD

- Données demandées : prénom, nom, e-mail, téléphone, créneau / formation. **Aucune donnée de
  santé** dans les formulaires marketing ; les échanges sensibles se font en séance.
- Emails **transactionnels** (confirmation, rappel, suivi de séance) : base légale = exécution
  de la prestation, pas de case à cocher. Emails **commerciaux** (nouvelles, dates de
  formations, relance prospect) : case facultative « recevoir des nouvelles » → tag
  `consent-nouvelles` ; lien de désinscription automatique de Systeme.io dans chaque email.
- Politique de confidentialité du site mise à jour (sous-traitant Systeme.io, finalités,
  durées, droits). Dans Systeme.io, ajouter sous chaque formulaire un lien vers
  la page `/politique-de-confidentialite/` du site principal.
- Conservation : contacts sans interaction depuis 3 ans → suppression (règle manuelle annuelle
  ou automatisation simple sur un tag `inactif`).

---

## 13. Actions manuelles restantes

```text
Systeme.io — compte
[ ] corriger le prénom du profil (« Catoline » → « Caroline »), adresse et infos de facturation de Caroline
[ ] Paramètres → Emails : adresse d'expédition de Caroline + SPF/DKIM du domaine
[ ] Paramètres → Passerelles de paiement → Stripe → connecter le compte Stripe DE CAROLINE

Calendrier
[ ] événement « Séance énergétique » : hôte = Caroline (nom, photo, e-mail de Caroline), description, lieu = cabinet
[ ] créer « Chamanisme et énergies » (2 h / 2 h 30) et « Séance enfant » (1 h)
[ ] Disponibilité hebdomadaire + absences ; délai minimum, tampon, limite journalière
[ ] connecter le Google Calendar de Caroline
[ ] rappel intégré du calendrier : 24 h avant (ou le laisser au workflow 1, pas les deux)

Pages (tunnel « Site — conversion »)
[x] /reservation (élément Calendrier, confirmation intégrée)
[x] /formations-reiki (formulaire + tag interet-reiki, confirmation intégrée)
[ ] ajouter à ces 2 pages : logo, texte d'intro, tarifs, lien « Retour au site », lien politique de confidentialité
[ ] /reiki-1, /reiki-2, /reiki-3 (inscription / paiement) — optionnel au démarrage
[ ] /seance-energetique, /seance-chamanisme — optionnel
[ ] formulaire de contact (embed) → coller dans SYSTEME_CONTACT_FORM_EMBED
[ ] noindex sur toutes les pages Systeme.io, lien « Retour au site », lien politique de confidentialité
[ ] appliquer charte.md (logo, couleurs, polices, boutons)

CRM
[x] créer les tags (10 — limite de l'offre Startup)
[ ] créer les 2 pipelines (workflows.md § Pipelines)

Workflows
[ ] W1 Nouveau rendez-vous
[ ] W2 Après la séance
[ ] W3 Avis Google (renseigner GOOGLE_REVIEW_WRITE_URL : fiche Google → « Obtenir plus d'avis » → copier le lien)
[ ] W4 Prospect sans rendez-vous
[ ] W5 Intérêt Reiki
[ ] créer les emails (emails.md) et relire avec Caroline

Site
[x] booking et reikiInfo collés dans src/data/systeme.ts
[ ] optionnel : GOOGLE_REVIEW_WRITE_URL, ANALYTICS.gaMeasurementId (avec bannière) 
[ ] build, PR, merge → déploiement

Tests de bout en bout
[ ] réserver une séance test depuis un smartphone (site → Systeme.io → confirmation)
[ ] vérifier : contact dans le CRM, tag rdv-reserve, email de confirmation reçu, RDV dans le Google Calendar de Caroline
[ ] simuler « seance-realisee » sur le contact test → vérifier suivi + demande d'avis (réduire les délais pendant le test)
[ ] envoyer le formulaire de contact → tag prospect-contact + email immédiat
[ ] demande Reiki → tag interet-reiki-1 + email récapitulatif
[ ] supprimer le contact test

Domaine / hébergement
[x] site configuré pour Hostinger (base '/', workflow FTPS, .htaccess sans redirection, noindex, mentions légales)
[x] site PHP/HTML purple-raven-386267.hostingersite.com créé, déploiement Git Hostinger branché
[ ] vérifier le SSL du domaine temporaire dans hPanel
[ ] NE PAS toucher au WordPress / DNS de carolineloire-energeticienne.fr
[ ] mentions légales : SIRET, statut
[ ] sous-domaine rdv.carolineloire-energeticienne.fr (CNAME) — optionnel, après migration
[ ] désactiver Amelia / WooCommerce sur l'ancien WordPress seulement après bascule complète
```
