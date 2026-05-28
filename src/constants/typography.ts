import { TextStyle } from 'react-native';

export const FontSize = {
  caption: 12,
  small: 14,
  body: 16,
  subheading: 18,
  title: 22,
  heading: 28,
  display: 34,
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, TextStyle['fontWeight']>;

export const LineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const FontFamily = {
  body: 'Inter-Regular',
  bodyMedium: 'Inter-Medium',
  bodySemibold: 'Inter-SemiBold',
  bodyBold: 'Inter-Bold',
  heading: 'DelaGothicOne-Regular',
} as const;

export type FontSizeToken = keyof typeof FontSize;
export type FontWeightToken = keyof typeof FontWeight;
export type FontFamilyToken = keyof typeof FontFamily;
