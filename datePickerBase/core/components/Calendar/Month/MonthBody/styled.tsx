import { body } from '@flame-ui/themes/base/fonts';
import styled from 'styled-components';

export const MonthBodyWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(7, auto);
  font-family: ${body};
  grid-template-columns: repeat(7, auto);
  height: auto;
  justify-content: center;
  margin: 0.5rem;
`;

export const WeeklyDay = styled.div`
  text-align: center;
  color: ${({ theme: { colors } }) => colors.onSurface.accent};
  user-select: none;
  font-size: 0.875rem;
  font-family: ${body};
  text-transform: uppercase;
  margin: 0.25rem 0rem;
`;
