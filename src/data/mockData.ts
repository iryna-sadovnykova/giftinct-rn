import { GiftListItem } from '../components/GiftList';
import { QuizAnswers } from '../navigation/types';

export type Giftee = {
  id: string;
  name: string;
  relationship: string;
  birthday: string;
  birthdayFull?: string;
  age?: number;
  gender?: string;
  initials?: string;
  interests: string[];
  personality?: string[];
  giftTypes?: string[];
  notes?: string;
};

export const MOCK_GIFTEES: Giftee[] = [
  {
    id: 'alice',
    name: 'Alice',
    relationship: 'Romantic Partner',
    birthday: 'April 8',
    birthdayFull: 'April 8, 1990',
    age: 35,
    gender: 'Female',
    initials: 'A',
    interests: ['Art', 'Wine', 'Concerts', 'Design', 'Photography', 'Crafting'],
    personality: ['Creative', 'Curious', 'Romantic', 'Sociable', 'Expressive'],
    giftTypes: ['Something fun', 'Something sentimental', 'Something unusual'],
    notes:
      'Alice loves cozy, atmospheric places and thoughtful gestures. She prefers things that feel personal or meaningful.',
  },
  {
    id: 'mom',
    name: 'Mom',
    relationship: 'Parent',
    birthday: 'March 9',
    birthdayFull: 'July 16',
    initials: 'M',
    interests: ['Cooking', 'Gardening', 'Home decor'],
  },
  {
    id: 'nathaniel',
    name: 'Nathaniel',
    relationship: 'Child',
    birthday: 'January 16',
    initials: 'N',
    interests: ['Gaming', 'Sports'],
  },
  {
    id: 'john',
    name: 'John Smith',
    relationship: 'Coworker',
    birthday: 'November 6',
    initials: 'J',
    interests: ['Technology', 'Books'],
  },
  {
    id: 'jane',
    name: 'Jane',
    relationship: 'Sibling',
    birthday: 'January 26',
    initials: 'J',
    interests: ['Fashion', 'Skincare', 'Yoga', 'Travel'],
  },
];

export const MOCK_GIFTS: GiftListItem[] = [
  {
    id: '1',
    title: 'Handmade Ceramic Tea Set',
    price: '$45',
    description: 'Great for someone who loves art and cozy home decor',
    ctaLabel: 'View on Etsy',
  },
  {
    id: '2',
    title: 'Film Camera for Beginners',
    price: '$89',
    description:
      'Perfect for someone exploring photography and creative hobbies',
    ctaLabel: 'View on Amazon',
  },
  {
    id: '3',
    title: 'Wine Tasting Experience',
    price: '$60',
    description:
      'A memorable evening for someone who enjoys wine and new experiences',
    ctaLabel: 'View on Virgin Gifts',
  },
  {
    id: '4',
    title: 'Art Museum Membership',
    price: '$75',
    description:
      'Ideal for someone who loves galleries and creative inspiration',
    ctaLabel: 'View on The Met Store',
  },
];

/** Default gift list title derived from quiz relationship answer. */
export const giftResultsTitle = (answers: QuizAnswers): string => {
  const relation = answers.relationship?.toLowerCase() ?? 'friend';
  if (relation.includes('partner')) {
    return 'Here are some gift ideas for your partner';
  }
  if (relation.includes('parent')) {
    return 'Here are some gift ideas for your parent';
  }
  return 'Here are some gift ideas for your friend';
};

export const getGifteeById = (id: string): Giftee | undefined =>
  MOCK_GIFTEES.find(g => g.id === id);
