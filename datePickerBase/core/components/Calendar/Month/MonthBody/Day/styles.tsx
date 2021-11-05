import styled, { css } from 'styled-components';
import { body } from '@flame-ui/themes/base/fonts';

interface divStylesProps {
  backgroundColor: string;
  borderRadius?: string;
}

const WrapperDay = styled.div<{
  isInRange: boolean;
  isSelectedStartOrEnd: boolean;
  styles: divStylesProps;
}>`
  background-color: ${({ styles: { backgroundColor } }) => backgroundColor};
  border-radius: ${({ styles: { borderRadius } }) => borderRadius || '0%'};
  margin: 2px 0;
  &:hover {
    border-radius: ${({ isInRange, isSelectedStartOrEnd }) =>
      isInRange && !isSelectedStartOrEnd && '0 50% 50% 0'};
  }
`;

interface buttonStylesProps {
  backgroundColor?: string;
  color: string;
  border?: string;
}

const ButtonDay = styled.button<{
  isDisabled: boolean;
  isMarked: boolean;
  styles: buttonStylesProps;
  isSelected: boolean;
}>`
  display: flex;
  border: ${({ styles: { border } }) => border || 'none'};
  border-radius: 50%;
  width: 2.3rem;
  height: 2.3rem;
  outline: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'no-drop' : 'pointer')};
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${({ styles: { color } }) => color};
  transition: all 0.15s ease-in-out;
  background-color: ${({ styles: { backgroundColor } }) =>
    backgroundColor || 'transparent'};
  font-family: ${body};
  font-size: 0.875rem;

  ${({ isDisabled, theme: { colors } }) =>
    !isDisabled &&
    css`
      &:hover {
        border: 1px solid ${colors.border.focus};
        color: ${colors.onSurface.accent};
        background-color: ${colors.surface.default};
      }
    `}

  ${({ isMarked, isSelected, styles: { backgroundColor } }) =>
    isMarked &&
    css`
      &:after {
        content: '.';
        color: ${({ theme: { colors } }) =>
          isSelected && backgroundColor === 'transparent'
            ? 'white'
            : colors.primary.default};
        font-size: 2rem;
        position: absolute;
      }

      &:hover {
        &:after {
          color: ${({ theme: { colors } }) => colors.primary.default};
        }
      }
    `}
`;

export { WrapperDay, ButtonDay };
