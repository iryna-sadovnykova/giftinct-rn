import Button from '@ant-design/react-native/lib/button';
import React, { memo, useMemo } from 'react';
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

const SecondaryButtonComponent: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  const buttonStyle = useMemo(
    () => StyleSheet.flatten([BUTTON_BASE_STYLE, style]),
    [style],
  );

  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={buttonStyle}
      styles={BUTTON_THEME_STYLES}
      testID={testID}>
      {title}
    </Button>
  );
};

export const SecondaryButton = memo(SecondaryButtonComponent);
