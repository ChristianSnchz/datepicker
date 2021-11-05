import React, { FC, useContext, useCallback, useState } from 'react';
import Icon from '@flame-ui/icons/src/calendar';
import { useFocus } from '@flame-ui/utils/src/hooks';
import ContextDatePicker from '../../../context';
import { IconWrapper, IconButton } from './styled';
import {
  DAYS_FOCUS,
  ICON_CALENDAR_FOCUS,
} from '../../../context/datePickerFocus';

const CalendarIcon: FC = () => {
  const {
    setOpenedCalendar,
    focusedCalendar,
    date,
    isRange,
    setFocusedCalendar,
    format,
    openedCalendar,
  } = useContext(ContextDatePicker);
  const iconRef = useFocus({
    isFocused: focusedCalendar === ICON_CALENDAR_FOCUS && !openedCalendar,
  });

  const getNameDate = useCallback(
    (paramDate: Date): string => {
      return `${paramDate.getDate()} de ${format(
        paramDate,
        'MMMM'
      )} de ${paramDate.getFullYear()}`;
    },
    [date]
  );

  const getAriaLabelForSimple = useCallback(
    (): string =>
      `Elegir fecha${
        date.start ? `, seleccionado ${getNameDate(date.start)}` : ''
      }`,
    [date]
  );

  const getAriaLabelForRange = useCallback(
    (): string =>
      `Elegir fecha${
        date.start ? `, seleccionado desde ${getNameDate(date.start)}` : ''
      }${date.end ? ` hasta ${getNameDate(date.end)}` : ''}`,
    [date]
  );

  return (
    <IconWrapper>
      <IconButton
        ref={iconRef}
        aria-label={!isRange ? getAriaLabelForSimple() : getAriaLabelForRange()}
        type="button"
        onFocus={() => setFocusedCalendar(ICON_CALENDAR_FOCUS)}
        onClick={() => {
          setOpenedCalendar((prev) => !prev);
          setFocusedCalendar(
            !openedCalendar ? DAYS_FOCUS : ICON_CALENDAR_FOCUS
          );
        }}
      >
        <Icon />
      </IconButton>
    </IconWrapper>
  );
};

export default CalendarIcon;
