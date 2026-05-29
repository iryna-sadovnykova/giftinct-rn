import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Spacing } from '../constants/spacing';
import { FadeInView } from './FadeInView';
import { GiftCard, GiftCardProps } from './GiftCard';

export type GiftListItem = Omit<GiftCardProps, 'onPressCta' | 'onPressSave'> & {
  id: string;
  ctaUrl?: string;
};

export type GiftListProps = {
  data: GiftListItem[];
  onPressGift: (item: GiftListItem) => void;
  onSaveGift?: (item: GiftListItem) => void;
  ListHeaderComponent?: React.ComponentType<unknown> | React.ReactElement;
  ListEmptyComponent?: React.ComponentType<unknown> | React.ReactElement;
  contentPadding?: number;
  style?: StyleProp<ViewStyle>;
};

export const GiftList: React.FC<GiftListProps> = ({
  data,
  onPressGift,
  onSaveGift,
  ListHeaderComponent,
  ListEmptyComponent,
  contentPadding = Spacing.lg,
  style,
}) => {
  const renderItem: ListRenderItem<GiftListItem> = useCallback(
    ({ item, index }) => (
      <FadeInView delay={index * 60} duration={350}>
        <GiftCard
          {...item}
          onPressCta={() => onPressGift(item)}
          onPressSave={onSaveGift ? () => onSaveGift(item) : undefined}
        />
      </FadeInView>
    ),
    [onPressGift, onSaveGift],
  );

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[
        styles.content,
        { padding: contentPadding },
        data.length === 0 && styles.contentEmpty,
      ]}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={[styles.list, style]}
    />
  );
};

const keyExtractor = (item: GiftListItem) => item.id;

const Separator: React.FC = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  contentEmpty: {
    justifyContent: 'center',
  },
  separator: {
    height: Spacing.md,
  },
});
