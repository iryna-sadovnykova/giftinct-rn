import React, { memo, useCallback } from 'react';
import { FadeInView } from './FadeInView';
import { GiftCard } from './GiftCard';
import { GiftListItem } from './GiftList';

type GiftListRowProps = {
  index: number;
  item: GiftListItem;
  onPressGift: (item: GiftListItem) => void;
  onSaveGift?: (item: GiftListItem) => void;
};

const areGiftListRowPropsEqual = (
  prev: GiftListRowProps,
  next: GiftListRowProps,
): boolean =>
  prev.index === next.index &&
  prev.onPressGift === next.onPressGift &&
  prev.onSaveGift === next.onSaveGift &&
  prev.item.id === next.item.id &&
  prev.item.title === next.item.title &&
  prev.item.price === next.item.price &&
  prev.item.description === next.item.description &&
  prev.item.ctaLabel === next.item.ctaLabel &&
  prev.item.saved === next.item.saved &&
  prev.item.image === next.item.image;

export const GiftListRow = memo(function GiftListRow({
  index,
  item,
  onPressGift,
  onSaveGift,
}: GiftListRowProps) {
  const handlePressCta = useCallback(
    () => onPressGift(item),
    [item, onPressGift],
  );

  const handlePressSave = useCallback(() => {
    onSaveGift?.(item);
  }, [item, onSaveGift]);

  return (
    <FadeInView delay={index * 60} duration={350}>
      <GiftCard
        ctaLabel={item.ctaLabel}
        description={item.description}
        image={item.image}
        onPressCta={handlePressCta}
        onPressSave={onSaveGift ? handlePressSave : undefined}
        price={item.price}
        saved={item.saved}
        title={item.title}
      />
    </FadeInView>
  );
}, areGiftListRowPropsEqual);
