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

const PrimaryButtonComponent: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
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
      loading={loading}
      onPress={onPress}
      style={buttonStyle}
      styles={BUTTON_THEME_STYLES}
      testID={testID}
      type="primary">
      {title}
    </Button>
  );
};

export const PrimaryButton = memo(PrimaryButtonComponent);
