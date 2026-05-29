import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@ant-design/react-native/lib/icon';
import { ApiStateView } from '../components/ApiStateView';
import { GifteeCard } from '../components/GifteeCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { useGiftees } from '../hooks/useGiftees';
import { useOpenDrawer, useRootNavigation } from '../navigation/hooks';
import { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const sortByUpcomingBirthday = <T extends { daysUntilBirthday?: number }>(
  items: T[],
): T[] =>
  [...items].sort(
    (a, b) =>
      (a.daysUntilBirthday ?? Number.MAX_SAFE_INTEGER) -
      (b.daysUntilBirthday ?? Number.MAX_SAFE_INTEGER),
  );

/** Home tab — next event card, giftee preview list, find-a-gift CTA. */
export const HomeScreen: React.FC<Props> = ({ navigation: tabNavigation }) => {
  const getRootNav = useRootNavigation();
  const openDrawer = useOpenDrawer();
  const { giftees, loading, error, refetch } = useGiftees();

  const featured = useMemo(
    () => sortByUpcomingBirthday(giftees)[0],
    [giftees],
  );
  const previewGiftees = useMemo(() => giftees.slice(0, 4), [giftees]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader
        rightElement={
          <TouchableOpacity
            accessibilityLabel="Open menu"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={openDrawer}>
            <Icon color={Colors.primary} name="menu" size={24} />
          </TouchableOpacity>
        }
        title="Giftinct"
      />
      <ApiStateView
        error={error}
        loading={loading}
        loadingMessage="Loading giftees..."
        onRetry={refetch}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {featured ? (
            <View style={styles.eventCard}>
              <Text style={styles.eventLabel}>Next Event</Text>
              <Text style={styles.eventTitle}>{featured.name}'s Birthday</Text>
              <Text style={styles.eventDate}>
                {featured.birthday}
                {featured.daysUntilBirthday != null
                  ? ` (${featured.daysUntilBirthday} days left)`
                  : ''}
              </Text>
              <PrimaryButton
                onPress={() =>
                  getRootNav()?.navigate('GifteeDetail', {
                    gifteeId: featured.id,
                    initialTab: 'ideas',
                  })
                }
                style={styles.eventCta}
                title="Find a gift"
              />
            </View>
          ) : null}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Giftees</Text>
            <TouchableOpacity onPress={() => tabNavigation.navigate('Giftees')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {previewGiftees.map(giftee => (
            <GifteeCard
              avatar={
                giftee.avatarUrl ? { uri: giftee.avatarUrl } : undefined
              }
              birthday={giftee.birthday}
              initials={giftee.initials}
              key={giftee.id}
              name={giftee.name}
              onPress={() =>
                getRootNav()?.navigate('GifteeDetail', { gifteeId: giftee.id })
              }
              relationship={giftee.relationship}
              style={styles.gifteeCard}
            />
          ))}

          <PrimaryButton
            onPress={() => getRootNav()?.navigate('QuizFlow')}
            style={styles.addGiftee}
            title="Add Giftee"
          />
        </ScrollView>
      </ApiStateView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.surface,
    flex: 1,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  eventCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
  },
  eventLabel: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.caption,
    textTransform: 'uppercase',
  },
  eventTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginTop: Spacing.xs,
  },
  eventDate: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    marginTop: Spacing.xxs,
  },
  eventCta: {
    marginTop: Spacing.md,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
  },
  viewAll: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.small,
  },
  gifteeCard: {
    marginBottom: Spacing.sm,
  },
  addGiftee: {
    marginTop: Spacing.md,
  },
});
