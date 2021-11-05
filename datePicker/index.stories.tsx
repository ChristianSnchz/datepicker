import React, { useState } from 'react';
import notes from './README.md';
import storyBookBase from '../datePickerBase/index.stories';
import DatePicker from '.';

const defaultDate = new Date();
const defaultIsDateBlockedOrMarked = (date: Date) =>
  date.getDay() === 0 || date.getDay() === 6;

const defaultSimpleData = {
  defaultValue: defaultDate,
  label: 'Desde',
  helperText: 'Ingrese fecha',
};

const defaultRangeDate = {
  range: {
    label: 'Hasta',
    defaultValue: defaultDate,
  },
};

const Template = (args) => <DatePicker {...args} />;

export const SingleDate = Template.bind({});
SingleDate.args = defaultSimpleData;

export const SingleDateWithBlockedDates = Template.bind({});
SingleDateWithBlockedDates.args = {
  ...defaultSimpleData,
  isDateBlocked: defaultIsDateBlockedOrMarked,
};

export const SingleDateWithMarkedDates = Template.bind({});
SingleDateWithMarkedDates.args = {
  ...defaultSimpleData,
  isDateMarked: defaultIsDateBlockedOrMarked,
};

export const DateInRange = Template.bind({});
DateInRange.args = { ...defaultSimpleData, ...defaultRangeDate };

export const DateInRangeWithBlockedDates = Template.bind({});
DateInRangeWithBlockedDates.args = {
  ...defaultSimpleData,
  ...defaultRangeDate,
  isDateBlocked: defaultIsDateBlockedOrMarked,
};

export const DateInRangeWithMarkedDates = Template.bind({});
DateInRangeWithMarkedDates.args = {
  ...defaultSimpleData,
  ...defaultRangeDate,
  isDateMarked: defaultIsDateBlockedOrMarked,
};

delete storyBookBase.argTypes.format;
delete storyBookBase.argTypes.parse;

export default {
  title: 'Form/Date Picker',
  component: DatePicker,
  argTypes: storyBookBase.argTypes,
  parameters: {
    notes: {
      markdown: notes,
    },
  },
};
