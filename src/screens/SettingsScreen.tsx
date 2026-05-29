import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
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
import { useAuth } from '../context/AuthContext';
import { useRootNavigation } from '../navigation/hooks';
import { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Settings'>;

type SettingsTab = 'account' | 'notifications' | 'premium';

const SETTINGS_TABS: { key: SettingsTab; label: string }[] = [
  { key: 'account', label: 'Account' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'premium', label: 'Giftinct+' },
];

/** Settings tab — Account, Notifications, Giftinct+ sub-sections from the design. */
export const SettingsScreen: React.FC<Props> = () => {
  const getRootNav = useRootNavigation();
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pushEvents, setPushEvents] = useState(true);
  const [emailEvents, setEmailEvents] = useState(false);
  const [pushNews, setPushNews] = useState(true);
  const [emailNews, setEmailNews] = useState(true);
  const [pushDeals, setPushDeals] = useState(false);
  const [emailDeals, setEmailDeals] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber ?? '');
    }
  }, [user]);

  const handleSaveProfile = () => {
    updateProfile({ firstName, lastName, email, phoneNumber });
  };

  const handleDeleteAccount = () => {
    logout();
    getRootNav()?.navigate('Welcome');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader title="Settings" />

      <View style={styles.tabRow}>
        {SETTINGS_TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.tabLabelActive,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {activeTab === 'account' ? (
          <>
            {!isAuthenticated ? (
              <Text style={styles.signInPrompt}>
                Log in to view and edit your account details.
              </Text>
            ) : null}
            <InputField
              editable={isAuthenticated}
              label="First Name"
              onChangeText={setFirstName}
              value={firstName}
            />
            <InputField
              containerStyle={styles.field}
              editable={isAuthenticated}
              label="Last Name"
              onChangeText={setLastName}
              value={lastName}
            />
            <InputField
              autoCapitalize="none"
              containerStyle={styles.field}
              editable={isAuthenticated}
              keyboardType="email-address"
              label="Email"
              onChangeText={setEmail}
              value={email}
            />
            <InputField
              containerStyle={styles.field}
              editable={isAuthenticated}
              keyboardType="phone-pad"
              label="Phone Number"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
            <InputField
              containerStyle={styles.field}
              editable={isAuthenticated}
              label="Password"
              onChangeText={() => undefined}
              secureTextEntry
              value="passwordtest"
            />
            <InputField
              containerStyle={styles.field}
              editable={isAuthenticated}
              label="Repeat Password"
              onChangeText={() => undefined}
              secureTextEntry
              value="passwordtest"
            />
            <PrimaryButton
              disabled={!isAuthenticated}
              onPress={handleSaveProfile}
              style={styles.cta}
              title="Save changes"
            />
            <SecondaryButton
              disabled={!isAuthenticated}
              onPress={handleDeleteAccount}
              style={styles.cta}
              title="Delete account"
            />
          </>
        ) : null}

        {activeTab === 'notifications' ? (
          <>
            <NotificationGroup
              description="Get notifications about upcoming events (birthdays, anniversaries, etc.)"
              email={emailEvents}
              onEmailChange={setEmailEvents}
              onPushChange={setPushEvents}
              push={pushEvents}
              title="Upcoming events"
            />
            <NotificationGroup
              description="Get the latest news about the Giftinct services"
              email={emailNews}
              onEmailChange={setEmailNews}
              onPushChange={setPushNews}
              push={pushNews}
              title="News"
            />
            <NotificationGroup
              description="Get special deals and promotions"
              email={emailDeals}
              onEmailChange={setEmailDeals}
              onPushChange={setPushDeals}
              push={pushDeals}
              title="Deals"
            />
            <PrimaryButton onPress={() => undefined} style={styles.cta} title="Save changes" />
          </>
        ) : null}

        {activeTab === 'premium' ? (
          <>
            <PremiumPlanCard
              features={PREMIUM_FEATURES}
              onUpgrade={() => getRootNav()?.navigate('Checkout', { plan: 'monthly' })}
              period="monthly"
              price="$5/month"
            />
            <PremiumPlanCard
              features={PREMIUM_FEATURES}
              onUpgrade={() => getRootNav()?.navigate('Checkout', { plan: 'yearly' })}
              period="yearly"
              price="$40/year (33% discount)"
              style={styles.planSpacer}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const PREMIUM_FEATURES = [
  'Advanced AI gift recommendations',
  'Unlimited giftees',
  'Unlimited saved gifts',
  'Smart reminders',
  'Gift history tracking',
];

type NotificationGroupProps = {
  title: string;
  description: string;
  push: boolean;
  email: boolean;
  onPushChange: (v: boolean) => void;
  onEmailChange: (v: boolean) => void;
};

const NotificationGroup: React.FC<NotificationGroupProps> = ({
  title,
  description,
  push,
  email,
  onPushChange,
  onEmailChange,
}) => (
  <View style={styles.notifGroup}>
    <Text style={styles.notifTitle}>{title}</Text>
    <Text style={styles.notifDesc}>{description}</Text>
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>Push</Text>
      <Switch
        onValueChange={onPushChange}
        thumbColor={Colors.background}
        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
        value={push}
      />
    </View>
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>Email</Text>
      <Switch
        onValueChange={onEmailChange}
        thumbColor={Colors.background}
        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
        value={email}
      />
    </View>
  </View>
);

type PremiumPlanCardProps = {
  period: string;
  price: string;
  features: string[];
  onUpgrade: () => void;
  style?: object;
};

const PremiumPlanCard: React.FC<PremiumPlanCardProps> = ({
  period,
  price,
  features,
  onUpgrade,
  style,
}) => (
  <View style={[styles.planCard, style]}>
    <Text style={styles.planTitle}>Premium plan ({period})</Text>
    <Text style={styles.planPrice}>{price}</Text>
    {features.map(f => (
      <Text key={f} style={styles.planFeature}>
        • {f}
      </Text>
    ))}
    <PrimaryButton onPress={onUpgrade} style={styles.cta} title="Upgrade to Premium" />
  </View>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.surface,
    flex: 1,
  },
  tabRow: {
    borderBottomColor: Colors.borderThin,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    marginRight: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabLabel: {
    color: Colors.textMuted,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.caption,
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  signInPrompt: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    marginBottom: Spacing.md,
  },
  field: {
    marginTop: Spacing.md,
  },
  cta: {
    marginTop: Spacing.lg,
  },
  notifGroup: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  notifTitle: {
    color: Colors.text,
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.body,
  },
  notifDesc: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
    marginBottom: Spacing.sm,
    marginTop: Spacing.xxs,
  },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  switchLabel: {
    color: Colors.text,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
  },
  planCard: {
    backgroundColor: Colors.background,
    borderColor: Colors.borderThin,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
  },
  planSpacer: {
    marginTop: Spacing.lg,
  },
  planTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
  },
  planPrice: {
    color: Colors.primary,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },
  planFeature: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    marginBottom: Spacing.xxs,
  },
});
