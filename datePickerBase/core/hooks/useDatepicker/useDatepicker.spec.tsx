import { advanceTo, clear } from 'jest-date-mock';
import { renderHook, act } from '@testing-library/react-hooks';
import isSameDay from '@flame-ui/utils/src/date-utils/is-same-day';

import {
  getCurrentYearMonthAndDate,
  getDateMonthAndYear,
  getInitialMonths,
  isDateSelected,
  isFirstOrLastSelectedDate,
  getNextActiveMonth,
  useDatepicker,
  isDateHovered,
} from './index';

describe('useDatepicker', () => {
  test('should return initial values', () => {
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: null,
        endDate: null,
        isRange: true,
        onDatesChange: jest.fn(),
      })
    );
    expect(result.current.activeMonths.length).toBe(2);

    // Check active months
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(2);
    expect(result.current.activeMonths[1].year).toBe(2019);
    expect(result.current.activeMonths[1].month).toBe(3);

    // next 2 months
    act(() => {
      result.current.goToNextMonths();
    });
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(4);
    expect(result.current.activeMonths[1].year).toBe(2019);
    expect(result.current.activeMonths[1].month).toBe(5);

    // prev 2 months
    act(() => {
      result.current.goToPreviousMonths();
    });
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(2);
    expect(result.current.activeMonths[1].year).toBe(2019);
    expect(result.current.activeMonths[1].month).toBe(3);

    clear();
  });

  test('change years, numberOfMonts = 1', () => {
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: null,
        endDate: null,
        onDatesChange: jest.fn(),
        isRange: false,
      })
    );
    expect(result.current.activeMonths.length).toBe(1);

    // Check active months
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(2);

    clear();
  });

  test('change years, numberOfMonts = 2', () => {
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: null,
        endDate: null,
        onDatesChange: jest.fn(),
        isRange: true,
      })
    );
    expect(result.current.activeMonths.length).toBe(2);

    // Check active months
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(2);
    expect(result.current.activeMonths[1].year).toBe(2019);
    expect(result.current.activeMonths[1].month).toBe(3);

    clear();
  });

  test('should set focus state', () => {
    const date = new Date(2019, 2, 27, 0, 0, 0);
    advanceTo(date);
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: null,
        endDate: null,
        onDatesChange: jest.fn(),
      })
    );
    expect(result.current.isDateFocused(date)).toBe(true);

    act(() => {
      result.current.onDateFocus(new Date(2019, 5, 27, 0, 0, 0));
    });
    expect(result.current.isDateFocused(new Date(2019, 5, 27, 0, 0, 0))).toBe(
      true
    );

    clear();
  });

  test('should have one month', () => {
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: null,
        endDate: null,
        onDatesChange: jest.fn(),
        isRange: false,
      })
    );
    expect(result.current.activeMonths.length).toBe(1);

    // Check active months
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(2);

    // next month
    act(() => {
      result.current.goToNextMonths();
    });
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(3);

    // prev month
    act(() => {
      result.current.goToPreviousMonths();
    });
    expect(result.current.activeMonths[0].year).toBe(2019);
    expect(result.current.activeMonths[0].month).toBe(2);

    clear();
  });

  test('should check if date is selected', () => {
    const onDatesChange = jest.fn();
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1, 0, 0, 0),
        endDate: new Date(2019, 3, 3, 0, 0, 0),
        isRange: true,
        onDatesChange,
      })
    );

    expect(result.current.isDateSelected(new Date(2019, 3, 1, 0, 0, 0))).toBe(
      true
    );
    expect(result.current.isDateSelected(new Date(2019, 3, 2, 0, 0, 0))).toBe(
      true
    );
    expect(result.current.isDateSelected(new Date(2019, 3, 3, 0, 0, 0))).toBe(
      true
    );
    expect(result.current.isDateSelected(new Date(2019, 3, 11, 0, 0, 0))).toBe(
      false
    );
    expect(result.current.isDateSelected(new Date(2019, 2, 27, 0, 0, 0))).toBe(
      false
    );
    clear();
  });

  test('should check if date is first or last selected date', () => {
    const onDatesChange = jest.fn();
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1, 0, 0, 0),
        endDate: new Date(2019, 3, 3, 0, 0, 0),
        isRange: true,
        onDatesChange,
      })
    );

    expect(
      result.current.isFirstOrLastSelectedDate(new Date(2019, 3, 1, 0, 0, 0))
    ).toBe(true);
    expect(
      result.current.isFirstOrLastSelectedDate(new Date(2019, 3, 2, 0, 0, 0))
    ).toBe(false);
    expect(
      result.current.isFirstOrLastSelectedDate(new Date(2019, 3, 3, 0, 0, 0))
    ).toBe(true);
    expect(
      result.current.isFirstOrLastSelectedDate(new Date(2019, 3, 11, 0, 0, 0))
    ).toBe(false);
    expect(
      result.current.isFirstOrLastSelectedDate(new Date(2019, 2, 27, 0, 0, 0))
    ).toBe(false);
    clear();
  });

  test('should check if date is start date', () => {
    const onDatesChange = jest.fn();
    advanceTo(new Date(2019, 2, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1, 0, 0, 0),
        endDate: new Date(2019, 3, 3, 0, 0, 0),
        isRange: true,
        onDatesChange,
      })
    );

    expect(result.current.isStartDate(new Date(2019, 3, 1, 0, 0, 0))).toBe(
      true
    );
    expect(result.current.isStartDate(new Date(2019, 3, 2, 0, 0, 0))).toBe(
      false
    );
    expect(result.current.isStartDate(new Date(2019, 3, 3, 0, 0, 0))).toBe(
      false
    );
    expect(result.current.isStartDate(new Date(2019, 3, 10, 0, 0, 0))).toBe(
      false
    );
    expect(result.current.isStartDate(new Date(2019, 2, 27, 0, 0, 0))).toBe(
      false
    );
    clear();
  });

  test('should check if date is end date', () => {
    const onDatesChange = jest.fn();
    advanceTo(new Date(2019, 3, 27, 0, 0, 0));
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1, 0, 0, 0),
        endDate: new Date(2019, 3, 3, 0, 0, 0),
        isRange: true,
        onDatesChange,
      })
    );

    expect(result.current.isEndDate(new Date(2019, 3, 1, 0, 0, 0))).toBe(false);
    expect(result.current.isEndDate(new Date(2019, 3, 2, 0, 0, 0))).toBe(false);
    expect(result.current.isEndDate(new Date(2019, 3, 3, 0, 0, 0))).toBe(true);
    expect(result.current.isEndDate(new Date(2019, 3, 10, 0, 0, 0))).toBe(
      false
    );
    expect(result.current.isEndDate(new Date(2019, 3, 27, 0, 0, 0))).toBe(
      false
    );
    clear();
  });

  test('should not select the start date, because is blocked', () => {
    const onDatesChange = jest.fn();
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: null,
        endDate: null,
        isDateBlocked(date: Date): boolean {
          return isSameDay(date, new Date(2019, 3, 5));
        },
        onDatesChange,
      })
    );

    act(() => {
      result.current.onDateSelect(new Date(2019, 3, 5, 0, 0, 0));
    });
    expect(onDatesChange).not.toBeCalled();
    clear();
  });

  test('should dont hover range date because is blocked', () => {
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1),
        endDate: null,
        isRange: true,
        isDateBlocked(date: Date): boolean {
          return isSameDay(date, new Date(2019, 3, 7));
        },
      })
    );

    let dateToHover: Date = new Date(2019, 3, 6);
    act(() => {
      result.current.onDateHover(dateToHover);
    });
    expect(result.current.isDateHovered(dateToHover)).toBeTruthy();

    dateToHover = new Date(2019, 3, 7);
    act(() => {
      result.current.onDateHover(dateToHover);
    });
    expect(result.current.isDateHovered(dateToHover)).toBeFalsy();
    clear();
  });

  test('should reset hovered state', () => {
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1, 0, 0, 0),
        endDate: null,
        isRange: true,
        onDatesChange: jest.fn(),
      })
    );

    act(() => {
      result.current.onDateHover(new Date(2019, 3, 4));
    });
    expect(result.current.isDateHovered(new Date(2019, 3, 4))).toBe(true);

    act(() => {
      result.current.onDateHover(new Date(2019, 2, 4));
    });
    expect(result.current.isDateHovered(new Date(2019, 2, 4))).toBe(false);

    clear();
  });

  test('should select start date and dont select end date (blocked day)', () => {
    const onDatesChange = jest.fn();
    const { result } = renderHook(() =>
      useDatepicker({
        startDate: new Date(2019, 3, 1),
        endDate: null,
        onDatesChange,
        isDateBlocked(date: Date): boolean {
          return isSameDay(date, new Date(2019, 3, 4));
        },
      })
    );

    act(() => {
      result.current.onDateSelect(new Date(2019, 3, 4));
    });
    expect(onDatesChange).toBeCalledTimes(0);
    clear();
  });

  describe('getCurrentYearMonthAndDate', () => {
    test('should return current year and month', () => {
      advanceTo(new Date(2019, 2, 27, 0, 0, 0));
      expect(getCurrentYearMonthAndDate().year).toEqual(2019);
      expect(getCurrentYearMonthAndDate().month).toEqual(2);
      clear();
    });
  });

  describe('getDateMonthAndYear', () => {
    test('should return year and month', () => {
      const date = new Date(2019, 2, 27, 0, 0, 0);
      expect(getDateMonthAndYear(date).year).toEqual(2019);
      expect(getDateMonthAndYear(date).month).toEqual(2);
    });
  });

  describe('getNextActiveMonth', () => {
    test('get next 2 months', () => {
      advanceTo(new Date(2019, 2, 27, 0, 0, 0));
      const months = getInitialMonths(true, null);
      const nextMonths = getNextActiveMonth(months, 1);
      expect(nextMonths.length).toBe(2);
      expect(nextMonths[0].year).toEqual(2019);
      expect(nextMonths[0].month).toEqual(4);
      expect(nextMonths[1].year).toEqual(2019);
      expect(nextMonths[1].month).toEqual(5);
      clear();
    });

    test('get past 2 months', () => {
      advanceTo(new Date(2019, 2, 27, 0, 0, 0));
      const months = getInitialMonths(true, null);
      const nextMonths = getNextActiveMonth(months, -1);
      expect(nextMonths.length).toBe(2);
      expect(nextMonths[0].year).toEqual(2019);
      expect(nextMonths[0].month).toEqual(0);
      expect(nextMonths[1].year).toEqual(2019);
      expect(nextMonths[1].month).toEqual(1);
      clear();
    });
  });

  describe('getInitialMonths', () => {
    test('should return 2 months', () => {
      advanceTo(new Date(2019, 2, 27, 0, 0, 0));
      const months = getInitialMonths(true, null);
      expect(months.length).toBe(2);
      expect(months[0].year).toEqual(2019);
      expect(months[0].month).toEqual(2);
      expect(months[1].year).toEqual(2019);
      expect(months[1].month).toEqual(3);
      clear();
    });

    test('should return 2 months (june and july)', () => {
      advanceTo(new Date(2019, 2, 27, 0, 0, 0));
      const months = getInitialMonths(true, new Date(2019, 5, 25));
      expect(months.length).toBe(2);
      expect(months[0].year).toEqual(2019);
      expect(months[0].month).toEqual(5);
      expect(months[1].year).toEqual(2019);
      expect(months[1].month).toEqual(6);
      clear();
    });

    test('should return 1 month', () => {
      advanceTo(new Date(2019, 2, 27, 0, 0, 0));
      const months = getInitialMonths(false, null);
      expect(months.length).toBe(1);
      expect(months[0].year).toEqual(2019);
      expect(months[0].month).toEqual(2);
      clear();
    });
  });

  const startDate = new Date(2019, 2, 20, 0, 0, 0);
  const endDate = new Date(2019, 2, 27, 0, 0, 0);

  describe('isDateSelected', () => {
    test('should return true, because date is selected', () => {
      expect(isDateSelected(startDate, startDate, endDate)).toBe(true);
      expect(isDateSelected(endDate, startDate, endDate)).toBe(true);
      expect(
        isDateSelected(new Date(2019, 2, 26, 0, 0, 0), startDate, endDate)
      ).toBe(true);
    });

    test('should return false, because date is not selected', () => {
      expect(
        isDateSelected(new Date(2019, 2, 19, 0, 0, 0), startDate, endDate)
      ).toBe(false);
      expect(
        isDateSelected(new Date(2019, 2, 28, 0, 0, 0), startDate, endDate)
      ).toBe(false);
      expect(isDateSelected(new Date(2019, 2, 28, 0, 0, 0), null, null)).toBe(
        false
      );
    });
  });

  describe('isFirstOrLastSelectedDate', () => {
    test('should be start or end date', () => {
      expect(
        isFirstOrLastSelectedDate(new Date(2019, 2, 20), startDate, endDate)
      ).toBe(true);
      expect(
        isFirstOrLastSelectedDate(new Date(2019, 2, 27), startDate, endDate)
      ).toBe(true);
    });

    test('should not be start or end date', () => {
      expect(
        isFirstOrLastSelectedDate(new Date(2019, 2, 21), startDate, endDate)
      ).toBe(false);
    });
  });

  describe('isDateHovered', () => {
    test.each([
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: null,
        isSelectingInRange: true,
        date: new Date(2019, 2, 10, 0, 0, 0),
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: null,
        date: new Date(2019, 2, 10, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: null,
        date: new Date(2019, 2, 11, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 11, 0, 0, 0),
        date: new Date(2019, 2, 11, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 11, 0, 0, 0),
        date: new Date(2019, 2, 11, 0, 0, 0),
        isSelectingInRange: true,
        expected: true,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 12, 0, 0, 0),
        date: new Date(2019, 2, 12, 0, 0, 0),
        isSelectingInRange: true,
        expected: true,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 1, 12, 0, 0, 0),
        date: new Date(2019, 1, 11, 0, 0, 0),
        isSelectingInRange: true,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 13, 0, 0, 0),
        date: new Date(2019, 2, 11, 0, 0, 0),
        isSelectingInRange: true,
        expected: true,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 11, 0, 0, 0),
        isSelectingInRange: true,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 12, 0, 0, 0),
        isSelectingInRange: true,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 10, 0, 0, 0),
        isSelectingInRange: true,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 10, 0, 0, 0),
        isSelectingInRange: true,
        expected: false,
      },
      {
        startDate: null,
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 10, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: null,
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 10, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: new Date(2019, 2, 10, 0, 0, 0),
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 10, 0, 0, 0),
        isSelectingInRange: true,
        expected: false,
      },
      {
        startDate: null,
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 11, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: null,
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 12, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
      {
        startDate: null,
        hoveredDate: new Date(2019, 2, 10, 0, 0, 0),
        date: new Date(2019, 2, 13, 0, 0, 0),
        isSelectingInRange: false,
        expected: false,
      },
    ])(
      'should return true if day can be hovered, otherwise we return false',
      // eslint-disable-next-line no-shadow
      ({ startDate, hoveredDate, date, isSelectingInRange, expected }) => {
        expect(
          isDateHovered({
            startDate,
            hoveredDate,
            date,
            isSelectingInRange,
          })
        ).toBe(expected);
      }
    );
  });

  describe('onDateSelect', () => {
    test('should select date for single', () => {
      const onDatesChange = jest.fn();
      const { result } = renderHook(() =>
        useDatepicker({
          startDate: null,
          endDate: null,
          isRange: false,
          onDatesChange,
        })
      );

      act(() => {
        result.current.onDateSelect(new Date(2019, 3, 1));
      });

      expect(onDatesChange).toBeCalledWith({
        startDate: new Date(2019, 3, 1),
        endDate: new Date(2019, 3, 1),
        event: null,
      });
    });

    test('should select start date for range', () => {
      const onDatesChange = jest.fn();
      const { result } = renderHook(() =>
        useDatepicker({
          startDate: null,
          endDate: null,
          isRange: true,
          onDatesChange,
        })
      );

      act(() => {
        result.current.onDateSelect(new Date(2019, 3, 1));
      });

      expect(onDatesChange).toBeCalledWith({
        startDate: new Date(2019, 3, 1),
        endDate: null,
        event: null,
      });
    });

    test('should select end date greater than start date for range', () => {
      const onDatesChange = jest.fn();
      const { result } = renderHook(() =>
        useDatepicker({
          startDate: new Date(2019, 3, 1),
          endDate: null,
          isRange: true,
          onDatesChange,
        })
      );

      act(() => {
        result.current.onDateSelect(new Date(2019, 3, 2));
      });
      expect(onDatesChange).toBeCalledWith({
        startDate: new Date(2019, 3, 1),
        endDate: new Date(2019, 3, 2),
        event: null,
      });
    });

    test('should select end date less than start date for range', () => {
      const onDatesChange = jest.fn();
      const { result } = renderHook(() =>
        useDatepicker({
          startDate: new Date(2019, 3, 1),
          endDate: null,
          isRange: true,
          onDatesChange,
        })
      );

      act(() => {
        result.current.onDateSelect(new Date(2019, 2, 1));
      });
      expect(onDatesChange).toBeCalledWith({
        startDate: new Date(2019, 2, 1),
        endDate: new Date(2019, 3, 1),
        event: null,
      });
    });
  });

  describe('isDateFocused', () => {
    test('should set focus on date focused', () => {
      const { result } = renderHook(() =>
        useDatepicker({
          startDate,
          endDate: null,
          isRange: false,
        })
      );

      expect(result.current.isDateFocused(startDate)).toBeTruthy();
      const dateToFocus: Date = new Date(2019, 3, 1);
      act(() => {
        result.current.onDateFocus(dateToFocus);
      });
      expect(result.current.isDateFocused(startDate)).toBeFalsy();
      expect(result.current.isDateFocused(dateToFocus)).toBeTruthy();
    });
  });
});
