import { u } from './site';
import { GHL } from './ghl';

/* ------------------------------------------------------------------
   Systeme.io — configuration centralisée
   ------------------------------------------------------------------
   Le site principal (Hostinger) reste la base SEO. Systeme.io sert de
   moteur de conversion : calendrier, formulaires, CRM, emails.

   Règle : AUCUNE URL Systeme.io en dur ailleurs dans le site. Tout passe
   par `systemeHref()` ci-dessous, qui retombe sur une page interne tant
   que l'URL correspondante n'est pas renseignée. On peut donc déployer
   le site avant que les pages Systeme.io existent : rien ne casse.

   Pour activer une page : coller son URL publique complète dans
   SYSTEME_URLS (voir docs/systeme-io/README.md, section B).
   ------------------------------------------------------------------ */

/** Sous-domaine Systeme.io de Caroline (Paramètres → Domaines personnalisés). */
export const SYSTEME_DOMAIN = 'https://rdv-carolineloire-energeticienne.systeme.io';

/**
 * URLs publiques des pages Systeme.io. Laisser `''` tant que la page
 * n'est pas créée et publiée : le CTA renvoie alors vers `fallback`.
 *
 * Convention de slugs recommandée (à créer dans Systeme.io) :
 *   booking          → ${SYSTEME_DOMAIN}/reservation
 *   energeticSession → ${SYSTEME_DOMAIN}/seance-energetique
 *   shamanicSession  → ${SYSTEME_DOMAIN}/seance-chamanisme
 *   reikiInfo        → ${SYSTEME_DOMAIN}/formations-reiki
 *   reiki1           → ${SYSTEME_DOMAIN}/reiki-1
 *   reiki2           → ${SYSTEME_DOMAIN}/reiki-2
 *   reiki3           → ${SYSTEME_DOMAIN}/reiki-3
 *   reiki4           → ${SYSTEME_DOMAIN}/reiki-4   (non proposé à ce jour)
 *   contact          → ${SYSTEME_DOMAIN}/contact   (optionnel)
 */
export const SYSTEME_URLS = {
  /** Page de réservation générale (choix du type de séance). */
  booking: 'https://rdv-carolineloire-energeticienne.systeme.io/reservation',
  /** Réservation directe d'un soin énergétique. */
  energeticSession: '',
  /** Réservation directe d'une séance chamanisme et énergies. */
  shamanicSession: '',
  /** Page d'information / demande de programme pour les formations Reiki. */
  reikiInfo: 'https://rdv-carolineloire-energeticienne.systeme.io/formations-reiki',
  reiki1: '',
  reiki2: '',
  reiki3: '',
  reiki4: '',
  /** Page de contact Systeme.io (si on préfère ne pas embarquer le formulaire). */
  contact: '',
};

export type SystemeKey = keyof typeof SYSTEME_URLS;

/**
 * Formulaire de contact Systeme.io embarqué dans la page /contact.
 * Coller ici le code d'intégration fourni par Systeme.io
 * (Tunnel → page → formulaire → « Intégrer » / « Embed »).
 * Vide = le formulaire statique actuel (mailto / Formspree) reste actif.
 */
export const SYSTEME_CONTACT_FORM_EMBED = '';

/**
 * Paramètres UTM ajoutés aux liens sortants vers Systeme.io, pour retrouver
 * dans les statistiques Systeme.io d'où vient chaque contact.
 * `utm_content` reçoit l'emplacement du CTA (header, mobile-bar, tarifs…).
 */
export const SYSTEME_UTM = {
  enabled: true,
  source: 'site',
  medium: 'cta',
};

/** Fiche Google Business Profile de Caroline — lien direct « Laisser un avis ». */
export const GOOGLE_REVIEW_WRITE_URL = '';

/** Événements de conversion mesurés (voir src/layouts/BaseLayout.astro). */
export const TRACK = {
  booking: 'clic_prendre_rdv',
  reiki: 'clic_reiki',
  formation: 'clic_formation',
  formSent: 'formulaire_envoye',
} as const;

export type TrackEvent = (typeof TRACK)[keyof typeof TRACK];

/**
 * Clés de réservation de séance. Elles sont servies par le calendrier
 * GoHighLevel (`GHL.booking`) tant qu'il est renseigné : c'est l'outil
 * réellement utilisé par Caroline. Les clés de formation Reiki continuent
 * de passer par Systeme.io.
 */
const CLES_RESERVATION: SystemeKey[] = ['booking', 'energeticSession', 'shamanicSession'];

const reservationGhl = (keys: SystemeKey[]): boolean =>
  Boolean(GHL.booking) && keys.some((k) => CLES_RESERVATION.includes(k));

/** Une destination existe-t-elle pour cette clé (GoHighLevel ou Systeme.io) ? */
export function hasSysteme(keys: SystemeKey | SystemeKey[]): boolean {
  const list = Array.isArray(keys) ? keys : [keys];
  return reservationGhl(list) || list.some((k) => Boolean(SYSTEME_URLS[k]));
}

/**
 * Lien d'un CTA : la première URL Systeme.io renseignée parmi `keys`
 * (une clé ou une liste de clés par ordre de préférence), sinon la page
 * interne de repli (`fallback`, ex. '/contact').
 *
 * Ex. : systemeHref(['energeticSession', 'booking'], '/contact', 'page-soins')
 *  → page « séance énergétique » si elle existe, sinon la réservation
 *    générale, sinon la page Contact du site.
 *
 * `placement` identifie l'emplacement du bouton (header, barre-mobile, …)
 * et alimente `utm_content` pour l'attribution dans Systeme.io.
 */
export function systemeHref(
  keys: SystemeKey | SystemeKey[],
  fallback = '/contact',
  placement?: string,
): string {
  const list = Array.isArray(keys) ? keys : [keys];
  if (reservationGhl(list)) return GHL.booking;
  const key = list.find((k) => SYSTEME_URLS[k]);
  if (!key) return u(fallback);
  const url = SYSTEME_URLS[key];
  if (!SYSTEME_UTM.enabled) return url;

  const out = new URL(url);
  out.searchParams.set('utm_source', SYSTEME_UTM.source);
  out.searchParams.set('utm_medium', SYSTEME_UTM.medium);
  out.searchParams.set('utm_campaign', key);
  if (placement) out.searchParams.set('utm_content', placement);
  return out.href;
}

/** Attributs `data-*` à poser sur un CTA pour le mesurer. */
export function trackAttrs(event: TrackEvent, label?: string) {
  return label ? { 'data-track': event, 'data-track-label': label } : { 'data-track': event };
}
