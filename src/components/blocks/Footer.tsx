// import DropDown from "components/blocks/DropDown";
// import React, { useState } from "react";
import React from 'react';
import styled from 'styled-components';

import Menus from 'components/blocks/Menus';
// import Research from 'assets/Menus/Default/Research.png';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 265px;
  background: #00000070;

  position: fixed;
  bottom: 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Menus />
      {/* <DropDown visible={isOpen} onClick={() => setIsOpen(prev => !prev)}>
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
        </ul>
      </DropDown> */}
    </StyledFooter>
  )
}

export default Footer;