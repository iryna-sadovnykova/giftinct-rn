import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FadeInView } from './FadeInView';
import { GifteeCard } from './GifteeCard';

type GifteeListItemProps = {
  id: string;
  name: string;
  relationship: string;
  birthday: string;
  avatarUrl?: string;
  initials?: string;
  animationDelay?: number;
  cardStyle?: StyleProp<ViewStyle>;
  onPressGiftee: (gifteeId: string) => void;
};

export const GifteeListItem = memo(function GifteeListItem({
  id,
  name,
  relationship,
  birthday,
  avatarUrl,
  initials,
  animationDelay = 0,
  cardStyle,
  onPressGiftee,
}: GifteeListItemProps) {
  const handlePress = useCallback(
    () => onPressGiftee(id),
    [id, onPressGiftee],
  );

  return (
    <FadeInView delay={animationDelay} duration={350}>
      <GifteeCard
        avatarUrl={avatarUrl}
        birthday={birthday}
        initials={initials}
        name={name}
        onPress={handlePress}
        relationship={relationship}
        style={cardStyle}
      />
    </FadeInView>
  );
});
