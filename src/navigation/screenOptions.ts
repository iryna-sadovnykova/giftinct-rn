import { Colors } from '../constants/colors';
import { FontFamily } from '../constants/typography';

/** Shared stack screen options — swipe-back gestures enabled for linear flows. */
export const stackScreenOptions = {
  headerShown: false as const,
  gestureEnabled: true,
  animation: 'slide_from_right' as const,
  contentStyle: { backgroundColor: Colors.background },
};

/** Auth / onboarding stack screens slide in from the bottom on iOS-like sheets. */
export const authStackScreenOptions = {
  ...stackScreenOptions,
  animation: 'slide_from_bottom' as const,
};

/** Modal-style checkout screens. */
export const modalStackScreenOptions = {
  ...stackScreenOptions,
  presentation: 'modal' as const,
  animation: 'slide_from_bottom' as const,
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
