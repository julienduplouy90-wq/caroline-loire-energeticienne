# Workflows, tags et pipelines Systeme.io

À reproduire dans Systeme.io → **Automatisations → Workflows** (pas « Règles » : les règles
n'ont pas de délais). Les textes des emails sont dans [`emails.md`](emails.md).

Principe : **5 workflows, pas plus.** On automatise la logistique (confirmation, rappel,
suivi, avis, relance), pas la relation. Aucun workflow n'envoie plus de 3 emails commerciaux.

Convention de nommage : `W1 – Nouveau rendez-vous`, emails `E1.1 Confirmation RDV`, tags en
minuscules avec tirets.

---

## Tags

| Tag                        | Posé par                                  | Sens                                                   |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| `rdv-reserve`              | W1 (déclencheur réservation)              | A réservé une séance (retiré en fin de W2)             |
| `seance-realisee`          | **Caroline, à la main** après la séance   | Séance effectuée → lance W2 puis W3                    |
| `avis-demande`             | W3                                        | A reçu la demande d'avis (ne jamais la renvoyer)       |
| `client-actif`             | W3 (fin)                                  | Client ayant réalisé ≥ 1 séance                        |
| `prospect-contact`         | Formulaire de contact                     | A écrit sans réserver → lance W4                       |
| `relance-terminee`         | W4 (fin)                                  | Fin de la séquence prospect (jamais relancé à nouveau) |
| `interet-reiki`            | Formulaire formations                     | Intérêt général Reiki → lance W5                       |
| `interet-reiki-1` / `-2` / `-3` / `-4` | Formulaire formations (champ « degré ») | Degré visé                                   |
| `inscrit-reiki-1` / `-2` / `-3` / `-4` | Paiement / inscription (page reiki-N) ou Caroline | Inscrit à la formation              |
| `formation-realisee`       | Caroline, à la main                       | A suivi la formation (email E5.5)                      |
| `consent-nouvelles`        | Case facultative des formulaires          | Accepte les emails commerciaux (newsletter, dates)     |
| `ne-plus-relancer`         | Caroline, à la main                       | Stop toute relance (sert de condition de sortie)       |

Tags **de segmentation par offre** (posés automatiquement par le calendrier si possible, sinon
par Caroline) : `seance-energetique`, `seance-chamanisme`, `seance-enfant`.

---

## Pipelines CRM (CRM → Pipelines)

### Pipeline « Séances »

```text
Nouveau prospect   → vient d'écrire / de demander des infos (tag prospect-contact)
À contacter        → Caroline doit répondre ou rappeler
RDV réservé        → tag rdv-reserve
Séance réalisée    → tag seance-realisee
Client actif       → a fait ≥ 1 séance, suivi envoyé
À relancer         → pas de nouvelle séance depuis ~3 mois (Caroline décide, rien d'automatique)
```

### Pipeline « Formations Reiki »

```text
Intéressé formation → tag interet-reiki
Contacté            → Caroline a répondu (dates, questions)
Inscription en cours→ a dit oui, attend paiement / acompte
Inscrit             → tag inscrit-reiki-N
Formation réalisée  → tag formation-realisee
```

Déplacement des cartes : à la main par Caroline (2 minutes par semaine). Si Systeme.io propose
l'action « ajouter au pipeline » dans les workflows, l'utiliser uniquement pour les deux entrées
automatiques (Nouveau prospect, Intéressé formation) ; le reste reste manuel pour ne pas créer
de fausses informations.

---

## W1 – Nouveau rendez-vous

```text
Nom          W1 – Nouveau rendez-vous
Déclencheur  Rendez-vous réservé (événement du calendrier : n'importe lequel)
             — si ce déclencheur n'existe pas dans l'offre : « Inscrit au tunnel Réservation »
               ou « Tag ajouté : rdv-reserve » posé par la page de remerciement.
Conditions   aucune
Actions
  1. Ajouter le tag  rdv-reserve
  2. Envoyer l'email E1.1 Confirmation de rendez-vous          (immédiat)
  3. Attendre        jusqu'à 24 h avant le rendez-vous
     (si le workflow ne sait pas attendre « avant l'événement », utiliser le rappel intégré du
      calendrier — Calendrier → Événement → Rappel par email — et SUPPRIMER les étapes 3-5 ici)
  4. Envoyer l'email E1.2 Rappel de rendez-vous
  5. (optionnel) Attendre jusqu'au jour même 8 h → envoyer E1.3 Rappel du jour (très court)
Délais       immédiat · J-1 · (J, 8 h)
Tags         + rdv-reserve
Emails       E1.1, E1.2, (E1.3)
```

Notes : ne pas mettre le rappel à la fois dans le calendrier et dans le workflow (doublon).
Le pipeline « Séances » → carte en « RDV réservé » (manuel ou action si disponible).

---

## W2 – Après la séance

```text
Nom          W2 – Après la séance
Déclencheur  Tag ajouté : seance-realisee   (posé par Caroline après la séance, depuis la fiche contact ou l'appli mobile)
Conditions   le contact n'a pas le tag  ne-plus-relancer
Actions
  1. Retirer le tag  rdv-reserve
  2. Attendre        1 jour
  3. Envoyer l'email E2.1 Comment vous sentez-vous ?
  4. Attendre        10 jours
  5. Condition       le contact a-t-il de nouveau le tag rdv-reserve ? (a repris RDV)
        OUI → fin
        NON → Envoyer l'email E2.2 Petit mot, sans insistance  (propose de reprendre RDV si utile)
  6. Ajouter le tag  client-actif
Délais       J+1 · J+11
Tags         − rdv-reserve · + client-actif
Emails       E2.1, E2.2
```

Ce workflow ne fait **aucune** promesse thérapeutique : il demande des nouvelles, rappelle les
gestes simples (boire, se reposer) et laisse la porte ouverte.

---

## W3 – Demande d'avis Google

```text
Nom          W3 – Avis Google
Déclencheur  Tag ajouté : seance-realisee   (même déclencheur que W2, workflow séparé pour rester lisible)
Conditions   le contact n'a PAS le tag  avis-demande   (on ne demande qu'une fois dans sa vie de client)
             ET n'a pas le tag  ne-plus-relancer
Actions
  1. Attendre        6 jours   (→ arrive après E2.1, avant E2.2)
  2. Envoyer l'email E3.1 Un petit avis ?   — bouton « Laisser un avis » → URL de la fiche Google (GOOGLE_REVIEW_WRITE_URL)
  3. Ajouter le tag  avis-demande
Délais       J+6
Tags         + avis-demande
Emails       E3.1
```

Obtenir le lien d'avis : fiche Google Business Profile de Caroline → « Obtenir plus d'avis » →
copier le lien (forme `https://g.page/r/…/review`). Le renseigner dans l'email **et** dans
`GOOGLE_REVIEW_WRITE_URL` (`src/data/systeme.ts`) pour un usage futur sur le site.

Pas de relance d'avis : une seule demande, jamais renouvelée.

---

## W4 – Prospect sans rendez-vous

```text
Nom          W4 – Prospect sans rendez-vous
Déclencheur  Tag ajouté : prospect-contact   (formulaire de contact embarqué)
             OU Inscrit au formulaire « Contact »
Conditions   le contact n'a pas le tag  rdv-reserve  ni  client-actif  ni  relance-terminee  ni  ne-plus-relancer
Actions
  1. Envoyer l'email E4.1 Bien reçu — qui je suis, comment ça se passe   (immédiat ; Caroline répond en plus personnellement)
  2. Attendre        4 jours
  3. Condition       tag rdv-reserve présent ?  OUI → fin
  4. Envoyer l'email E4.2 Ce que l'on me demande souvent                  (utile / rassurant, FAQ)
  5. Attendre        7 jours
  6. Condition       tag rdv-reserve présent ?  OUI → fin
  7. Envoyer l'email E4.3 Dernier petit mot                               (léger, puis silence)
  8. Ajouter le tag  relance-terminee
Délais       immédiat · J+4 · J+11
Tags         + relance-terminee
Emails       E4.1, E4.2, E4.3
```

E4.2 et E4.3 sont des emails **commerciaux** : ils partent uniquement si le contact a coché
« recevoir des nouvelles » (tag `consent-nouvelles`). Ajouter cette condition avant l'étape 4 :
`consent-nouvelles` absent → fin après E4.1 (qui, lui, est la réponse à une demande).

---

## W5 – Intérêt formation Reiki

```text
Nom          W5 – Intérêt Reiki
Déclencheur  Tag ajouté : interet-reiki   (formulaire de la page /formations-reiki ; le champ « degré » pose aussi interet-reiki-N)
Conditions   pas de tag  ne-plus-relancer
Actions
  1. Envoyer l'email E5.1 Programme et modalités des formations   (immédiat ; contient les 3 degrés, tarifs, format, prochaines dates si connues, CTA inscription → page reiki-N)
  2. Attendre        5 jours
  3. Condition       tag inscrit-reiki-* présent ?  OUI → aller à l'étape 6
  4. Envoyer l'email E5.2 Questions fréquentes avant de se lancer   (si consent-nouvelles)
  5. Fin (Caroline prend le relais par téléphone / email ; pas de 3e relance)

  Branche inscription (déclencheur séparé possible : « Tag ajouté : inscrit-reiki-1/2/3 » ou « Achat du produit Reiki N »)
  6. Envoyer l'email E5.3 Confirmation d'inscription             (immédiat après paiement / validation)
  7. Attendre        jusqu'à 3 jours avant la date de formation   (date = champ personnalisé « date_formation » ou workflow lancé à la main par Caroline)
  8. Envoyer l'email E5.4 Rappel avant la formation               (lieu, horaires, quoi apporter)
  9. Attendre        2 jours après la formation (ou déclencheur tag formation-realisee)
 10. Envoyer l'email E5.5 Après la formation                      (ressources, pratique des 21 jours, degré suivant sans pression)
Délais       immédiat · J+5 · J-3 · J+2
Tags         + interet-reiki(-N) · + inscrit-reiki-N · + formation-realisee
Emails       E5.1, E5.2, E5.3, E5.4, E5.5
```

Simplification acceptable au démarrage : créer uniquement E5.1 automatique ; E5.3 → E5.5
peuvent être envoyés à la main par Caroline (quelques inscrits par session) tant qu'il n'y a
pas de dates fixes dans Systeme.io.

---

## Ce que l'on n'automatise PAS (volontairement)

- Les réponses aux messages de contact (Caroline répond elle-même ; E4.1 n'est qu'un accusé
  chaleureux).
- Le déplacement des cartes du pipeline au-delà des deux entrées automatiques.
- Les relances « client à relancer » après 3 mois : Caroline voit la colonne et décide.
- Les SMS (coût, intrusif) : le rappel par email suffit ; Caroline appelle si besoin.
- Tout envoi supplémentaire de demande d'avis.
