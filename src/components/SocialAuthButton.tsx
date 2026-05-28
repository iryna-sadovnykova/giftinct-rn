import Button from '@ant-design/react-native/lib/button';
import Icon, { IconNames } from '@ant-design/react-native/lib/icon';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily } from '../constants/typography';

export type SocialProvider = 'google' | 'facebook' | 'apple';

type ProviderMeta = {
  icon: IconNames;
  defaultLabel: string;
};

const PROVIDER_META: Record<SocialProvider, ProviderMeta> = {
  google: { icon: 'google', defaultLabel: 'Continue with Google' },
  facebook: { icon: 'facebook', defaultLabel: 'Continue with Facebook' },
  apple: { icon: 'apple', defaultLabel: 'Continue with Apple' },
};

export type SocialAuthButtonProps = {
  provider: SocialProvider;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onPress,
  label,
  disabled = false,
  style,
  testID,
}) => {
  const meta = PROVIDER_META[provider];
  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={StyleSheet.flatten(style) ?? undefined}
      testID={testID}>
      <View style={styles.content}>
        <Icon color={Colors.text} name={meta.icon} size={20} />
        <Text style={styles.label}>{label ?? meta.defaultLabel}</Text>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: Colors.text,
    fontFamily: FontFamily.bodyMedium,
    marginLeft: Spacing.xs,
  },
});
