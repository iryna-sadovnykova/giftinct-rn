import React, { ReactNode, useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBar, BottomTab } from '../components/BottomTabBar';
import { GiftCard } from '../components/GiftCard';
import { GiftList, GiftListItem } from '../components/GiftList';
import { GifteeCard } from '../components/GifteeCard';
import { InputField } from '../components/InputField';
import { InterestTag } from '../components/InterestTag';
import { OptionPill } from '../components/OptionPill';
import { PrimaryButton } from '../components/PrimaryButton';
import { QuestionHeader } from '../components/QuestionHeader';
import { ScreenHeader } from '../components/ScreenHeader';
import { SecondaryButton } from '../components/SecondaryButton';
import { SocialAuthButton } from '../components/SocialAuthButton';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

const RELATIONSHIP_OPTIONS = [
  { id: 'partner', label: 'Romantic partner', emoji: '💖' },
  { id: 'friend', label: 'Friend', emoji: '🤝' },
  { id: 'parent', label: 'Parent', emoji: '👨\u200d👩\u200d👧' },
];

const OCCASION_OPTIONS = [
  { id: 'birthday', label: 'Birthday', emoji: '🎂' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💍' },
  { id: 'christmas', label: 'Christmas', emoji: '🎄' },
  { id: 'wedding', label: 'Wedding', emoji: '👰' },
];

const INTERESTS = [
  'Art',
  'Wine',
  'Concerts',
  'Design',
  'Photography',
  'Crafting',
];

const GIFT_ITEMS: GiftListItem[] = [
  {
    id: '1',
    title: 'Handmade Ceramic Tea Set',
    price: '$45',
    description: 'Great for someone who loves art and cozy home decor',
    ctaLabel: 'View on Etsy',
  },
  {
    id: '2',
    title: 'Film Camera for Beginners',
    price: '$89',
    description:
      'Perfect for someone exploring photography and creative hobbies',
    ctaLabel: 'View on Amazon',
  },
  {
    id: '3',
    title: 'Wine Tasting Experience',
    price: '$60',
    description:
      'A memorable evening for someone who enjoys wine and new experiences',
    ctaLabel: 'View on Virgin Gifts',
  },
  {
    id: '4',
    title: 'Art Museum Membership',
    price: '$75',
    description:
      'Ideal for someone who loves galleries and creative inspiration',
    ctaLabel: 'View on The Met Store',
  },
];

const toggleInSet = <T,>(set: Set<T>, item: T): Set<T> => {
  const next = new Set(set);
  if (next.has(item)) {
    next.delete(item);
  } else {
    next.add(item);
  }
  return next;
};

export const ComponentShowcaseScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showGiftList, setShowGiftList] = useState(false);

  const [relationship, setRelationship] = useState<string | null>('friend');
  const [occasions, setOccasions] = useState<Set<string>>(
    new Set(['birthday']),
  );
  const [interests, setInterests] = useState<Set<string>>(
    new Set(['Art', 'Wine']),
  );

  const [step, setStep] = useState(3);
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState('not-an-email');
  const [loading, setLoading] = useState(false);
  const [savedGifts, setSavedGifts] = useState<Set<string>>(new Set());

  const toggleSavedGift = useCallback((id: string) => {
    setSavedGifts(prev => toggleInSet(prev, id));
  }, []);

  const showcaseContent: ReactNode = (
    <View style={styles.tabContainer}>
      <ScreenHeader title="Component Showcase" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Section title="PrimaryButton / SecondaryButton">
          <PrimaryButton
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1200);
            }}
            title="Get started"
          />
          <PrimaryButton
            disabled
            onPress={() => undefined}
            style={styles.stack}
            title="Disabled primary"
          />
          <SecondaryButton
            onPress={() => Alert.alert('Back pressed')}
            style={styles.stack}
            title="Back"
          />
          <SecondaryButton
            disabled
            onPress={() => undefined}
            style={styles.stack}
            title="Disabled secondary"
          />
        </Section>

        <Section title="InputField">
          <InputField
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="you@example.com"
            value={email}
          />
          <InputField
            containerStyle={styles.stack}
            label="Password"
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            value={password}
          />
          <InputField
            autoCapitalize="none"
            containerStyle={styles.stack}
            error="Please enter a valid email address"
            label="Email"
            onChangeText={setInvalidEmail}
            value={invalidEmail}
          />
        </Section>

        <Section title="SocialAuthButton (AntD Button)">
          <SocialAuthButton
            onPress={() => Alert.alert('Google sign-in')}
            provider="google"
          />
          <SocialAuthButton
            onPress={() => Alert.alert('Facebook sign-in')}
            provider="facebook"
            style={styles.stack}
          />
          <SocialAuthButton
            onPress={() => Alert.alert('Apple sign-in')}
            provider="apple"
            style={styles.stack}
          />
        </Section>

        <Section title="QuestionHeader">
          <QuestionHeader
            question="What is the occasion?"
            step={step}
            subtitle="Pick the closest one — you can change it later."
            totalSteps={8}
          />
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <SecondaryButton
                onPress={() => setStep(Math.max(1, step - 1))}
                title="Prev step"
              />
            </View>
            <View style={styles.rowItem}>
              <PrimaryButton
                onPress={() => setStep(Math.min(8, step + 1))}
                title="Next step"
              />
            </View>
          </View>
        </Section>

        <Section title="OptionPill — 1 column (single-select)">
          {RELATIONSHIP_OPTIONS.map(opt => (
            <OptionPill
              emoji={opt.emoji}
              key={opt.id}
              label={opt.label}
              onPress={() => setRelationship(opt.id)}
              selected={relationship === opt.id}
              style={styles.stack}
            />
          ))}
        </Section>

        <Section title="OptionPill — 2 columns (multi-select)">
          <View style={styles.pillGrid}>
            {OCCASION_OPTIONS.map(opt => (
              <OptionPill
                columns={2}
                emoji={opt.emoji}
                key={opt.id}
                label={opt.label}
                onPress={() => setOccasions(prev => toggleInSet(prev, opt.id))}
                selected={occasions.has(opt.id)}
              />
            ))}
          </View>
        </Section>

        <Section title="InterestTag (AntD Tag)">
          <View style={styles.tagRow}>
            {INTERESTS.map(label => (
              <InterestTag
                key={label}
                label={label}
                onPress={() => setInterests(prev => toggleInSet(prev, label))}
                selected={interests.has(label)}
              />
            ))}
            <InterestTag label="+2" />
          </View>
        </Section>

        <Section title="GiftCard (AntD Card)">
          <GiftCard
            ctaLabel="View on Etsy"
            description="Great for someone who loves art and cozy home decor"
            onPressCta={() => Alert.alert('Open Etsy')}
            onPressSave={() => toggleSavedGift('demo')}
            price="$45"
            saved={savedGifts.has('demo')}
            title="Handmade Ceramic Tea Set"
          />
        </Section>

        <Section title="GiftList (FlatList)">
          <Text style={styles.helperText}>
            {GIFT_ITEMS.length} items rendered through GiftList → FlatList.
          </Text>
          <PrimaryButton
            onPress={() => setShowGiftList(true)}
            style={styles.stack}
            title="Open GiftList demo"
          />
        </Section>
      </ScrollView>
    </View>
  );

  const gifteesContent: ReactNode = (
    <View style={styles.tabContainer}>
      <ScreenHeader title="Giftees (AntD List.Item)" />
      <ScrollView contentContainerStyle={styles.gifteesContent}>
        <GifteeCard
          birthday="April 8"
          name="Alice"
          onPress={() => Alert.alert('Open Alice')}
          relationship="Romantic Partner"
        />
        <GifteeCard
          birthday="March 9"
          initials="M"
          name="Mom"
          onPress={() => Alert.alert('Open Mom')}
          relationship="Parent"
          style={styles.gifteeSpacer}
        />
        <GifteeCard
          birthday="January 16"
          name="Nathaniel"
          relationship="Child"
          style={styles.gifteeSpacer}
        />
        <GifteeCard
          birthday="November 6"
          name="John Smith"
          relationship="Coworker"
          style={styles.gifteeSpacer}
        />
      </ScrollView>
    </View>
  );

  const calendarContent: ReactNode = (
    <View style={styles.tabContainer}>
      <ScreenHeader title="Calendar" />
      <View style={styles.placeholder}>
        <Text style={styles.placeholderTitle}>March 2024</Text>
        <Text style={styles.placeholderText}>
          Calendar view goes here. Active tab tints to{' '}
          <Text style={styles.placeholderAccent}>#F5222D</Text>.
        </Text>
      </View>
    </View>
  );

  const settingsContent: ReactNode = (
    <View style={styles.tabContainer}>
      <ScreenHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Section title="Account">
          <InputField
            label="First Name"
            onChangeText={() => undefined}
            value="Kevin"
          />
          <InputField
            containerStyle={styles.stack}
            label="Last Name"
            onChangeText={() => undefined}
            value="Brown"
          />
          <InputField
            autoCapitalize="none"
            containerStyle={styles.stack}
            keyboardType="email-address"
            label="Email"
            onChangeText={() => undefined}
            value="kevin.brown@gmail.com"
          />
          <InputField
            containerStyle={styles.stack}
            label="Phone Number"
            keyboardType="phone-pad"
            onChangeText={() => undefined}
            value="+1 (646) 980-48-03"
          />
          <InputField
            containerStyle={styles.stack}
            label="Password"
            onChangeText={() => undefined}
            secureTextEntry
            value="passwordtest"
          />
          <PrimaryButton
            onPress={() => undefined}
            style={styles.stack}
            title="Save changes"
          />
          <SecondaryButton
            onPress={() => undefined}
            style={styles.stack}
            title="Delete account"
          />
        </Section>
      </ScrollView>
    </View>
  );

  const tabs: BottomTab[] = [
    { key: 'home', title: 'Home', icon: 'home', content: showcaseContent },
    {
      key: 'calendar',
      title: 'Calendar',
      icon: 'calendar',
      content: calendarContent,
    },
    { key: 'giftees', title: 'Giftees', icon: 'team', content: gifteesContent },
    {
      key: 'settings',
      title: 'Settings',
      icon: 'setting',
      content: settingsContent,
    },
  ];

  if (showGiftList) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          onBack={() => setShowGiftList(false)}
          title="Gift ideas"
        />
        <GiftList
          ListHeaderComponent={
            <Text style={styles.giftListHeader}>
              Here are some gift ideas for your friend
            </Text>
          }
          data={GIFT_ITEMS.map(item => ({
            ...item,
            saved: savedGifts.has(item.id),
          }))}
          onPressGift={item => Alert.alert('Open link', item.ctaLabel)}
          onSaveGift={item => toggleSavedGift(item.id)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <BottomTabBar
        activeKey={activeTab}
        onTabPress={setActiveTab}
        tabs={tabs}
      />
    </SafeAreaView>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.surface,
    flex: 1,
  },
  tabContainer: {
    backgroundColor: Colors.surface,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
  },
  gifteesContent: {
    padding: Spacing.lg,
  },
  gifteeSpacer: {
    marginTop: Spacing.md,
  },
  section: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    marginTop: Spacing.lg,
    padding: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.caption,
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
  },
  stack: {
    marginTop: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  rowItem: {
    flex: 1,
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tagRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  helperText: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
  },
  giftListHeader: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  placeholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  placeholderTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.heading,
    marginBottom: Spacing.sm,
  },
  placeholderText: {
    color: Colors.textSecondary,
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  placeholderAccent: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyBold,
  },
});
