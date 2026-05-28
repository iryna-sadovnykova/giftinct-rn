import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { HelpScreen } from '../screens/HelpScreen';
import { PremiumScreen } from '../screens/PremiumScreen';
import { CustomDrawerContent } from './CustomDrawerContent';
import { MainTabNavigator } from './MainTabNavigator';
import { drawerScreenOptions } from './screenOptions';
import { MainDrawerParamList } from './types';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const renderDrawerContent = (props: React.ComponentProps<typeof CustomDrawerContent>) => (
  <CustomDrawerContent {...props} />
);

/**
 * Drawer navigator — wraps the main tabs and exposes extra routes
 * (Help, Premium) via swipe gesture or the header menu button.
 */
export const MainDrawerNavigator: React.FC = () => (
  <Drawer.Navigator
    drawerContent={renderDrawerContent}
    initialRouteName="MainTabs"
    screenOptions={drawerScreenOptions}>
    <Drawer.Screen
      component={MainTabNavigator}
      name="MainTabs"
      options={{
        title: 'Giftinct',
        headerShown: false,
        swipeEnabled: true,
      }}
    />
    <Drawer.Screen
      component={PremiumScreen}
      name="PremiumInfo"
      options={{
        title: 'Giftinct+',
        headerShown: false,
      }}
    />
    <Drawer.Screen
      component={HelpScreen}
      name="Help"
      options={{
        title: 'Help',
        headerShown: false,
      }}
    />
  </Drawer.Navigator>
);
