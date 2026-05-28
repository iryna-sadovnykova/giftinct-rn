import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

/** Landing screen — entry point before quiz or login. */
export const WelcomeScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.content}>
      <Text style={styles.title}>
        Find the perfect gift in minutes
      </Text>
      <Text style={styles.subtitle}>
        Answer a few simple questions about the person you're buying for.
        Giftinct will generate thoughtful gift ideas tailored to their
        personality, interests, and your budget.
      </Text>
      <PrimaryButton
        onPress={() => navigation.navigate('QuizFlow')}
        style={styles.cta}
        title="Get started"
      />
      <SecondaryButton
        onPress={() => navigation.navigate('Login')}
        style={styles.secondary}
        title="I already have an account"
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.display,
    lineHeight: 40,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    lineHeight: 24,
    marginBottom: Spacing.xxxl,
  },
  cta: {
    marginBottom: Spacing.sm,
  },
  secondary: {},
});
