import List from '@ant-design/react-native/lib/list';
import React, { memo, useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { ScalePressable } from './ScalePressable';

const Item = List.Item;
const Brief = List.Item.Brief;

/** Strip Ant Design List hairlines — outer card border replaces them. */
const LIST_STYLES = {
  List: { backgroundColor: 'transparent' },
  Body: { borderTopWidth: 0 },
  BodyBottomLine: { height: 0 },
};

const ITEM_STYLES = {
  Item: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
  },
  Line: {
    borderBottomWidth: 0,
    paddingRight: 0,
    paddingVertical: 0,
  },
};

export type GifteeCardProps = {
  name: string;
  relationship: string;
  birthday: string;
  /** Prefer over `avatar` — stable string for memo comparisons. */
  avatarUrl?: string;
  avatar?: ImageSourcePropType;
  initials?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const GifteeCardComponent: React.FC<GifteeCardProps> = ({
  name,
  relationship,
  birthday,
  avatarUrl,
  avatar,
  initials,
  onPress,
  style,
  testID,
}) => {
  const avatarSource = useMemo(
    () => avatar ?? (avatarUrl ? { uri: avatarUrl } : undefined),
    [avatar, avatarUrl],
  );

  const fallbackInitials = useMemo(
    () => initials ?? name.charAt(0).toUpperCase(),
    [initials, name],
  );

  const thumb = useMemo(() => {
    if (avatarSource) {
      return (
        <View style={styles.avatarClip}>
          <Image
            resizeMode="cover"
            source={avatarSource}
            style={styles.avatarImage}
          />
        </View>
      );
    }

    return (
      <View style={[styles.avatar, styles.avatarFallback]}>
        <Text style={styles.avatarInitials}>{fallbackInitials}</Text>
      </View>
    );
  }, [avatarSource, fallbackInitials]);

  const content = (
    <List styles={LIST_STYLES}>
      <Item
        arrow={onPress ? 'horizontal' : 'empty'}
        extra={<Text style={styles.relationship}>{relationship}</Text>}
        multipleLine
        styles={ITEM_STYLES}
        thumb={thumb}>
        <Text style={styles.name}>{name}</Text>
        <Brief>
          <Text style={styles.birthday}>Birthday: {birthday}</Text>
        </Brief>
      </Item>
    </List>
  );

  if (!onPress) {
    return (
      <View style={[styles.wrapper, style]} testID={testID}>
        {content}
      </View>
    );
  }

  return (
    <ScalePressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.wrapper, style]}
      testID={testID}>
      {content}
    </ScalePressable>
  );
};

export const GifteeCard = memo(GifteeCardComponent);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    borderColor: Colors.borderThin,
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  avatar: {
    borderRadius: 28,
    height: 56,
    marginRight: Spacing.sm,
    width: 56,
  },
  avatarClip: {
    borderRadius: 28,
    height: 56,
    marginRight: Spacing.sm,
    overflow: 'hidden',
    width: 56,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  avatarFallback: {
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
  },
  avatarInitials: {
    color: Colors.primaryDark,
    fontFamily: FontFamily.bodyBold,
    fontSize: FontSize.subheading,
  },
  name: {
    color: Colors.text,
    fontFamily: FontFamily.bodySemibold,
    fontSize: FontSize.body,
  },
  birthday: {
    color: Colors.textMuted,
    fontSize: FontSize.small,
  },
  relationship: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.caption,
  },
});
