import Input from '@ant-design/react-native/lib/input';
import React, { ComponentProps } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

type AntdInputProps = ComponentProps<typeof Input>;

export type InputFieldProps = Omit<AntdInputProps, 'style' | 'status'> & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerStyle,
  ...rest
}) => {
  const hasError = Boolean(error);
  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Input
        {...rest}
        status={hasError ? 'error' : undefined}
        style={[styles.box, hasError && styles.boxError]}
      />
      {hasError ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.caption,
    marginBottom: Spacing.xs,
  },
  box: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderRadius: Radius.xxs,
    borderWidth: StyleSheet.hairlineWidth * 2,
    minHeight: 48,
    paddingHorizontal: Spacing.md,
  },
  boxError: {
    borderColor: Colors.error,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.caption,
    marginTop: Spacing.xxs,
  },
});
