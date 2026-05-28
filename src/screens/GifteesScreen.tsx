import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GifteeCard } from '../components/GifteeCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { MOCK_GIFTEES } from '../data/mockData';
import { useRootNavigation } from '../navigation/hooks';
import { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Giftees'>;

/** Giftees tab — full list with interest previews from the design. */
export const GifteesScreen: React.FC<Props> = () => {
  const getRootNav = useRootNavigation();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader title="Giftees" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {MOCK_GIFTEES.map(giftee => (
          <GifteeCard
            birthday={giftee.birthday}
            initials={giftee.initials}
            key={giftee.id}
            name={giftee.name}
            onPress={() =>
              getRootNav()?.navigate('GifteeDetail', { gifteeId: giftee.id })
            }
            relationship={giftee.relationship}
            style={styles.card}
          />
        ))}
        <PrimaryButton
          onPress={() => getRootNav()?.navigate('QuizFlow')}
          style={styles.addButton}
          title="Add Giftee"
        />
      </ScrollView>
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
  card: {
    marginBottom: Spacing.md,
  },
  addButton: {
    marginTop: Spacing.sm,
  },
});
