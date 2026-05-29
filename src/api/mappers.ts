import { GiftListItem } from '../components/GiftList';
import { Giftee } from '../types/giftee';
import { ensureHttps } from '../utils/ensureHttps';
import { ApiGift, ApiGiftee } from './types';

const toStringArray = (value: string | string[] | undefined): string[] => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
};

const formatRelationship = (relationship: string): string =>
  relationship.charAt(0).toUpperCase() + relationship.slice(1);

const formatBirthdayFull = (birthdayDate: string): string => {
  const date = new Date(`${birthdayDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return birthdayDate;
  }
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatPrice = (price: number, currency: string): string => {
  if (currency === 'Dollar' || currency === 'USD') {
    return `$${price.toFixed(2)}`;
  }
  return `${price.toFixed(2)} ${currency}`;
};

const formatRetailerLabel = (retailer: string): string => {
  const label = retailer.charAt(0).toUpperCase() + retailer.slice(1);
  return `View on ${label}`;
};

export const mapApiGiftee = (api: ApiGiftee): Giftee => ({
  id: String(api.id),
  name: api.name,
  relationship: formatRelationship(api.relationship),
  birthday: api.birthday,
  birthdayDate: api.birthdayDate,
  birthdayFull: formatBirthdayFull(api.birthdayDate),
  age: api.age,
  gender: api.gender,
  avatarUrl: ensureHttps(api.avatarUrl),
  initials: api.name.charAt(0).toUpperCase(),
  interests: toStringArray(api.interests),
  personality: toStringArray(api.personality),
  giftTypes: toStringArray(api.giftTypes),
  notes: api.notes,
  daysUntilBirthday: api.daysUntilBirthday,
});

export type MappedGift = GiftListItem & { ctaUrl: string };

export const mapApiGift = (api: ApiGift): MappedGift => ({
  id: String(api.id),
  title: api.title,
  price: formatPrice(api.price, api.currency),
  description: api.description,
  ctaLabel: formatRetailerLabel(api.retailer),
  image: { uri: ensureHttps(api.imageUrl) },
  saved: api.saved,
  ctaUrl: api.ctaUrl,
});
