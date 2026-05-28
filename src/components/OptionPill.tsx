import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

export type OptionPillProps = {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress: () => void;
  columns?: 1 | 2;
  containerHorizontalPadding?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const OptionPill: React.FC<OptionPillProps> = ({
  label,
  emoji,
  selected = false,
  onPress,
  columns = 1,
  containerHorizontalPadding = Spacing.lg * 2,
  style,
  testID,
}) => {
  const { width } = useWindowDimensions();
  const gap = Spacing.sm;
  const pillWidth =
    columns === 2
      ? Math.floor((width - containerHorizontalPadding - gap) / 2)
      : undefined;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.pill,
        pillWidth != null ? { width: pillWidth } : styles.fullWidth,
        selected && styles.pillSelected,
        style,
      ]}
      testID={testID}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text
        numberOfLines={1}
        style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

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
