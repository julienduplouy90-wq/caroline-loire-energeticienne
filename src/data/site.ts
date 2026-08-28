import contenu from './contenu.json';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Lien interne : `u('/tarifs')` → `/tarifs/` (barre oblique finale, cf.
 * `trailingSlash: 'always'` dans astro.config.mjs). Les ancres sont
 * conservées : `u('/tarifs#reiki')` → `/tarifs/#reiki`.
 */
export function u(path = '/'): string {
  const [p, hash] = path.split('#');
  const clean = p.replace(/^\/+|\/+$/g, '');
  const href = clean ? `${BASE}/${clean}/` : `${BASE}/`;
  return hash ? `${href}#${hash}` : href;
}

/** Fichier de `public/` : `asset('images/logo.png')`. */
export function asset(path: string): string {
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}

/**
 * Indexation par Google. `false` tant que le site est servi sur le domaine
 * temporaire Hostinger : l'ancien WordPress (carolineloire-energeticienne.fr)
 * reste le site de référence et ne doit pas être concurrencé par un doublon.
 * Passer à `true` (et mettre à jour `site` dans astro.config.mjs + robots.txt)
 * le jour où ce site prend un vrai domaine.
 */
export const INDEXABLE = false;

// Les valeurs de base (coordonnées, tarifs, note Google) vivent dans
// contenu.json, modifiable depuis le CMS (/admin) sans toucher au code.
const C = contenu.coordonnees;

const phoneDigits = C.telephone.replace(/\D/g, '');
const phoneE164 = '+33' + phoneDigits.replace(/^0/, '');

export const SITE = {
  name: C.nom,
  tagline: C.sousTitre,
  city: C.ville,
  region: 'Hautes-Pyrénées',
  address: C.adresse,
  zip: C.codePostal,
  fullAddress: `${C.adresse}, ${C.codePostal} ${C.ville}`,
  phone: C.telephone,
  phoneE164,
  phoneHref: `tel:${phoneE164}`,
  /**
   * Caroline répond facilement aux SMS : le lien `sms:` est proposé à côté
   * du téléphone pour les personnes qui n'osent pas appeler.
   */
  smsHref: `sms:${phoneE164}`,
  instagram: C.instagram,
  facebook: C.facebook,
  googleReviewsUrl: 'https://share.google/KVNhPcXqVOGVyyrhT',
  /**
   * Aucun calendrier de réservation n'est configuré (confirmé au brief) :
   * le CTA « Prendre rendez-vous » renvoie vers la page Contact du site.
   */
  bookingPath: '/contact',
  /**
   * Destinataire du formulaire de contact.
   *
   * Août 2026 : l'adresse e-mail de Caroline n'apparaît plus nulle part sur le
   * site (demande de sa part). Les messages passent par le formulaire, qui les
   * envoie au script PHP `public/envoi-message.php` — c'est lui, et lui seul,
   * qui connaît l'adresse de réception. Les visiteurs n'ont donc plus d'adresse
   * à copier, et les robots collecteurs n'ont rien à ramasser.
   */
  formEndpoint: '/envoi-message.php',
};

/** Note globale Google réelle (fiche Caroline Loire). */
export const GOOGLE_RATING = { score: contenu.avisGoogle.score, count: contenu.avisGoogle.nombre };

export const IMG = {
  logo: asset('images/logo.png'),
  /** Même logo, recoloré en crème pour les fonds bleu canard (pied de page). */
  logoClair: asset('images/logo-clair.png'),
  monogram: asset('images/monogram.png'),
  monogramClair: asset('images/monogram-clair.png'),
  soin: asset('images/soin.jpg'),
  carte: asset('images/carte.jpg'),
  cabinet: asset('images/cabinet.jpg'),
  caroline: asset('images/caroline.jpg'),
  rituel: asset('images/rituel.jpg'),
  dreamcatcher: asset('images/dreamcatcher.webp'),
  salon: asset('images/salon.jpg'),
  tambouloup: asset('images/tambouloup.png'),
};

/**
 * Tambouloup — l'école du chaman d'Alexandre Godgenger (Gerde, 65).
 * Partenariat : Alexandre transmet le voyage chamanique en stage, Caroline
 * accompagne en séance individuelle les personnes qui souhaitent aller plus
 * loin. Toutes les données du partenaire vivent ici : aucune URL ni aucun
 * numéro en dur dans les pages.
 */
export const TAMBOULOUP = {
  name: 'Tambouloup',
  baseline: 'L’école du chaman',
  site: 'https://tambouloup.fr/',
  formation: 'https://tambouloup.fr/formation-chamanisme/',
  guide: 'https://tambouloup.fr/alexandre/',
  faq: 'https://tambouloup.fr/faq/',
  rappel: 'https://tambouloup.fr/rappel/',
  animator: 'Alexandre Godgenger',
  phone: '06 64 97 77 49',
  phoneHref: 'tel:+33664977749',
  place: 'Au Mélilot, chemin des Humas, 65200 Gerde',
  price: '150 €',
  duration: 'deux jours — samedi et dimanche, de 12 h à 18 h',
};

export const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/soins-energetiques', label: 'Soins énergétiques' },
  { to: '/chamanisme', label: 'Chamanisme' },
  { to: '/formations-reiki', label: 'Formations Reiki' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/contact', label: 'Contact' },
];

/** Page partenaire : absente de la barre du haut (déjà pleine sur ordinateur). */
export const ATELIERS = { to: '/ateliers-chamaniques', label: 'Ateliers chamaniques' };

/** Navigation complète : menu du téléphone et pied de page. */
export const NAV_FULL = [...NAV.slice(0, 3), ATELIERS, ...NAV.slice(3)];

export const RESOURCES = [
  { to: '/reiki', label: 'Reiki' },
  { to: '/shamballa', label: 'Shamballa' },
  { to: '/lahochi', label: 'LaHoChi' },
  { to: '/lithotherapie', label: 'Lithothérapie' },
  { to: '/radiesthesie', label: 'Radiesthésie' },
  { to: '/oracles', label: 'Oracles' },
  { to: '/fleurs-de-bach', label: 'Fleurs de Bach' },
  { to: '/hypnose', label: 'Hypnose' },
];

export const PRICES = contenu.tarifs;
