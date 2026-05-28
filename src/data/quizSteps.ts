import { QuizAnswers } from '../navigation/types';

export type QuizOption = {
  id: string;
  label: string;
  emoji?: string;
};

export type QuizStepConfig = {
  step: number;
  question: string;
  subtitle?: string;
  type: 'single' | 'multi' | 'text' | 'number';
  options?: QuizOption[];
  columns?: 1 | 2;
  answerKey: keyof QuizAnswers;
  placeholder?: string;
  optional?: boolean;
  ctaLabel?: string;
};

/** All 8 quiz steps from the Giftinct design PDF. */
export const QUIZ_STEPS: QuizStepConfig[] = [
  {
    step: 1,
    question: 'Who are you buying a gift for?',
    type: 'single',
    columns: 1,
    answerKey: 'relationship',
    options: [
      { id: 'partner', label: 'Romantic partner', emoji: '💖' },
      { id: 'friend', label: 'Friend', emoji: '🤝' },
      { id: 'parent', label: 'Parent', emoji: '👨\u200d👩\u200d👧' },
      { id: 'child', label: 'Child', emoji: '🧒' },
      { id: 'sibling', label: 'Sibling', emoji: '👭' },
      { id: 'colleague', label: 'Colleague', emoji: '💼' },
    ],
  },
  {
    step: 2,
    question: 'What is the occasion?',
    type: 'multi',
    columns: 1,
    answerKey: 'occasions',
    options: [
      { id: 'birthday', label: 'Birthday', emoji: '🎂' },
      { id: 'anniversary', label: 'Anniversary', emoji: '💍' },
      { id: 'christmas', label: 'Christmas', emoji: '🎄' },
      { id: 'wedding', label: 'Wedding', emoji: '👰' },
      { id: 'valentine', label: "Valentine's Day", emoji: '💘' },
      { id: 'just-because', label: 'Just because', emoji: '🎁' },
    ],
  },
  {
    step: 3,
    question: 'How old are they?',
    type: 'number',
    answerKey: 'age',
    placeholder: '36',
  },
  {
    step: 4,
    question: 'What is their gender?',
    type: 'single',
    columns: 1,
    answerKey: 'gender',
    options: [
      { id: 'female', label: 'Female', emoji: '👩' },
      { id: 'male', label: 'Male', emoji: '👨' },
      { id: 'non-binary', label: 'Non-binary', emoji: '🧑' },
    ],
  },
  {
    step: 5,
    question: 'What are their interests?',
    subtitle: 'Any specific fandoms or hobbies?',
    type: 'multi',
    columns: 2,
    answerKey: 'interests',
    options: [
      { id: 'books', label: 'Books', emoji: '📚' },
      { id: 'movies', label: 'Movies', emoji: '🎬' },
      { id: 'tv', label: 'TV shows', emoji: '📺' },
      { id: 'gaming', label: 'Gaming', emoji: '🎮' },
      { id: 'sports', label: 'Sports', emoji: '⚽' },
      { id: 'cooking', label: 'Cooking', emoji: '🍳' },
      { id: 'tech', label: 'Technology', emoji: '💻' },
      { id: 'fashion', label: 'Fashion', emoji: '👗' },
      { id: 'art', label: 'Art', emoji: '🎨' },
      { id: 'travel', label: 'Travel', emoji: '✈️' },
      { id: 'music', label: 'Music', emoji: '🎵' },
      { id: 'decor', label: 'Home decor', emoji: '🛋️' },
      { id: 'gardening', label: 'Gardening', emoji: '🌱' },
    ],
  },
  {
    step: 6,
    question: 'What kind of personality do they have?',
    type: 'multi',
    columns: 2,
    answerKey: 'personality',
    options: [
      { id: 'practical', label: 'Practical', emoji: '🛠️' },
      { id: 'creative', label: 'Creative', emoji: '🎨' },
      { id: 'adventurous', label: 'Adventurous', emoji: '🧭' },
      { id: 'funny', label: 'Funny', emoji: '😄' },
      { id: 'sentimental', label: 'Sentimental', emoji: '💖' },
      { id: 'minimalist', label: 'Minimalist', emoji: '⚪' },
      { id: 'luxury', label: 'Luxury-loving', emoji: '💎' },
      { id: 'intellectual', label: 'Intellectual', emoji: '🧠' },
      { id: 'outgoing', label: 'Outgoing', emoji: '🥳' },
      { id: 'calm', label: 'Calm', emoji: '🧘' },
    ],
  },
  {
    step: 7,
    question: 'What type of gift would they enjoy most?',
    type: 'single',
    columns: 1,
    answerKey: 'giftType',
    options: [
      { id: 'useful', label: 'Something useful', emoji: '🛠' },
      { id: 'fun', label: 'Something fun', emoji: '🎉' },
      { id: 'sentimental', label: 'Something sentimental', emoji: '💝' },
      { id: 'unusual', label: 'Something unusual', emoji: '✨' },
      { id: 'experience', label: 'An experience', emoji: '🎟️' },
    ],
  },
  {
    step: 8,
    question: 'Anything else we should know?',
    subtitle: 'Optional',
    type: 'text',
    answerKey: 'notes',
    optional: true,
    placeholder: 'Tell us more about them…',
    ctaLabel: 'See the results',
  },
];

export const getQuizStep = (step: number): QuizStepConfig | undefined =>
  QUIZ_STEPS.find(s => s.step === step);

export const TOTAL_QUIZ_STEPS = QUIZ_STEPS.length;
