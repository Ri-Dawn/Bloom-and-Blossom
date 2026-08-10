export interface CatalogItem {
  slug: string;
  name: string;
  price: number;
  customisable: boolean; // if false, skips the Studio entirely
  image?: string; // path under /public
}

export interface Mood {
  from: string; // gradient start (hex)
  to: string; // gradient end (hex)
  ink: string; // readable text colour against this mood
  accent: string; // small accent colour (dots, underline)
}

export interface Category {
  slug: string;
  eyebrow: string;
  headline: string;
  blurb: string;
  icon: 'rakhi' | 'kaleere' | 'baby' | 'charms' | 'friendship';
  heroImage?: string; // path under /public, used as the living hero backdrop
  mood: Mood;
  items: CatalogItem[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'rakhi',
    eyebrow: 'Rakhi & Sibling Bonds',
    headline: `For the brother who's called you "chotu" since you were four feet tall.`,
    blurb: `Bada Bhai, Sabse Pyaara Bhai, a nickname only you use — tell us his name and we'll take it from there.`,
    icon: 'rakhi',
    heroImage: '/images/rakhi-hero.jpg',
    mood: { from: '#7A1230', to: '#E0912A', ink: '#FCEFE0', accent: '#F2B705' },
    items: [
      { slug: 'bada-bhai-rakhi', name: 'Bada Bhai Rakhi', price: 750, customisable: true, image: '/images/rakhi-hero.jpg' },
      { slug: 'sabse-pyaara-bhai', name: 'Sabse Pyaara Bhai', price: 750, customisable: true, image: '/images/rakhi-hero.jpg' },
      { slug: 'evil-eye-name-rakhi', name: 'Evil Eye Name Rakhi', price: 950, customisable: true, image: '/images/rakhi-hero.jpg' },
      { slug: 'bhabhi-rakhi', name: "Bhabhi's Rakhi", price: 950, customisable: true, image: '/images/bhabhi-rakhi.jpg' },
    ],
  },
  {
    slug: 'kaleere',
    eyebrow: 'Kaleere & Bridal',
    headline: 'Before you enter as a bride, walk in carrying every woman who ever wished you well.',
    blurb: `Tied on by sisters and friends before the wedding. Choose who gets a charm on your string.`,
    icon: 'kaleere',
    mood: { from: '#5A1030', to: '#C9974B', ink: '#FBF0E4', accent: '#D9B36C' },
    items: [
      { slug: 'evil-eye-kaleere', name: 'Evil Eye Kaleere', price: 3200, customisable: true },
      { slug: 'pearl-fall-kaleere', name: 'Pearl Fall Kaleere', price: 3600, customisable: true },
      { slug: 'bridal-jhumki-kaleere', name: 'Bridal Jhumki Kaleere', price: 4100, customisable: true },
      { slug: 'mini-kaleere', name: 'Mini Kaleere (Sangeet)', price: 2400, customisable: true },
    ],
  },
  {
    slug: 'baby',
    eyebrow: 'Baby & New Beginnings',
    headline: 'Nine months of waiting, held in fourteen small charms.',
    blurb: `For the mother-to-be, or the child who's just arrived.`,
    icon: 'baby',
    heroImage: '/images/baby-hero.jpg',
    mood: { from: '#7A2A45', to: '#D9A441', ink: '#FBEFE3', accent: '#EFC9A0' },
    items: [
      { slug: 'mom-to-be-bangle', name: 'Mom-to-Be Bangle', price: 1450, customisable: true, image: '/images/baby-hero.jpg' },
      { slug: 'babys-first-bangle', name: "Baby's First Bangle", price: 1200, customisable: true, image: '/images/baby-hero.jpg' },
      { slug: 'photo-medallion-bangle', name: 'Photo Medallion Bangle', price: 1650, customisable: true, image: '/images/baby-hero.jpg' },
      { slug: 'godh-bharai-set', name: 'Godh Bharai Set', price: 2900, customisable: true, image: '/images/baby-hero.jpg' },
    ],
  },
  {
    slug: 'charms',
    eyebrow: 'Charm Bracelets',
    headline: 'Modern, lighter, still anchored by an initial.',
    blurb: `Beauty charms, an initial, a small everyday indulgence.`,
    icon: 'charms',
    heroImage: '/images/cherry-charm.jpg',
    mood: { from: '#6E1230', to: '#D94F63', ink: '#FCEAE9', accent: '#F2A0A8' },
    items: [
      { slug: 'beauty-charm-bracelet', name: 'Beauty Charm Bracelet', price: 1100, customisable: true },
      { slug: 'initial-charm-bracelet', name: 'Initial Charm Bracelet', price: 850, customisable: true },
      { slug: 'everyday-stack', name: 'Everyday Stack (Set of 2)', price: 1750, customisable: false },
      { slug: 'cherry-initial-keychain', name: 'Cherry Initial Keychain', price: 450, customisable: true, image: '/images/cherry-charm.jpg' },
    ],
  },
  {
    slug: 'friendship',
    eyebrow: 'Friendship & Gifting',
    headline: `The "thank you" that's too small for a card and too meaningful for nothing.`,
    blurb: `For the friend, the mentor, the person who helped you grow.`,
    icon: 'friendship',
    heroImage: '/images/friendship-hero.jpg',
    mood: { from: '#8A3A1C', to: '#E8A45C', ink: '#FBEEDF', accent: '#F0C08A' },
    items: [
      { slug: 'flower-keychain-duo', name: 'Flower Keychain Duo', price: 350, customisable: false, image: '/images/friendship-hero.jpg' },
      { slug: 'thank-you-charm', name: 'Thank You Charm', price: 300, customisable: false, image: '/images/friendship-hero.jpg' },
      { slug: 'friendship-initials', name: 'Friendship Initials (Set of 2)', price: 650, customisable: true },
    ],
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
