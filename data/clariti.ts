export type Workstream = {
  id: string;
  label: string;
  period: string;
  summary: string;
  points: string[];
};

/** Every point below maps to a résumé line. Nothing added. */
export const workstreams: Workstream[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    period: '2019 → present',
    summary: 'Component architecture for a production application used on desktop and mobile.',
    points: [
      'Designed and developed components within the architecture of Clariti using Angular and TypeScript.',
      'Architected critical components of the application in Angular 21.',
      'Built for high performance across mobile and desktop platforms.',
    ],
  },
  {
    id: 'contacts',
    label: 'Contacts module',
    period: '2026',
    summary: 'Ownership of a full module, from structure to shipped surface.',
    points: [
      'Responsible for creating the Contacts module for Clariti using Angular 21.',
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    period: 'Ongoing',
    summary: 'Responsiveness treated as a requirement, not a follow-up ticket.',
    points: [
      'Optimised performance and responsiveness for both desktop and mobile users.',
      'Ensured high performance of components across mobile and desktop platforms.',
    ],
  },
  {
    id: 'ui',
    label: 'Interface',
    period: '2015 → 2019',
    summary: 'Requirements translated into finished, high-level interface design.',
    points: [
      'Translated requirements into polished, high-level user interface designs in the Audio Preferences component.',
      'Built and managed the mobile web experience with HTML5, Bootstrap, CSS and WordPress.',
    ],
  },
  {
    id: 'payments',
    label: 'Subscription',
    period: '2015 → 2019',
    summary: 'The module where the product starts taking money — so it has to be right.',
    points: [
      'Played a key role in constructing the Subscription module, where users add payment cards.',
      'Payments handled through the Stripe API.',
    ],
  },
  {
    id: 'diagnosis',
    label: 'Bug diagnosis',
    period: '2015 → present',
    summary: 'Finding the cause, then handing over a recommendation rather than a ticket.',
    points: [
      'Performed bug diagnosis and recommended solutions for the developers.',
      'Manual testing that identified critical issues and increased productivity by 50%.',
    ],
  },
  {
    id: 'release',
    label: 'Release',
    period: '2026',
    summary: 'The part of engineering that happens when everyone is watching.',
    points: [
      'Played a key role in the release works during the live deployment of Clariti.',
      'Product development and fulfilment facilitated through the Scrum agile methodology.',
    ],
  },
];

export const claritiFacts = [
  { k: 'Product', v: 'Business app for email, chat, social media and documents' },
  { k: 'Client', v: 'Angular 21 today, Angular 18 through 2019–2026' },
  { k: 'Website', v: 'Angular 18, jQuery, .NET, WordPress' },
  { k: 'Platforms', v: 'Desktop and mobile' },
  { k: 'Delivery', v: 'Scrum, with release work at live deployment' },
  { k: 'My span', v: 'Four roles, 2014 to present' },
];
