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
import { GiftList } from '../components/GiftList';
import { InterestTag } from '../components/InterestTag';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { getGifteeById, MOCK_GIFTS } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'GifteeDetail'>;

type DetailTab = 'profile' | 'saved' | 'ideas';

const DETAIL_TABS: { key: DetailTab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'saved', label: 'Saved gifts' },
  { key: 'ideas', label: 'Gift ideas' },
];

/**
 * Giftee detail — receives `gifteeId` and optional `initialTab` via route.params.
 * Matches design pages 15–17 (Profile / Saved gifts / Gift ideas).
 */
export const GifteeDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { gifteeId, initialTab = 'profile' } = route.params;
  const giftee = getGifteeById(gifteeId);
  const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  if (!giftee) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenHeader onBack={() => navigation.goBack()} title="Not found" />
      </SafeAreaView>
    );
  }

  const toggleSaved = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader onBack={() => navigation.goBack()} title={giftee.name} />

      {/* Sub-tabs: Profile | Saved gifts | Gift ideas */}
      <View style={styles.tabRow}>
        {DETAIL_TABS.map(tab => (
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

      {activeTab === 'profile' ? (
        <ScrollView contentContainerStyle={styles.scroll}>
          <ProfileRow label="Relationship" value={giftee.relationship} />
          <ProfileRow label="Age" value={giftee.age?.toString() ?? '—'} />
          <ProfileRow label="Gender" value={giftee.gender ?? '—'} />
          <ProfileRow label="Birthday" value={giftee.birthdayFull ?? giftee.birthday} />

          <Text style={styles.sectionHeading}>Interests</Text>
          <View style={styles.tagRow}>
            {giftee.interests.map(label => (
              <InterestTag key={label} label={label} />
            ))}
          </View>

          {giftee.personality ? (
            <>
              <Text style={styles.sectionHeading}>Personality</Text>
              <View style={styles.tagRow}>
                {giftee.personality.map(label => (
                  <InterestTag key={label} label={label} />
                ))}
              </View>
            </>
          ) : null}

          {giftee.giftTypes ? (
            <>
              <Text style={styles.sectionHeading}>Kinds of gifts</Text>
              <View style={styles.tagRow}>
                {giftee.giftTypes.map(label => (
                  <InterestTag key={label} label={label} />
                ))}
              </View>
            </>
          ) : null}

          {giftee.notes ? (
            <>
              <Text style={styles.sectionHeading}>Additional information</Text>
              <Text style={styles.notes}>{giftee.notes}</Text>
            </>
          ) : null}
        </ScrollView>
      ) : null}

      {activeTab === 'saved' || activeTab === 'ideas' ? (
        <GiftList
          data={MOCK_GIFTS.map(item => ({
            ...item,
            saved: savedIds.has(item.id),
          }))}
          ListHeaderComponent={
            activeTab === 'ideas' ? (
              <Text style={styles.listHeader}>
                Gift ideas for {giftee.name}
              </Text>
            ) : undefined
          }
          onPressGift={() => undefined}
          onSaveGift={item => toggleSaved(item.id)}
        />
      ) : null}
    </SafeAreaView>
  );
};

type ProfileRowProps = { label: string; value: string };

const ProfileRow: React.FC<ProfileRowProps> = ({ label, value }) => (
  <View style={styles.profileRow}>
    <Text style={styles.profileLabel}>{label}</Text>
    <Text style={styles.profileValue}>{value}</Text>
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
    marginRight: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabLabel: {
    color: Colors.textMuted,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.small,
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  profileLabel: {
    color: Colors.textMuted,
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
  },
  profileValue: {
    color: Colors.text,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
  },
  sectionHeading: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  notes: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    lineHeight: 22,
  },
  listHeader: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginBottom: Spacing.md,
  },
});
