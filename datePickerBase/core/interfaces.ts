import { ChangeEvent, InputHTMLAttributes, MouseEvent } from 'react';

export const UNDEFINED_DATE = undefined;
export type DateValue = Date | null | typeof UNDEFINED_DATE;

export interface RangeDate {
  start: DateValue;
  end: DateValue;
}

export const DATE_FORMAT = 'dd/MM/yyyy';
export const MIN_DATE: Date = new Date(1900, 0, 1);
export const MAX_DATE: Date = new Date(2100, 0, 1);

export type DatePickerEvents =
  | MouseEvent<HTMLElement>
  | ChangeEvent<HTMLInputElement>;
export type TruthyStateFromDate = (date: Date) => boolean;
export type VoidStateFromDate = (date: Date) => void;
export type DateErrorType = (newDateError: string) => void;

export type OnChangeProps = (
  newDate: DateValue | RangeDate,
  event: DatePickerEvents
) => void;

export interface OnDatesChangeProps {
  startDate: DateValue;
  endDate: DateValue;
  event?: DatePickerEvents;
}

export type OnDateSelectProps = (date: Date, event: DatePickerEvents) => void;

export type Format = (date: Date, format: string) => string;
export type Parse = (date: string, format: string) => Date;

export interface Range {
  label?: string;
  defaultValue?: DateValue;
  value?: DateValue;
}

export interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  range?: Range;
}

export interface DatePickerProps {
  id?: string;
  disabled?: boolean;
  label?: string;
  defaultValue?: DateValue;
  value?: DateValue;
  isDateBlocked?: TruthyStateFromDate;
  isDateMarked?: TruthyStateFromDate;
  onChange?: OnChangeProps;
  onBlur?: () => void;
  onFocus?: () => void;
  helperText?: string;
  error?: string;
  range?: Range;
  format?: Format;
  parse?: Parse;
}
