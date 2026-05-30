import { Colors } from '../constants/colors';
import { FontFamily } from '../constants/typography';

/** Shared stack screen options — swipe-back gestures enabled for linear flows. */
export const stackScreenOptions = {
  headerShown: false as const,
  gestureEnabled: true,
  animation: 'slide_from_right' as const,
  contentStyle: { backgroundColor: Colors.background },
};

/** List → detail pushes — full-screen swipe-back on iOS. */
export const detailStackScreenOptions = {
  ...stackScreenOptions,
  fullScreenGestureEnabled: true,
  animationMatchesGesture: true,
};

/** Post-quiz results — softer entrance than a hard horizontal push. */
export const resultsStackScreenOptions = {
  ...stackScreenOptions,
  animation: 'fade_from_bottom' as const,
  animationDuration: 320,
  fullScreenGestureEnabled: true,
};

/** Quiz flow entry — consistent timing with in-quiz step transitions. */
export const quizFlowScreenOptions = {
  ...stackScreenOptions,
  animationDuration: 320,
};

/** Auth / onboarding stack screens slide in from the bottom on iOS-like sheets. */
export const authStackScreenOptions = {
  ...stackScreenOptions,
  animation: 'slide_from_bottom' as const,
  animationDuration: 320,
};

/** Modal-style checkout screens. */
export const modalStackScreenOptions = {
  ...stackScreenOptions,
  presentation: 'modal' as const,
  animation: 'slide_from_bottom' as const,
  animationDuration: 320,
};

/** Drawer styling aligned with Giftinct brand colors. */
export const drawerScreenOptions = {
  headerShown: true as const,
  drawerType: 'front' as const,
  swipeEnabled: true,
  drawerActiveTintColor: Colors.primary,
  drawerInactiveTintColor: Colors.textSecondary,
  drawerLabelStyle: { fontFamily: FontFamily.bodyMedium },
  drawerStyle: { width: 280 },
};

/** Bottom tab defaults — custom tab bar handles visuals. */
export const tabScreenOptions = {
  headerShown: false as const,
};
