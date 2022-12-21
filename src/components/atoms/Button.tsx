import React from 'react';
import styled from 'styled-components';

const Button = ({
  text,
  ...props
}: { text: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <StyledButton {...props}>
    {text}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button`
  width: 120px;
  height: 120px;
  background-color: #fff;
  border: none;
  font-size: 0px;
  position: relative;
  cursor: pointer;

  &:after {
    width: 60px;
    height: 60px;
    content: '';
    display: block;
    position: absolute;
    left: 40%;
    top: 50%;
    z-index: 1;
    border: 1px solid #aaaaaa;
    border-width: 0 8px 8px 0;
    margin-left: -2px;
    padding: 10px;
  }
  &.prev::after {
    left: 60%;
    -webkit-transform: translate(-50%, -50%) rotate(135deg);
    transform: translate(-50%, -50%) rotate(135deg);
  }
  &.next::after {
    -webkit-transform: translate(-50%, -50%) rotate(-45deg);
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;