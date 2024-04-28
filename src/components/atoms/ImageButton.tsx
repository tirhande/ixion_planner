import React from 'react';
import styled from 'styled-components';
import { IStyle } from 'types/atoms';

export const ImageButton = ({ onClick, name, title, width, height, children }: React.ButtonHTMLAttributes<HTMLButtonElement> & IStyle) => {
  return (
  <StyledButton onClick={onClick} name={name} width={width} height={height} title={title}>
    {children}
  </StyledButton>
)};

const StyledButton = styled.button<IStyle>`
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: transparent;

  width: ${({ width }) => width ? width : '80px'};
  height: ${({ height }) => height ? height : '80px'};

  > svg.active,
  > svg:hover > path,
  > svg:hover {
    fill: #dccaa4;
  }
`;