export type Giftee = {
  id: string;
  name: string;
  relationship: string;
  birthday: string;
  birthdayDate: string;
  birthdayFull?: string;
  age?: number;
  gender?: string;
  avatarUrl?: string;
  initials?: string;
  interests: string[];
  personality?: string[];
  giftTypes?: string[];
  notes?: string;
  daysUntilBirthday?: number;
};
