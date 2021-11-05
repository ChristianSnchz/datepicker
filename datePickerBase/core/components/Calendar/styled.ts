import styled, { css } from 'styled-components';

import viewports from '@flame-ui/utils/viewports';

const CalendarWrapper = styled('div')<{ isOpen: boolean }>`
  position: absolute;
  min-width: 16rem;
  width: max-content;
  text-align: end;
  display: block;
  will-change: transform;
  top: 3.5rem;
  left: 0;
  z-index: -1;
  opacity: 0;
  transition: all 0.35s ease-in-out;

  ${viewports.tablet} {
    display: flex;
    flex-flow: row wrap;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      z-index: 5;
    `}
`;

export default CalendarWrapper;
