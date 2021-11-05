import React, { FC, useContext, useEffect } from 'react';
import InputWithMask from '../InputWithMask';
import ContextDatePicker from '../../../context';
import useInputDate from '../../../hooks/useInputDate';
import { DateErrorType, DateValue } from '../../../interfaces';
import { Status } from '../../../../../utils/switch-color';

export interface SingleDateProps {
  id: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  onDateError: DateErrorType;
  status?: Status;
}

const SingleDate: FC<SingleDateProps> = ({
  label,
  disabled,
  id,
  onDateError,
  status,
}) => {
  const { date, handleDateChange } = useContext(ContextDatePicker);
  const { data, onChange } = useInputDate({ date: date.start });

  useEffect(() => {
    onDateError(data.errorMessage);
  }, [data.errorMessage]);

  return (
    <InputWithMask
      id={id}
      aria-describedby={`${id}-helperText`}
      label={label}
      aria-label="ingresar fecha"
      aria-invalid={!!data.errorMessage}
      value={data.value || ''}
      onChange={(event) => {
        const newDate: DateValue = onChange(event);
        handleDateChange({
          startDate: newDate,
          endDate: newDate,
          event,
        });
      }}
      disabled={disabled}
      status={status}
    />
  );
};

export default SingleDate;
