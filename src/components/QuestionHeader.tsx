import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

export type QuestionHeaderProps = {
  step: number;
  totalSteps: number;
  question: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
};

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  step,
  totalSteps,
  question,
  subtitle,
  style,
}) => {
  const safeTotal = Math.max(1, totalSteps);
  const progress = Math.max(0, Math.min(1, step / safeTotal));
  const progressPercent = `${Math.round(progress * 100)}%` as const;

  return (
    <View style={[styles.container, style]}>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: safeTotal, now: step }}
        style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressPercent }]} />
      </View>
      <Text style={styles.counter}>
        {step} / {safeTotal}
      </Text>
      <Text style={styles.question}>{question}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
  },
  progressTrack: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.pill,
    height: 4,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: Colors.primary,
    height: '100%',
  },
  counter: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.small,
    marginBottom: Spacing.xs,
  },
  question: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.heading,
    lineHeight: 34,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSize.small,
    marginTop: Spacing.xs,
  },
});
