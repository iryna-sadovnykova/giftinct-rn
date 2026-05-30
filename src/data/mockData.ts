import { QuizAnswers } from '../navigation/types';
import { QUIZ_STEPS } from './quizSteps';

/** Human-readable recipient label from quiz step 1 (e.g. "Friend", "Romantic partner"). */
export const quizRecipientLabel = (
  answers: QuizAnswers,
): string | undefined => {
  const relationshipId = answers.relationship;
  if (!relationshipId) {
    return undefined;
  }

  const relationshipStep = QUIZ_STEPS.find(step => step.step === 1);
  return relationshipStep?.options?.find(option => option.id === relationshipId)
    ?.label;
};

/** Default gift list title derived from quiz relationship answer. */
export const giftResultsTitle = (
  answers: QuizAnswers,
  gifteeName?: string,
): string => {
  if (gifteeName) {
    return `Here are some gift ideas for your ${gifteeName.toLowerCase()}`;
  }

  const relation = answers.relationship?.toLowerCase() ?? 'friend';
  if (relation.includes('partner')) {
    return 'Here are some gift ideas for your partner';
  }
  if (relation.includes('parent')) {
    return 'Here are some gift ideas for your parent';
  }
  return 'Here are some gift ideas for your friend';
};
