import Button from '@ant-design/react-native/lib/button';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { FontFamily } from '../constants/typography';

const BUTTON_BASE_STYLE: ViewStyle = {
  alignSelf: 'stretch',
  borderRadius: 4,
  height: 40,
};

const BUTTON_THEME_STYLES = {
  rawText: { fontFamily: FontFamily.bodySemibold },
  primaryRaw: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
};

export type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  testID,
}) => (
  <Button
    disabled={disabled}
    loading={loading}
    onPress={onPress}
    style={StyleSheet.flatten([BUTTON_BASE_STYLE, style])}
    styles={BUTTON_THEME_STYLES}
    testID={testID}
    type="primary">
    {title}
  </Button>
);
