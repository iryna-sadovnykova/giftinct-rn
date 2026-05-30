import React, { useCallback, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiStateView } from '../components/ApiStateView';
import { ScreenHeader } from '../components/ScreenHeader';
import { Colors } from '../constants/colors';
import { Radius, Spacing } from '../constants/spacing';
import { FontFamily, FontSize } from '../constants/typography';
import { useGiftees } from '../hooks/useGiftees';
import { useNavigateGifteeDetail } from '../navigation/hooks';
import {
  BirthdayCalendarEvent,
  buildBirthdayEvents,
  buildMonthGrid,
  formatMonthTitle,
  getEventsForMonth,
  getUpcomingMonths,
  groupEventsByDay,
} from '../utils/calendarEvents';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS_TO_SHOW = 3;
const MAX_LABELS_PER_DAY = 2;

type MonthBlockProps = {
  title: string;
  year: number;
  month: number;
  today: Date;
  eventsByDay: Map<number, BirthdayCalendarEvent[]>;
  onPressEvent: (gifteeId: string) => void;
};

const MonthBlock: React.FC<MonthBlockProps> = ({
  title,
  year,
  month,
  today,
  eventsByDay,
  onPressEvent,
}) => {
  const cells = useMemo(
    () => buildMonthGrid(year, month),
    [month, year],
  );
  const todayDay =
    today.getFullYear() === year && today.getMonth() === month
      ? today.getDate()
      : undefined;

  return (
    <View style={styles.monthBlock}>
      <Text style={styles.monthTitle}>{title}</Text>
      <View style={styles.weekRow}>
        {WEEKDAYS.map(day => (
          <Text key={day} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((day, index) => {
          if (day == null) {
            return <View key={`${title}-empty-${index}`} style={styles.dayCell} />;
          }

          const dayEvents = eventsByDay.get(day) ?? [];
          const isToday = day === todayDay;
          const visibleEvents = dayEvents.slice(0, MAX_LABELS_PER_DAY);
          const hiddenCount = dayEvents.length - visibleEvents.length;

          return (
            <View key={`${title}-${day}`} style={styles.dayCell}>
              <View
                style={[
                  styles.dayInner,
                  isToday && styles.dayToday,
                  dayEvents.length > 0 && styles.dayEvent,
                ]}>
                <Text style={[styles.dayText, isToday && styles.dayTextToday]}>
                  {day}
                </Text>
              </View>
              <View style={styles.labels}>
                {visibleEvents.map(event => (
                  <TouchableOpacity
                    key={event.gifteeId}
                    accessibilityRole="button"
                    onPress={() => onPressEvent(event.gifteeId)}>
                    <Text numberOfLines={2} style={styles.eventLabel}>
                      {event.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                {hiddenCount > 0 ? (
                  <Text style={styles.moreLabel}>+{hiddenCount} more</Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

/** Calendar tab — giftee birthdays from the shared giftee API. */
export const CalendarScreen: React.FC = () => {
  const navigateGifteeDetail = useNavigateGifteeDetail();
  const { giftees, loading, error, refetch } = useGiftees();
  const today = useMemo(() => new Date(), []);

  const birthdayEvents = useMemo(
    () => buildBirthdayEvents(giftees),
    [giftees],
  );

  const months = useMemo(
    () => getUpcomingMonths(today, MONTHS_TO_SHOW),
    [today],
  );

  const navigateToGiftee = useCallback(
    (gifteeId: string) => {
      navigateGifteeDetail({ gifteeId });
    },
    [navigateGifteeDetail],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScreenHeader title="Calendar" />
      <ApiStateView
        error={error}
        loading={loading}
        loadingMessage="Loading birthdays..."
        onRetry={refetch}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {months.map(({ year, month }) => {
            const monthEvents = getEventsForMonth(birthdayEvents, year, month);
            const eventsByDay = groupEventsByDay(monthEvents);

            return (
              <MonthBlock
                key={`${year}-${month}`}
                eventsByDay={eventsByDay}
                month={month}
                onPressEvent={navigateToGiftee}
                title={formatMonthTitle(year, month)}
                today={today}
                year={year}
              />
            );
          })}

          {!loading && birthdayEvents.length === 0 ? (
            <Text style={styles.emptyText}>
              No birthdays yet. Add a giftee to see them on the calendar.
            </Text>
          ) : null}
        </ScrollView>
      </ApiStateView>
    </SafeAreaView>
  );
};

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
    alignItems: 'stretch',
    marginBottom: Spacing.sm,
    minHeight: 72,
    paddingHorizontal: 1,
    width: '14.285%',
  },
  dayInner: {
    alignItems: 'center',
    alignSelf: 'center',
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
  labels: {
    gap: 2,
    marginTop: Spacing.xxs,
  },
  eventLabel: {
    color: Colors.primary,
    fontFamily: FontFamily.bodyMedium,
    fontSize: 9,
    lineHeight: 11,
    textAlign: 'center',
  },
  moreLabel: {
    color: Colors.textMuted,
    fontFamily: FontFamily.body,
    fontSize: 8,
    lineHeight: 10,
    textAlign: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    textAlign: 'center',
  },
});
