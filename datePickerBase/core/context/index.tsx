import { createContext } from 'react';

import { ContextProps } from './interface';

const DatepickerContext = createContext<ContextProps>(null);

export default DatepickerContext;
