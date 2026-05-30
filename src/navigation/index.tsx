import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Colors } from '../constants/colors';
import { RootNavigator } from './RootNavigator';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

/** App-wide navigation container — required ancestor for all navigators. */
export const AppNavigation: React.FC = () => (
  <NavigationContainer theme={navigationTheme}>
    <RootNavigator />
  </NavigationContainer>
);
