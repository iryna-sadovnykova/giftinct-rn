import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { QuizScreen } from '../screens/QuizScreen';
import { stackScreenOptions } from './screenOptions';
import { QuizStackParamList } from './types';

const Stack = createNativeStackNavigator<QuizStackParamList>();

/**
 * 8-step gift finder quiz — each step is pushed onto the stack so
 * the native swipe-back gesture walks through previous answers.
 */
export const QuizStackNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen
      component={QuizScreen}
      getId={({ params }) => String(params.step)}
      initialParams={{ step: 1, answers: {} }}
      name="QuizStep"
      options={{ animationDuration: 280 }}
    />
  </Stack.Navigator>
);
