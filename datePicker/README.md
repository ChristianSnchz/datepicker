Datepicker is an input of type date that allows users select single or a range of dates.

## Usage

This component can be simple or range selection. You may set blocked and marked dates.

### Single Date:

```jsx
import React, { useState } from 'react';
import DatePicker, { DateValue } from '@flame-ui/core/datePicker';

const MyComponent = () => {
  const [value, setValue] = useState < DateValue > null;
  return (
    <DatePicker
      label="Fecha"
      helperText="Ingrese fecha"
      defaultValue={new Date()}
      value={value}
      onChange={(newDate: DateValue) => setValue(newDate)}
    />
  );
};
```

###Single Date with blocked dates:

```jsx
import React, { useState } from 'react';
import DatePicker, { DateValue } from '@flame-ui/core/datePicker';

const MyComponent = () => {
  const [value, setValue] = useState < DateValue > null;
  return (
    <DatePicker
      label="Fecha"
      helperText="Ingrese fecha"
      defaultValue={new Date()}
      value={value}
      isDateBlocked={(date: Date) => date.getDay() === 0 || date.getDay() === 6}
      onChange={(newDate: DateValue) => setValue(newDate)}
    />
  );
};
```

### Single DatePicker with marked dates:

```jsx
import React, { useState } from 'react';
import DatePicker, { DateValue } from '@flame-ui/core/datePicker';

const MyComponent = () => {
  const [value, setValue] = useState < DateValue > null;
  return (
    <DatePicker
      label="Fecha"
      helperText="Ingrese fecha"
      defaultValue={new Date()}
      value={value}
      isDateMarked={(date: Date) => date.getDay() === 0 || date.getDay() === 6}
      onChange={(newDate: DateValue) => setValue(newDate)}
    />
  );
};
```

### Dates in range:

```jsx
import React, { useState } from 'react';
import DatePicker, { RangeDate } from '@flame-ui/core/datePicker';

const MyComponent = () => {
  const [value, setValue] =
    useState <
    RangeDate >
    {
      start: new Date(),
      end: new Date(),
    };
  return (
    <DatePicker
      label="Desde"
      helperText="Ingrese fecha"
      value={value?.start}
      onChange={(newDate: RangeDate) => setValue(newDate)}
      range={{
        label: 'Hasta',
        value: value?.end,
      }}
    />
  );
};
```

### Dates in range with blocked dates:

```jsx
import React, { useState } from 'react';
import DatePicker, { RangeDate } from '@flame-ui/core/datePicker';

const MyComponent = () => {
  const [value, setValue] =
    useState <
    RangeDate >
    {
      start: new Date(),
      end: new Date(),
    };
  return (
    <DatePicker
      label="Desde"
      helperText="Ingrese fecha"
      value={value?.start}
      onChange={(newDate: RangeDate) => setValue(newDate)}
      isDateBlocked={(date: Date) => date.getDay() === 0 || date.getDay() === 6}
      range={{
        label: 'Hasta',
        value: value?.end,
      }}
    />
  );
};
```

### Dates in range with marked dates:

```jsx
import React, { useState } from 'react';
import DatePicker, { RangeDate } from '@flame-ui/core/datePicker';

const MyComponent = () => {
  const [value, setValue] =
    useState <
    RangeDate >
    {
      start: new Date(),
      end: new Date(),
    };
  return (
    <DatePicker
      label="Desde"
      helperText="Ingrese fecha"
      value={value?.start}
      onChange={(newDate: RangeDate) => setValue(newDate)}
      isDateMarked={(date: Date) => date.getDay() === 0 || date.getDay() === 6}
      range={{
        label: 'Hasta',
        value: value?.end,
      }}
    />
  );
};
```
