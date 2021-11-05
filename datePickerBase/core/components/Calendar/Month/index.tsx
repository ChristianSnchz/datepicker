import React, { useContext } from 'react';
import MonthWrapper from './styles';
import MonthHeader from './MonthHeader';
import MonthBody from './MonthBody';
import ContextDatePicker from '../../../context';
import { useMonth, UseMonthResult } from '../../../hooks/useMonth';

interface MonthProps {
  year: number;
  month: number;
  index: number;
}

const Month = ({ year, month, index }: MonthProps) => {
  const { format } = useContext(ContextDatePicker);
  const { days, weekdayLabels, monthLabel }: UseMonthResult = useMonth({
    year,
    month,
    formatDate: format,
  });
  return (
    <MonthWrapper
      role="dialog"
      aria-modal="true"
      level={4}
      aria-labelledby={`id-heading-${index}`}
    >
      <>
        <MonthHeader
          index={index}
          monthLabel={monthLabel}
          monthNumber={month}
        />
        <MonthBody
          index={index}
          weekdayLabels={weekdayLabels}
          days={days}
          moth={monthLabel}
        />
      </>
    </MonthWrapper>
  );
};

export default Month;
