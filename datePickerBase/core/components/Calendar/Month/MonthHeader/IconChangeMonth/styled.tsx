import styled from 'styled-components';

export const IconWrapper = styled.button`
  margin: 0rem 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  display: flex;
  height: 100%;
`;

export const Icon = styled.span`
  width: 1.5rem;
  height: 1.5rem;

  &:hover {
    border-radius: 50%;
    background: rgb(159 198 214 / 80%);
    box-shadow: rgb(0 0 0 / 20%) 0rem 0.125rem 0.3125rem;
    transition: all 250ms ease-in-out;
  }
`;
