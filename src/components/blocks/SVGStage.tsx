import React, { useState } from "react";
import { useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { constructState, roadState } from "core/states";
import ConstructsGrid from "./ConstructsGrid";
import { GRID_SIZE } from "utils/GridEnum";
import ConstructBuilding from "./ConstructBuilding";
import ConstructRoad from "./ConstructRoad";

const WIDTH = 1121;
const HEIGHT = 601;

interface Item {
  x: number;
  y: number;
  id: string;
  degree: number;
}

const { grid_width, grid_height } = GRID_SIZE;

interface Test {
  x: number;
  y: number;
}
export const isOverlap = (l1:Test,  r1:Test,  l2:Test,  r2:Test) => {
  if (l1.x === r1.x || l1.y === r1.y || r2.x === l2.x || l2.y === r2.y) return false;
  if (l1.x >= r2.x || l2.x >= r1.x) return false;
  if (r1.y >= l2.y || r2.y >= l1.y) return false;
  return true;
}

const SVGStage = () => {
  const { isConstruct, construct_id, width, height, isWall, degree } = useRecoilValue(constructState);
  const [isRoadConstruct, setRoadConstrct] = useRecoilState(roadState);
  const resetConstruct = useResetRecoilState(constructState);
  const [pos, setPos] = useState({
    x: 0,
    y: 0
  });

  const [item, setItem] = useState<Item[]>([]);

  const [roadPos, setRoadPos] = useState({
    start: false,
    direction: '',
    x: 0,
    y: 0,
  });


  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const [posX, posY] = [Math.floor(e.nativeEvent.offsetX/grid_width) * grid_width, Math.floor(e.nativeEvent.offsetY/grid_height) * grid_height];

    const isWrap = isOverlap(
      { x: posX, y: posY + grid_height * height },
      { x: posX + grid_width * width, y: posY },
      { x: 480, y: 20 },
      { x: 640, y: 0 }
    );

    if(isConstruct) {
      if(!isWrap || !isWall) {
        if(e.button !== 2) {
          setItem(prev => [...prev, ...[{ id: construct_id, x: posX, y: posY, degree: degree }]]);
        }
        resetConstruct();
      }
      setRoadConstrct(false);
    } else if(isRoadConstruct) {
      resetConstruct();

      if(e.button !== 2) {
        setRoadPos({
          ...roadPos,
          start: true,
          x: posX,
          y: posY
        })
      } else {
        setRoadPos({
          start: false,
          direction: '',
          x: 0,
          y: 0,
        })
      }
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const [posX, posY] = [Math.floor(e.nativeEvent.offsetX/grid_width) * grid_width, Math.floor(e.nativeEvent.offsetY/grid_height) * grid_height];
    if(isConstruct || isRoadConstruct) {
      if(isRoadConstruct && roadPos.start && (e.nativeEvent.offsetX % grid_width === 0 || e.nativeEvent.offsetY % grid_height === 0)) {
        const direct = (Math.abs(roadPos.x - posX) >= Math.abs(roadPos.y - posY)) ? 'h' : 'v';
        setRoadPos({
          ...roadPos,
          direction: direct
        })
      }

      setPos({
        x: posX,
        y: posY
      })
    }
  }

  
  return (
    <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onContextMenu={onContextMenu}>
      <svg width={WIDTH} height={HEIGHT}>
        <defs>
          <pattern id="grid" width={grid_width} height={grid_height} patternUnits="userSpaceOnUse">
            <path d={`M ${grid_width} 0 L 0 0 0 ${grid_height}`} fill="none" stroke="white" strokeWidth="1" opacity={0.5} />
          </pattern>
          <g id="passage" opacity={0.8}>
            <polygon points="0 80, 7 90, 0 100" fill="#d6b138" />
            <polygon points="0 260, 7 270, 0 280" fill="#d6b138" />
            <polygon points="0 320, 7 330, 0 340" fill="#d6b138" />
            <polygon points="0 500, 7 510, 0 520" fill="#d6b138" />
            <polygon points="1120 80, 1113 90, 1120 100" fill="#d6b138" />
            <polygon points="1120 260, 1113 270, 1120 280" fill="#d6b138" />
            <polygon points="1120 320, 1113 330, 1120 340" fill="#d6b138" />
            <polygon points="1120 500, 1113 510, 1120 520" fill="#d6b138" />
          </g>
          <ConstructsGrid />
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <use xlinkHref="#passage" />
        {item.map((v,i) => {
          return <use key={i} xlinkHref={`#construct-${v.id}`} x={v.x} y={v.y} style={{ opacity: 1 }} transform={`rotate(${v.degree}, ${v.x + (grid_width * 3 / 2)}, ${v.y + (grid_height * 3 / 2)})`} />;
        })}
        {isConstruct && <ConstructBuilding id={construct_id} pos={pos} width={width} height={height} isWall={isWall} degree={degree} />}
        {isRoadConstruct && <ConstructRoad pos={pos} roadPos={roadPos} />}
      </svg>
    </div>
  );
};

export default SVGStage;