export type Role = {
  id: string;
  year: string;
  start: string;
  end: string;
  title: string;
  company: string;
  level: number; // 1-4, drives the progression visual
  summary: string;
  work: string[];
  stack: string[];
};

/** Verbatim-grounded in the résumé. All four roles are at the same company. */
export const roles: Role[] = [
  {
    id: 'principal',
    year: '2026',
    start: 'Apr 2026',
    end: 'Present',
    title: 'Principal Software Engineer',
    company: 'Triad Software Private Limited',
    level: 4,
    summary:
      'Architecting critical components of Clariti and owning release work for live deployment.',
    work: [
      'Architected and developed critical components of Clariti’s application using Angular 21 and TypeScript, optimising performance and responsiveness for both desktop and mobile users.',
      'Responsible for creating the Contacts module for Clariti using Angular 21.',
      'Played a key role in the release works during the live deployment of Clariti.',
    ],
    stack: ['Angular 21', 'TypeScript', 'Release Engineering'],
  },
  {
    id: 'senior',
    year: '2019',
    start: 'Aug 2019',
    end: 'Apr 2026',
    title: 'Senior Software Engineer',
    company: 'Triad Software Private Limited',
    level: 3,
    summary:
      'Component architecture across a production business application for email, chat, social and documents.',
    work: [
      'Part of the development of a business app for emails, chats, social media and documents (clariti.app), and built the corresponding website using Angular 18, jQuery, .NET and WordPress.',
      'Designed and developed various components in the architecture of Clariti using Angular 18 and TypeScript, ensuring high performance on mobile and desktop platforms.',
      'Facilitated product development and fulfilment by adopting the Scrum agile methodology.',
      'Performed bug diagnosis and recommended solutions for the developers.',
    ],
    stack: ['Angular 18', 'TypeScript', 'jQuery', '.NET', 'WordPress', 'Scrum'],
  },
  {
    id: 'engineer',
    year: '2015',
    start: 'Aug 2015',
    end: 'Aug 2019',
    title: 'Software Engineer',
    company: 'Triad Software Private Limited',
    level: 2,
    summary:
      'Product surface, subscription payments and the company web presence — plus manual testing discipline.',
    work: [
      'Development and enhancement of the company website (clariti.app), managing key website data and delivering solutions to meet and exceed client briefs, including the mobile experience, with HTML5, Bootstrap, CSS and WordPress.',
      'Played a key role in constructing the Subscription module in Clariti, where users add payment cards and pay through the Stripe API.',
      'Translated requirements into polished, high-level user interface designs in the Audio Preferences component.',
      'Assessed and designed against software requirements applying agile methodologies and Scrum.',
      'Worked as part of manual testing, identifying critical issues and increasing productivity by 50%.',
    ],
    stack: ['HTML5', 'CSS', 'Bootstrap', 'WordPress', 'Stripe API', 'Manual Testing'],
  },
  {
    id: 'trainee',
    year: '2014',
    start: 'Aug 2014',
    end: 'Aug 2015',
    title: 'Software Engineer Trainee',
    company: 'Triad Software Private Limited',
    level: 1,
    summary: 'Program logic, technical specifications and the first production web work.',
    work: [
      'Created and modified applications software and utility programs.',
      'Documented technical specifications and test plans.',
      'Analysed, coded and debugged complex program logic.',
      'Web development of UI changes on cadcam-e.com using WordPress.',
    ],
    stack: ['WordPress', 'Documentation', 'Debugging'],
  },
];

export const education = {
  institution: 'SRM Easwari Engineering College',
  affiliation: 'Anna University affiliation',
  degree: 'Bachelor of Computer Science & Engineering',
  start: 'Sept 2009',
  end: 'Apr 2013',
  result: 'CGPA 6.79 — First Class',
};
