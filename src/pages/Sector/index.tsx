import React from 'react';
// import {useParams} from 'react-router-dom';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Footer from 'components/blocks/Footer';
import { constructState } from 'core/states';
import { CANVAS_SIZE } from 'utils/GridEnum';
import SVGStage from './SVGStage';
import SVGContainer from './SVGContainer';
import { IDimension } from 'types/Ixion';


const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;

const SectorPage = () => {
  // const params = useParams();
  // console.log(params);

  const [{ degree }, setConstruct] = useRecoilState(constructState);

  const onRotate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key.toLowerCase() === 'r') {
      const deg = degree === 270 ? 0 : degree + 90;
      setConstruct(prev => ({ ...prev, degree: deg }));
    }
  }

  return (
    <StyledHome onKeyDown={onRotate} tabIndex={0}>
      <StyledMain width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <SVGStage />
        <SVGContainer />
      </StyledMain>
      <Footer />
    </StyledHome>
  );
};

export default SectorPage;

const StyledHome = styled.div`
  outline: none;
`;
const StyledMain = styled.main<IDimension>`
  display: flex;

  width: ${({ width }) => (width ? `${width}px` : '1400px')};
  height: ${({ height }) => (height ? `${height}px` : '750px')};
  justify-content: center;
  margin: 0 auto;

  > div {
    /* background-color: #cae9ff; */
    background-color: #4e4e43;
  }
  text {
    cursor: default;
  }
  use.denied {
    fill: #ff0000 !important;
  }
`;