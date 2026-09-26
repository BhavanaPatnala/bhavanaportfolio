export type Award = {
  id: string;
  placement: string | null;
  title: string;
  context: string;
  note?: string;
};

export const awards: Award[] = [
  {
    id: 'logo',
    placement: '1st Place',
    title: 'Logo Designing Competition',
    context: '25th Anniversary of Triad',
    note: 'The mark that represented the company for its anniversary year.',
  },
  {
    id: 'national-conference',
    placement: '1st Place',
    title: 'National Conference',
    context: 'VIT College, Chennai',
  },
  {
    id: 'brain-fingerprinting',
    placement: '1st Place',
    title: 'Paper Presentation — Brain Fingerprinting',
    context: 'SRM, Chennai',
  },
  {
    id: 'bci',
    placement: null,
    title: 'Paper Presentation — Brain Computer Interface Design',
    context: 'Technical paper presentation',
  },
];
