import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { MainDrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<MainDrawerParamList, 'Help'>;

/** Drawer screen — help & FAQ content. */
export const HelpScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView edges={['top']} style={styles.safe}>
    <ScreenHeader onBack={() => navigation.goBack()} title="Help" />
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.question}>How does the gift quiz work?</Text>
      <Text style={styles.answer}>
        Answer 8 questions about the person you're buying for. Giftinct uses your
        answers to generate personalised gift recommendations.
      </Text>
      <Text style={styles.question}>Can I save gifts for later?</Text>
      <Text style={styles.answer}>
        Tap the heart icon on any gift card to save it. View saved gifts on a
        giftee's profile under the "Saved gifts" tab.
      </Text>
      <Text style={styles.question}>What is Giftinct+?</Text>
      <Text style={styles.answer}>
        Giftinct+ unlocks advanced AI recommendations, unlimited giftees, smart
        reminders, and gift history tracking. Open the drawer menu to learn more.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  question: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
    marginBottom: Spacing.xs,
    marginTop: Spacing.lg,
  },
  answer: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    lineHeight: 22,
  },
});
