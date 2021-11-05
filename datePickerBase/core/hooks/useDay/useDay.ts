import { MouseEvent, useCallback } from 'react';
import colors from '@flame-ui/themes/base/light/colors';
import {
  OnDateSelectProps,
  TruthyStateFromDate,
  VoidStateFromDate,
} from '../../interfaces';

const SELECTED_STYLE = {
  color: colors.surface.default,
  backgroundColor: colors.accent.default,
};

const IN_RANGE_STYLE = {
  color: colors.onSurface.high,
  backgroundColor: colors.state.hover,
};

const FOCUSED_STYLE = {
  color: colors.border.focus,
  backgroundColor: colors.surface.default,
  border: `1px solid ${colors.border.focus}`,
};

const dayStylesProps = {
  DISABLED_DAY: {
    wrapper: {
      backgroundColor: colors.state.disabled,
      borderRadius: '50%',
    },
    button: {
      color: colors.onSurface.low,
    },
  },
  NORMAL_DAY: (isInRange, isSelected, isFocused) => ({
    wrapper: {
      backgroundColor:
        (isInRange && IN_RANGE_STYLE.backgroundColor) ||
        (isSelected && SELECTED_STYLE.backgroundColor) ||
        colors.surface.default,
    },
    button: {
      color:
        (isInRange && IN_RANGE_STYLE.color) ||
        (isFocused && FOCUSED_STYLE.color) ||
        (isSelected && SELECTED_STYLE.color) ||
        colors.onSurface.high,
      backgroundColor:
        (isFocused && FOCUSED_STYLE.backgroundColor) || 'transparent',
      border: (isFocused && FOCUSED_STYLE.border) || 'none',
    },
  }),
  FIRST_OR_LAST_DAY: (
    isInRange,
    isSelected,
    isFirstSelected,
    isLastSelected,
    isFocused
  ) => ({
    wrapper: {
      backgroundColor:
        (isInRange && IN_RANGE_STYLE.backgroundColor) ||
        (isSelected && SELECTED_STYLE.backgroundColor) ||
        colors.accent.default,
      borderRadius:
        (isFirstSelected && isLastSelected && '50%') ||
        (isFirstSelected && '50% 0 0 50%') ||
        (isLastSelected && '0% 50% 50% 0%'),
    },
    button: {
      color:
        (isInRange && IN_RANGE_STYLE.color) ||
        (isFocused && FOCUSED_STYLE.color) ||
        (isSelected && SELECTED_STYLE.color) ||
        colors.surface.default,
      border: `1px solid ${colors.border.focus}`,
      backgroundColor:
        (isFocused && FOCUSED_STYLE.backgroundColor) || 'transparent',
    },
  }),
};

interface UseDayProps {
  date: Date;
  isDateSelected: TruthyStateFromDate;
  isDateHovered: TruthyStateFromDate;
  isDateBlocked: TruthyStateFromDate;
  isFirstOrLastSelectedDate: TruthyStateFromDate;
  isStartDate: TruthyStateFromDate;
  isEndDate: TruthyStateFromDate;
  isDateFocused: TruthyStateFromDate;
  onDateHover: VoidStateFromDate;
  onDateSelect: OnDateSelectProps;
}

function useDay({
  date,
  isDateSelected,
  isFirstOrLastSelectedDate,
  isDateHovered,
  isDateBlocked,
  isStartDate,
  isEndDate,
  isDateFocused,
  onDateSelect,
  onDateHover,
}: UseDayProps) {
  const onClick = useCallback(
    (event: MouseEvent<HTMLElement> = null) => onDateSelect(date, event),
    [date, onDateSelect]
  );
  const onMouseEnter = useCallback(() => onDateHover(date), [
    date,
    onDateHover,
  ]);
  const disabled =
    isDateBlocked(date) && !isDateHovered(date) && !isDateSelected(date);
  const isSelected = isDateSelected(date);
  const isStart = isStartDate(date);
  const isEnd = isEndDate(date);
  const isWithinHoverRange = isDateHovered(date);
  const isFocused = isDateFocused(date);

  return {
    isSelected,
    isSelectedStartOrEnd: isFirstOrLastSelectedDate(date),
    isWithinHoverRange,
    disabledDate: disabled,
    isFocused,
    onClick: disabled ? () => undefined : onClick,
    onMouseEnter,
    styles:
      (disabled && dayStylesProps.DISABLED_DAY) ||
      ((isStart || isEnd) &&
        dayStylesProps.FIRST_OR_LAST_DAY(
          isWithinHoverRange,
          isSelected,
          isStart,
          isEnd,
          isFocused
        )) ||
      dayStylesProps.NORMAL_DAY(isWithinHoverRange, isSelected, isFocused),
  };
}

export default useDay;
