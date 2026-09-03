import { PRICES } from './site';

/* ------------------------------------------------------------------
   Cartes cadeaux — configuration centralisée
   ------------------------------------------------------------------
   Demande de Caroline (3 septembre 2026) : elle vend des cartes cadeaux,
   y compris à distance. Son fonctionnement : elle encaisse elle-même
   (au cabinet, ou en envoyant un lien de paiement pour les achats à
   distance), crée un code dans son outil de réservation, puis envoie la
   carte à la personne qui offre.

   Le site s'insère dans ce fonctionnement sans le forcer :
   - la page publique /cartes-cadeaux présente l'offre et prend la
     commande par formulaire (aucun paiement sur le site) ;
   - l'outil privé /outils/carte-cadeau produit la carte imprimable que
     Caroline envoie, à la place de son ancien PDF à remplir à la main.
   ------------------------------------------------------------------ */

/**
 * Lien de paiement en ligne pour l'achat direct d'une carte cadeau
 * (par ex. un lien de paiement GoHighLevel/Stripe créé par Caroline).
 * Tant qu'il est vide, la page publique propose uniquement la commande
 * par formulaire : rien ne casse, comme pour les URLs Systeme.io.
 */
export const CARTE_CADEAU_PAIEMENT_URL = '';

/**
 * Formules proposées à l'achat. Les montants viennent des tarifs réels
 * (contenu.json → PRICES) : rien n'est écrit en dur ici.
 */
export const CARTE_CADEAU_FORMULES = [
  {
    id: 'soin',
    label: 'Soin énergétique',
    montant: `${PRICES.soin.full} €`,
    detail: `Une séance de ${PRICES.soin.duration}, au cabinet ou à distance.`,
  },
  {
    id: 'chamanisme',
    label: 'Chamanisme et énergies',
    montant: `${PRICES.chamanisme.full} €`,
    detail: `Un accompagnement en profondeur de ${PRICES.chamanisme.duration}, au cabinet.`,
  },
  {
    id: 'libre',
    label: 'Montant libre',
    montant: 'Au choix',
    detail: 'Vous choisissez le montant ; la personne l’utilise sur la séance qui lui correspond.',
  },
] as const;

/** Libellés du champ « Formule » du formulaire de commande. */
export const CARTE_CADEAU_CHOIX = CARTE_CADEAU_FORMULES.map((f) =>
  f.id === 'libre' ? 'Montant libre (à préciser dans le message)' : `${f.label} — ${f.montant}`,
);
