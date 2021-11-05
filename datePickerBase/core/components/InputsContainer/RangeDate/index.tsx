import React, { FC, ChangeEvent, useContext, useEffect } from 'react';
import { InputContainer, RangeDivision, WrapperRange } from './styled';
import InputWithMask from '../InputWithMask';
import { SingleDateProps } from '../SingleDate';
import ContextDatePicker from '../../../context';
import useInputDate from '../../../hooks/useInputDate';
import useDateValidations from '../../../hooks/useDateValidations';
import { DateValue } from '../../../interfaces';

interface RangeDateProps extends SingleDateProps {
  rangeLabel?: string;
}
const focusedError = (isFocused: boolean, error: string): string =>
  isFocused && error;
const defaultError = (startError: string, endError: string): string =>
  startError || endError;

const RangeDate: FC<RangeDateProps> = ({
  id,
  label,
  disabled,
  rangeLabel,
  onDateError,
  status,
}) => {
  const dateValidations = useDateValidations();
  const { handleDateChange, date } = useContext(ContextDatePicker);

  const start = useInputDate({ labelRef: label, date: date.start });
  const end = useInputDate({ labelRef: rangeLabel, date: date.end });

  useEffect(() => {
    onDateError(
      focusedError(start.data.focused, start.data.errorMessage) ||
        focusedError(end.data.focused, end.data.errorMessage) ||
        defaultError(start.data.errorMessage, end.data.errorMessage)
    );
  }, [
    start.data.focused,
    start.data.errorMessage,
    end.data.errorMessage,
    end.data.focused,
  ]);

  const startDateExtValidations = [
    dateValidations.byStartDateLessThanEndDate(
      label,
      rangeLabel,
      end.data.value
    ),
  ];

  const endDateExtValidations = [
    dateValidations.byEndDateGreaterThanStartDate(
      label,
      rangeLabel,
      start.data.value
    ),
  ];

  const filled = !!start.data.value || !!end.data.value;

  return (
    <WrapperRange>
      <InputContainer>
        <InputWithMask
          id={`${id}_start`}
          aria-describedby={`${id}-helperText`}
          aria-invalid={!!start.data.errorMessage}
          label={label}
          aria-label="ingresar fecha desde"
          value={start.data.value || ''}
          status={status}
          isFilled={filled}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newDate: DateValue = start.onChange(
              event,
              startDateExtValidations
            );
            handleDateChange({
              startDate: newDate,
              endDate: date.end,
              event,
            });
          }}
          disabled={disabled}
          onFocus={start.onFocus}
          onBlur={() => {
            start.onBlur();
            end.runValidations(endDateExtValidations);
          }}
        />
      </InputContainer>
      <RangeDivision />
      <InputContainer>
        <InputWithMask
          id={`${id}_end`}
          aria-describedby={`${id}-helperText`}
          aria-invalid={!!end.data.errorMessage}
          value={end.data.value || ''}
          aria-label="ingresar fecha hasta"
          status={status}
          isFilled={filled}
          label={rangeLabel}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newDate: DateValue = end.onChange(
              event,
              endDateExtValidations
            );
            handleDateChange({
              startDate: date.start,
              endDate: newDate,
              event,
            });
          }}
          disabled={disabled}
          onFocus={end.onFocus}
          onBlur={() => {
            end.onBlur();
            start.runValidations(startDateExtValidations);
          }}
        />
      </InputContainer>
    </WrapperRange>
  );
};

export default RangeDate;
