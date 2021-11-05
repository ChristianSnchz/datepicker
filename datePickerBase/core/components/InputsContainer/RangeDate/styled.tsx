import styled from 'styled-components';

export const RangeDivision = styled.div`
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.border.default};
  width: 0.062rem;
  position: absolute;
  top: 0.75rem;
  left: 50%;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 50%;
`;

export const WrapperRange = styled.div`
  display: flex;

  & div:first-child label {
    &::after {
      border-radius: 0;
      margin-right: 0;
      border-right: none;
    }
  }

  & div:last-child label {
    &::before {
      border-radius: 0;
      margin-left: 0;
      border-left: none;
    }
  }
`;
