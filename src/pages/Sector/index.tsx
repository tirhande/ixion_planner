import React from 'react';
// import {useParams} from 'react-router-dom';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Footer from 'components/blocks/Footer';
import { constructState, sectionState } from 'core/states';
import { CANVAS_SIZE } from 'utils/GridEnum';
import SVGStage from './SVGStage';
import SVGContainer from './SVGContainer';
import { IDimension } from 'types/Ixion';
import Button from 'components/atoms/Button';


const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;

const SectorPage = () => {
  // const params = useParams();
  // console.log(params);
  const [{ degree }, setConstruct] = useRecoilState(constructState);
  const [sectionNumber, setSectionNumber] = useRecoilState(sectionState);

  const onRotate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key.toLowerCase() === 'r') {
      const deg = degree === 270 ? 0 : degree + 90;
      setConstruct(prev => ({ ...prev, degree: deg }));
    }
  }

  const onSectionPrev = () => {
    setSectionNumber(prev => (sectionNumber === 1) ? 6 : prev - 1);
  }

  const onSectionNext = () => {
    setSectionNumber(prev => (sectionNumber === 6) ? 1 : prev + 1);
  }

  return (
    <StyledHome onKeyDown={onRotate} tabIndex={0}>
      <StyledHeader section={sectionNumber}>
        <div>
          <div>SECTOR</div>
          <div className="sector-num">{sectionNumber}</div>
        </div>
      </StyledHeader>
      <StyledMain>
        <Button className="prev" text="Previous" onClick={onSectionPrev} />
        {/* <button className='slick-prev'>Previous</button> */}
        <StyeldSVG width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <SVGStage />
          <SVGContainer />
        </StyeldSVG>
        <Button text="Next" className="next" onClick={onSectionNext} />
        {/* <button className='slick-next'>Next</button> */}
      </StyledMain>
      <Footer />
    </StyledHome>
  );
};

export default SectorPage;

const StyledHome = styled.div`
  outline: none;
`;
const StyledHeader = styled.header<{section: number}>`
  height: 70px;

  display: flex;
  align-items: center;

  > div {
    width: 11%;
    height: 80%;
    margin: 0 auto;
    padding: 0 5px;
    
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
    /* background: #dfc663; */
    /* background: #e18089; */
    /* background: #988be1; */
    /* background: #59ced0; */
    /* background: #b7d668; */
    /* background: #cdcbc7; */
    border-radius: 10px;

    div {
      width: 80%;
      text-align: center;
    }
  }

  .sector-num {
    width: 20%;
    font-size: 48px;
  }
`;

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

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