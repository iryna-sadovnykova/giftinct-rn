import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiStateView } from '../components/ApiStateView';
import { GiftList } from '../components/GiftList';
import { InterestTag } from '../components/InterestTag';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { useGiftee } from '../hooks/useGiftee';
import { useGifts } from '../hooks/useGifts';
import { RootStackParamList } from '../navigation/types';
import { openExternalUrl } from '../utils/openExternalUrl';

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
  const {
    giftee,
    loading: gifteeLoading,
    error: gifteeError,
    refetch: refetchGiftee,
  } = useGiftee(gifteeId);
  const {
    gifts,
    loading: giftsLoading,
    error: giftsError,
    refetch: refetchGifts,
  } = useGifts();
  const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const savedInitialized = useRef(false);

  useEffect(() => {
    if (!savedInitialized.current && gifts.length > 0) {
      setSavedIds(
        new Set(gifts.filter(gift => gift.saved).map(gift => gift.id)),
      );
      savedInitialized.current = true;
    }
  }, [gifts]);

  const loading = gifteeLoading || giftsLoading;
  const error = gifteeError ?? giftsError;

  const listData = useMemo(() => {
    const withSaved = gifts.map(item => ({
      ...item,
      saved: savedIds.has(item.id) || item.saved,
    }));

    if (activeTab === 'saved') {
      return withSaved.filter(item => item.saved);
    }

    return withSaved;
  }, [activeTab, gifts, savedIds]);

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

  const refetch = () => {
    refetchGiftee();
    refetchGifts();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader
        onBack={() => navigation.goBack()}
        title={giftee?.name ?? 'Giftee'}
      />

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

      <ApiStateView
        error={error}
        loading={loading}
        loadingMessage="Loading profile..."
        onRetry={refetch}>
        {!giftee && !loading && !error ? (
          <View style={styles.notFound}>
            <Text style={styles.notFoundText}>Giftee not found</Text>
          </View>
        ) : null}

        {giftee && activeTab === 'profile' ? (
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.profileHeader}>
              {giftee.avatarUrl ? (
                <View style={styles.profileAvatarClip}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: giftee.avatarUrl }}
                    style={styles.profileAvatarImage}
                  />
                </View>
              ) : (
                <View style={[styles.profileAvatarClip, styles.profileAvatarFallback]}>
                  <Text style={styles.profileAvatarInitials}>
                    {giftee.initials ?? giftee.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={styles.profileName}>{giftee.name}</Text>
              <Text style={styles.profileRelationship}>{giftee.relationship}</Text>
            </View>

            <ProfileRow label="Relationship" value={giftee.relationship} />
            <ProfileRow label="Age" value={giftee.age?.toString() ?? '—'} />
            <ProfileRow label="Gender" value={giftee.gender ?? '—'} />
            <ProfileRow
              label="Birthday"
              value={giftee.birthdayFull ?? giftee.birthday}
            />

            <Text style={styles.sectionHeading}>Interests</Text>
            <View style={styles.tagRow}>
              {giftee.interests.map(label => (
                <InterestTag key={label} label={label} />
              ))}
            </View>

            {giftee.personality?.length ? (
              <>
                <Text style={styles.sectionHeading}>Personality</Text>
                <View style={styles.tagRow}>
                  {giftee.personality.map(label => (
                    <InterestTag key={label} label={label} />
                  ))}
                </View>
              </>
            ) : null}

            {giftee.giftTypes?.length ? (
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

        {giftee && (activeTab === 'saved' || activeTab === 'ideas') ? (
          <GiftList
            data={listData}
            ListHeaderComponent={
              activeTab === 'ideas' ? (
                <Text style={styles.listHeader}>
                  Gift ideas for {giftee.name}
                </Text>
              ) : undefined
            }
            onPressGift={item => {
              if (item.ctaUrl) {
                openExternalUrl(item.ctaUrl);
              }
            }}
            onSaveGift={item => toggleSaved(item.id)}
          />
        ) : null}
      </ApiStateView>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileAvatarClip: {
    borderRadius: 48,
    height: 96,
    overflow: 'hidden',
    width: 96,
  },
  profileAvatarImage: {
    height: '100%',
    width: '100%',
  },
  profileAvatarFallback: {
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
  },
  profileAvatarInitials: {
    color: Colors.primaryDark,
    fontFamily: FontFamily.bodyBold,
    fontSize: FontSize.title,
  },
  profileName: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginTop: Spacing.md,
  },
  profileRelationship: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
    marginTop: Spacing.xxs,
  },
  notFound: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  notFoundText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
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
