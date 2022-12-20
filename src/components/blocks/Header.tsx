import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { sectionState } from 'core/states';

const Header = () => {
  const sectionNumber = useRecoilValue(sectionState);

  return (
    <StyledHeader>
      <StyledTitle section={sectionNumber}>
        <div>SECTOR</div>
        <div className="sector-num">{sectionNumber}</div>
      </StyledTitle>
    </StyledHeader>
  )
}

export default Header;

const StyledHeader = styled.header`
  height: 70px;

  display: flex;
  align-items: center;
`;

const StyledTitle = styled.title<{section: number}>`
  height: 80%;
  margin: 0 auto;
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  font-size: 36px;
  background: ${({section}) => {
    if(section === 1) return '#dfc663'
    else if(section === 2) return '#e18089'
    else if(section === 3) return '#988be1'
    else if(section === 4) return '#59ced0'
    else if(section === 5) return '#b7d668'
    else if(section === 6) return '#cdcbc7'
  }};
  border-radius: 10px;

  div {
    padding: 0 0.5em;
    text-align: center;
  }

  .sector-num {
    font-size: 48px;
    padding: 0 0.5em;
  }
`;