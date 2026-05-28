import Icon, { IconNames } from '@ant-design/react-native/lib/icon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize } from '../constants/typography';
import { MainTabParamList } from './types';

/** Maps tab route names to Ant Design outline icons from the design. */
const TAB_ICONS: Record<keyof MainTabParamList, IconNames> = {
  Home: 'home',
  Calendar: 'calendar',
  Giftees: 'team',
  Settings: 'setting',
};

/**
 * Custom bottom tab bar styled to match the Giftinct design.
 * Used by Tab.Navigator via the `tabBar` option.
 */
export const AppTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title ?? route.name;
        const isFocused = state.index === index;
        const color = isFocused ? Colors.primary : Colors.textMuted;
        const iconName = TAB_ICONS[route.name as keyof MainTabParamList];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            activeOpacity={0.7}
            key={route.key}
            onPress={onPress}
            style={styles.tab}>
            <Icon color={color} name={iconName} size={22} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.borderThin,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingTop: 8,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.caption,
  },
});
