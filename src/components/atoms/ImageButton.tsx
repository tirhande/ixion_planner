import React from 'react';
import styled from 'styled-components';
import { IStyle } from 'types/atoms';

export const ImageButton = ({ onClick, name, width, height, children }: React.ButtonHTMLAttributes<HTMLButtonElement> & IStyle) => (
  <StyledButton onClick={onClick} name={name} width={width} height={height}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button<IStyle>`
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: transparent;

  width: ${({ width }) => width ? width : '119'};
  height: ${({ height }) => height ? height : '120px'};

  > svg.active,
  > svg:hover > path,
  > svg:hover {
    fill: #dccaa4;
  }
`;