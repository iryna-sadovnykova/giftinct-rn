import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CalendarScreen } from '../screens/CalendarScreen';
import { GifteesScreen } from '../screens/GifteesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AppTabBar } from './AppTabBar';
import { tabScreenOptions } from './screenOptions';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: React.ComponentProps<typeof AppTabBar>) => (
  <AppTabBar {...props} />
);

/**
 * Main bottom tabs from the design: Home, Calendar, Giftees, Settings.
 * Wrapped inside the drawer navigator for authenticated users.
 */
export const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={tabScreenOptions}
    tabBar={renderTabBar}>
    <Tab.Screen
      component={HomeScreen}
      name="Home"
      options={{ title: 'Home' }}
    />
    <Tab.Screen
      component={CalendarScreen}
      name="Calendar"
      options={{ title: 'Calendar' }}
    />
    <Tab.Screen
      component={GifteesScreen}
      name="Giftees"
      options={{ title: 'Giftees' }}
    />
    <Tab.Screen
      component={SettingsScreen}
      name="Settings"
      options={{ title: 'Settings' }}
    />
  </Tab.Navigator>
);
