import { QuizAnswers } from '../navigation/types';

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
