import { useContext, useEffect, useState, ChangeEvent } from 'react';
import ContextDatePicker from '../context/index';
import { DATE_FORMAT, DateValue, UNDEFINED_DATE } from '../interfaces';
import useDateValidations, { DateValidation } from './useDateValidations';
import { stringDateToDate } from '../utils';

interface InputDateProps {
  date: Date;
  labelRef?: string;
}

interface inputDateState {
  value: string;
  errorMessage: string;
  focused: boolean;
  validations: DateValidation[];
}

interface InputDateResult {
  data: inputDateState;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    externalValidations?: DateValidation[]
  ) => Date;
  onFocus: () => void;
  onBlur: () => void;
  runValidations: (externalValidations: DateValidation[]) => void;
}

const useInputDate = ({ date, labelRef }: InputDateProps): InputDateResult => {
  const dateValidations = useDateValidations();
  const { format, parse } = useContext(ContextDatePicker);
  const [data, setData] = useState<inputDateState>({
    value: '',
    errorMessage: null,
    focused: false,
    validations: [
      dateValidations.byValidDate(labelRef),
      dateValidations.byBlockedDate(labelRef),
    ],
  });

  const validateValue = (
    value: string,
    externalValidations: DateValidation[]
  ): boolean => {
    const validations: DateValidation[] = [
      ...data.validations,
      ...externalValidations,
    ];
    const error: DateValidation = validations.find(
      (validation) => !validation.validateFunction(value)
    );
    const errorMessage: string = error && error.message;
    setData((prev) => ({ ...prev, errorMessage }));
    return !errorMessage;
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    externalValidations: DateValidation[] = []
  ): DateValue => {
    const newValue = event.target.value;
    setData((prev) => ({ ...prev, value: newValue }));
    return validateValue(newValue, externalValidations)
      ? stringDateToDate(newValue, parse, DATE_FORMAT)
      : UNDEFINED_DATE;
  };

  const onFocus = (): void => {
    setData((prev) => ({ ...prev, focused: true }));
  };

  const onBlur = (): void => {
    setData((prev) => ({ ...prev, focused: false }));
  };

  const runValidations = (externalValidations: DateValidation[]): void => {
    validateValue(data.value, externalValidations);
  };

  useEffect(() => {
    if (date !== UNDEFINED_DATE) {
      setData((prev) => ({
        ...prev,
        value: date && format(date, DATE_FORMAT),
        errorMessage: null,
      }));
    }
  }, [date]);

  return { data, onChange, onFocus, onBlur, runValidations };
};

export default useInputDate;
