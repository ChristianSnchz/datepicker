import React, { useState } from 'react';
/* eslint-disable import/no-duplicates */
import dateFnsParse from 'date-fns/parse';
import dateFnsFormat from 'date-fns/format';
import locale from 'date-fns/locale/es';
/* eslint-disable import/no-duplicates */

import DatePickerBase from '.';
import { Format, Parse, DateValue } from './core/interfaces';
import notes from './README.md';

const TemplateSingle = (args) => {
  const [value, setValue] = useState<DateValue>(new Date());
  return (
    <DatePickerBase
      label="Fecha"
      value={value}
      onChange={(newDate: DateValue) => setValue(newDate)}
      id="date-picker"
      helperText="Ingrese fecha"
      error=""
      {...args}
    />
  );
};

export const SingleDateWithDateFns = TemplateSingle.bind({});
SingleDateWithDateFns.args = {
  defaultValue: new Date(),
  label: 'Desde',
  helperText: 'Ingrese fecha',
};
const formatDate: Format = (date: Date, format: string) => {
  return dateFnsFormat(date, format, { locale });
};

const parseDate: Parse = (str, format) => {
  return dateFnsParse(str, format, new Date());
};

SingleDateWithDateFns.args = {
  parse: parseDate,
  format: formatDate,
};

export default {
  title: 'Form/Date Picker Base',
  component: DatePickerBase,
  argTypes: {
    disabled: {
      description: `Indicates if you need block the component`,
      control: {
        type: 'boolean',
        options: [true, false],
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false,
        },
      },
    },
    helperText: {
      description: 'Sets the informative description',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string', detail: 'E.g. Enter Date' },
      },
    },
    error: {
      description: 'Sets the informative description of the error',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string', detail: 'E.g. Required' },
      },
    },
    label: {
      description: 'Sets the label over the date',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string', detail: 'E.g. Date' },
      },
    },
    defaultValue: {
      description: 'Sets the initial value',
      control: {
        type: 'date',
      },
      table: {
        type: { summary: 'date', detail: 'E.g. new Date()' },
      },
    },
    value: {
      description: 'Sets controlled value',
      control: {
        type: 'date',
      },
      table: {
        type: { summary: 'date', detail: 'E.g. new Date()' },
      },
    },
    range: {
      description:
        'Set the initial value, controlled value, and label for date in range',
      control: {
        type: 'object',
      },
      table: {
        type: {
          summary: 'object',
          detail:
            "{label: string, defaultValue: DateValue, value: DateValue}. E.g. {label: 'To', defaultValue: new Date(), value: new Date()}",
        },
      },
    },
    onChange: {
      description:
        'Callback fired when the value is changed (selecting day from the calendar or entering in the inputs).',
      control: {
        type: 'func',
      },
      table: {
        type: {
          summary: 'func',
          detail:
            '(newDate: DateValue | RangeDate, event: DatePickerEvents) => void',
        },
      },
    },
    onBlur: {
      description: 'Function triggered when user leaves the calendar.',
      control: {
        type: 'func',
      },
      table: {
        type: { summary: 'func', detail: '() => void' },
      },
    },
    onFocus: {
      description: 'Function triggered when calendar gets focus.',
      control: {
        type: 'func',
      },
      table: {
        type: { summary: 'func', detail: '() => void' },
      },
    },
    isDateBlocked: {
      description: 'Callback triggered to check if date is blocked',
      control: {
        type: 'func',
      },
      table: {
        type: {
          summary: 'func',
          detail:
            '(date: Date) => boolean; E.g. (date: Date) => date.getDay() === 0 || date.getDay() === 6',
        },
      },
    },
    isDateMarked: {
      description: 'Callback triggered to check if date is marked',
      control: {
        type: 'func',
      },
      table: {
        type: {
          summary: 'func',
          detail:
            '(date: Date) => boolean; E.g. (date: Date) => date.getDay() === 0 || date.getDay() === 6',
        },
      },
    },
    format: {
      description: 'Custom function to transform Date format to string',
      control: {
        type: 'func',
      },
      table: {
        type: {
          summary: 'func',
          detail: '(date: Date, format: string) => string',
        },
      },
    },
    parse: {
      description: 'Custom function to transform string format to Date',
      control: {
        type: 'func',
      },
      table: {
        type: {
          summary: 'func',
          detail: '(date: string, format: string) => Date',
        },
      },
    },
  },
  parameters: {
    notes: {
      markdown: notes,
    },
  },
};
