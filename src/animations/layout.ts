import { LayoutAnimation, Platform, UIManager } from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/** Cross-fade / ease layout changes (tab switches, list updates). */
export const animateLayout = () => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      280,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity,
    ),
  );
};

export const animateLayoutSpring = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
};
