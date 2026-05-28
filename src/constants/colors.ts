export const Colors = {
  primary: '#F5222D',
  primaryDark: '#CF1322',
  primaryLight: '#FFF1F0',

  accent: '#FF7875',
  accentLight: '#FFCCC7',

  background: '#FFFFFF',
  surface: '#F5F5F9',
  surfaceAlt: '#F7F7F7',

  text: '#000000',
  textSecondary: '#333333',
  textMuted: '#888888',
  textInverse: '#FFFFFF',
  textPlaceholder: '#BBBBBB',

  border: '#DDDDDD',
  borderThin: '#EEEEEE',
  borderActive: '#F5222D',

  success: '#6ABF47',
  error: '#F4333C',
  warning: '#FAAD14',

  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.4)',
} as const;

export const antdTheme = {
  brand_primary: Colors.primary,
  brand_primary_tap: Colors.primaryDark,
} as const;

export type ColorToken = keyof typeof Colors;
