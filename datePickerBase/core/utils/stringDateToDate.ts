import { Parse } from '../interfaces';

const stringDateToDate = (
  date: string,
  parseFunction: Parse,
  dateFormat: string
): Date | null => (date ? parseFunction(date, dateFormat) : null);

export default stringDateToDate;
