import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiStateView } from '../components/ApiStateView';
import { GifteeListItem } from '../components/GifteeListItem';
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

  const navigateToGiftee = useCallback(
    (gifteeId: string) => {
      getRootNav()?.navigate('GifteeDetail', { gifteeId });
    },
    [getRootNav],
  );

  const navigateToQuiz = useCallback(() => {
    getRootNav()?.navigate('QuizFlow');
  }, [getRootNav]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader title="Giftees" />
      <ApiStateView
        error={error}
        loading={loading}
        loadingMessage="Loading giftees..."
        onRetry={refetch}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {giftees.map((giftee, index) => (
            <GifteeListItem
              animationDelay={index * 50}
              avatarUrl={giftee.avatarUrl}
              birthday={giftee.birthday}
              cardStyle={styles.card}
              id={giftee.id}
              initials={giftee.initials}
              key={giftee.id}
              name={giftee.name}
              onPressGiftee={navigateToGiftee}
              relationship={giftee.relationship}
            />
          ))}
          <PrimaryButton
            onPress={navigateToQuiz}
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
