import Icon from '@ant-design/react-native/lib/icon';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

const drawerIcon =
  (name: 'home' | 'crown' | 'question-circle' | 'logout') =>
  ({ color, size }: { color: string; size: number }) =>
    <Icon color={color} name={name} size={size} />;

/**
 * Custom drawer menu — secondary destinations not in the bottom tab bar.
 * Swipe from the left edge or tap the menu icon to open.
 */
export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const activeRoute = state.routes[state.index]?.name;

  const resetToWelcome = () => {
    const root = navigation.getParent();
    root?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      }),
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.scroll}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Giftinct</Text>
        <Text style={styles.tagline}>Thoughtful gifts, every time</Text>
      </View>

      <DrawerItem
        focused={activeRoute === 'MainTabs'}
        label="Main app"
        icon={drawerIcon('home')}
        labelStyle={styles.itemLabel}
        onPress={() => navigation.navigate('MainTabs')}
      />
      <DrawerItem
        focused={activeRoute === 'PremiumInfo'}
        label="Giftinct+"
        icon={drawerIcon('crown')}
        labelStyle={styles.itemLabel}
        onPress={() => navigation.navigate('PremiumInfo')}
      />
      <DrawerItem
        focused={activeRoute === 'Help'}
        label="Help & support"
        icon={drawerIcon('question-circle')}
        labelStyle={styles.itemLabel}
        onPress={() => navigation.navigate('Help')}
      />

      <View style={styles.footer}>
        <DrawerItem
          label="Log out"
          icon={drawerIcon('logout')}
          labelStyle={styles.itemLabel}
          onPress={resetToWelcome}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  header: {
    borderBottomColor: Colors.borderThin,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  logo: {
    color: Colors.primary,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.title,
  },
  tagline: {
    color: Colors.textMuted,
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
    marginTop: Spacing.xxs,
  },
  itemLabel: {
    fontFamily: FontFamily.bodyMedium,
  },
  footer: {
    borderTopColor: Colors.borderThin,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 'auto',
    paddingTop: Spacing.md,
  },
});
