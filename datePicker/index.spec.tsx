import React, { useState } from 'react';
import renderWithTheme from '@flame-ui/utils/render-test-utils';
import { fireEvent, screen } from '@flame-ui/utils/src/render-test-utils';
import userEvent from '@testing-library/user-event';
/* eslint-disable import/no-duplicates */
import { getDay, format } from 'date-fns';
import locale from 'date-fns/locale/es';
/* eslint-disable import/no-duplicates */
import { addDays, startOfMonth, isSameDay } from '@flame-ui/utils/date-utils';
import DatePicker from '.';
import { RangeDate } from '../datePickerBase/core/interfaces';

const defaultValue = new Date(2021, 6, 29);
const dateFormat = 'dd/MM/yyyy';

const SingleDate = {
  label: 'Date',
  helperText: 'Enter Date',
  value: defaultValue,
  error: '',
  onChange: (param: unknown) => {
    return true;
  },
};

const DateInRange = {
  label: 'From',
  helperText: 'Enter Date',
  range: {
    label: 'To',
    defaultValue,
  },
  value: defaultValue,
  error: '',
};

const Moths = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

test('render datePicker Open calendar and close ', () => {
  renderWithTheme(
    <div>
      <div>
        <h1 data-testid="header-dummy">Clickeame</h1>
      </div>
      <DatePicker {...SingleDate} />
    </div>
  );

  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const calendar = screen.getByRole('dialog');
  const isOpen = () => expect(calendar).toBeVisible();
  const isClose = () => expect(calendar).not.toBeVisible();
  isOpen();
  const dummyOutSide = screen.queryByTestId('header-dummy');
  userEvent.click(dummyOutSide);
  isClose();
  userEvent.click(iconbtn);
  isOpen();
  userEvent.click(iconbtn);
  isClose();
});

test('Go to prev Moth button ', () => {
  const current = new Date();
  const singleDate = { ...SingleDate, value: current };

  renderWithTheme(<DatePicker id="datepicker" {...singleDate} />);

  const name = `Elegir fecha, seleccionado ${current.getDate()} de ${Moths[
    current.getMonth()
  ].toLowerCase()} de 2021`;

  const iconbtn = screen.getByRole('button', {
    name,
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const moth = screen.getByRole('heading');
  expect(moth.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth()].toLowerCase()
  );

  userEvent.tab(); // Go to previous month select
  userEvent.keyboard('{enter}'); // Change to previous month
  const mothPrev = screen.getByRole('heading');
  expect(mothPrev.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth() - 1].toLowerCase()
  );
});

test('Go to next Moth button ', () => {
  const current = new Date();
  const singleDate = { ...SingleDate, value: current };
  renderWithTheme(<DatePicker {...singleDate} />);

  const name = `Elegir fecha, seleccionado ${current.getDate()} de ${Moths[
    current.getMonth()
  ].toLowerCase()} de 2021`;

  const iconbtn = screen.getByRole('button', {
    name,
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const moth = screen.getByRole('heading');
  expect(moth.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth()].toLowerCase()
  );
  userEvent.tab(); // Go to previous month select
  userEvent.tab(); // Go to next month select
  userEvent.keyboard('{enter}'); // Change to previous month
  const mothPrev = screen.getByRole('heading');
  expect(mothPrev.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth() + 1].toLowerCase()
  );
});

test('It should write a date in the input and it should have it in the value Single', async () => {
  renderWithTheme(
    <div>
      <div>
        <h1 data-testid="header-dummy">Clickeame</h1>
      </div>
      <DatePicker {...SingleDate} />
    </div>
  );

  const currentDate = new Date();
  const moth =
    (currentDate.getMonth() + 1).toString().length === 1
      ? `0${currentDate.getMonth() + 1}`
      : `${currentDate.getMonth() + 1}`;
  const valueToType = `01${moth}${currentDate.getFullYear()}`;
  const valueExpected = `01/${moth}/${currentDate.getFullYear()}`;

  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  userEvent.type(input, '{selectall}');
  userEvent.type(input, '{backspace}');
  userEvent.type(input, valueToType);
  const currentValue = input.value;
  expect(currentValue).toBe(valueExpected);
});

