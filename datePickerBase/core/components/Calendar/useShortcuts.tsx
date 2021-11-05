import { useContext, useCallback } from 'react';
import {
  addDays,
  addMonths,
  isBefore,
  isAfter,
  isWithinInterval,
} from '@flame-ui/utils/src/date-utils';
import { useKeyPress, useKeyUp } from '@flame-ui/utils/src/hooks';
import ContextDatePicker from '../../context';
import {
  DAYS_FOCUS,
  getIndex,
  getCalendarFocusState,
  ICON_CALENDAR_FOCUS,
} from '../../context/datePickerFocus';
import { MAX_DATE, MIN_DATE } from '../../interfaces';

const searchNextUnblockedDate = (
  date: Date,
  operation: (d: Date) => Date,
  isDateBlocked: (d: Date) => boolean
): Date => {
  let newDate = date;
  do {
    newDate = operation(newDate);
  } while (
    isDateBlocked(newDate) &&
    isWithinInterval(newDate, { start: MIN_DATE, end: MAX_DATE })
  );
  return newDate;
};

const useShortcuts = () => {
  const {
    focusedCalendar,
    setFocusedCalendar,
    openedCalendar,
    onDateFocus,
    isDateBlocked,
    setOpenedCalendar,
    focusedDate,
  } = useContext(ContextDatePicker);

  useKeyPress(
    'Tab',
    (event: KeyboardEvent) => {
      event.preventDefault();
      const index = getIndex(focusedCalendar) + (event.shiftKey ? -1 : 1);
      setFocusedCalendar(getCalendarFocusState(index));
    },
    !openedCalendar
  );

  const disabledDayShortcuts = !(
    openedCalendar && focusedCalendar === DAYS_FOCUS
  );

  const goToUnblockedDate = useCallback(
    (operation) => {
      const newDate: Date = searchNextUnblockedDate(
        focusedDate,
        operation,
        isDateBlocked
      );
      if (isWithinInterval(newDate, { start: MIN_DATE, end: MAX_DATE })) {
        onDateFocus(newDate);
      }
    },
    [focusedDate]
  );

  useKeyPress(
    'ArrowDown',
    () => goToUnblockedDate((d: Date) => addDays(d, 7)),
    disabledDayShortcuts
  );
  useKeyPress(
    'ArrowUp',
    () => goToUnblockedDate((d: Date) => addDays(d, -7)),
    disabledDayShortcuts
  );
  useKeyPress(
    'ArrowLeft',
    () => goToUnblockedDate((d: Date) => addDays(d, -1)),
    disabledDayShortcuts
  );
  useKeyPress(
    'ArrowRight',
    () => goToUnblockedDate((d: Date) => addDays(d, 1)),
    disabledDayShortcuts
  );
  useKeyUp(
    'Escape',
    () => {
      setFocusedCalendar(ICON_CALENDAR_FOCUS);
      setOpenedCalendar(false);
    },
    !openedCalendar
  );

  const setDateFocus = (d: Date): void => {
    if (!isDateBlocked(d)) {
      onDateFocus(d);
    }
  };

  useKeyUp(
    'Home',
    () => {
      const dayOfWeek = focusedDate.getDay() === 0 ? 7 : focusedDate.getDay();
      setDateFocus(addDays(focusedDate, -(dayOfWeek - 1)));
    },
    disabledDayShortcuts
  );

  useKeyUp(
    'End',
    () => {
      const dayOfWeek = focusedDate.getDay() === 0 ? 7 : focusedDate.getDay();
      setDateFocus(addDays(focusedDate, 7 - dayOfWeek));
    },
    disabledDayShortcuts
  );

  useKeyUp(
    'PageUp',
    () => {
      setDateFocus(addMonths(focusedDate, -1));
    },
    disabledDayShortcuts
  );

  useKeyUp(
    'PageDown',
    () => {
      setDateFocus(addMonths(focusedDate, 1));
    },
    disabledDayShortcuts
  );
};

export default useShortcuts;
