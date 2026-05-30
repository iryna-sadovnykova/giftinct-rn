import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Spacing } from '../constants/spacing';
import { GiftListRow } from './GiftListRow';
import { GiftCardProps } from './GiftCard';

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

const GiftListComponent: React.FC<GiftListProps> = ({
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
      <GiftListRow
        index={index}
        item={item}
        onPressGift={onPressGift}
        onSaveGift={onSaveGift}
      />
    ),
    [onPressGift, onSaveGift],
  );

  const contentContainerStyle = useMemo(
    () => [
      styles.content,
      { padding: contentPadding },
      data.length === 0 && styles.contentEmpty,
    ],
    [contentPadding, data.length],
  );

  return (
    <FlatList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={[styles.list, style]}
    />
  );
};

export const GiftList = memo(GiftListComponent);

const keyExtractor = (item: GiftListItem) => item.id;

const Separator = memo(function Separator() {
  return <View style={styles.separator} />;
});

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
