import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from '@flame-ui/utils/src/date-utils';

export const getWeekdayLabels = (): string[] => [
  'LUN',
  'MAR',
  'MIE',
  'JUE',
  'VIE',
  'SAB',
  'DOM',
];

export interface GetDaysProps {
  year: number;
  month: number;
  formatDate: (date: Date, format: string) => string;
}

export type CalendarDay = { dayLabel: string; date: Date } | number;
export function getDays({
  year,
  month,
  formatDate,
}: GetDaysProps): CalendarDay[] {
  const date = new Date(year, month);
  const monthStart = startOfMonth(date);
  const monthStartDay = monthStart.getDay();
  const monthEnd = endOfMonth(date);

  const prevMonthDays = Array.from(
    Array(monthStartDay === 0 ? 6 : monthStartDay - 1).keys()
  ).fill(0);

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(
    (dateParam) => ({
      date: dateParam,
      dayLabel: formatDate(dateParam, 'dd'),
    })
  );

  return [...prevMonthDays, ...days];
}
