import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Footer from 'components/blocks/Footer';
import SVGStage from 'components/blocks/SVGStage';
import { constructState } from 'core/states';

const HomePage = () => {
  const [{ degree }, setConstruct] = useRecoilState(constructState);

  const onRotate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key.toLowerCase() === 'r') {
      const deg = degree === 270 ? 0 : degree+90;
      setConstruct(prev => ({ ...prev, degree: deg }));
    }
  }

  return (
    <StyledHome onKeyDown={onRotate} tabIndex={0}>
      <StyledMain>
          <SVGStage />
      </StyledMain>
      <Footer />
    </StyledHome>
  );
};

export default HomePage;

const StyledHome = styled.div`
  outline: none;
  padding-top: 30px;
`;
const StyledMain = styled.main`
  display: flex;

  width: 1120px;
  height: 600px;
  justify-content: center;
  margin: 0 auto;

  div {
    /* background-color: #cae9ff; */
    background-color: #4e4e43;
  }
  use.denied {
    fill: #ff0000 !important;
  }
`;