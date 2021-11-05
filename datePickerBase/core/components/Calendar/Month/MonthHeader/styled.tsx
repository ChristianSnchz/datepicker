import { title } from '@flame-ui/themes/base/fonts';
import styled from 'styled-components';

export const MonthHeaderWrapper = styled.div`
  display: flex;
  border-radius: 0.25rem 0.25rem 0 0;
  width: 100%;
  height: 3rem;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: ${({ theme: { colors } }) => colors.onSurface.accent};
  vertical-align: middle;
  z-index: 2;
  justify-content: space-between;
  flex-direction: row;
`;

export const MonthLabel = styled.h2`
  font-family: ${title};
  text-align: center;
  color: ${({ theme: { colors } }) => colors.onSurface.inverted};
  margin: 0.625rem auto;
  user-select: none;
  text-transform: capitalize;
  font-size: 1.25rem;
  font-weight: normal;
  height: 1.75rem;
  line-height: 1.75rem;
`;
