import { Dispatch, SetStateAction } from 'react';

import { MonthType } from '../hooks/useDatepicker';
import {
  Format,
  OnDatesChangeProps,
  OnDateSelectProps,
  Parse,
  RangeDate,
  TruthyStateFromDate,
  VoidStateFromDate,
} from '../interfaces';

export interface ContextProps {
  date: RangeDate;
  focusedDate: Date | null;
  handleDateChange: (data: OnDatesChangeProps) => void;
  isDateFocused: TruthyStateFromDate;
  isDateSelected: TruthyStateFromDate;
  isDateHovered: TruthyStateFromDate;
  isDateBlocked: TruthyStateFromDate;
  isDateMarked: TruthyStateFromDate;
  isStartDate: TruthyStateFromDate;
  isEndDate: TruthyStateFromDate;
  isFirstOrLastSelectedDate: TruthyStateFromDate;
  onDateSelect: OnDateSelectProps;
  onDateFocus: VoidStateFromDate;
  onDateHover: VoidStateFromDate;
  activeMonths: MonthType[];
  openedCalendar: boolean;
  setOpenedCalendar: Dispatch<SetStateAction<boolean>>;
  goToPreviousMonths: () => void;
  goToNextMonths: () => void;
  focusedCalendar: string;
  setFocusedCalendar: Dispatch<SetStateAction<string>>;
  isRange: boolean;
  format: Format;
  parse: Parse;
}
