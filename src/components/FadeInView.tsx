import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type FadeInViewProps = {
  children: React.ReactNode;
  /** Stagger list/grid items by multiplying index × ~60ms. */
  delay?: number;
  duration?: number;
  slideOffset?: number;
  /** Re-run enter animation when this value changes (e.g. quiz step). */
  animationKey?: string | number;
  style?: StyleProp<ViewStyle>;
};

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 400,
  slideOffset = 16,
  animationKey,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(slideOffset);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = slideOffset;
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(delay, withTiming(0, { duration }));
  }, [animationKey, delay, duration, opacity, slideOffset, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};
