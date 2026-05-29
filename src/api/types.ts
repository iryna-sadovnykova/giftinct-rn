/** Raw giftee payload from Mockaroo. */
export type ApiGiftee = {
  id: number;
  name: string;
  relationship: string;
  birthday: string;
  birthdayDate: string;
  age: number;
  gender: string;
  avatarUrl: string;
  interests: string;
  personality: string;
  giftTypes: string;
  notes: string;
  daysUntilBirthday: number;
  createdAt: string;
  updatedAt: string;
};

/** Raw gift payload from Mockaroo. */
export type ApiGift = {
  id: number;
  title: string;
  price: number;
  currency: string;
  gender: string;
  description: string;
  imageUrl: string;
  retailer: string;
  ctaUrl: string;
  saved: boolean;
};
