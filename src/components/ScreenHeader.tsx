import React, { ReactNode } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

export type ScreenHeaderProps = {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
  rightElement?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  backLabel = 'Back',
  rightElement,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>
        {onBack ? (
          <TouchableOpacity
            accessibilityLabel="Go back"
            accessibilityRole="button"
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={onBack}
            style={styles.backButton}>
            <Text style={styles.backChevron}>
              {Platform.OS === 'ios' ? '‹' : '←'}
            </Text>
            <Text style={styles.backLabel}>{backLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        {title ? (
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        ) : null}
      </View>
      <View style={[styles.side, styles.rightSide]}>{rightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: Spacing.md,
  },
  side: {
    flex: 1,
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
    flex: 2,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backChevron: {
    color: Colors.primary,
    marginRight: 2,
    ...Platform.select({
      ios: { fontSize: 28, lineHeight: 30 },
      android: { fontSize: 22, lineHeight: 24 },
      default: { fontSize: 22, lineHeight: 24 },
    }),
  },
  backLabel: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
  },
  title: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
  },
});
