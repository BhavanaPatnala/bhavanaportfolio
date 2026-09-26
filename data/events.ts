export type EvidenceRole = 'Evaluator' | 'Jury' | 'Presenter' | 'Mentor';

export type EventPhoto = { src: string; alt: string; width?: number; height?: number };

export type EventRecord = {
  id: string;
  name: string;
  /** Null when the role has not been confirmed yet — never guessed. */
  roles: EvidenceRole[] | null;
  year: string | null;
  host: string | null;
  /** Authored description, or null while awaiting detail from the owner. */
  description: string | null;
  /** Drop files into this folder under /public and list them below. */
  folder: string;
  photos: EventPhoto[];
};

/**
 * Folders mirror the owner's local event archive so assets can be dropped in
 * without touching a component. An event with no photos renders a labelled
 * empty plate, never a broken image. Every `photos` entry below is grounded
 * in the supplied image itself — certificates and session screenshots were
 * read directly rather than captioned generically, and `year` / `host` were
 * corrected where the photo itself made the fact plain (e.g. Smart India
 * Hackathon's own certificate names "SIH 2025"; ID badges in several other
 * folders name SRM Easwari Engineering College). `roles` for the four
 * events that showed "Role to be confirmed" — India AI Impact Summit,
 * Hack to the Future, Code Clash — Prep2Placements, Talent Hunt — Tarang —
 * and the added Mentor role on Students Industry Outreach, are confirmed
 * directly by their owner, not inferred from the photos.
 */
