import List from '@ant-design/react-native/lib/list';
import React from 'react';
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
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

const Item = List.Item;
const Brief = List.Item.Brief;

export type GifteeCardProps = {
  name: string;
  relationship: string;
  birthday: string;
  avatar?: ImageSourcePropType;
  initials?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const GifteeCard: React.FC<GifteeCardProps> = ({
  name,
  relationship,
  birthday,
  avatar,
  initials,
  onPress,
  style,
  testID,
}) => {
  const fallbackInitials = initials ?? name.charAt(0).toUpperCase();
  const thumb = avatar ? (
    <Image source={avatar} style={styles.avatar} />
  ) : (
    <View style={[styles.avatar, styles.avatarFallback]}>
      <Text style={styles.avatarInitials}>{fallbackInitials}</Text>
    </View>
  );

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <List>
        <Item
          arrow={onPress ? 'horizontal' : 'empty'}
          extra={<Text style={styles.relationship}>{relationship}</Text>}
          multipleLine
          onPress={onPress}
          thumb={thumb}>
          <Text style={styles.name}>{name}</Text>
          <Brief>
            <Text style={styles.birthday}>Birthday: {birthday}</Text>
          </Brief>
        </Item>
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
  },
  avatar: {
    borderRadius: 28,
    height: 56,
    marginRight: Spacing.sm,
    width: 56,
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
