Our DatePicker handles data using DateFns. This DatePickerBase is similar as DatePicker default, except that you can use any other dates library for passing the data.

## Usage

You must create two functions similiar to the examples below:

1.  One for formatting the date
2.  Another for parsing the date

Remember that input and output should remain the same.

### Single Date example Using date-fns:

```jsx
import React, { FC } from 'react';
import dateFnsParse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';
import locale from 'date-fns/locale/es';
import DatePickerBase, {
  Format,
  Parse,
  DateValue,
} from '@flame-ui/core/datePickerBase';

const formatDate: Format = (date: Date, format: string) => {
  return dateFnsFormat(date, format, { locale });
};

const parseDate: Parse = (str, format) => {
  return dateFnsParse(str, format, new Date());
};

const MyComponent = () => {
  const [value, setValue] = useState < DateValue > new Date();
  return (
    <DatePickerBase
      format={formatDate}
      parse={parseDate}
      label="Fecha"
      helperText="Ingrese fecha"
      value={value}
      onChange={(newDate: DateValue) => setValue(newDate)}
    />
  );
};
```
