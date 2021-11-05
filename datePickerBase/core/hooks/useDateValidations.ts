import { useContext } from 'react';
import {
  isValidStringDate,
  differenceInDays,
} from '@flame-ui/utils/src/date-utils';
import ContextDatePicker from '../context';
import { DATE_FORMAT } from '../interfaces';

export interface DateValidation {
  validateFunction: (date: string) => boolean;
  message: string;
}

interface DateValidations {
  byValidDate: (labelRef?: string) => DateValidation;
  byBlockedDate: (labelRef?: string) => DateValidation;
  byStartDateLessThanEndDate: (
    labelStart: string,
    labelEnd: string,
    endDate: string
  ) => DateValidation;
  byEndDateGreaterThanStartDate: (
    labelStart: string,
    labelEnd: string,
    startDate: string
  ) => DateValidation;
}

const isValidDate = (date: string): boolean => {
  return (
    !date ||
    (date && isValidStringDate(date) && date.length === DATE_FORMAT.length)
  );
};

const useDateValidations = (): DateValidations => {
  const { parse, isDateBlocked } = useContext(ContextDatePicker);

  return {
    byValidDate: (labelRef?: string): DateValidation => ({
      validateFunction: (value: string): boolean => isValidDate(value),
      message: `La fecha ${labelRef || ''} es inválida`,
    }),
    byBlockedDate: (labelRef?: string): DateValidation => ({
      validateFunction: (value: string): boolean =>
        !isDateBlocked(parse(value, DATE_FORMAT)),
      message: `La fecha ${labelRef || ''} está bloqueada`,
    }),
    byStartDateLessThanEndDate: (
      labelStart: string,
      labelEnd: string,
      endDate: string
    ): DateValidation => ({
      validateFunction: (startDate: string): boolean => {
        if (
          startDate &&
          endDate &&
          isValidDate(startDate) &&
          isValidDate(endDate)
        ) {
          return (
            differenceInDays(
              parse(endDate, DATE_FORMAT),
              parse(startDate, DATE_FORMAT)
            ) <= 0
          );
        }
        return true;
      },
      message: `La fecha ${labelStart} debe ser menor a ${labelEnd}`,
    }),
    byEndDateGreaterThanStartDate: (
      labelStart: string,
      labelEnd: string,
      startDate: string
    ): DateValidation => ({
      validateFunction: (endDate: string): boolean => {
        if (
          startDate &&
          endDate &&
          isValidDate(startDate) &&
          isValidDate(endDate)
        ) {
          return (
            differenceInDays(
              parse(startDate, DATE_FORMAT),
              parse(endDate, DATE_FORMAT)
            ) >= 0
          );
        }
        return true;
      },
      message: `La fecha ${labelEnd} debe ser mayor a ${labelStart}`,
    }),
  };
};

export default useDateValidations;
