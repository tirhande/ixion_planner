import React from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { constructState, sectionState, perspectiveState } from 'core/states';
import { CANVAS_SIZE } from 'utils/GridEnum';
import { IDimension } from 'types/Ixion';

import Header from 'components/blocks/Header';
import Footer from 'components/blocks/Footer';
import SVGStage from './SVGStage';
import SVGContainer from './SVGContainer';
import Button from 'components/atoms/Button';
import OverlayStage from 'components/overlay/OverlayStage';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;

const SectorPage = () => {
  const [{ degree }, setConstruct] = useRecoilState(constructState);
  const setSectionNumber = useSetRecoilState(sectionState);
  const isPerspective = useRecoilValue(perspectiveState);

  const onRotate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'ㄱ') {
      const deg = degree === 270 ? 0 : degree + 90;
      setConstruct(prev => ({ ...prev, degree: deg }));
    }
  };

  const onSectionPrev = () => setSectionNumber(prev => (prev === 1 ? 6 : prev - 1));
  const onSectionNext = () => setSectionNumber(prev => (prev === 6 ? 1 : prev + 1));

  return (
    <StyledHome onKeyDown={onRotate} tabIndex={0}>
      <Header />
      <StyledMain>
        <StyledSectorMoveButton>
          <Button className="prev" text="Previous" onClick={onSectionPrev} />
        </StyledSectorMoveButton>
        <StyledSVG width={CANVAS_WIDTH} height={CANVAS_HEIGHT} isPerspective={isPerspective}>
          <OverlayStage />
          <SVGStage />
          <SVGContainer />
        </StyledSVG>
        <StyledSectorMoveButton>
          <Button text="Next" className="next" onClick={onSectionNext} />
        </StyledSectorMoveButton>
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
  z-index: 1;

  > div {
    display: flex;
    align-items: center;
    height: 600px;
  }
`;
const StyledSectorMoveButton = styled.div`
  > button {
    width: 160px;
    height: 160px;
    background-color: transparent;
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
`;
const StyledSVG = styled.section<IDimension>`
  display: flex;
  position: relative;
  perspective: ${({ isPerspective }) => (isPerspective ? '1000px' : 'none')};
  width: ${({ width }) => (width ? `${width}px` : '1400px')};
  height: ${({ height }) => (height ? `${height}px` : '750px')};
  justify-content: center;
  z-index: 2;
  > div {
    background-color: #4e4e43;
    transform: ${({ isPerspective }) => (isPerspective ? 'rotateX(25deg)' : 'none')};
  }

  text {
    cursor: default;
  }

  use.denied {
    fill: #ff0000 !important;
  }
`;
