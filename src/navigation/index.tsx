import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootNavigator } from './RootNavigator';

/** App-wide navigation container — required ancestor for all navigators. */
export const AppNavigation: React.FC = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);
