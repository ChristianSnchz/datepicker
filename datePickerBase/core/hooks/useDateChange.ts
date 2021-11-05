import { Dispatch, SetStateAction } from 'react';
import {
  OnChangeProps,
  OnDatesChangeProps,
  RangeDate,
  Range,
  DateValue,
} from '../interfaces';

interface useDateProps {
  setDate: Dispatch<SetStateAction<RangeDate>>;
  range: Range;
  onChange: OnChangeProps;
}

const setDateProp = (
  range: Range,
  start: DateValue,
  end: DateValue
): DateValue | RangeDate =>
  range
    ? {
        start,
        end,
      }
    : start;

const useDateChange: (
  data: useDateProps
) => (newDate: OnDatesChangeProps) => void = ({ setDate, range, onChange }) => (
  newDate: OnDatesChangeProps
) => {
  const newStartDate: DateValue = newDate.startDate;
  const newEndDate: DateValue = newStartDate && newDate.endDate;
  setDate({
    start: newStartDate,
    end: newEndDate,
  });

  if (onChange) {
    onChange(setDateProp(range, newStartDate, newEndDate), newDate.event);
  }
};

export default useDateChange;
