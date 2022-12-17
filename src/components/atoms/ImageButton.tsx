import React from 'react';
import styled from 'styled-components';


interface IStyle {
  onClick?: () => void;
  width?: string;
  height?: string;
}

// const Button = styled.button<IStyle>`
//   width: ${({ width }) => width + 'px'};
//   height: 40px;

//   font-size: 14px;
//   font-weight: bold;
//   color: ${({ background }) => (background === '#fff' ? '#000' : '#fff')};
//   background-color: ${({ background }) => background};
//   border: ${({ border }) => (border === 'none' ? border : '1px solid ' + border)};
//   border-radius: 10px;

//   cursor: pointer;
// `;

const StyledButton = styled.button<IStyle>`
  /* border: 4px solid #c7c4bd; */
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  /* background: #000; */

  width: ${({ width }) => width ? width : '119'};
  height: ${({ height }) => height ? height : '120px'};
  
  > svg:hover > path,
  > svg:hover {
    fill: #dccaa4;
  }
`;

export const ImageButton = ({ onClick, width, height, children }: React.ButtonHTMLAttributes<HTMLButtonElement> & IStyle) => {

  return (
    <StyledButton onClick={onClick} width={width} height={height}>
      {children}
    </StyledButton>
)};
