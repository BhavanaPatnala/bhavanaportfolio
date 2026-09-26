export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuedBy?: string;
  date: string;
  sortDate: string;
  detail?: string;
  credentialId?: string;
  verifyUrl?: string;
  /** Path under /public. Null renders an honest empty artefact rather than a broken image. */
  image: string | null;
  width?: number;
  height?: number;
};

/**
 * Every field below is transcribed from the certificate itself.
 * No credential ID is ever fabricated.
 */
export const certifications: Certification[] = [
  {
    id: 'claude-code-101',
    title: 'Claude Code 101',
    issuer: 'Anthropic',
    date: 'May 2026',
    sortDate: '2026-05-12',
    detail: 'Issued 12 May 2026',
    image: '/images/certificates/claude-code-101.jpg',
    width: 1800,
    height: 1391,
  },
  {
    id: 'claude-101',
    title: 'Claude 101',
    issuer: 'Anthropic',
    date: 'May 2026',
    sortDate: '2026-05-11',
    detail: 'Issued 11 May 2026',
    credentialId: 'gyf7r3jz4g7a',
    image: '/images/certificates/claude-101.jpg',
    width: 1800,
    height: 1391,
  },
  {
    id: 'supervised-ml',
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Coursera',
    issuedBy: 'DeepLearning.AI and Stanford Online',
    date: 'Jul 2025',
    sortDate: '2025-07-31',
    detail: 'Instructor: Andrew Ng',
    verifyUrl: 'https://coursera.org/verify/SNUU70RJDENU',
    image: '/images/certificates/supervised-machine-learning.jpg',
    width: 1772,
    height: 928,
  },
  {
    id: 'scrum-fundamentals',
    title: 'The Complete Agile Scrum Fundamentals Course + Certification',
    issuer: 'Udemy',
    date: 'Jun 2023',
    sortDate: '2023-06-29',
    detail: '13 hours',
    credentialId: 'UC-3a997acd-50ad-4ef9-a34b-59e3ad5257a4',
    verifyUrl: 'https://ude.my/UC-3a997acd-50ad-4ef9-a34b-59e3ad5257a4',
    image: '/images/certificates/agile-scrum-fundamentals.jpg',
    width: 1600,
    height: 1190,
  },
  {
    id: 'scrum-master',
    title: 'Complete Agile Scrum Master Certification Training',
    issuer: 'Udemy',
    date: 'Jun 2023',
    sortDate: '2023-06-29',
    detail: '6 hours',
    credentialId: 'UC-cff0ae2f-1a5d-49a4-8983-26494039596e',
    verifyUrl: 'https://ude.my/UC-cff0ae2f-1a5d-49a4-8983-26494039596e',
    image: '/images/certificates/agile-scrum-master.jpg',
    width: 1600,
    height: 1190,
  },
];
