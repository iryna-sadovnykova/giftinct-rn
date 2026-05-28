/** Quiz answers collected across the 8-step gift finder flow. */
export type QuizAnswers = {
  relationship?: string;
  occasions?: string[];
  age?: string;
  gender?: string;
  interests?: string[];
  personality?: string[];
  giftType?: string;
  notes?: string;
};

/** Root stack — linear flows: auth, quiz, checkout, detail pushes. */
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: { answers?: QuizAnswers };
  QuizFlow: undefined;
  Main: undefined;
  GiftResults: { answers: QuizAnswers; gifteeName?: string };
  GifteeDetail: {
    gifteeId: string;
    initialTab?: 'profile' | 'saved' | 'ideas';
  };
  Checkout: { plan: 'monthly' | 'yearly' };
  CheckoutSuccess: undefined;
};

/** Nested stack inside QuizFlow — one screen per step, swipe-back enabled. */
export type QuizStackParamList = {
  QuizStep: { step: number; answers: QuizAnswers };
};

/** Drawer — secondary destinations opened from the hamburger menu. */
export type MainDrawerParamList = {
  MainTabs: undefined;
  Help: undefined;
  PremiumInfo: undefined;
};

/** Bottom tabs — primary app sections from the design. */
export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Giftees: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
