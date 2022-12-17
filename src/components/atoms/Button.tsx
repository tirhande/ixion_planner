import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  width: 180px;
  height: 50px;
  font-size: 1em;
  cursor: pointer;
  box-shadow: none;
  color: #fff;
  background: #0075be;
  margin-top: 4rem;
  margin-left: 0.5rem;
  &:hover {
    background-color: #0075bec4;
    transition: all 0.2s linear;
  }
`;

export const Button = ({
  text,
  type,
  ...props
}: { text: string, type: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <StyledButton type={type} {...props}>
    {text}
  </StyledButton>
);