export const events: EventRecord[] = [
  {
    id: 'smart-india-hackathon',
    name: 'Smart India Hackathon',
    roles: ['Evaluator', 'Jury'],
    year: '2025',
    host: 'Indian Ministry of Innovation Cell',
    description:
      'Evaluator and jury for the Smart India Hackathon — reviewing student teams’ solutions and judging the work under the Ministry of Education’s Innovation Cell programme.',
    folder: '/images/events/smart-india-hackathon',
    photos: [
      {
        src: '/images/events/smart-india-hackathon/1787327138940.jpg',
        alt: 'Smart India Hackathon 2025 Screening Evaluator certificate, awarded to Bhavana P by the Ministry of Education’s Innovation Cell and AICTE',
        width: 1280,
        height: 912,
      },
      {
        src: '/images/events/smart-india-hackathon/1787327141015.jpg',
        alt: 'Virtual evaluator briefing for Smart India Hackathon 2025 with Dr. Abhay Jere, Vice Chairman AICTE and CIO of the Innovation Cell',
        width: 1920,
        height: 1080,
      },
      {
        src: '/images/events/smart-india-hackathon/1787327141218.jpg',
        alt: 'Smart India Hackathon 2025 evaluator briefing, continued',
        width: 1920,
        height: 1080,
      },
      {
        src: '/images/events/smart-india-hackathon/1768107637811.jpg',
        alt: 'Certificate of Appreciation email from AICTE for serving as an Idea Screening evaluator, SIH 2025',
        width: 1206,
        height: 2622,
      },
    ],
  },
  {
    id: 'students-industry-outreach-2025',
    name: 'Students Industry Outreach Program',
    roles: ['Evaluator', 'Mentor'],
    year: '2025',
    host: 'SRM Easwari Engineering College',
    description:
      'Participated in the Students Outreach Program at SRM Easwari Engineering College as a Smart India Hackathon evaluator, and mentored engineering students as part of the same industry outreach.',
    folder: '/images/events/students-industry-outreach-2025',
    photos: [
      { src: '/images/events/students-industry-outreach-2025/1759067327050.jpg', alt: 'Evaluating student work at the Students Industry Outreach Program, SRM Easwari Engineering College', width: 2048, height: 1536 },
      { src: '/images/events/students-industry-outreach-2025/1759067327259.jpg', alt: 'Students Industry Outreach Program, SRM Easwari Engineering College — photo 2', width: 1280, height: 1706 },
      { src: '/images/events/students-industry-outreach-2025/1759067327293.jpg', alt: 'Students Industry Outreach Program, SRM Easwari Engineering College — photo 3', width: 2048, height: 1536 },
      { src: '/images/events/students-industry-outreach-2025/1759067327951.jpg', alt: 'Students Industry Outreach Program, SRM Easwari Engineering College — photo 4', width: 2048, height: 1536 },
      { src: '/images/events/students-industry-outreach-2025/1759067328479.jpg', alt: 'Students Industry Outreach Program, SRM Easwari Engineering College — photo 5', width: 2048, height: 1536 },
    ],
  },
  {
    id: 'india-ai-impact-summit-2026',
    name: 'India AI Impact Summit',
    roles: ['Evaluator', 'Jury'],
    year: '2026',
    host: null,
    description: null,
    folder: '/images/events/india-ai-impact-summit-2026',
    photos: [
      { src: '/images/events/india-ai-impact-summit-2026/1769916632703.jpg', alt: 'Evaluating a student team’s AI project at a hackathon table, India AI Impact Summit', width: 1152, height: 2048 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916632726.jpg', alt: 'India AI Impact Summit — photo 2', width: 1206, height: 1664 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916633002.jpg', alt: 'India AI Impact Summit — photo 3', width: 1152, height: 2048 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916633027.jpg', alt: 'India AI Impact Summit — photo 4', width: 1152, height: 2048 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916633735.jpg', alt: 'India AI Impact Summit — photo 5', width: 1570, height: 1536 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916634852.jpg', alt: 'India AI Impact Summit — photo 6', width: 1607, height: 1536 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916636430.jpg', alt: 'India AI Impact Summit — photo 7', width: 1360, height: 1536 },
      { src: '/images/events/india-ai-impact-summit-2026/1769916638549.jpg', alt: 'India AI Impact Summit — photo 8', width: 1280, height: 1707 },
    ],
  },
  {
    id: 'hack-to-the-future',
    name: 'Hack to the Future',
    roles: ['Evaluator', 'Jury'],
    year: null,
    host: 'SRM Easwari Engineering College',
    description: null,
    folder: '/images/events/hack-to-the-future',
    photos: [
      { src: '/images/events/hack-to-the-future/1760160835313.jpg', alt: 'Reviewing a student team’s project at Hack to the Future, SRM Easwari Engineering College', width: 1167, height: 1565 },
      { src: '/images/events/hack-to-the-future/1760160835337.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 2', width: 1167, height: 1684 },
      { src: '/images/events/hack-to-the-future/1760160836824.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 3', width: 1779, height: 1536 },
      { src: '/images/events/hack-to-the-future/1760160840525.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 4', width: 2048, height: 1536 },
      { src: '/images/events/hack-to-the-future/1760160841078.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 5', width: 2048, height: 1365 },
      { src: '/images/events/hack-to-the-future/1760160841453.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 6', width: 1280, height: 1660 },
      { src: '/images/events/hack-to-the-future/1760160841479.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 7', width: 2048, height: 1365 },
      { src: '/images/events/hack-to-the-future/1760160843674.jpg', alt: 'Hack to the Future, SRM Easwari Engineering College — photo 8', width: 2048, height: 1536 },
    ],
  },
  {
    id: 'code-clash-prep2placements',
    name: 'Code Clash — Prep2Placements',
    roles: ['Evaluator', 'Jury'],
    year: null,
    host: null,
    description: null,
    folder: '/images/events/code-clash-prep2placements',
    photos: [
      { src: '/images/events/code-clash-prep2placements/1784350460863.jpg', alt: 'Mock interview session at Code Clash — Prep2Placements', width: 1600, height: 1200 },
      { src: '/images/events/code-clash-prep2placements/1784350463635.jpg', alt: 'Code Clash — Prep2Placements — photo 2', width: 2048, height: 1152 },
      { src: '/images/events/code-clash-prep2placements/1784350464032.jpg', alt: 'Code Clash — Prep2Placements — photo 3', width: 2048, height: 1152 },
      { src: '/images/events/code-clash-prep2placements/1784350464127.jpg', alt: 'Code Clash — Prep2Placements — photo 4', width: 2048, height: 1152 },
      { src: '/images/events/code-clash-prep2placements/1784350466743.jpg', alt: 'Code Clash — Prep2Placements — photo 5', width: 2048, height: 1536 },
      { src: '/images/events/code-clash-prep2placements/1784350468340.jpg', alt: 'Code Clash — Prep2Placements — photo 6', width: 2048, height: 1536 },
      { src: '/images/events/code-clash-prep2placements/1784350470301.jpg', alt: 'Code Clash — Prep2Placements — photo 7', width: 1280, height: 1934 },
    ],
  },
  {
    id: 'talent-hunt-tarang-2025',
    name: 'Talent Hunt — Tarang',
    roles: ['Evaluator', 'Jury'],
    year: '2025',
    host: 'SRM Easwari Engineering College',
    description: null,
    folder: '/images/events/talent-hunt-tarang-2025',
    photos: [
      { src: '/images/events/talent-hunt-tarang-2025/1759247172930.jpg', alt: 'Reviewing a student project at Talent Hunt — Tarang, SRM Easwari Engineering College', width: 1592, height: 1536 },
      { src: '/images/events/talent-hunt-tarang-2025/1759247173462.jpg', alt: 'Talent Hunt — Tarang, SRM Easwari Engineering College — photo 2', width: 2048, height: 1536 },
      { src: '/images/events/talent-hunt-tarang-2025/1759247175894.jpg', alt: 'Talent Hunt — Tarang, SRM Easwari Engineering College — photo 3', width: 2048, height: 1536 },
      { src: '/images/events/talent-hunt-tarang-2025/1759247177387.jpg', alt: 'Talent Hunt — Tarang, SRM Easwari Engineering College — photo 4', width: 1280, height: 1706 },
    ],
  },
];

export const evidenceRoles: { role: EvidenceRole; blurb: string }[] = [
  { role: 'Evaluator', blurb: 'Assessing student engineering work against a brief, at national-programme scale.' },
  { role: 'Jury', blurb: 'Judging finalists and defending the call in front of the room.' },
  { role: 'Presenter', blurb: 'Technical paper presentations, including work recognised with first place.' },
  { role: 'Mentor', blurb: 'Industry outreach with engineering students at SRM Easwari Engineering College.' },
];
