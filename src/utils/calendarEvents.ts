import { Giftee } from '../types/giftee';

export type BirthdayCalendarEvent = {
  gifteeId: string;
  label: string;
  month: number;
  day: number;
};

export type CalendarMonth = {
  year: number;
  month: number;
};

/** Parse month/day from an ISO birthday string without timezone drift. */
export const parseBirthdayParts = (
  birthdayDate: string,
): { month: number; day: number } | null => {
  const date = new Date(`${birthdayDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    month: date.getMonth(),
    day: date.getDate(),
  };
};

/** Build recurring birthday events from the giftee catalog. */
export const buildBirthdayEvents = (
  giftees: Giftee[],
): BirthdayCalendarEvent[] =>
  giftees.flatMap(giftee => {
    const parts = parseBirthdayParts(giftee.birthdayDate);
    if (!parts) {
      return [];
    }

    return [
      {
        gifteeId: giftee.id,
        label: `${giftee.name}'s Birthday`,
        month: parts.month,
        day: parts.day,
      },
    ];
  });

export const formatMonthTitle = (year: number, month: number): string =>
  new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

/** Returns consecutive calendar months starting from `start`. */
export const getUpcomingMonths = (
  start: Date,
  count: number,
): CalendarMonth[] =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth() + index, 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });

export const getEventsForMonth = (
  events: BirthdayCalendarEvent[],
  year: number,
  month: number,
): BirthdayCalendarEvent[] =>
  events.filter(event => event.month === month);

export const groupEventsByDay = (
  events: BirthdayCalendarEvent[],
): Map<number, BirthdayCalendarEvent[]> => {
  const grouped = new Map<number, BirthdayCalendarEvent[]>();

  for (const event of events) {
    const dayEvents = grouped.get(event.day) ?? [];
    dayEvents.push(event);
    grouped.set(event.day, dayEvents);
  }

  return grouped;
};

export const buildMonthGrid = (year: number, month: number): (number | null)[] => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  return cells;
};

export const isSameDay = (
  a: Date,
  year: number,
  month: number,
  day: number,
): boolean =>
  a.getFullYear() === year && a.getMonth() === month && a.getDate() === day;
