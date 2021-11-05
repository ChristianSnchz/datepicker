import { useState, useCallback } from 'react';
import {
  isSameDay,
  addMonths,
  isAfter,
} from '@flame-ui/utils/src/date-utils/index';

import {
  getInitialMonths,
  getNextActiveMonth,
  isDateSelected as isDateSelectedFn,
  isFirstOrLastSelectedDate as isFirstOrLastSelectedDateFn,
  isEndDate as isEndDateFn,
  isStartDate as isStartDateFn,
  isDateHovered as isDateHoveredFn,
} from './useDatepicker.utils';
import { OnDatesChangeProps, TruthyStateFromDate } from '../../interfaces';

export interface UseDatepickerProps {
  onDatesChange?(date: OnDatesChangeProps): void;
  startDate: Date | null;
  endDate: Date | null;
  isRange?: boolean;
  isDateBlocked?: TruthyStateFromDate;
}

export function useDatepicker({
  startDate,
  endDate,
  onDatesChange,
  isRange = false,
  isDateBlocked: isDateBlockedProps = () => false,
}: UseDatepickerProps) {
  const [activeMonths, setActiveMonths] = useState(() =>
    getInitialMonths(isRange, startDate || null)
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(
    startDate || new Date()
  );

  const isSelectingInRange = !!startDate && !endDate && isRange;

  const onDateFocus = (date: Date) => {
    setFocusedDate(date);
    const firstDate = activeMonths[0].date;
    const lastDate = addMonths(activeMonths[activeMonths.length - 1].date, 1);

    if (!focusedDate || date >= lastDate || date < firstDate) {
      setActiveMonths(getInitialMonths(isRange, date));
    }
  };

  const isDateSelected = (date: Date) =>
    isDateSelectedFn(date, startDate, endDate);

  const isFirstOrLastSelectedDate = (date: Date) =>
    isFirstOrLastSelectedDateFn(date, startDate, endDate);

  const isStartDate = (date: Date) => isStartDateFn(date, startDate);

  const isEndDate = (date: Date) => isEndDateFn(date, endDate);

  const isDateFocused = (date: Date) => isSameDay(date, focusedDate);

  const isDateHovered = (date: Date) =>
    isDateHoveredFn({
      date,
      hoveredDate,
      isSelectingInRange,
      startDate,
    });

  const onDateSelect = (date, event = null) => {
    if (!isDateBlockedProps(date)) {
      if (isRange) {
        if (!isSelectingInRange) {
          onDatesChange({
            endDate: null,
            startDate: date,
            event,
          });
        } else if (isAfter(date, startDate)) {
          onDatesChange({
            startDate,
            endDate: date,
            event,
          });
        } else {
          onDatesChange({
            startDate: date,
            endDate: startDate,
            event,
          });
        }
      } else {
        onDatesChange({
          startDate: date,
          endDate: date,
          event,
        });
      }
      setFocusedDate(date);
    }
  };

  const onDateHover = (date: Date | null) => {
    if (!date || isDateBlockedProps(date)) {
      setHoveredDate(null);
    } else {
      setHoveredDate(date);
    }
  };

  const goToPreviousMonths = useCallback(() => {
    const activeMonth = getNextActiveMonth(activeMonths, -1);
    setActiveMonths(activeMonth);
    onDateFocus(addMonths(focusedDate, -activeMonth.length));
  }, [activeMonths]);

  const goToNextMonths = useCallback(() => {
    const activeMonth = getNextActiveMonth(activeMonths, 1);
    setActiveMonths(activeMonth);
    onDateFocus(addMonths(focusedDate, activeMonth.length));
  }, [activeMonths]);

  return {
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isStartDate,
    isEndDate,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
    isSelectingInRange,
  };
}