test('Select the first date of the moth from calendar', () => {
  const current = new Date();
  const single = {
    label: 'Date',
    helperText: 'Enter Date',
    value: current,
    error: '',
  };
  renderWithTheme(<DatePicker {...single} />);
  const dateinput = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;

  const name = `Elegir fecha, seleccionado ${current.getDate()} de ${Moths[
    current.getMonth()
  ].toLowerCase()} de 2021`;

  const iconbtn = screen.getByRole('button', {
    name,
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const btnDate = screen.getByRole('button', {
    name: `seleccionar 01 de ${Moths[current.getMonth()].toLowerCase()} 2021`,
  });
  userEvent.click(btnDate);
  const moth =
    (current.getMonth() + 1).toString().length === 1
      ? `0${current.getMonth() + 1}`
      : current.getMonth() + 1;
  const valueExpected = `01/${moth}/2021`;
  const currentValue = dateinput.value;
  expect(currentValue).toBe(valueExpected);
});
test('Select a range from de first to half of the moth', () => {
  const rangeDate = {
    label: 'From',
    helperText: 'Enter Date',
    range: {
      label: 'To',
      value: new Date(2021, 7, 20),
    },
    value: new Date(2021, 6, 20),
    error: '',
    isDateMarked: (date: Date) => getDay(date) === 4, // Marcar los dias jueves
  };

  renderWithTheme(<DatePicker {...rangeDate} />);
  const frominput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;
  const toinput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;
  const iconbtn = screen.getByRole('button', {
    name:
      'Elegir fecha, seleccionado desde 20 de julio de 2021 hasta 20 de agosto de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const days = screen.getAllByRole('gridcell');
  const from = screen.getByRole('button', {
    name: `seleccionar 01 de agosto 2021`,
  });
  const to = screen.getByRole('button', {
    name: `seleccionar 07 de agosto 2021`,
  });
  userEvent.click(from);
  userEvent.hover(days[1]);
  userEvent.unhover(days[1]);
  userEvent.hover(days[2]);
  userEvent.unhover(days[2]);
  userEvent.hover(days[3]);
  userEvent.unhover(days[3]);
  userEvent.hover(days[4]);
  userEvent.unhover(days[4]);
  userEvent.hover(days[5]);
  userEvent.unhover(days[5]);
  userEvent.click(to);
  const valueExpectedTo = `01/08/2021`;
  const valueExpectedFrom = `07/08/2021`;
  const currentTo = frominput.value;
  const currentFrom = toinput.value;
  expect(currentTo).toBe(valueExpectedTo);
  expect(currentFrom).toBe(valueExpectedFrom);
});
test('Open calendar and set focus to current date', () => {
  renderWithTheme(<DatePicker />);
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const currentDate: Date = new Date();
  const day = screen.getByRole('button', {
    name: `seleccionar ${format(currentDate, "dd 'de' MMMM yyyy", { locale })}`,
  });
  expect(day).toHaveStyle('color: #257fa4');
  const otherDate: Date =
    currentDate.getDate() === 1
      ? addDays(currentDate, 1)
      : startOfMonth(currentDate);
  const otherDay = screen.getByRole('button', {
    name: `seleccionar ${format(otherDate, "dd 'de' MMMM yyyy", { locale })}`,
  });
  expect(otherDay).toHaveStyle('color: #1e1f21');
});
test('Select a range from and change range', () => {
  const rangeDate = {
    label: 'From',
    helperText: 'Enter Date',
    range: {
      label: 'To',
      defaultValue: new Date(2021, 7, 20),
    },
    value: new Date(2021, 6, 20),
    error: '',
  };

  renderWithTheme(<DatePicker {...rangeDate} />);
  const frominput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;
  const toinput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;
  const iconbtn = screen.getByRole('button', {
    name:
      'Elegir fecha, seleccionado desde 20 de julio de 2021 hasta 20 de agosto de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const from = screen.getByRole('button', {
    name: `seleccionar 26 de agosto 2021`,
  });
  const to = screen.getByRole('button', {
    name: `seleccionar 29 de agosto 2021`,
  });
  userEvent.click(from);
  userEvent.click(to);
  expect(frominput).toHaveValue('26/08/2021');
  expect(toinput).toHaveValue('29/08/2021');

  const fromTwo = screen.getByRole('button', {
    name: `seleccionar 05 de agosto 2021`,
  });
  const toTwo = screen.getByRole('button', {
    name: `seleccionar 14 de agosto 2021`,
  });

  userEvent.click(fromTwo);
  userEvent.click(toTwo);
  expect(frominput).toHaveValue('05/08/2021');
  expect(toinput).toHaveValue('14/08/2021');

  const fromThree = screen.getByRole('button', {
    name: `seleccionar 21 de agosto 2021`,
  });

  const toThree = screen.getByRole('button', {
    name: `seleccionar 29 de agosto 2021`,
  });
  userEvent.click(fromThree);
  userEvent.click(toThree);
  expect(frominput).toHaveValue('21/08/2021');
  expect(toinput).toHaveValue('29/08/2021');
});

test('Select a range when only start date is set', () => {
  const rangeDate = {
    label: 'From',
    helperText: 'Enter Date',
    defaultValue: new Date(2021, 6, 20),
    range: {
      label: 'To',
    },
  };

  renderWithTheme(<DatePicker {...rangeDate} />);
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado desde 20 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const to = screen.getByRole('button', {
    name: `seleccionar 29 de agosto 2021`,
  });
  userEvent.click(to);
  const frominput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;
  const toinput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;
  expect(frominput).toHaveValue('20/07/2021');
  expect(toinput).toHaveValue('29/08/2021');
});

test('should match snapshot calendar', () => {
  renderWithTheme(<DatePicker {...SingleDate} />);
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const calendar = screen.getByRole('dialog');
  expect(calendar).toMatchSnapshot();
});

test('should show two calendars when is range', () => {
  renderWithTheme(<DatePicker {...DateInRange} />);
  const iconbtn = screen.getByRole('button', {
    name:
      'Elegir fecha, seleccionado desde 29 de julio de 2021 hasta 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const calendar = screen.getAllByRole('dialog');
  expect(calendar.length).toBe(2);
});

test('It should write a date in the input and it should have it in the value Range ', () => {
  renderWithTheme(<DatePicker {...DateInRange} />);
  const inputs = screen.getAllByRole('textbox');
  const inputFrom = inputs[0] as HTMLInputElement;
  fireEvent.change(inputFrom, { target: { value: '' } });
  userEvent.type(inputFrom, '17/01/2020');
  expect(inputFrom).toHaveValue('17/01/2020');
  const inputTo = inputs[1] as HTMLInputElement;
  fireEvent.change(inputTo, { target: { value: '' } });
  userEvent.type(inputTo, '20/01/2020');
  expect(inputTo).toHaveValue('20/01/2020');
});

test('should disabled Calendar', () => {
  const { container } = renderWithTheme(
    <DatePicker disabled {...SingleDate} />
  );
  const box = container.firstChild.firstChild;
  expect(box).toHaveStyle('pointer-events: none');
  expect(box).toHaveAttribute('disabled');
});

test('Error calendar single', () => {
  const Single = {
    label: 'Date',
    helperText: null,
    value: defaultValue,
    error: '',
  };

  const { getByRole } = renderWithTheme(
    <div>
      <div>
        <h1 data-testid="header-dummy">Clickeame</h1>
      </div>
      <DatePicker {...Single} />
    </div>
  );
  const input = getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  userEvent.type(input, '{backspace}');
  userEvent.type(input, '{backspace}');
  userEvent.type(input, '{backspace}');
  userEvent.type(input, '{backspace}');
  userEvent.type(input, '999');
  const alert = getByRole('alert');
  expect(alert).toHaveTextContent('La fecha es inválida');
});

test('Error calendar range From', () => {
  const { getByRole, getAllByRole } = renderWithTheme(
    <DatePicker {...DateInRange} />
  );
  const input = getAllByRole('textbox');
  userEvent.type(input[0], '{backspace}');
  userEvent.type(input[0], '{backspace}');
  userEvent.type(input[0], '{backspace}');
  userEvent.type(input[0], '{backspace}');
  userEvent.type(input[0], '999');
  userEvent.tab();
  const alertFrom = getByRole('alert', {
    name: 'La fecha From es inválida',
  });
  expect(alertFrom).toBeInTheDocument();
});

test('Error calendar range To', () => {
  const { getByRole, getAllByRole } = renderWithTheme(
    <DatePicker {...DateInRange} />
  );
  const input = getAllByRole('textbox');
  userEvent.type(input[1], '{backspace}');
  userEvent.type(input[1], '{backspace}');
  userEvent.type(input[1], '{backspace}');
  userEvent.type(input[1], '{backspace}');
  userEvent.type(input[1], '999');
  userEvent.tab();
  const alertFrom = getByRole('alert', { name: 'La fecha To es inválida' });
  expect(alertFrom).toBeInTheDocument();
});

test('Open Calendar with icon ', () => {
  renderWithTheme(<DatePicker {...SingleDate} />);
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const calendar = screen.getAllByRole('dialog');
  const isOpen = () => expect(calendar[0]).toBeVisible();
  isOpen();
});

test('Single Datepicker Test onblur with valid date ', () => {
  renderWithTheme(
    <div>
      <div>
        <h1 data-testid="header-dummy">Clickeame</h1>
      </div>
      <DatePicker {...SingleDate} />
    </div>
  );

  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  userEvent.click(input);
  userEvent.type(input, '{selectall}');
  userEvent.type(input, '{backspace}');
  userEvent.type(input, '28062021');
  const dummyOutSide = screen.queryByTestId('header-dummy');
  userEvent.click(dummyOutSide);
  expect(input).toHaveValue('28/06/2021');
});

test('Blocked Days ', () => {
  const Single = {
    label: 'Date',
    helperText: 'Enter Date',
    value: new Date(2021, 7, 20),
    error: '',
    isDateBlocked: (date: Date) => getDay(date) === 0 || getDay(date) === 6,
  };

  renderWithTheme(<DatePicker {...Single} />);
  const iconButton = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 20 de agosto de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconButton);
  const btnDate = screen.getByRole('button', {
    name: `seleccionar 07 de agosto 2021`,
  });
  userEvent.click(btnDate);
  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  expect(input).not.toHaveValue('07/08/2021');
});

test('Tab keyboard to go previus moth', async () => {
  const current = new Date();
  const singleDate = { ...SingleDate, value: current };

  renderWithTheme(<DatePicker {...singleDate} />);

  const name = `Elegir fecha, seleccionado ${current.getDate()} de ${Moths[
    current.getMonth()
  ].toLowerCase()} de 2021`;

  const iconbtn = screen.getByRole('button', {
    name,
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const moth = screen.getByRole('heading');
  expect(moth.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth()].toLowerCase()
  );
  userEvent.tab();
  userEvent.keyboard('{enter}');
  const mothPrev = screen.getByRole('heading');
  expect(mothPrev.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth() - 1].toLowerCase()
  );
  userEvent.tab();
  userEvent.keyboard('{enter}');
  const mothAfter = screen.getByRole('heading');
  expect(mothAfter.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[current.getMonth()].toLowerCase()
  );
});

test('Close calendar with esc Key', () => {
  renderWithTheme(<DatePicker {...SingleDate} />);
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const calendar = screen.getByRole('dialog');
  const isOpen = () => expect(calendar).toBeVisible();
  const isClose = () => expect(calendar).not.toBeVisible();
  isOpen();
  userEvent.keyboard('{esc}');
  isClose();
});

test('It should write a date in the input and it should have it in the value Range ', () => {
  renderWithTheme(<DatePicker {...DateInRange} />);
  const fromInput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;

  userEvent.type(fromInput, '{selectall}');
  userEvent.type(fromInput, '{backspace}');
  userEvent.type(fromInput, '28062021');
  expect(fromInput).toHaveValue('28/06/2021');

  userEvent.tab();
  const toInput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;
  userEvent.type(toInput, '{selectall}');
  userEvent.type(toInput, '{backspace}');
  userEvent.type(toInput, '29062021');
  userEvent.tab();
  expect(toInput).toHaveValue('29/06/2021');
});

test('Select a range and modify with arrows of keyboard', () => {
  const Range = {
    label: 'From',
    helperText: 'Enter Date',
    range: {
      label: 'To',
      defaultValue: new Date(2021, 6, 20),
    },
    value: new Date(2021, 6, 20),
    error: '',
  };
  renderWithTheme(<DatePicker {...Range} />);
  const frominput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;
  const toinput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;
  const iconbtn = screen.getByRole('button', {
    name:
      'Elegir fecha, seleccionado desde 20 de julio de 2021 hasta 20 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  const days = screen.getAllByRole('gridcell');
  const from = screen.getByRole('button', {
    name: `seleccionar 01 de julio 2021`,
  });
  const to = screen.getByRole('button', {
    name: `seleccionar 07 de julio 2021`,
  });
  userEvent.click(from);
  userEvent.hover(days[1]);
  userEvent.unhover(days[1]);
  userEvent.hover(days[2]);
  userEvent.unhover(days[2]);
  userEvent.hover(days[3]);
  userEvent.unhover(days[3]);
  userEvent.hover(days[4]);
  userEvent.unhover(days[4]);
  userEvent.hover(days[5]);
  userEvent.unhover(days[5]);
  userEvent.click(to);

  const valueExpectedFrom = `01/07/2021`;
  const valueExpectedTo = `07/07/2021`;
  const currentFrom = frominput.value;
  const currentTo = toinput.value;
  expect(currentTo).toBe(valueExpectedTo);
  expect(currentFrom).toBe(valueExpectedFrom);

  userEvent.keyboard('{arrowleft}{arrowleft}');
  userEvent.keyboard('{enter}');
  userEvent.keyboard('{arrowright}{arrowright}{arrowright}{arrowright}');
  userEvent.keyboard('{enter}');
  expect(frominput).toHaveValue(`05/07/2021`);
  expect(toinput).toHaveValue(`09/07/2021`);
  userEvent.keyboard('{enter}');
  userEvent.keyboard('{arrowdown}{arrowdown}');
  userEvent.keyboard('{enter}');
  expect(frominput).toHaveValue(`09/07/2021`);
  expect(toinput).toHaveValue(`23/07/2021`);
  userEvent.keyboard('{enter}');
  userEvent.keyboard('{arrowup}{arrowup}{arrowup}');
  userEvent.keyboard('{enter}');
  expect(frominput).toHaveValue(`02/07/2021`);
  expect(toinput).toHaveValue(`23/07/2021`);
});

test('test direction keyboard with blocked dates to max date', () => {
  renderWithTheme(
    <DatePicker
      {...SingleDate}
      isDateBlocked={(date: Date) => date > new Date(2021, 6, 29)}
    />
  );
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  expect(input).toHaveValue(`29/07/2021`);
  userEvent.click(iconbtn);
  userEvent.keyboard('{arrowright}');
  userEvent.keyboard('{enter}');
  expect(input).toHaveValue(`29/07/2021`);
});

test('test direction keyboard with blocked dates to min date', () => {
  renderWithTheme(
    <DatePicker
      {...SingleDate}
      isDateBlocked={(date: Date) => date < new Date(2021, 6, 29)}
    />
  );
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  expect(input).toHaveValue(`29/07/2021`);
  userEvent.click(iconbtn);
  userEvent.keyboard('{arrowleft}');
  userEvent.keyboard('{enter}');
  expect(input).toHaveValue(`29/07/2021`);
});

test('test home and end keyboard', () => {
  renderWithTheme(<DatePicker {...SingleDate} />);
  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);

  userEvent.keyboard('{home}{enter}');
  expect(input).toHaveValue(`26/07/2021`);
  userEvent.keyboard('{enter}{end}{enter}');
  expect(input).toHaveValue(`01/08/2021`);
  userEvent.keyboard('{enter}{arrowdown}{end}{enter}');
  expect(input).toHaveValue(`08/08/2021`);
  userEvent.keyboard('{enter}{home}{enter}');
  expect(input).toHaveValue(`02/08/2021`);
});

test('test home and end keyboard with blocked dates', () => {
  renderWithTheme(
    <DatePicker
      {...SingleDate}
      isDateBlocked={(date) =>
        isSameDay(date, new Date(2021, 6, 26)) ||
        isSameDay(date, new Date(2021, 7, 1))
      }
    />
  );
  const input = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);

  userEvent.keyboard('{home}{enter}');
  expect(input).toHaveValue(`29/07/2021`);
  userEvent.keyboard('{enter}{end}{enter}');
  expect(input).toHaveValue(`29/07/2021`);
});

test('test keyboard tab and shift tab', () => {
  renderWithTheme(<DatePicker {...SingleDate} />);

  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);
  userEvent.tab(); // Go to previous month select
  userEvent.keyboard('{enter}'); // Change to previous month
  const month = screen.getByRole('heading');
  expect(month.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[defaultValue.getMonth() - 1].toLowerCase()
  );
  userEvent.tab(); // Go to next month select
  userEvent.tab(); // Go to day select
  userEvent.tab(); // Go to previous month select
  userEvent.tab(); // Go to next month select
  userEvent.keyboard('{enter}'); // Change to next month
  const month2 = screen.getByRole('heading');
  expect(month2.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[defaultValue.getMonth()].toLowerCase()
  );
  userEvent.tab({ shift: true }); // Go to previous month select
  userEvent.tab({ shift: true }); // Go to day select
  userEvent.tab({ shift: true }); // Go to next month select
  userEvent.tab({ shift: true }); // Go to previous month select
  userEvent.keyboard('{enter}'); // Change to previous month
  const month3 = screen.getByRole('heading');
  expect(month3.textContent.split(' ')[0].toLowerCase()).toBe(
    Moths[defaultValue.getMonth() - 1].toLowerCase()
  );
});

test('test pageup and pagedown to go to previous and next moth', () => {
  renderWithTheme(<DatePicker {...SingleDate} />);

  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);

  const moth = screen.getByRole('heading');
  expect(moth.textContent.split(' ')[0].toLowerCase()).toBe('julio');
  userEvent.keyboard('{PageUp}');
  const mothPrev = screen.getByRole('heading');
  expect(mothPrev.textContent.split(' ')[0].toLowerCase()).toBe('junio');
  userEvent.keyboard('{PageDown}');
  userEvent.keyboard('{PageDown}');
  const mothAfter = screen.getByRole('heading');
  expect(mothAfter.textContent.split(' ')[0].toLowerCase()).toBe('agosto');
});

test('test pageup and pagedown with dates blocked', () => {
  renderWithTheme(
    <DatePicker
      {...SingleDate}
      isDateBlocked={(date) =>
        isSameDay(date, new Date(2021, 7, 29)) ||
        isSameDay(date, new Date(2021, 5, 29))
      }
    />
  );

  const iconbtn = screen.getByRole('button', {
    name: 'Elegir fecha, seleccionado 29 de julio de 2021',
  }) as HTMLInputElement;
  userEvent.click(iconbtn);

  const moth = screen.getByRole('heading');
  expect(moth.textContent.split(' ')[0].toLowerCase()).toBe('julio');
  userEvent.keyboard('{PageUp}');
  const mothPrev = screen.getByRole('heading');
  expect(mothPrev.textContent.split(' ')[0].toLowerCase()).toBe('julio');
  userEvent.keyboard('{PageDown}');
  const mothAfter = screen.getByRole('heading');
  expect(mothAfter.textContent.split(' ')[0].toLowerCase()).toBe('julio');
});

test('Testing Single Date with default values', () => {
  renderWithTheme(<DatePicker defaultValue={new Date(2021, 6, 29)} />);
  const dateinput = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  const currentValue = dateinput.value;
  const expectedValue = '29/07/2021';
  expect(currentValue).toBe(expectedValue);
});

test('Testing Range Date with default values', () => {
  renderWithTheme(
    <DatePicker defaultValue={defaultValue} range={{ defaultValue }} />
  );
  const frominput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;
  const toinput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;
  const currentValueFrom = frominput.value;
  const currentValueTo = frominput.value;
  const expectedValue = '29/07/2021';
  expect(currentValueFrom).toBe(expectedValue);
  expect(currentValueTo).toBe(expectedValue);
});

test('Testing Single Date with controlled value', () => {
  const DatePickerWithExternalValue = () => {
    const [valueDate, setValue] = useState<Date>(new Date(2021, 6, 29));

    return (
      <>
        <DatePicker
          value={valueDate}
          onChange={(newDate: Date) => setValue(newDate)}
          id="date-picker"
        />
        <label htmlFor="firstName" data-testid="show-value">
          {valueDate && format(valueDate, dateFormat, { locale })}
        </label>
        <button
          type="button"
          data-testid="change-value"
          onClick={() => setValue(() => new Date(2021, 6, 1))}
        >
          Change Date
        </button>
      </>
    );
  };

  renderWithTheme(<DatePickerWithExternalValue />);
  const dateinput = screen.getByRole('textbox', {
    name: 'ingresar fecha',
  }) as HTMLInputElement;
  expect(dateinput).toHaveValue('29/07/2021');
  const showDate = screen.getByTestId('show-value');
  expect(showDate).toHaveTextContent('29/07/2021');
  userEvent.type(dateinput, '{selectall}');
  userEvent.type(dateinput, '{backspace}');
  userEvent.type(dateinput, '30/07/2021');
  userEvent.tab();
  expect(dateinput).toHaveValue('30/07/2021');
  expect(showDate).toHaveTextContent('30/07/2021');
  const changeDate = screen.getByTestId('change-value');
  userEvent.click(changeDate);
  expect(dateinput).toHaveValue('01/07/2021');
  expect(showDate).toHaveTextContent('01/07/2021');
});

test('Testing Range Date with controlled value', () => {
  // eslint-disable-next-line no-shadow
  const defaultValue: Date = new Date(2021, 6, 29);
  const DatePickerWithExternalValue = () => {
    const [valueDate, setValue] = useState<RangeDate>({
      start: defaultValue,
      end: defaultValue,
    });

    return (
      <>
        <DatePicker
          value={valueDate.start}
          onChange={(newDate: RangeDate) => setValue(newDate)}
          id="date-picker"
          range={{
            value: valueDate.end,
          }}
        />
        <label htmlFor="firstName" data-testid="show-value">
          {`${
            valueDate.start &&
            format(valueDate.start, dateFormat, {
              locale,
            })
          }, ${valueDate.end && format(valueDate.end, dateFormat, { locale })}`}
        </label>
        <button
          type="button"
          data-testid="change-value"
          onClick={() =>
            setValue({ start: new Date(2021, 6, 1), end: new Date(2021, 6, 4) })
          }
        >
          Change Date
        </button>
      </>
    );
  };

  renderWithTheme(<DatePickerWithExternalValue />);
  const fromInput = screen.getByRole('textbox', {
    name: 'ingresar fecha desde',
  }) as HTMLInputElement;
  const toInput = screen.getByRole('textbox', {
    name: 'ingresar fecha hasta',
  }) as HTMLInputElement;

  expect(fromInput).toHaveValue('29/07/2021');
  expect(toInput).toHaveValue('29/07/2021');
  const showDate = screen.getByTestId('show-value');
  expect(showDate).toHaveTextContent('29/07/2021, 29/07/2021');
  userEvent.type(fromInput, '{selectall}');
  userEvent.type(fromInput, '{backspace}');
  userEvent.type(fromInput, '01/07/2021');
  userEvent.type(toInput, '{selectall}');
  userEvent.type(toInput, '{backspace}');
  userEvent.type(toInput, '30/07/2021');
  userEvent.tab();
  expect(fromInput).toHaveValue('01/07/2021');
  expect(toInput).toHaveValue('30/07/2021');
  expect(showDate).toHaveTextContent('01/07/2021, 30/07/2021');
  const changeDate = screen.getByTestId('change-value');
  userEvent.click(changeDate);
  expect(fromInput).toHaveValue('01/07/2021');
  expect(toInput).toHaveValue('04/07/2021');
  expect(showDate).toHaveTextContent('01/07/2021, 04/07/2021');
});
