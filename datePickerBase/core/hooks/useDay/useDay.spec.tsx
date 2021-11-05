import { renderHook, act } from '@testing-library/react-hooks';

import useDay from './index';

const date = new Date(2019, 2, 1, 0, 0, 0);

test('should execute onClick callback', () => {
  const onDateSelect = jest.fn();
  const { result } = renderHook(() =>
    useDay({
      date,
      isDateSelected: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      isStartDate: jest.fn(),
      isEndDate: jest.fn(),
      isDateFocused: jest.fn(),
      onDateSelect,
      onDateHover: jest.fn(),
    })
  );

  act(() => {
    result.current.onClick();
  });

  expect(onDateSelect).toBeCalled();
});

test('should not execute onClick callback, because day is disabled', () => {
  const onDateSelect = jest.fn();
  const { result } = renderHook(() =>
    useDay({
      date,
      onDateSelect,
      isDateSelected: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: () => true,
      onDateHover: jest.fn(),
      isStartDate: jest.fn(),
      isEndDate: jest.fn(),
      isDateFocused: jest.fn(),
    })
  );

  act(() => {
    result.current.onClick();
  });

  expect(result.current.disabledDate).toBe(true);
  expect(onDateSelect).not.toBeCalled();
});

test('should be active', () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      onDateSelect: jest.fn(),
      isDateSelected: () => true,
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateHover: jest.fn(),
      isStartDate: jest.fn(),
      isEndDate: jest.fn(),
      isDateFocused: jest.fn(),
    })
  );

  expect(result.current.isSelected).toBe(true);
});

test('should be active first or last day', () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      onDateSelect: jest.fn(),
      isDateSelected: jest.fn(),
      isFirstOrLastSelectedDate: () => true,
      isDateHovered: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateHover: jest.fn(),
      isStartDate: jest.fn(),
      isEndDate: jest.fn(),
      isDateFocused: jest.fn(),
    })
  );

  expect(result.current.isSelectedStartOrEnd).toBe(true);
});

test('should be within range', () => {
  const { result } = renderHook(() =>
    useDay({
      date,
      onDateSelect: jest.fn(),
      isDateSelected: jest.fn(),
      isFirstOrLastSelectedDate: jest.fn(),
      isDateHovered: () => true,
      isStartDate: jest.fn(),
      isEndDate: jest.fn(),
      isDateFocused: jest.fn(),
      isDateBlocked: jest.fn(),
      onDateHover: jest.fn(),
    })
  );

  expect(result.current.isWithinHoverRange).toBe(true);
});
