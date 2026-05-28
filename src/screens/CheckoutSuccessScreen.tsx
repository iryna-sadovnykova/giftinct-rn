import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckoutSuccess'>;

/** Order confirmation — navigates back to the main app drawer. */
export const CheckoutSuccessScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.content}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>Your order was successful!</Text>
      <PrimaryButton
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        }
        title="Go to the main page"
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginBottom: Spacing.xxxl,
    textAlign: 'center',
  },
});
