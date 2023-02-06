import React from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { constructState, sectionState } from 'core/states';
import { CANVAS_SIZE } from 'utils/GridEnum';
import { IDimension } from 'types/Ixion';

import Header from 'components/blocks/Header';
import Footer from 'components/blocks/Footer';
import SVGStage from './SVGStage';
import SVGContainer from './SVGContainer';
import Button from 'components/atoms/Button';


const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;

const SectorPage = () => {
  const [{ degree }, setConstruct] = useRecoilState(constructState);
  const setSectionNumber = useSetRecoilState(sectionState);

  const onRotate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'ㄱ') {
      const deg = degree === 270 ? 0 : degree + 90;
      setConstruct(prev => ({ ...prev, degree: deg }));
    }
  }

  const onSectionPrev = () => setSectionNumber(prev => (prev === 1) ? 6 : prev - 1);
  const onSectionNext = () => setSectionNumber(prev => (prev === 6) ? 1 : prev + 1);

  return (
    <StyledHome onKeyDown={onRotate} tabIndex={0}>
      <Header />
      <StyledMain>
        <div>
        <Button className="prev" text="Previous" onClick={onSectionPrev} />
        </div>
        <StyeldSVG width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <SVGStage />
          <SVGContainer />
        </StyeldSVG>
        <div>
        <Button text="Next" className="next" onClick={onSectionNext} />
        </div>
      </StyledMain>
      <Footer />
    </StyledHome>
  );
};

export default SectorPage;

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 80.1%;

  > div {
    display: flex;
    align-items: center;

    height: 600px;

    > button {
      width: 160px;
      height: 160px;
      background-color: #fff;
      border: none;
      font-size: 0px;
      position: relative;
      cursor: pointer;
    }
    > button:after {
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
    .slick-prev::after {
      left: 60%;
      -webkit-transform: translate(-50%, -50%) rotate(135deg);
      transform: translate(-50%, -50%) rotate(135deg);
    }
    .slick-next::after {
      -webkit-transform: translate(-50%, -50%) rotate(-45deg);
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;
const StyeldSVG = styled.section<IDimension>`
  display: flex;

  width: ${({ width }) => (width ? `${width}px` : '1400px')};
  height: ${({ height }) => (height ? `${height}px` : '750px')};
  justify-content: center;

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