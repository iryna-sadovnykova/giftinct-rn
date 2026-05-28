import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { useRootNavigation } from '../navigation/hooks';
import { MainDrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<MainDrawerParamList, 'PremiumInfo'>;

const FEATURES = [
  'Advanced AI gift recommendations',
  'Unlimited giftees',
  'Unlimited saved gifts',
  'Smart reminders',
  'Gift history tracking',
];

/** Drawer screen — Giftinct+ premium overview. */
export const PremiumScreen: React.FC<Props> = ({ navigation }) => {
  const getRootNav = useRootNavigation();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader onBack={() => navigation.goBack()} title="Giftinct+" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Premium plan</Text>
          <Text style={styles.heroPrice}>From $5/month</Text>
        </View>
        {FEATURES.map(f => (
          <Text key={f} style={styles.feature}>
            ✓ {f}
          </Text>
        ))}
        <PrimaryButton
          onPress={() => getRootNav()?.navigate('Checkout', { plan: 'monthly' })}
          style={styles.cta}
          title="Upgrade to Premium"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  hero: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  heroTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
  },
  heroPrice: {
    color: Colors.primary,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.heading,
    marginTop: Spacing.xs,
  },
  feature: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    marginBottom: Spacing.sm,
  },
  cta: {
    marginTop: Spacing.xl,
  },
});
