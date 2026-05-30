import React, { memo, useCallback, useEffect } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { animateLayout } from '../animations/layout';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { ScalePressable } from './ScalePressable';

export type OptionPillProps = {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress: () => void;
  columns?: 1 | 2;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const OptionPillComponent: React.FC<OptionPillProps> = ({
  label,
  emoji,
  selected = false,
  onPress,
  columns = 1,
  style,
  testID,
}) => {
  const selectionScale = useSharedValue(1);

  useEffect(() => {
    selectionScale.value = withSpring(selected ? 1.03 : 1, {
      damping: 12,
      stiffness: 350,
    });
  }, [selected, selectionScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: selectionScale.value }],
  }));

  const handlePress = useCallback(() => {
    animateLayout();
    onPress();
  }, [onPress]);

  return (
    <ScalePressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={handlePress}
      style={[columns === 2 ? styles.halfWidth : styles.fullWidth, style]}
      testID={testID}>
      <Animated.View
        style={[styles.pill, selected && styles.pillSelected, animatedStyle]}>
        {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
        <Text
          numberOfLines={1}
          style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
      </Animated.View>
    </ScalePressable>
  );
};

export const OptionPill = memo(OptionPillComponent);

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    flexDirection: 'row',
    minHeight: 56,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  pillSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  emoji: {
    fontSize: 22,
    marginRight: Spacing.sm,
  },
  label: {
    color: Colors.text,
    flexShrink: 1,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
  },
  labelSelected: {
    color: Colors.primaryDark,
    fontFamily: FontFamily.bodySemibold,
  },
});
