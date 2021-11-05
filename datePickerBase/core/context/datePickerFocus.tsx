export const ICON_CALENDAR_FOCUS = 'ICON_CALENDAR_FOCUS';
export const NEXT_MONTH_FOCUS = 'NEXT_MONTH_FOCUS';
export const PREV_MONTH_FOCUS = 'PREV_MONTH_FOCUS';
export const DAYS_FOCUS = 'DAYS_FOCUS';

export const CALENDAR_FOCUS_STATES: string[] = [
  PREV_MONTH_FOCUS,
  NEXT_MONTH_FOCUS,
  DAYS_FOCUS,
];

export const getIndex = (state: string): number =>
  CALENDAR_FOCUS_STATES.findIndex((comp) => comp === state);

export const getCalendarFocusState = (index: number): string => {
  let newIndex = index;
  if (newIndex < 0) {
    newIndex = CALENDAR_FOCUS_STATES.length - 1;
  }
  if (newIndex >= CALENDAR_FOCUS_STATES.length) {
    newIndex = 0;
  }
  return CALENDAR_FOCUS_STATES[newIndex];
};
