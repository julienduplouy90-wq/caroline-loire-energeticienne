/* ------------------------------------------------------------------
   Mesure d'audience — configuration
   ------------------------------------------------------------------
   Aucun outil n'est chargé tant que les identifiants sont vides.
   Les événements de conversion (clic_prendre_rdv, clic_reiki,
   clic_formation, formulaire_envoye) sont émis dans tous les cas via
   `window.dataLayer` : GA4, GTM ou Meta Pixel les récupèrent s'ils sont
   présents (voir le script de suivi dans src/layouts/BaseLayout.astro).

   RGPD : GA4 dépose des cookies → ne renseigner `gaMeasurementId` qu'avec
   une bannière de consentement en place (non fournie à ce jour). Une
   alternative sans cookie (Plausible, Umami, Matomo configuré exempté
   CNIL) peut être branchée sans bannière.
   ------------------------------------------------------------------ */
export const ANALYTICS = {
  /** Identifiant GA4 « G-XXXXXXXXXX » (l'ancien site WordPress utilisait le tag Google GT-MQBLDX3). */
  gaMeasurementId: '',
  /** Identifiant Meta Pixel — prévu, NON installé : le chargeur n'est pas inclus volontairement. */
  metaPixelId: '',
};
