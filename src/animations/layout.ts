import { LayoutAnimation } from 'react-native';

/**
 * Cross-fade / ease layout changes (tab switches, list updates).
 * New Architecture does not support UIManager.setLayoutAnimationEnabledExperimental;
 * configureNext uses the Fabric layout animation path instead.
 */
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
