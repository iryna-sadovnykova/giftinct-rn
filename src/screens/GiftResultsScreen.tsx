import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiStateView } from '../components/ApiStateView';
import { GiftList } from '../components/GiftList';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { giftResultsTitle } from '../data/mockData';
import { useGifts } from '../hooks/useGifts';
import { RootStackParamList } from '../navigation/types';
import { openExternalUrl } from '../utils/openExternalUrl';

type Props = NativeStackScreenProps<RootStackParamList, 'GiftResults'>;

/**
 * Post-quiz gift recommendations — reads `answers` from route.params
 * to personalise the list header.
 */
export const GiftResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers } = route.params;
  const { gifts, loading, error, refetch } = useGifts();
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

  const listData = useMemo(
    () =>
      gifts.map(item => ({
        ...item,
        saved: savedIds.has(item.id) || item.saved,
      })),
    [gifts, savedIds],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader onBack={() => navigation.goBack()} title="Gift ideas" />
      <ApiStateView
        error={error}
        loading={loading}
        loadingMessage="Loading gift ideas..."
        onRetry={refetch}>
        <GiftList
          ListHeaderComponent={
            <Text style={styles.header}>{giftResultsTitle(answers)}</Text>
          }
          data={listData}
          onPressGift={item => {
            if (item.ctaUrl) {
              openExternalUrl(item.ctaUrl);
            }
          }}
          onSaveGift={item =>
            setSavedIds(prev => {
              const next = new Set(prev);
              if (next.has(item.id)) {
                next.delete(item.id);
              } else {
                next.add(item.id);
              }
              return next;
            })
          }
          style={styles.list}
        />
        <PrimaryButton
          onPress={() => navigation.navigate('Main')}
          style={styles.saveGiftee}
          title="Save giftee"
        />
      </ApiStateView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.surface,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  header: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
    marginBottom: Spacing.md,
  },
  saveGiftee: {
    margin: Spacing.lg,
  },
});
