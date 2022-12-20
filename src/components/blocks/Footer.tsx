// import DropDown from "components/blocks/DropDown";
// import React, { useState } from "react";
import React from 'react';
import styled from 'styled-components';

import Menus from 'components/blocks/Menus';


const Footer = () => {
  return (
    <StyledFooter>
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
`;