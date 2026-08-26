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
 * Indexation par Google. `true` : le site est servi sur le domaine principal
 * carolineloire-energeticienne.fr et remplace l'ancien WordPress.
 * Repasser à `false` (+ robots.txt en Disallow) si le site devait revenir sur
 * un domaine temporaire.
 */
export const INDEXABLE = true;

// Les valeurs de base (coordonnées, tarifs, note Google) vivent dans
// contenu.json, modifiable depuis le CMS (/admin) sans toucher au code.
const C = contenu.coordonnees;

export const SITE = {
  name: C.nom,
  tagline: C.sousTitre,
  city: C.ville,
  region: 'Hautes-Pyrénées',
  address: C.adresse,
  zip: C.codePostal,
  fullAddress: `${C.adresse}, ${C.codePostal} ${C.ville}`,
  phone: C.telephone,
  phoneHref: 'tel:+33' + C.telephone.replace(/\D/g, '').replace(/^0/, ''),
  email: C.email,
  emailHref: `mailto:${C.email}`,
  instagram: C.instagram,
  facebook: C.facebook,
  googleReviewsUrl: 'https://share.google/KVNhPcXqVOGVyyrhT',
  /**
   * Aucun calendrier de réservation n'est configuré (confirmé au brief) :
   * le CTA « Prendre rendez-vous » renvoie vers la page Contact du site.
   */
  bookingPath: '/contact',
  /**
   * Endpoint Formspree (https://formspree.io) pour le formulaire de contact.
   * Vide = le formulaire bascule automatiquement sur l'ouverture du logiciel
   * de messagerie (mailto). Renseigner l'ID pour recevoir les messages par e-mail.
   */
  formEndpoint: '',
};

/** Note globale Google réelle (fiche Caroline Loire). */
export const GOOGLE_RATING = { score: contenu.avisGoogle.score, count: contenu.avisGoogle.nombre };

export const IMG = {
  logo: asset('images/logo.png'),
  monogram: asset('images/monogram.png'),
  soin: asset('images/soin.jpg'),
  carte: asset('images/carte.jpg'),
  cabinet: asset('images/cabinet.jpg'),
  caroline: asset('images/caroline.jpg'),
  rituel: asset('images/rituel.jpg'),
  dreamcatcher: asset('images/dreamcatcher.webp'),
  salon: asset('images/salon.jpg'),
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

export const DISCLAIMER =
  'Les accompagnements proposés relèvent du bien-être et du développement personnel. Ils ne se substituent pas à un avis, un diagnostic ou un traitement médical ou psychologique.';
