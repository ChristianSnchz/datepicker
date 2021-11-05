import React, { FC } from 'react';
/* eslint-disable import/no-duplicates */
import dateFnsParse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';
import locale from 'date-fns/locale/es';
/* eslint-disable import/no-duplicates */
import DatePickerBase from '../datePickerBase';
import {
  DatePickerProps,
  Format,
  Parse,
} from '../datePickerBase/core/interfaces';

const formatDate: Format = (date, format) => {
  return dateFnsFormat(date, format, { locale });
};

const parseDate: Parse = (str, format) => {
  return dateFnsParse(str, format, new Date());
};

const DatePicker: FC<Omit<DatePickerProps, 'parse' | 'format'>> = ({
  ...props
}) => <DatePickerBase {...props} parse={parseDate} format={formatDate} />;

export default DatePicker;
