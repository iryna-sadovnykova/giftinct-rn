import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiStateView } from '../components/ApiStateView';
import { GifteeCard } from '../components/GifteeCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { useGiftees } from '../hooks/useGiftees';
import { useRootNavigation } from '../navigation/hooks';
import { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Giftees'>;

/** Giftees tab — full list loaded from the Mockaroo API. */
export const GifteesScreen: React.FC<Props> = () => {
  const getRootNav = useRootNavigation();
  const { giftees, loading, error, refetch } = useGiftees();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader title="Giftees" />
      <ApiStateView
        error={error}
        loading={loading}
        loadingMessage="Loading giftees..."
        onRetry={refetch}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {giftees.map(giftee => (
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
              style={styles.card}
            />
          ))}
          <PrimaryButton
            onPress={() => getRootNav()?.navigate('QuizFlow')}
            style={styles.addButton}
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
  card: {
    marginBottom: Spacing.md,
  },
  addButton: {
    marginTop: Spacing.sm,
  },
});
