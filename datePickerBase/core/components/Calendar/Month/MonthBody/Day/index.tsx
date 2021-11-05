import React, { useContext, ReactText, FC, MouseEvent } from 'react';
import { useFocus } from '@flame-ui/utils/src/hooks';
import useDay from '../../../../../hooks/useDay/useDay';
import ContextDatePicker from '../../../../../context';
import { WrapperDay, ButtonDay } from './styles';

import {
  DAYS_FOCUS,
  ICON_CALENDAR_FOCUS,
} from '../../../../../context/datePickerFocus';

interface DayProps {
  day: ReactText | string | Date;
  date: Date;
  moth: string;
}

const Day: FC<DayProps> = ({ day, date, moth }) => {
  const {
    focusedCalendar,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isStartDate,
    isEndDate,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateHover,
    isRange,
    isDateMarked,
    setFocusedCalendar,
    setOpenedCalendar,
  } = useContext(ContextDatePicker);
  const {
    onClick,
    isSelected,
    isFocused,
    isSelectedStartOrEnd,
    onMouseEnter,
    disabledDate,
    isWithinHoverRange,
    styles,
  } = useDay({
    date,
    isDateSelected,
    isFirstOrLastSelectedDate,
    isDateHovered,
    isDateBlocked,
    isStartDate,
    isEndDate,
    isDateFocused,
    onDateSelect,
    onDateHover,
  });

  const dayRef = useFocus({
    isFocused: focusedCalendar === DAYS_FOCUS && isFocused,
  });

  return (
    <WrapperDay
      isInRange={isWithinHoverRange}
      isSelectedStartOrEnd={isSelectedStartOrEnd}
      onMouseOver={onMouseEnter}
      onMouseEnter={onMouseEnter}
      role="gridcell"
      styles={styles.wrapper}
    >
      <ButtonDay
        type="button"
        isDisabled={disabledDate}
        isMarked={isDateMarked(date)}
        styles={styles.button}
        ref={dayRef}
        tabIndex={isFocused ? 0 : -1}
        isSelected={isSelected}
        aria-selected={isSelected ? 'true' : 'false'}
        aria-label={`seleccionar ${day} de ${moth}`}
        onClick={(event: MouseEvent<HTMLElement>) => {
          if (!isDateBlocked(date)) {
            onClick(event);
            if (!isRange) {
              setFocusedCalendar(ICON_CALENDAR_FOCUS);
              setOpenedCalendar(false);
            } else {
              setFocusedCalendar(DAYS_FOCUS);
            }
          }
        }}
      >
        {day}
      </ButtonDay>
    </WrapperDay>
  );
};
export default Day;
