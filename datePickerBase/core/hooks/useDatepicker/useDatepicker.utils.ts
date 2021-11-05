import {
  isWithinInterval,
  isSameDay,
  isAfter,
  startOfMonth,
  addMonths,
} from '@flame-ui/utils/src/date-utils';

export function isDateSelected(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
) {
  if (startDate && endDate) {
    return isWithinInterval(date, { start: startDate, end: endDate });
  }
  return false;
}

export function isFirstOrLastSelectedDate(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
) {
  return !!(
    (startDate && isSameDay(date, startDate)) ||
    (endDate && isSameDay(date, endDate))
  );
}

export function isStartDate(date: Date, startDate: Date | null) {
  return !!(startDate && isSameDay(date, startDate));
}

export function isEndDate(date: Date, endDate: Date | null) {
  return !!(endDate && isSameDay(date, endDate));
}

export interface MonthType {
  year: number;
  month: number;
  date: Date;
}

export function getDateMonthAndYear(date: Date): MonthType {
  const today = startOfMonth(date);
  const year = today.getFullYear();
  const month = today.getMonth();
  return {
    year,
    month,
    date: today,
  };
}

export function getCurrentYearMonthAndDate(): MonthType {
  return getDateMonthAndYear(new Date());
}

export function getInitialMonths(
  isRange: boolean,
  startDate: Date | null
): MonthType[] {
  const firstMonth = startDate
    ? getDateMonthAndYear(startDate)
    : getCurrentYearMonthAndDate();
  const months = [firstMonth];

  if (isRange) {
    const secondMonth: MonthType = getDateMonthAndYear(
      addMonths(firstMonth.date, 1)
    );
    months.push(secondMonth);
  }
  return months;
}

export function getNextActiveMonth(
  activeMonth: MonthType[],
  counter: number
): MonthType[] {
  const prevMonth = counter > 0 ? activeMonth.length - 1 : 0;
  let prevMonthDate = activeMonth[prevMonth].date;

  return Array.from(Array(activeMonth.length).keys()).reduce(
    (m: MonthType[]) => {
      if (m.length === 0) {
        prevMonthDate = addMonths(prevMonthDate, counter);
      } else {
        prevMonthDate = addMonths(prevMonthDate, counter >= 0 ? 1 : -1);
      }
      return counter > 0
        ? m.concat([getDateMonthAndYear(prevMonthDate)])
        : [getDateMonthAndYear(prevMonthDate)].concat(m);
    },
    []
  );
}

export interface IsDateHoveredProps {
  date: Date;
  isSelectingInRange: boolean;
  hoveredDate: Date | null;
  startDate: Date | null;
}

export function isDateHovered({
  date,
  isSelectingInRange,
  hoveredDate,
  startDate,
}: IsDateHoveredProps): boolean {
  return !!(
    isSelectingInRange &&
    hoveredDate &&
    isAfter(hoveredDate, startDate) &&
    isWithinInterval(date, { start: startDate, end: hoveredDate })
  );
}
