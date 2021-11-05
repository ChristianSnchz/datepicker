import React, { FC, useContext, useState, useEffect } from 'react';
import { useAutoId } from '@flame-ui/utils/src/hooks';

import RangeDate from './RangeDate';
import SingleDate from './SingleDate';
import HelperText from '../../../../helperText';
import InputBox from '../../../../input-box';
import { InputsProps, UNDEFINED_DATE } from '../../interfaces';
import ContextDatePicker from '../../context';
import getStatus from '../../../../utils/get-status';
import CalendarIcon from './CalendarIcon';
import inputHelper from '../../../../utils/input-helper';

const InputsContainer: FC<InputsProps> = ({
  id,
  label,
  helperText,
  error,
  disabled,
  readOnly,
  range,
}) => {
  const { date } = useContext(ContextDatePicker);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const autoId = useAutoId(id);
  const { interactive, showHelperText } = inputHelper({
    error: errorMessage,
    helperText,
    disabled,
    readOnly,
  });

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const onDateError = (newErrorMessage: string) => {
    setErrorMessage(newErrorMessage || error);
  };

  const status = getStatus({ error: errorMessage, success: undefined });

  const getFilled = () =>
    date.start ||
    date.start === UNDEFINED_DATE ||
    date.end ||
    date.end === UNDEFINED_DATE;

  return (
    <>
      <InputBox
        disabled={disabled}
        status={status}
        readOnly={readOnly}
        hasLabel={!!label}
        isFilled={getFilled()}
      >
        {!range ? (
          <SingleDate
            disabled={disabled}
            label={label}
            id={autoId}
            onDateError={onDateError}
            status={status}
          />
        ) : (
          <RangeDate
            disabled={disabled}
            label={label}
            id={autoId}
            rangeLabel={range.label}
            onDateError={onDateError}
            status={status}
          />
        )}
        <CalendarIcon />
      </InputBox>

      {interactive && showHelperText && (
        <HelperText id={autoId} error={errorMessage} helperText={helperText} />
      )}
    </>
  );
};

export default InputsContainer;
