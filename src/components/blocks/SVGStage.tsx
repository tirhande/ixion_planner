import React, { useState } from "react";
import { useRecoilState } from 'recoil';

import Maintenance from "components/blocks/Grids/Maintenance";
import Space from "components/blocks/Grids/Space";
import { dragState } from "core/states";
// import styled from 'styled-components';

const WIDTH = 1401;
const HEIGHT = 676;

// const SVG = styled.svg`
//   > use {
//     transform-box: fill-box; /* you need this for SVGs */
//     transform-origin: 75px 75px; /* moved here */

//     @keyframes test {
//       100% {
//         transform: rotate(360deg);
//       }
//     }
//   }
// `;
interface Item {
  x: number;
  y: number;
  name: string;
}

const SVGStage = () => {
  const [isDrag, setIsDrag] = useRecoilState(dragState);
  const [item, setItem] = useState<Item[]>([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0
  })

  const onMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if(isDrag) {
      const [posX, posY] = [Math.floor(e.nativeEvent.offsetX/25) * 25, Math.floor(e.nativeEvent.offsetY/22.5) * 22.5];
      setItem(prev => [...prev, ...[{name:"well", x: posX, y: posY}]]);
      setIsDrag(false);
    }
  }

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if(isDrag) {
      // const [posX, posY] = [e.nativeEvent.offsetX/25, e.nativeEvent.offsetY/25];
      const [posX, posY] = [Math.floor(e.nativeEvent.offsetX/25) * 25, Math.floor(e.nativeEvent.offsetY/22.5) * 22.5];

      setPos({
        x: posX,
        y: posY
      })
      
      // if(posX % 25 === 0 && posY % 25 === 0) {
      //   setPos({
      //     x: posX,
      //     y: posY
      //   })
      // } else if(posX % 25 === 0) {
      //   setPos(prev => ({...prev, x: posX }))
      // } else if(posY % 25 === 0) {
      //   setPos(prev => ({...prev, y: posY }))
      // }

      // setPos({
      //   x: e.nativeEvent.offsetX,
      //   y: e.nativeEvent.offsetY
      // })
    }
  }

  return (
    <svg width={WIDTH} height={HEIGHT} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
      <defs>
        <pattern id="grid" width="25" height="22.5" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 22.5" fill="none" stroke="red" strokeWidth="0.5" />
        </pattern>
        <Maintenance />
        <Space />
        <image xlinkHref="https://stardew.info/planner/./img/tiles/well.png" preserveAspectRatio="none" x="0" y="0" width="50" height="50" id="well"></image>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {item.map((v,i) => {
        return <use key={i} xlinkHref="#battery-t2" data-custom-type="building" x={v.x} y={v.y} style={{ opacity: 1 }} />;
      })}
      {/* <polygon points="12.5 15, 25 25, 0 25"/> */}
      {isDrag && <use xlinkHref="#pre-battery-t2" data-custom-type="building" x={pos.x} y={pos.y} style={{ opacity: 0.7 }} />}
    </svg>
  );
};

export default SVGStage;