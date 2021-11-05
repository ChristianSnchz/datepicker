import React, { FC, useEffect, useState } from 'react';

import { useDatepicker } from '../hooks/useDatepicker';
import DatePicker from '..';
import ContextDatePicker from '.';
import {
  DatePickerProps,
  DateValue,
  RangeDate,
  UNDEFINED_DATE,
} from '../interfaces';
import useDateChange from '../hooks/useDateChange';

const normalizeDate = (date: DateValue): Date => date && new Date(date);
const isNewDateValue = (newValue: DateValue, oldValue: DateValue): boolean =>
  newValue !== UNDEFINED_DATE && newValue !== oldValue;

const DatepickerProvider: FC<DatePickerProps> = ({
  defaultValue,
  value,
  isDateMarked = () => false,
  range,
  onChange,
  isDateBlocked = () => false,
  format,
  parse,
  ...rest
}) => {
  const [date, setDate] = useState<RangeDate>({
    start: normalizeDate(defaultValue),
    end: range
      ? normalizeDate(range.defaultValue)
      : normalizeDate(defaultValue),
  });
  const [openedCalendar, setOpenedCalendar] = useState<boolean>(false);
  const [focusedCalendar, setFocusedCalendar] = useState<string>(null);
  const handleDateChange = useDateChange({ setDate, range, onChange });
  const {
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateFocused,
    focusedDate,
    activeMonths,
    onDateHover,
    onDateSelect,
    onDateFocus,
    isStartDate,
    isEndDate,
    goToPreviousMonths,
    goToNextMonths,
    isSelectingInRange,
  } = useDatepicker({
    startDate: date.start,
    endDate: date.end,
    onDatesChange: handleDateChange,
    isRange: !!range,
    isDateBlocked,
  });

  useEffect(() => {
    if (isNewDateValue(value, date.start)) {
      handleDateChange({
        startDate: normalizeDate(value),
        endDate: range ? date.end : normalizeDate(value),
      });
    }
  }, [value]);

  useEffect(() => {
    if (range && isNewDateValue(range.value, date.end)) {
      handleDateChange({
        startDate: normalizeDate(value),
        endDate: normalizeDate(range.value),
      });
    }
  }, [range?.value]);

  useEffect(() => {
    if (openedCalendar) {
      onDateFocus(isSelectingInRange ? date.start : date.end || new Date());
    }
  }, [openedCalendar]);

  return (
    <ContextDatePicker.Provider
      value={{
        date,
        focusedDate,
        handleDateChange,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isDateMarked,
        isFirstOrLastSelectedDate,
        isStartDate,
        isEndDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
        activeMonths,
        openedCalendar,
        setOpenedCalendar,
        goToPreviousMonths,
        goToNextMonths,
        focusedCalendar,
        setFocusedCalendar,
        isRange: !!range,
        format,
        parse,
      }}
    >
      <DatePicker range={range} {...rest} />
    </ContextDatePicker.Provider>
  );
};

export default DatepickerProvider;
