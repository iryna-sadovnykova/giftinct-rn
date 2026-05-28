import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { RootStackParamList } from './types';

type NavRef = { getParent: () => NavRef | undefined };

/** Walks up the navigator tree to find the outermost (root) navigator. */
const getRootNavigator = (
  navigation: NavRef,
): NativeStackNavigationProp<RootStackParamList> | undefined => {
  let current: NavRef | undefined = navigation;
  while (current?.getParent()) {
    current = current.getParent();
  }
  return current as NativeStackNavigationProp<RootStackParamList> | undefined;
};

/** Returns the root stack navigator from any nested screen. */
export const useRootNavigation = () => {
  const navigation = useNavigation();
  return useCallback(
    () => getRootNavigator(navigation as NavRef),
    [navigation],
  );
};

/** Opens the drawer menu from any screen inside MainTabs. */
export const useOpenDrawer = () => {
  const navigation = useNavigation();
  return useCallback(() => {
    navigation.getParent()?.dispatch(DrawerActions.openDrawer());
  }, [navigation]);
};
