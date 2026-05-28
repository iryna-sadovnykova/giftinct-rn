import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { SecondaryButton } from '../components/SecondaryButton';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

/** Checkout screen — receives `plan` ('monthly' | 'yearly') via route.params. */
export const CheckoutScreen: React.FC<Props> = ({ navigation, route }) => {
  const { plan } = route.params;
  const [billing, setBilling] = useState<'monthly' | 'yearly'>(plan);
  const price = billing === 'monthly' ? '$5' : '$40';
  const period = billing === 'monthly' ? '1 month' : '1 year';

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader onBack={() => navigation.goBack()} title="Checkout" />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Monthly / Yearly toggle */}
        <View style={styles.billingRow}>
          {(['monthly', 'yearly'] as const).map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setBilling(option)}
              style={[
                styles.billingPill,
                billing === option && styles.billingPillActive,
              ]}>
              <Text
                style={[
                  styles.billingLabel,
                  billing === option && styles.billingLabelActive,
                ]}>
                {option === 'monthly' ? 'Monthly' : 'Yearly'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <SecondaryButton onPress={() => undefined} title="Credit or debit card" />

        <InputField
          containerStyle={styles.field}
          keyboardType="number-pad"
          label="Card number"
          onChangeText={() => undefined}
          placeholder="1111 2222 3333 4444"
          value="1111 2222 3333 4444"
        />
        <View style={styles.row}>
          <InputField
            containerStyle={styles.rowField}
            label="Expiration date"
            onChangeText={() => undefined}
            placeholder="MM/YY"
            value="MM/YY"
          />
          <InputField
            containerStyle={styles.rowField}
            label="CVV"
            onChangeText={() => undefined}
            placeholder="123"
            value="123"
          />
        </View>
        <InputField
          containerStyle={styles.field}
          label="Cardholder name"
          onChangeText={() => undefined}
          value="John Doe"
        />

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Giftinct {billing === 'monthly' ? 'Monthly' : 'Yearly'} Subscription ({period})
          </Text>
          <Text style={styles.summaryValue}>{price}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes & Fees</Text>
          <Text style={styles.summaryValue}>$0</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total</Text>
          <Text style={styles.summaryTotal}>{price}</Text>
        </View>

        <Text style={styles.legal}>
          By completing your purchase, you agree to the Terms of Service and
          Privacy Policy. Your Premium subscription will renew automatically.
          You can cancel anytime in your account settings.
        </Text>

        <PrimaryButton
          onPress={() => navigation.navigate('CheckoutSuccess')}
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
  billingRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  billingPill: {
    borderColor: Colors.borderThin,
    borderRadius: Radius.pill,
    borderWidth: 1,
    flex: 1,
    paddingVertical: Spacing.sm,
  },
  billingPillActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  billingLabel: {
    color: Colors.text,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  billingLabelActive: {
    color: Colors.primary,
  },
  sectionTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  field: {
    marginTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  rowField: {
    flex: 1,
    marginTop: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    flex: 1,
    fontSize: FontSize.small,
  },
  summaryValue: {
    color: Colors.text,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
  },
  summaryTotal: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
  },
  legal: {
    color: Colors.textMuted,
    fontFamily: FontFamily.body,
    fontSize: FontSize.caption,
    lineHeight: 18,
    marginTop: Spacing.lg,
  },
  cta: {
    marginTop: Spacing.lg,
  },
});
