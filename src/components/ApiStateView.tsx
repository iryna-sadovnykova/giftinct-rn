import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

export const ApiStateView: React.FC<ApiStateViewProps> = ({
  loading,
  error,
  loadingMessage = 'Loading...',
  onRetry,
  children,
}) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={styles.loadingText}>{loadingMessage}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry ? (
          <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
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
