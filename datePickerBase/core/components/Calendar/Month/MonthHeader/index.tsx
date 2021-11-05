import React, { FC, useContext } from 'react';
import ChevronRightIcon from '@flame-ui/icons/src/chevron-right-1px';
import ChevronLeftIcon from '@flame-ui/icons/src/chevron-left-1px';
import { MonthHeaderWrapper, MonthLabel } from './styled';
import ContextDatePicker from '../../../../context';
import {
  NEXT_MONTH_FOCUS,
  PREV_MONTH_FOCUS,
} from '../../../../context/datePickerFocus';
import IconChangeMonth from './IconChangeMonth';

interface MontHeaderProp {
  monthLabel: string;
  monthNumber: number;
  index: number;
}

const MonthHeader: FC<MontHeaderProp> = ({
  monthLabel,
  monthNumber,
  index,
}) => {
  const {
    goToPreviousMonths,
    activeMonths,
    goToNextMonths,
    focusedCalendar,
    setFocusedCalendar,
  } = useContext(ContextDatePicker);

  const isFirstMonth = activeMonths[0].month === monthNumber;

  return (
    <MonthHeaderWrapper>
      <IconChangeMonth
        isFocused={focusedCalendar === PREV_MONTH_FOCUS && isFirstMonth}
        onClick={() => {
          setFocusedCalendar(PREV_MONTH_FOCUS);
          goToPreviousMonths();
        }}
        ariaLabel="ir mes previo"
        icon={<ChevronLeftIcon color="white" size={1.5} />}
      />
      <MonthLabel id={`id-heading-${index}`} role="heading" aria-live="polite">
        {monthLabel}
      </MonthLabel>
      <IconChangeMonth
        isFocused={focusedCalendar === NEXT_MONTH_FOCUS && isFirstMonth}
        onClick={() => {
          setFocusedCalendar(NEXT_MONTH_FOCUS);
          goToNextMonths();
        }}
        ariaLabel="ir próximo mes"
        icon={<ChevronRightIcon color="white" size={1.5} />}
      />
    </MonthHeaderWrapper>
  );
};

export default MonthHeader;
