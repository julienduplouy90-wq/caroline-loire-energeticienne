# Charte à reproduire dans Systeme.io

Objectif : le visiteur qui clique sur « Prendre rendez-vous » doit avoir l'impression de
rester sur le site de Caroline. Tout est tiré de `src/styles/global.css` et des composants.

## Logo et images

- Logo : `public/images/logo.png` ; monogramme rond (header, favicon) : `public/images/monogram.png`.
  Les téléverser dans Systeme.io → Ressources → Fichiers, puis en « Logo personnalisé » de
  chaque événement du calendrier et en en-tête des pages.
- Photo de Caroline : `public/images/caroline.jpg` (hôte du calendrier, page de remerciement).
- Visuels d'ambiance : `soin.jpg`, `rituel.jpg` (Reiki), `dreamcatcher.webp` (chamanisme),
  `cabinet.jpg`. Pas d'images de banque.
- Favicon de la page Systeme.io : `public/favicon.png`.

## Couleurs (exactes)

| Usage                                         | HEX       |
| --------------------------------------------- | --------- |
| Bleu canard — titres, boutons principaux, pied | `#4DA0A8` |
| Bleu canard foncé — survol des boutons         | `#428187` |
| Bleu canard très foncé — blocs sombres         | `#143B40` |
| Pêche — bouton secondaire, traits décoratifs    | `#EEB1A0` |
| Terracotta — petits titres en capitales        | `#B95F3D` |
| Fond poudré (sections alternées)               | `#FDF3EF` |
| Blanc crème                                    | `#FBF7F4` |
| Bordures                                       | `#F1DDD4` |
| Texte                                          | `#1A1A1A` |
| Texte secondaire                               | `#5B5B5B` |

Fond de page : blanc `#FFFFFF`, sections alternées `#FDF3EF`.

## Typographies

- Titres : **Poppins** (500–600), interlettrage légèrement resserré (−1 %).
- Texte : **Inter** (400), 16 px, interligne 1,6.
- Petits titres « eyebrow » : Inter 12 px, capitales, interlettrage +20 %, couleur `#B95F3D`,
  précédés d'un petit trait pêche (36 × 2 px, arrondi).

Ces deux polices sont disponibles dans l'éditeur Systeme.io (Google Fonts).

## Boutons

- Principal : fond `#4DA0A8`, texte blanc, **entièrement arrondi** (pill, radius 9999 px),
  hauteur ≥ 48 px, padding 12 × 28 px, Inter 14 px medium. Survol : `#428187`.
- Sur fond bleu (bandeaux) : fond pêche `#EEB1A0`, texte `#1A1A1A` ; survol : blanc.
- Secondaire : fond transparent, bordure `rgba(77,160,168,.25)`, texte `#4DA0A8` ; survol : fond `#FDF3EF`.
- Pas d'ombre marquée, pas de dégradé, pas d'icône superflue.

## Cartes et formulaires

- Cartes : fond blanc, bordure 1 px `#F1DDD4`, coins 24 px, padding 24–32 px, souvent un
  filet supérieur 2 px pêche.
- Champs : bordure 1 px `#F1DDD4`, coins 12 px, padding 10 × 12 px, focus bordure `#4DA0A8`
  + halo `rgba(77,160,168,.4)`. Libellés Inter 14 px medium `#4DA0A8`.
- Cases à cocher : 16 px, coins 4 px.

## Ton rédactionnel

- Vouvoiement, première personne (« je vous accueille »), phrases courtes, zéro jargon.
- Rappel « bien-être, ne remplace pas un avis médical » en bas de chaque page et email.
- Pas d'urgence artificielle (« plus que 2 places ! »), pas de compte à rebours, pas de pop-up.

## Structure conseillée d'une page Systeme.io

1. En-tête minimal : monogramme + « CAROLINE LOIRE » (Poppins, interlettrage +18 %) à gauche,
   lien « ← Retour au site » à droite (vers `https://carolineloire-energeticienne.fr`).
2. Eyebrow + titre H1 Poppins `#4DA0A8` + 1–2 phrases d'intro.
3. Le bloc utile (calendrier ou formulaire) dans une carte blanche.
4. Rappel tarif complet / solidaire, adresse du cabinet.
5. Pied : mention bien-être, lien politique de confidentialité du site, téléphone.

Largeur de contenu max 1 100 px, marges latérales 16 px sur mobile. Vérifier chaque page en
375 px de large.
