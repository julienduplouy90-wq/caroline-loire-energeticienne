# Emails automatiques — textes recommandés

Ton : chaleureux, simple, à la première personne (Caroline), vouvoiement, phrases courtes.
Aucune promesse de résultat, aucun vocabulaire médical. Pas d'urgence commerciale.

Variables Systeme.io : `{{contact.first_name}}` (prénom). Pour le calendrier, utiliser les
variables proposées par l'éditeur (date, heure, lieu de l'événement) — indiquées ici entre
crochets. Expéditeur : **Caroline Loire** `<adresse de Caroline>`. Signature commune en bas
de page.

Signature (à mettre dans le gabarit d'email) :

```text
Caroline Loire
Énergéticienne · Praticienne en chamanisme · Maître Reiki enseignante
20 rue Justin Daléas, 65200 Bagnères-de-Bigorre
07 44 73 34 35 · carolineloire-energeticienne.fr
```

Mention obligatoire pour les emails **commerciaux** (E2.2, E3.1, E4.2, E4.3, E5.2) :
le lien de désinscription automatique de Systeme.io + « Vous recevez ce message parce que
vous avez accepté de recevoir des nouvelles du cabinet. »

Rappel bien-être (pied de page, tous les emails liés aux séances) :
« Les accompagnements proposés relèvent du bien-être et ne remplacent pas un avis ou un
traitement médical ou psychologique. »

---

## E1.1 — Confirmation de rendez-vous

**Objet :** Votre rendez-vous est bien noté

```text
Bonjour {{contact.first_name}},

Votre rendez-vous est confirmé :

   [Type de séance]
   [Jour, date] à [heure]
   20 rue Justin Daléas, 65200 Bagnères-de-Bigorre

Prévoyez une tenue confortable. Il n'y a rien de particulier à préparer : vous venez comme
vous êtes, avec ce que vous traversez en ce moment.

Si vous avez un empêchement, prévenez-moi simplement par retour de ce message ou au
07 44 73 34 35 (au plus tard la veille si possible, pour que je puisse proposer le créneau à
quelqu'un d'autre).

À très bientôt,
Caroline
```

Ajouter, si Systeme.io le propose, le bouton « Ajouter à mon agenda » et le lien d'annulation
/ modification du rendez-vous.

---

## E1.2 — Rappel de rendez-vous (J-1)

**Objet :** À demain — petit rappel de votre séance

```text
Bonjour {{contact.first_name}},

Un petit rappel : nous avons rendez-vous demain, [jour date] à [heure], au cabinet
(20 rue Justin Daléas, Bagnères-de-Bigorre).

Quelques repères pratiques :
– arrivez à l'heure, sans stress si vous avez quelques minutes de retard ;
– tenue confortable ;
– pensez à couper votre téléphone pendant la séance.

Un empêchement ? Répondez à ce message ou appelez-moi au 07 44 73 34 35.

À demain,
Caroline
```

## E1.3 — Rappel du jour même (optionnel, 8 h)

**Objet :** C'est aujourd'hui à [heure]

```text
Bonjour {{contact.first_name}},

Je vous attends aujourd'hui à [heure], 20 rue Justin Daléas.
Bonne journée d'ici là,

Caroline
07 44 73 34 35
```

---

## E2.1 — Suivi après la séance (J+1)

**Objet :** Comment vous sentez-vous après la séance ?

```text
Bonjour {{contact.first_name}},

Merci pour votre confiance hier.

Dans les jours qui suivent une séance, chacun réagit à sa façon : certains se sentent
apaisés, d'autres plus fatigués ou plus émotifs pendant un ou deux jours. C'est normal et
passager. Pensez à boire de l'eau, à vous reposer et à vous accorder un peu de douceur.

Si vous avez envie de partager comment vous vous sentez, ou une question qui vous est venue
après coup, répondez simplement à ce message : je vous lis et je vous réponds.

Prenez soin de vous,
Caroline
```

## E2.2 — Petit mot, sans insistance (J+11)

**Objet :** Un petit mot, sans obligation

```text
Bonjour {{contact.first_name}},

J'espère que les jours qui ont suivi notre séance ont été doux.

Il n'y a pas de rythme imposé pour les séances énergétiques. Certaines personnes viennent une
fois, d'autres reviennent quelques semaines ou quelques mois plus tard, quand elles sentent
que c'est le moment. Écoutez-vous : vous seul(e) savez ce dont vous avez besoin.

Si l'envie de reprendre un temps pour vous se présente, vous pouvez réserver ici :
[Bouton : Prendre rendez-vous → SYSTEME_URLS.booking]

Et sinon, je vous souhaite simplement une belle continuation.

Caroline
```

---

## E3.1 — Demande d'avis Google (J+6)

**Objet :** Un petit avis ?

```text
Bonjour {{contact.first_name}},

J'espère que vous allez bien depuis notre séance.

Je me permets une petite demande : si vous avez apprécié ce moment, accepteriez-vous de
laisser quelques mots sur ma fiche Google ? Ce sont ces avis qui permettent à d'autres
personnes de Bagnères-de-Bigorre et des environs de trouver le cabinet et d'oser faire le
premier pas.

Deux phrases suffisent, et cela ne prend qu'une minute :

[Bouton : Laisser un avis → GOOGLE_REVIEW_WRITE_URL]

Quelle que soit votre décision, merci pour votre confiance.

Caroline
```

---

## E4.1 — Accusé de réception + présentation (immédiat)

**Objet :** Bien reçu — je vous réponds très vite

```text
Bonjour {{contact.first_name}},

Merci pour votre message, je l'ai bien reçu et je vous réponds personnellement dès que
possible (généralement sous 48 h, hors week-end).

En attendant, en quelques mots : je suis énergéticienne, praticienne en chamanisme et maître
Reiki enseignante, installée à Bagnères-de-Bigorre. J'accompagne les personnes qui traversent
une période de fatigue émotionnelle, de changement ou qui ressentent simplement le besoin de
ralentir et de se recentrer.

   • Soin énergétique — 1 h à 1 h 30 — 60 € (50 € en tarif solidaire)
   • Chamanisme et énergies — 2 h à 2 h 30 — 100 € (80 € en tarif solidaire)
   • Séance enfant — environ 1 h — 40 €

Si vous préférez réserver directement un créneau, c'est possible ici :
[Bouton : Prendre rendez-vous → SYSTEME_URLS.booking]

À très bientôt,
Caroline
```

## E4.2 — Email utile / rassurant (J+4, si consentement)

**Objet :** Ce que l'on me demande souvent avant une première séance

```text
Bonjour {{contact.first_name}},

Avant une première séance, les mêmes questions reviennent souvent. Voici mes réponses,
simplement.

« Faut-il y croire pour que ça marche ? »
Non. Venez avec votre curiosité, vos doutes aussi. Il n'y a rien à croire, seulement à
ressentir — ou pas — et nous en parlons ensemble.

« Comment se passe une séance ? »
Un temps d'échange pour comprendre ce que vous traversez, puis le soin, allongé(e) et
habillé(e). Nous terminons par un moment pour partager vos ressentis.

« Est-ce que ça remplace un suivi médical ? »
Non, jamais. Les accompagnements que je propose relèvent du bien-être. Ils peuvent
accompagner un suivi, pas le remplacer.

« Et le tarif solidaire ? »
Il existe pour que le prix ne soit pas un frein. Aucune justification n'est demandée : vous
choisissez le tarif qui vous semble juste.

Si vous avez une autre question, répondez à ce message. Et si vous souhaitez réserver :
[Bouton : Prendre rendez-vous → SYSTEME_URLS.booking]

Caroline
```

## E4.3 — Dernier petit mot (J+11, si consentement)

**Objet :** Un dernier petit mot

```text
Bonjour {{contact.first_name}},

Je ne voudrais pas encombrer votre boîte mail : ce sera donc mon dernier message de ce type.

Sachez simplement que la porte du cabinet reste ouverte, maintenant ou plus tard, quand vous
sentirez que c'est le bon moment. Vous pouvez prendre rendez-vous en ligne ou m'appeler au
07 44 73 34 35.

[Bouton : Prendre rendez-vous → SYSTEME_URLS.booking]

Je vous souhaite le meilleur,
Caroline
```

---

## E5.1 — Programme et modalités des formations Reiki (immédiat)

**Objet :** Les formations Reiki : programme, modalités et prochaines dates

```text
Bonjour {{contact.first_name}},

Merci pour votre intérêt pour les formations Reiki. Voici l'essentiel pour vous aider à y
voir clair.

Premier degré — Les fondations du Reiki — 180 €
Bases de la canalisation énergétique, les cinq principes, les chakras et corps énergétiques,
pratiquer sur soi, partager l'énergie pour accompagner l'autre. Aucune expérience requise.

Deuxième degré — Approfondissement — 280 €
Purification et rechargement (personnes, lieux, objets), symboles et leur utilisation, travail
à distance, travail avec un cristal.

Troisième degré — Maîtrise et perfectionnement — 380 €
Approfondissement des cinq principes, symbole du maître praticien, techniques japonaises
avancées, grille de cristaux, intervention psycho-énergétique.

Modalités
– En petit groupe, au cabinet de Bagnères-de-Bigorre.
– Support écrit remis à chaque participant, certificat en fin de formation.
– Règlement possible en plusieurs fois.

Prochaines dates : [à compléter par Caroline — ou « je vous les communique par retour »]

Pour vous inscrire ou réserver votre place :
[Bouton : S'inscrire au 1er degré → SYSTEME_URLS.reiki1]
(Les liens des 2e et 3e degrés : SYSTEME_URLS.reiki2 / reiki3)

Une question avant de vous décider ? Répondez simplement à ce message.

Caroline
```

> Vérifier avec Caroline les modalités en italique (groupe, support, certificat, paiement en
> plusieurs fois) — ne rien promettre qui ne soit pas réel.

## E5.2 — Questions fréquentes avant de se lancer (J+5, si consentement)

**Objet :** Quelques réponses avant de vous lancer dans le Reiki

```text
Bonjour {{contact.first_name}},

Voici les questions que l'on me pose le plus souvent avant une première formation.

« Je n'ai jamais pratiqué, est-ce pour moi ? »
Le premier degré est justement conçu pour débuter. Il n'y a aucun prérequis.

« Que fait-on concrètement pendant la journée ? »
Un temps de transmission, les initiations, puis beaucoup de pratique — sur soi et entre
participants.

« Et après ? »
Je vous accompagne avec une pratique quotidienne simple pendant 21 jours, et je reste
joignable pour vos questions.

Si vous souhaitez réserver votre place ou simplement en discuter :
[Bouton : Voir les prochaines dates → SYSTEME_URLS.reikiInfo]

Caroline
```

## E5.3 — Confirmation d'inscription

**Objet :** Votre inscription au Reiki [degré] est confirmée

```text
Bonjour {{contact.first_name}},

C'est noté : votre place pour la formation Reiki [degré] du [date] est réservée.
Je suis heureuse de vous accompagner dans cette découverte.

Rendez-vous le [date] à [heure], 20 rue Justin Daléas, 65200 Bagnères-de-Bigorre.
Je vous enverrai un rappel quelques jours avant avec les détails pratiques.

D'ici là, si une question vous vient, répondez simplement à ce message.

À bientôt,
Caroline
```

## E5.4 — Rappel avant la formation (J-3)

**Objet :** À [jour] — les détails pratiques de votre formation Reiki

```text
Bonjour {{contact.first_name}},

Nous nous retrouvons [jour date] à [heure] pour la formation Reiki [degré].

Côté pratique :
– Adresse : 20 rue Justin Daléas, Bagnères-de-Bigorre.
– Prévoyez une tenue confortable, de quoi prendre des notes et une bouteille d'eau.
– Le repas de midi : [tiré du sac / pause prévue — à préciser par Caroline].
– Horaires : [début – fin].

Au plaisir de vous retrouver,
Caroline
07 44 73 34 35
```

## E5.5 — Après la formation (J+2)

**Objet :** Merci pour ces moments — et la suite, à votre rythme

```text
Bonjour {{contact.first_name}},

Merci pour votre présence et votre engagement pendant cette formation.

Pour les prochaines semaines, je vous encourage à garder la pratique quotidienne dont nous
avons parlé (21 jours d'auto-traitement). C'est elle qui ancre ce que vous avez reçu.

Vous trouverez ci-joint / ci-dessous [le support de formation / les ressources].
Pour toute question qui vous viendrait en pratiquant, écrivez-moi : je réponds volontiers.

Le degré suivant pourra venir plus tard, quand vous le sentirez — il n'y a aucune obligation
ni aucun délai.

Belle pratique à vous,
Caroline
```
