import React, { memo, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

type ApiStateViewProps = {
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
  onRetry?: () => void;
  children: React.ReactNode;
};

type ViewMode = 'loading' | 'error' | 'content';

const ApiStateViewComponent: React.FC<ApiStateViewProps> = ({
  loading,
  error,
  loadingMessage = 'Loading...',
  onRetry,
  children,
}) => {
  const mode: ViewMode = loading ? 'loading' : error ? 'error' : 'content';
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, { duration: 280 });
  }, [mode, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (mode === 'loading') {
    return (
      <Animated.View style={[styles.centered, animatedStyle]}>
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={styles.loadingText}>{loadingMessage}</Text>
      </Animated.View>
    );
  }

  if (mode === 'error') {
    return (
      <Animated.View style={[styles.centered, animatedStyle]}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry ? (
          <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        ) : null}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.content, animatedStyle]}>{children}</Animated.View>
  );
};

export const ApiStateView = memo(ApiStateViewComponent);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: Spacing.md,
  },
  retryText: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.body,
  },
});
