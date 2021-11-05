import React, { FC, useContext, InputHTMLAttributes } from 'react';
import { useClickOutside } from '@flame-ui/utils/src/hooks';
import styled from 'styled-components';
import { useAutoId } from '@flame-ui/utils/hooks';
import InputsContainer from './components/InputsContainer';
import Calendar from './components/Calendar';
import ContextDatePicker from './context';
import { InputsProps } from './interfaces';

interface DatePickerProps extends InputsProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

const DatePickerWrapper = styled.div`
  position: relative;
`;

const DatePicker: FC<DatePickerProps> = ({
  label,
  helperText,
  error,
  range,
  onBlur,
  onFocus,
  id = useAutoId(),
  ...rest
}) => {
  const { setOpenedCalendar, openedCalendar } = useContext(ContextDatePicker);

  const containerRef = useClickOutside<HTMLDivElement>(
    () => {
      setOpenedCalendar(false);
    },
    !openedCalendar,
    true
  );

  return (
    <DatePickerWrapper onFocus={onFocus} onBlur={onBlur} ref={containerRef}>
      <InputsContainer
        id={id}
        label={label}
        range={range}
        helperText={helperText}
        disabled={rest.disabled}
        readOnly={rest.readOnly}
        error={error}
      />
      <Calendar />
    </DatePickerWrapper>
  );
};
export default DatePicker;
