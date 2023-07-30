import React from 'react';
import styled from 'styled-components';

import Menus from 'components/blocks/Menus';
import Calculator from './Calculator';
import Specialisation from './Specialisation';

const Footer = () => {
  return (
    <StyledFooter>
      <Calculator />
      <Menus />
      <Specialisation />
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  width: 100%;

  position: fixed;
  bottom: 0;
  background: #00000070;
`;
