export interface CatalogItem {
  slug: string;
  name: string;
  price: number; // placeholder — pending confirmed pricing
  customisable: boolean; // if false, skips the Studio entirely
}

export interface Mood {
  from: string; // gradient start (hex)
  to: string; // gradient end (hex)
  ink: string; // readable text colour against this mood
  accent: string; // small accent colour (dots, underline, traveling light)
}

export type Motif = 'rakhi' | 'kaleere' | 'baby' | 'charms' | 'friendship';

export interface Category {
  slug: string;
  eyebrow: string;
  headline: string;
  blurb: string;
  icon: Motif;
  motif: Motif;
  mood: Mood;
  items: CatalogItem[];
  comingSoon?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'rakhi',
    eyebrow: 'Rakhi & Sibling Bonds',
    headline: `For the brother who's called you "chotu" since you were four feet tall.`,
    blurb: `Bada Bhai, Sabse Pyaara Bhai, a nickname only you use — tell us his name and we'll take it from there.`,
    icon: 'rakhi',
    motif: 'rakhi',
    mood: { from: '#7A1230', to: '#E0912A', ink: '#FCEFE0', accent: '#F2B705' },
    items: [
      { slug: 'brother-rakhi', name: 'Brother Rakhi', price: 650, customisable: true },
      { slug: 'mini-charm-bangle', name: 'Mini Charm Bangle', price: 950, customisable: true },
      { slug: 'evil-eye-bangle', name: 'Evil Eye Bangle', price: 1050, customisable: true },
      { slug: 'mirror-lumba', name: 'Mirror Lumba', price: 850, customisable: true },
      { slug: 'nazariya-rakhi-bracelet', name: 'Nazariya Rakhi Bracelet', price: 750, customisable: true },
      { slug: 'infinity-charm-bangle', name: 'Infinity Charm Bangle', price: 1100, customisable: true },
      { slug: 'noor-bracelet', name: 'Noor Bracelet', price: 950, customisable: true },
      { slug: 'pearl-charm-bangle', name: 'Pearl Charm Bangle', price: 1250, customisable: true },
      { slug: 'rainbow-bracelet', name: 'Rainbow Bracelet', price: 800, customisable: true },
      { slug: 'heart-bangle', name: 'Heart Bangle', price: 1050, customisable: true },
      { slug: 'kundan-bracelet', name: 'Kundan Bracelet', price: 1450, customisable: true },
      { slug: 'heart-bracelet', name: 'Heart Bracelet', price: 900, customisable: true },
    ],
  },
  {
    slug: 'mom-to-be',
    eyebrow: 'Mom-to-Be Bangles',
    headline: 'Nine months of waiting, held in a pair of bangles.',
    blurb: `For the mother-to-be — a set she'll wear through every kick and every wait.`,
    icon: 'baby',
    motif: 'baby',
    mood: { from: '#7A2A45', to: '#D9A441', ink: '#FBEFE3', accent: '#EFC9A0' },
    items: [
      { slug: 'mini-bangles-pair', name: 'Mini Bangles Pair', price: 1200, customisable: true },
      { slug: 'long-bangles-pair', name: 'Long Bangles Pair', price: 1600, customisable: true },
    ],
  },
  {
    slug: 'watch-charms',
    eyebrow: 'Watch Charms',
    headline: 'A small charm for the watch you already never take off.',
    blurb: `Five designs, each one small enough to wear every day.`,
    icon: 'charms',
    motif: 'charms',
    mood: { from: '#6E1230', to: '#D94F63', ink: '#FCEAE9', accent: '#F2A0A8' },
    items: [
      { slug: 'watch-charm-1', name: 'Watch Charm — Evil Eye', price: 450, customisable: true },
      { slug: 'watch-charm-2', name: 'Watch Charm — Pearl', price: 450, customisable: true },
      { slug: 'watch-charm-3', name: 'Watch Charm — Initial', price: 400, customisable: true },
      { slug: 'watch-charm-4', name: 'Watch Charm — Heart', price: 450, customisable: true },
      { slug: 'watch-charm-5', name: 'Watch Charm — Trio', price: 550, customisable: true },
    ],
  },
  {
    slug: 'bag-charms',
    eyebrow: 'Bag Charms',
    headline: 'The first thing you clip on before you leave the house.',
    blurb: `A small flourish for the bag you carry every day.`,
    icon: 'charms',
    motif: 'charms',
    mood: { from: '#8A3A1C', to: '#E8A45C', ink: '#FBEEDF', accent: '#F0C08A' },
    items: [
      { slug: 'bag-charm-classic-bow', name: 'Bag Charm — Classic Bow', price: 500, customisable: true },
      { slug: 'bag-charm-initial', name: 'Bag Charm — Initial', price: 450, customisable: true },
      { slug: 'bag-charm-evil-eye', name: 'Bag Charm — Evil Eye', price: 500, customisable: true },
    ],
  },
  {
    slug: 'kaleere',
    eyebrow: 'Kaleere & Bridal',
    headline: 'Before you enter as a bride, walk in carrying every woman who ever wished you well.',
    blurb: `Wedding jewellery and wedding kaleere — coming soon.`,
    icon: 'kaleere',
    motif: 'kaleere',
    mood: { from: '#5A1030', to: '#C9974B', ink: '#FBF0E4', accent: '#D9B36C' },
    items: [],
    comingSoon: true,
  },
  {
    slug: 'friendship',
    eyebrow: 'Friendship & Gifting',
    headline: `The "thank you" that's too small for a card and too meaningful for nothing.`,
    blurb: `For the friend, the mentor, the person who helped you grow — coming soon.`,
    icon: 'friendship',
    motif: 'friendship',
    mood: { from: '#8A3A1C', to: '#E8A45C', ink: '#FBEEDF', accent: '#F0C08A' },
    items: [],
    comingSoon: true,
  },
];

export function findCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function findItem(categorySlug: string, itemSlug: string) {
  const cat = findCategory(categorySlug);
  const item = cat?.items.find((i) => i.slug === itemSlug);
  return cat && item ? { cat, item } : null;
}
