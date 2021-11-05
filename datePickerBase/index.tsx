import React, { FC } from 'react';
import { DatePickerProps } from './core/interfaces';
import ProviderDatePicker from './core/context/provider';

const DatePickerBase: FC<DatePickerProps> = (props) => (
  <ProviderDatePicker {...props} />
);

export default DatePickerBase;
