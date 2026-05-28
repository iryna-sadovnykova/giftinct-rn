import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { CheckoutSuccessScreen } from '../screens/CheckoutSuccessScreen';
import { GiftResultsScreen } from '../screens/GiftResultsScreen';
import { GifteeDetailScreen } from '../screens/GifteeDetailScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { MainDrawerNavigator } from './MainDrawerNavigator';
import {
  authStackScreenOptions,
  modalStackScreenOptions,
  stackScreenOptions,
} from './screenOptions';
import { QuizStackNavigator } from './QuizStackNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root stack — orchestrates onboarding, auth, quiz, main app (drawer),
 * and modal-style checkout flows.
 */
export const RootNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Welcome" screenOptions={stackScreenOptions}>
    {/* Onboarding */}
    <Stack.Screen component={WelcomeScreen} name="Welcome" />

    {/* Auth — slide up like sheets */}
    <Stack.Screen
      component={LoginScreen}
      name="Login"
      options={authStackScreenOptions}
    />
    <Stack.Screen
      component={SignUpScreen}
      name="SignUp"
      options={authStackScreenOptions}
    />

    {/* 8-step quiz — nested stack with swipe-back between steps */}
    <Stack.Screen
      component={QuizStackNavigator}
      name="QuizFlow"
      options={{ gestureEnabled: true }}
    />

    {/* Main app — drawer + bottom tabs */}
    <Stack.Screen
      component={MainDrawerNavigator}
      name="Main"
      options={{ gestureEnabled: false }}
    />

    {/* Post-quiz gift results */}
    <Stack.Screen component={GiftResultsScreen} name="GiftResults" />

    {/* Giftee profile with Profile / Saved / Ideas tabs */}
    <Stack.Screen component={GifteeDetailScreen} name="GifteeDetail" />

    {/* Premium checkout flow */}
    <Stack.Screen
      component={CheckoutScreen}
      name="Checkout"
      options={modalStackScreenOptions}
    />
    <Stack.Screen
      component={CheckoutSuccessScreen}
      name="CheckoutSuccess"
      options={{ ...modalStackScreenOptions, gestureEnabled: false }}
    />
  </Stack.Navigator>
);
