/* eslint-disable react/no-array-index-key */
import React, { FC, useContext } from 'react';
import { MonthBodyWrapper, WeeklyDay } from './styled';
import Day from './Day';
import { labelDay } from '../../../../utils';
import ContextDatePicker from '../../../../context';
import { DAYS_FOCUS } from '../../../../context/datePickerFocus';

interface MonthBodyProps {
  days: (number | { dayLabel: string; date: Date })[];
  weekdayLabels: string[];
  moth: string;
  index: number;
}

const MonthBody: FC<MonthBodyProps> = ({
  weekdayLabels,
  days,
  moth,
  index,
}) => {
  const { focusedCalendar } = useContext(ContextDatePicker);
  return (
    <MonthBodyWrapper
      role="grid"
      aria-hidden={focusedCalendar !== DAYS_FOCUS}
      aria-label="Elegir fecha"
      aria-labelledby={`id-heading-${index}`}
    >
      {weekdayLabels.map((dayLabel, id) => (
        <WeeklyDay aria-label={labelDay(id)} key={`weekly-${id}`}>
          {dayLabel}
        </WeeklyDay>
      ))}
      {days.map((day, id) => (
        <div key={`day-${id}`}>
          {typeof day === 'object' && (
            <Day
              date={day.date}
              key={day.date.toString()}
              day={day.dayLabel}
              moth={moth}
            />
          )}
        </div>
      ))}
    </MonthBodyWrapper>
  );
};

export default MonthBody;
