import { IMG } from './site';

export interface Resource {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; to: string };
  sections: { title: string; paragraphs: string[] }[];
}

/*
 * Ces pages présentent les outils qui peuvent nourrir une séance.
 * Règle d’écriture (retours de Caroline, août 2026) : dire ce que la pratique
 * EST et comment elle s’intègre au soin, jamais ce qu’elle « n’est pas »
 * (« pas une offre séparée », « pas une consultation commerciale »…). Ces
 * tournures négatives donnaient un ton défensif et commercial qui ne
 * correspond pas à sa pratique.
 */
export const RESOURCES_CONTENT: Resource[] = [
  {
    slug: 'reiki',
    title: 'Reiki à Bagnères-de-Bigorre | Caroline Loire',
    description:
      'Le Reiki dans la pratique de Caroline Loire à Bagnères-de-Bigorre : outil du soin énergétique et objet des formations Reiki.',
    h1: 'Le Reiki, une transmission d’énergie par les mains',
    intro:
      'Méthode japonaise de transmission d’énergie par apposition des mains. Dans mon cabinet, le Reiki fait partie des outils du soin énergétique ; il s’enseigne aussi en formation.',
    image: IMG.soin,
    imageAlt: 'Soin énergétique par apposition des mains, pratique Reiki',
    primaryCta: { label: 'Voir les formations Reiki', to: '/formations-reiki' },
    sections: [
      {
        title: 'Qu’est-ce que le Reiki ?',
        paragraphs: [
          'Le Reiki est une méthode énergétique issue du Japon. REI évoque l’esprit ou l’intelligence, KI l’énergie. La pratique vise à accompagner l’harmonie du corps et de l’esprit par la transmission d’énergie.',
          'La méthode a été structurée par Mikao Usui. De nombreuses écoles s’en sont inspirées. J’enseigne et pratique dans une lignée Reiki Usui, avec une approche intuitive.',
        ],
      },
      {
        title: 'Comment je l’utilise',
        paragraphs: [
          'Lors des séances énergétiques, j’utilise le Reiki de manière intuitive, souvent associé au Shamballa et au LaHoChi. Après un temps d’échange, je fais un scanner énergétique : je passe le long du corps et je ressens l’état de vos chakras. Vous restez habillé(e) pendant le soin, et nous prenons un moment, à la fin, pour partager les ressentis.',
          'Si vous souhaitez apprendre à pratiquer vous-même, les formations Reiki se déroulent en trois degrés.',
        ],
      },
    ],
  },
  {
    slug: 'shamballa',
    title: 'Shamballa | Outil énergétique — Caroline Loire',
    description:
      'Le Shamballa dans les soins énergétiques de Caroline Loire à Bagnères-de-Bigorre : une énergie associée au Reiki selon les besoins.',
    h1: 'Le Shamballa, une énergie associée au soin',
    intro:
      'Le Shamballa fait partie du soin énergétique : je l’utilise conjointement au Reiki lors des séances, selon mon ressenti.',
    image: IMG.rituel,
    imageAlt: 'Bol, encens et pierres pour un rituel énergétique Shamballa',
    primaryCta: { label: 'Découvrir le soin énergétique', to: '/soins-energetiques' },
    sections: [
      {
        title: 'En quelques mots',
        paragraphs: [
          'Le Shamballa est une méthode de transmission d’énergie par apposition des mains. Sa vibration est distincte de celle du Reiki ; combinée à d’autres approches, elle enrichit le travail sur différentes couches de l’être.',
          'Je l’utilise de façon intuitive, au fil de la séance, en me laissant guider par ce que je perçois.',
        ],
      },
    ],
  },
  {
    slug: 'lahochi',
    title: 'LaHoChi | Caroline Loire énergéticienne',
    description:
      'Le LaHoChi dans la pratique de Caroline Loire à Bagnères-de-Bigorre, associé au Reiki et au Shamballa en séance énergétique.',
    h1: 'Le LaHoChi, une autre qualité d’énergie',
    intro:
      'Le LaHoChi complète parfois le Reiki et le Shamballa au sein d’une même séance énergétique, selon ce que je ressens sur le moment.',
    image: IMG.soin,
    imageAlt: 'Séance de soin énergétique illustrant le LaHoChi',
    primaryCta: { label: 'Découvrir le soin énergétique', to: '/soins-energetiques' },
    sections: [
      {
        title: 'Dans ma pratique',
        paragraphs: [
          'Le LaHoChi est une méthode de transmission d’énergie par les mains, avec une vibration différente du Reiki ou du Shamballa. Chacun y réagit selon ce qui est présent pour lui à ce moment-là.',
          'Je l’associe de manière intuitive aux autres outils lorsque cela me semble cohérent pour la personne accueillie.',
        ],
      },
    ],
  },
  {
    slug: 'lithotherapie',
    title: 'Lithothérapie | Caroline Loire Bagnères-de-Bigorre',
    description:
      'La lithothérapie dans les séances de Caroline Loire : pierres et cristaux choisis parfois en soutien du soin énergétique.',
    h1: 'La lithothérapie, un soutien possible en séance',
    intro:
      'Les pierres et cristaux peuvent accompagner un travail énergétique. Je les utilise au sein d’une séance, lorsque cela me semble juste.',
    image: IMG.rituel,
    imageAlt: 'Pierres et cristaux utilisés en lithothérapie',
    primaryCta: { label: 'Découvrir le soin énergétique', to: '/soins-energetiques' },
    sections: [
      {
        title: 'Comment je m’en sers',
        paragraphs: [
          'Durant certaines séances, je peux ressentir le besoin d’utiliser des minéraux. Je les choisis souvent à l’aide de la radiesthésie, en lien avec les centres énergétiques concernés.',
          'La pierre vient alors s’ajouter aux autres outils, au service de ce que vous traversez ce jour-là.',
        ],
      },
    ],
  },
  {
    slug: 'radiesthesie',
    title: 'Radiesthésie | Caroline Loire',
    description:
      'La radiesthésie dans la pratique de Caroline Loire : outil d’écoute pour orienter pierres ou Fleurs de Bach en séance.',
    h1: 'La radiesthésie, un outil d’écoute',
    intro:
      'La radiesthésie m’aide à affiner un choix pendant la séance : une pierre, un élixir floral, une zone à accompagner.',
    image: IMG.cabinet,
    imageAlt: 'Cabinet de soin où la radiesthésie peut être utilisée',
    primaryCta: { label: 'Découvrir le soin énergétique', to: '/soins-energetiques' },
    sections: [
      {
        title: 'Usage concret',
        paragraphs: [
          'Partant du principe que tout émet une fréquence, la radiesthésie utilise un instrument (pendule, baguette) pour affiner une perception.',
          'Dans ma pratique, je m’en sers notamment pour choisir une pierre en lien avec un centre énergétique, ou pour déterminer des Fleurs de Bach adaptées après certaines séances.',
        ],
      },
    ],
  },
  {
    slug: 'oracles',
    title: 'Oracles | Caroline Loire énergéticienne',
    description:
      'Le tirage d’une carte d’oracle en fin de séance chez Caroline Loire à Bagnères-de-Bigorre : un petit message pour clôturer le soin.',
    h1: 'Les oracles, pour clôturer une séance',
    intro:
      'En fin de séance énergétique ou de chamanisme, je propose le tirage d’une seule carte d’oracle : un petit message qui vient clôturer le soin.',
    image: IMG.carte,
    imageAlt: 'Cartes d’oracle utilisées en fin de séance',
    primaryCta: { label: 'Découvrir le soin énergétique', to: '/soins-energetiques' },
    sections: [
      {
        title: 'Ma façon de procéder',
        paragraphs: [
          'Je choisis un oracle de guidance de manière intuitive, puis je propose à la personne de tirer elle-même sa carte, pour que le message résonne au plus près d’elle.',
          'Une seule carte, un mot de la fin : ce moment vient souvent renforcer ce qui a déjà été abordé pendant le soin.',
        ],
      },
    ],
  },
  {
    slug: 'fleurs-de-bach',
    title: 'Fleurs de Bach | Caroline Loire',
    description:
      'Fleurs de Bach après certaines séances de chamanisme et énergies chez Caroline Loire à Bagnères-de-Bigorre.',
    h1: 'Les Fleurs de Bach, en soutien émotionnel doux',
    intro:
      'Les élixirs floraux du Dr Bach peuvent accompagner l’intégration d’une séance, en prolongement du travail commencé ensemble.',
    image: IMG.salon,
    imageAlt: 'Espace d’accueil du cabinet, cadre doux pour les Fleurs de Bach',
    primaryCta: { label: 'Découvrir le chamanisme', to: '/chamanisme' },
    sections: [
      {
        title: 'Dans mon accompagnement',
        paragraphs: [
          'Après une séance de chamanisme et énergies, j’élabore parfois un mélange personnalisé de Fleurs de Bach pour soutenir la suite du cheminement émotionnel.',
          'La sélection se fait notamment par radiesthésie, en résonance avec ce qui a été travaillé pendant la séance.',
        ],
      },
    ],
  },
  {
    slug: 'hypnose',
    title: 'Hypnose ericksonienne | Caroline Loire',
    description:
      'L’hypnose ericksonienne dans le parcours de Caroline Loire, praticienne à Bagnères-de-Bigorre.',
    h1: 'L’hypnose ericksonienne, un outil complémentaire',
    intro:
      'Je me suis formée à l’hypnose ericksonienne. Elle enrichit ma compréhension des états de conscience et de l’accompagnement émotionnel, et vient en soutien des séances que je propose.',
    image: IMG.caroline,
    imageAlt: 'Caroline Loire, praticienne en hypnose ericksonienne à Bagnères-de-Bigorre',
    primaryCta: { label: 'Prendre contact', to: '/contact' },
    sections: [
      {
        title: 'Dans mon parcours',
        paragraphs: [
          'L’hypnose ericksonienne fait partie de mon parcours de formation. Ce qu’elle m’a apporté — l’écoute du langage, la confiance dans le rythme de chacun — se retrouve dans ma façon d’accompagner.',
          'Si vous souhaitez savoir si cet outil peut s’intégrer à un accompagnement, contactez-moi pour en parler simplement.',
        ],
      },
    ],
  },
];
