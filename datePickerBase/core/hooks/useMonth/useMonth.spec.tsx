import { renderHook } from '@testing-library/react-hooks';
/* eslint-disable import/no-duplicates */
import dateFnsFormat from 'date-fns/format';
import locale from 'date-fns/locale/es';
/* eslint-disable import/no-duplicates */
import { getDays, getWeekdayLabels } from './useMonth.utils';
import { useMonth } from './useMonth';

const formatDate = (date: Date, format: string) => {
  return dateFnsFormat(date, format, { locale });
};

type CalendarDay = { dayLabel: string; date: Date };

describe('getWeekdayLabels', () => {
  test('should return week days', () => {
    expect(getWeekdayLabels()).toEqual([
      'LUN',
      'MAR',
      'MIE',
      'JUE',
      'VIE',
      'SAB',
      'DOM',
    ]);
  });
});

describe('getDays', () => {
  test('should return days for april 2019', () => {
    const { result } = renderHook(() =>
      getDays({ year: 2019, month: 3, formatDate })
    );
    expect(result.current.length).toBe(30);
    expect(typeof result.current[0]).toBe('object');
    const days = (result.current as unknown) as CalendarDay[];
    expect(days[0].dayLabel).toBe('01');
    expect(days[days.length - 1].dayLabel).toBe('30');
  });

  test('should return days for march 2019', () => {
    const { result } = renderHook(() =>
      getDays({ year: 2019, month: 2, formatDate })
    );
    expect(result.current.length).toBe(35);
    expect(typeof result.current[0]).toBe('number');
    expect(typeof result.current[3]).toBe('number');
    expect(typeof result.current[4]).toBe('object');
    const days = (result.current as unknown) as CalendarDay[];
    expect(days[4].dayLabel).toBe('01');

    expect(days[days.length - 1].dayLabel).toBe('31');
  });
});

describe('useMonth', () => {
  test('should return days for april 2019', () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 3, formatDate })
    );

    // Days
    expect(result.current.days.length).toBe(30);
    expect(typeof result.current.days[0]).toBe('object');
    const days = (result.current.days as unknown) as CalendarDay[];
    expect(days[0].dayLabel).toBe('01');

    expect(days[days.length - 1].dayLabel).toBe('30');

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7);
    expect(result.current.weekdayLabels[0]).toBe('LUN');
    expect(result.current.weekdayLabels[6]).toBe('DOM');

    // Month Label
    expect(result.current.monthLabel).toBe('abril 2019');
  });

  test('should return days for march 2019', () => {
    const { result } = renderHook(() =>
      useMonth({ year: 2019, month: 2, formatDate })
    );

    // Days
    expect(result.current.days.length).toBe(35);
    expect(typeof result.current.days[0]).toBe('number');
    expect(typeof result.current.days[3]).toBe('number');
    expect(typeof result.current.days[4]).toBe('object');
    const days = (result.current.days as unknown) as CalendarDay[];

    expect(days[4].dayLabel).toBe('01');

    expect(days[days.length - 1].dayLabel).toBe('31');

    // Week days
    expect(result.current.weekdayLabels.length).toBe(7);
    expect(result.current.weekdayLabels[0]).toBe('LUN');
    expect(result.current.weekdayLabels[6]).toBe('DOM');

    // Month Label
    expect(result.current.monthLabel).toBe('marzo 2019');
  });
});
