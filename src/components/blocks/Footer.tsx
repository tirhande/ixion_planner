import React from 'react';
import styled from 'styled-components';

import Menus from 'components/blocks/Menus';
import Calculator from './Calculator';


const Footer = () => {
  return (
    <StyledFooter>
      <Calculator/>
      <Menus />
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 100%;

  position: fixed;
  bottom: 0;
  background: #00000070;
`;