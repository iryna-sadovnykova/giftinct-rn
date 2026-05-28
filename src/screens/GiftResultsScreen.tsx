import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftList } from '../components/GiftList';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { giftResultsTitle, MOCK_GIFTS } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'GiftResults'>;

/**
 * Post-quiz gift recommendations — reads `answers` from route.params
 * to personalise the list header.
 */
export const GiftResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers } = route.params;
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader
        onBack={() => navigation.goBack()}
        title="Gift ideas"
      />
      <GiftList
        ListHeaderComponent={
          <Text style={styles.header}>{giftResultsTitle(answers)}</Text>
        }
        data={MOCK_GIFTS.map(item => ({
          ...item,
          saved: savedIds.has(item.id),
        }))}
        onPressGift={() => undefined}
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
