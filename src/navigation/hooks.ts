import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import {
  GifteeDetailParams,
  openGifteeDetail,
  openGiftResults,
  openQuizFlow,
} from './rootNavigation';
import { QuizAnswers, RootStackParamList } from './types';

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

/** Typed helper — list / calendar / home → giftee detail with params preserved. */
export const useNavigateGifteeDetail = () => {
  const getRootNav = useRootNavigation();
  return useCallback(
    (params: GifteeDetailParams) => {
      const nav = getRootNav();
      if (nav) {
        openGifteeDetail(nav, params);
      }
    },
    [getRootNav],
  );
};

/** Typed helper — sign-up / quiz completion → gift results. */
export const useNavigateGiftResults = () => {
  const getRootNav = useRootNavigation();
  return useCallback(
    (answers: QuizAnswers) => {
      const nav = getRootNav();
      if (nav) {
        openGiftResults(nav, answers);
      }
    },
    [getRootNav],
  );
};

/** Typed helper — start the gift-finder quiz from tabs or welcome. */
export const useNavigateQuizFlow = () => {
  const getRootNav = useRootNavigation();
  return useCallback(() => {
    const nav = getRootNav();
    if (nav) {
      openQuizFlow(nav);
    }
  }, [getRootNav]);
};
