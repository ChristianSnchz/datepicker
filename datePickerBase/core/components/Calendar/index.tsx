import React, { FC, useContext } from 'react';
import CalendarWrapper from './styled';
import ContextDatePicker from '../../context';
import Month from './Month';
import useShortcuts from './useShortcuts';

const Calendar: FC = () => {
  const { activeMonths, openedCalendar } = useContext(ContextDatePicker);
  useShortcuts();

  return (
    <CalendarWrapper aria-hidden={!openedCalendar} isOpen={openedCalendar}>
      {activeMonths.map((month, key) => (
        <Month
          key={`${month.year}-${month.month}`}
          year={month.year}
          month={month.month}
          index={key}
        />
      ))}
    </CalendarWrapper>
  );
};

export default Calendar;
