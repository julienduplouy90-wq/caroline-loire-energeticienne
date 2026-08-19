const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Lien interne : `u('/tarifs')` → `/caroline-loire-energeticienne/tarifs`. */
export function u(path = '/'): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${BASE}/${clean}` : `${BASE}/`;
}

/** Fichier de `public/` : `asset('images/logo.png')`. */
export function asset(path: string): string {
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}

export const SITE = {
  name: 'Caroline Loire',
  tagline: 'Énergéticienne · Praticienne en chamanisme · Maître Reiki enseignante',
  city: 'Bagnères-de-Bigorre',
  region: 'Hautes-Pyrénées',
  address: '20 rue Justin Daléas',
  zip: '65200',
  fullAddress: '20 rue Justin Daléas, 65200 Bagnères-de-Bigorre',
  phone: '07 44 73 34 35',
  phoneHref: 'tel:+33744733435',
  email: 'carolinenergies@yahoo.com',
  emailHref: 'mailto:carolinenergies@yahoo.com',
  instagram: 'https://www.instagram.com/caroline.loire.energeticienne/',
  facebook: 'https://www.facebook.com/profile.php?id=61552328472223',
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
export const GOOGLE_RATING = { score: 4.9, count: 31 };

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

export const PRICES = {
  soin: { full: 60, solidaire: 50, duration: '1 h à 1 h 30' },
  soinEnfant: { full: 40, duration: 'environ 1 h' },
  chamanisme: { full: 100, solidaire: 80, duration: '2 h à 2 h 30' },
  chamanismeEnfant: { full: 40, duration: 'environ 1 h' },
  reiki1: 180,
  reiki2: 280,
  reiki3: 380,
};

export const DISCLAIMER =
  'Les accompagnements proposés relèvent du bien-être et du développement personnel. Ils ne se substituent pas à un avis, un diagnostic ou un traitement médical ou psychologique.';
