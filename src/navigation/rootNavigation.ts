import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { quizRecipientLabel } from '../data/mockData';
import { QuizAnswers, RootStackParamList } from './types';

export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

export type GifteeDetailParams = RootStackParamList['GifteeDetail'];

/** Opens giftee detail — each gifteeId gets its own stack entry via screen `getId`. */
export const openGifteeDetail = (
  navigation: RootNavigation,
  params: GifteeDetailParams,
) => {
  navigation.navigate('GifteeDetail', params);
};

/** Opens post-quiz gift results with answers and a derived recipient label. */
export const openGiftResults = (
  navigation: RootNavigation,
  answers: QuizAnswers,
) => {
  navigation.navigate('GiftResults', {
    answers,
    gifteeName: quizRecipientLabel(answers),
  });
};

/** Starts the gift-finder quiz flow from onboarding or tabs. */
export const openQuizFlow = (navigation: RootNavigation) => {
  navigation.navigate('QuizFlow');
};
