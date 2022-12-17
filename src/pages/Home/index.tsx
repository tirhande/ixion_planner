import React from 'react';

import Footer from 'components/blocks/Footer';
import SVGStage from 'components/blocks/SVGStage';
import { StyledMain } from './styles';

const HomePage = () => {
  // const onMouseDown = (e:MouseEvent<HTMLElement>) => {
  //   console.log(e);
  // }
  // const onMouseMove = (e:MouseEvent<HTMLElement>) => {
  //   console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //   // e.target.
  // }
  return (
    <>
      {/* <StyledMain onMouseDown={onMouseDown}> */}
      <StyledMain>
        {/* <div style={{width: "1400px", height:"750px"}} onMouseMove={onMouseMove}> */}
        <div>
          <SVGStage />
          {/* <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
            <image href="https://stardew.info/planner/img/layouts/full_background.jpg"/>
            <rect x="0" y="0" width="1400" height="25" fill="none" stroke="#000000" style={{pointerEvents: "none", strokeWidth: "0.5", opacity: 1}}></rect>
            <rect x="0" y="25" width="1400" height="25" fill="none" stroke="#000000" style={{pointerEvents: "none", strokeWidth: "0.5", opacity: 1}}></rect>
            <rect x="0" y="0" width="25" height="750" fill="none" stroke="#000000" style={{pointerEvents: "none", strokeWidth: "0.5", opacity: 1}}></rect>
            <rect x="25" y="0" width="25" height="750" fill="none" stroke="#000000" style={{pointerEvents: "none", strokeWidth: "0.5", opacity: 1}}></rect>
            <rect x="32" y="368" width="16" height="16" fill="none" style={{pointerEvents: "none", strokeWidth: "0.5", opacity: 0.4, strokeDasharray: "5, 5"}} stroke="none"></rect>
          </svg> */}
        </div>
        {/* <CanvasStage /> */}
      </StyledMain>
      <Footer />
    </>
  );
};

export default HomePage;
