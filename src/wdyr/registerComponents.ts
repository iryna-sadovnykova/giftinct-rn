/// <reference types="@welldone-software/why-did-you-render" />

import App from '../../App';
import { ApiStateView } from '../components/ApiStateView';
import { FadeInView } from '../components/FadeInView';
import { GiftCard } from '../components/GiftCard';
import { GiftList } from '../components/GiftList';
import { GiftListRow } from '../components/GiftListRow';
import { GifteeCard } from '../components/GifteeCard';
import { GifteeListItem } from '../components/GifteeListItem';
import { InputField } from '../components/InputField';
import { InterestTag } from '../components/InterestTag';
import { OptionPill } from '../components/OptionPill';
import { PrimaryButton } from '../components/PrimaryButton';
import { QuestionHeader } from '../components/QuestionHeader';
import { QuizMultiOption } from '../components/QuizMultiOption';
import { QuizSingleOption } from '../components/QuizSingleOption';
import { ScalePressable } from '../components/ScalePressable';
import { ScreenHeader } from '../components/ScreenHeader';
import { SecondaryButton } from '../components/SecondaryButton';
import { SocialAuthButton } from '../components/SocialAuthButton';
import { AuthProvider } from '../context/AuthContext';
import { AppNavigation } from '../navigation';
import { AppTabBar } from '../navigation/AppTabBar';
import { CustomDrawerContent } from '../navigation/CustomDrawerContent';
import { CalendarScreen } from '../screens/CalendarScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { CheckoutSuccessScreen } from '../screens/CheckoutSuccessScreen';
import { ComponentShowcaseScreen } from '../screens/ComponentShowcaseScreen';
import { GiftResultsScreen } from '../screens/GiftResultsScreen';
import { GifteeDetailScreen } from '../screens/GifteeDetailScreen';
import { GifteesScreen } from '../screens/GifteesScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PremiumScreen } from '../screens/PremiumScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { trackComponent } from './trackComponent';

/**
 * Registers WDYR on screens and components that are not already covered by
 * `trackAllPureComponents` (React.memo). Memoized list/quiz components are
 * included here with custom names for clearer console output.
 */
export const registerWdyrComponents = (): void => {
  // Root shell
  trackComponent(App);
  trackComponent(AppNavigation);
  trackComponent(AuthProvider);

  // Screens — top-level owners; log owner reasons helps trace list re-renders
  trackComponent(WelcomeScreen);
  trackComponent(LoginScreen);
  trackComponent(SignUpScreen);
  trackComponent(QuizScreen);
  trackComponent(GiftResultsScreen);
  trackComponent(HomeScreen);
  trackComponent(CalendarScreen);
  trackComponent(GifteesScreen);
  trackComponent(GifteeDetailScreen);
  trackComponent(SettingsScreen);
  trackComponent(PremiumScreen);
  trackComponent(HelpScreen);
  trackComponent(CheckoutScreen);
  trackComponent(CheckoutSuccessScreen);
  trackComponent(ComponentShowcaseScreen);

  // Navigation chrome
  trackComponent(AppTabBar);
  trackComponent(CustomDrawerContent);

  // Shared non-memo UI
  trackComponent(ScreenHeader);
  trackComponent(FadeInView);
  trackComponent(ScalePressable);
  trackComponent(InputField);
  trackComponent(SocialAuthButton);
  trackComponent(ApiStateView);

  // Memoized performance-sensitive components (also tracked via trackAllPureComponents)
  trackComponent(GifteeListItem, { customName: 'GifteeListItem' });
  trackComponent(GifteeCard, { customName: 'GifteeCard' });
  trackComponent(GiftList, { customName: 'GiftList' });
  trackComponent(GiftListRow, { customName: 'GiftListRow' });
  trackComponent(GiftCard, { customName: 'GiftCard' });
  trackComponent(PrimaryButton, { customName: 'PrimaryButton' });
  trackComponent(SecondaryButton, { customName: 'SecondaryButton' });
  trackComponent(OptionPill, { customName: 'OptionPill' });
  trackComponent(InterestTag, { customName: 'InterestTag' });
  trackComponent(QuestionHeader, { customName: 'QuestionHeader' });
  trackComponent(QuizSingleOption, { customName: 'QuizSingleOption' });
  trackComponent(QuizMultiOption, { customName: 'QuizMultiOption' });
};
