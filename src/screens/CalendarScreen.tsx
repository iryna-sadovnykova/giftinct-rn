import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Build a simple month grid for the calendar tab (design pages 13–14). */
const buildMonthGrid = (year: number, month: number, today?: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(d);
  }
  return { cells, today };
};

type MonthBlockProps = {
  title: string;
  year: number;
  month: number;
  today?: number;
  eventDays?: number[];
};

const MonthBlock: React.FC<MonthBlockProps> = ({
  title,
  year,
  month,
  today,
  eventDays = [],
}) => {
  const { cells } = buildMonthGrid(year, month, today);

  return (
    <View style={styles.monthBlock}>
      <Text style={styles.monthTitle}>{title}</Text>
      <View style={styles.weekRow}>
        {WEEKDAYS.map(d => (
          <Text key={d} style={styles.weekday}>
            {d}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((day, i) => {
          const isToday = day === today;
          const hasEvent = day != null && eventDays.includes(day);
          return (
            <View key={`${title}-${i}`} style={styles.dayCell}>
              {day != null ? (
                <View
                  style={[
                    styles.dayInner,
                    isToday && styles.dayToday,
                    hasEvent && styles.dayEvent,
                  ]}>
                  <Text
                    style={[
                      styles.dayText,
                      isToday && styles.dayTextToday,
                    ]}>
                    {day}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

/** Calendar tab — birthday/event overview from the design. */
export const CalendarScreen: React.FC = () => (
  <SafeAreaView edges={['top']} style={styles.safe}>
    <ScreenHeader title="Calendar" />
    <ScrollView contentContainerStyle={styles.scroll}>
      <MonthBlock
        eventDays={[8, 9, 16]}
        month={2}
        title="March 2024"
        today={2}
        year={2024}
      />
      <MonthBlock eventDays={[8, 26]} month={3} title="April 2024" year={2024} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.surface,
    flex: 1,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  monthBlock: {
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  monthTitle: {
    color: Colors.text,
    fontFamily: FontFamily.heading,
    fontSize: FontSize.subheading,
    marginBottom: Spacing.md,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  weekday: {
    color: Colors.textMuted,
    flex: 1,
    fontFamily: FontFamily.bodyMedium,
    fontSize: FontSize.caption,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: '14.285%',
  },
  dayInner: {
    alignItems: 'center',
    borderRadius: Radius.sm,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  dayToday: {
    backgroundColor: Colors.primaryLight,
  },
  dayEvent: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  dayText: {
    color: Colors.text,
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
  },
  dayTextToday: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
  },
});
