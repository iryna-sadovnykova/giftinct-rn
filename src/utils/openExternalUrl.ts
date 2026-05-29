import { Linking } from 'react-native';

export const openExternalUrl = (url: string): void => {
  Linking.openURL(url).catch(() => undefined);
};
