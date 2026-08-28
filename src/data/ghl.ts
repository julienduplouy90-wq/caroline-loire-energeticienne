/* ------------------------------------------------------------------
   GoHighLevel / LeadConnector — configuration centralisée
   ------------------------------------------------------------------
   Ces trois identifiants viennent du sous-compte GoHighLevel de Caroline.
   Ils étaient en ligne sur purple-raven-386267.hostingersite.com mais
   n'existaient nulle part dans ce dépôt : la version déployée avait été
   envoyée dans public_html en dehors du flux Git. Ils sont récupérés ici
   depuis le HTML qui était servi, pour que le déploiement automatique
   (main → branche hostinger → hPanel) ne les efface plus jamais.

   Mettre une valeur à '' désactive proprement l'élément correspondant.
   ------------------------------------------------------------------ */

export const GHL = {
  /** Widget de discussion (bulle en bas à droite), chargé sur toutes les pages. */
  chatWidgetId: '6a8d71e3ce390e2587ab900f',
  /**
   * Page du site où l'on choisit son format avant de voir un calendrier.
   * C'est la destination de tous les CTA « Prendre rendez-vous » : le visiteur
   * doit choisir entre cabinet et distance (jours, paiement et tarifs
   * différents) avant d'atterrir sur des créneaux.
   */
  bookingPage: '/reservation',
  /** Calendrier des séances au cabinet (paiement sur place). */
  booking: 'https://api.leadconnectorhq.com/widget/booking/dUfRUC3k5Peb6lqOEUjj',
  /** Groupe de calendriers des séances à distance (paiement Stripe). */
  bookingRemote: 'https://api.leadconnectorhq.com/widget/groups/seances-a-distance',
  /** Formulaire « Premier échange » embarqué sur l'accueil. */
  form: 'https://api.leadconnectorhq.com/widget/form/LB4hCG385mNuKIViplFc',
};

/** Le formulaire avec ses paramètres de suivi (d'où vient le contact). */
export const GHL_FORM_SRC = GHL.form
  ? `${GHL.form}?source=site-caroline&campaign=premier-echange`
  : '';
