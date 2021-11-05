import { useMemo } from 'react';
import { getDays, getWeekdayLabels } from './useMonth.utils';
import { Format } from '../../interfaces';

export interface UseMonthResult {
  weekdayLabels: string[];
  days: (number | { dayLabel: string; date: Date })[];
  monthLabel: string;
}

export interface UseMonthProps {
  year: number;
  month: number;
  formatDate: Format;
}

export function useMonth({
  year,
  month,
  formatDate,
}: UseMonthProps): UseMonthResult {
  const days = useMemo(() => getDays({ year, month, formatDate }), [
    year,
    month,
  ]);
  return {
    days,
    weekdayLabels: getWeekdayLabels(),
    monthLabel: formatDate(new Date(year, month), 'MMMM yyyy'),
  };
}
