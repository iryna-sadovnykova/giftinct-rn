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
  defaultRaw: {
    backgroundColor: Colors.background,
    borderColor: Colors.borderThin,
  },
  defaultRawText: { color: Colors.text },
};

export type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  testID,
}) => (
  <Button
    disabled={disabled}
    onPress={onPress}
    style={StyleSheet.flatten([BUTTON_BASE_STYLE, style])}
    styles={BUTTON_THEME_STYLES}
    testID={testID}>
    {title}
  </Button>
);
