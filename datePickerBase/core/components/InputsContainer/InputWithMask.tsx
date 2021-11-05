import React, { FC, InputHTMLAttributes, useContext } from 'react';
import InputMask from 'react-input-mask';

import Input from '../../../../base/input';
import FieldLabel from '../../../../field-label';
import ContextDatePicker from '../../context';
import { DATE_FORMAT } from '../../interfaces';
import { Status } from '../../../../utils/switch-color';

interface InputWithMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  status?: Status;
  isFilled?: boolean;
}

const InputWithMask: FC<InputWithMaskProps> = ({
  id,
  label,
  value,
  status,
  isFilled,
  ...rest
}) => {
  const { setOpenedCalendar } = useContext(ContextDatePicker);
  return (
    <>
      {label && (
        <FieldLabel isFilled={isFilled || !!value} htmlFor={id} status={status}>
          {label}
        </FieldLabel>
      )}
      <InputMask
        mask={DATE_FORMAT.replace(/[a-zA-Z]/g, '9')}
        maskChar=""
        autoComplete="off"
        type="text"
        value={value}
        onClick={() => {
          setOpenedCalendar(false);
        }}
        {...rest}
      >
        {(inputProps) => {
          return <Input {...inputProps} />;
        }}
      </InputMask>
    </>
  );
};

export default InputWithMask;
