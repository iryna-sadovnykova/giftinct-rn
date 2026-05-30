import Tag from '@ant-design/react-native/lib/tag';
import type { TagStyle } from '@ant-design/react-native/lib/tag/style';
import React, { memo, useCallback } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily } from '../constants/typography';

const TAG_STYLES: Partial<TagStyle> = {
  wrap: {
    borderRadius: 4,
    borderWidth: 1,
    height: 28,
    paddingHorizontal: Spacing.md,
  },
  normalWrap: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  normalText: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
  },
  activeWrap: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  activeText: {
    color: Colors.textInverse,
    fontFamily: FontFamily.bodyMedium,
  },
  disabledWrap: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  disabledText: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
  },
};

export type InterestTagProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const InterestTagComponent: React.FC<InterestTagProps> = ({
  label,
  selected = false,
  onPress,
  style,
  testID,
}) => {
  const handleChange = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <Tag
        disabled={!onPress}
        onChange={onPress ? handleChange : undefined}
        selected={selected}
        styles={TAG_STYLES}>
        {label}
      </Tag>
    </View>
  );
};

export const InterestTag = memo(InterestTagComponent);

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
  },
});
