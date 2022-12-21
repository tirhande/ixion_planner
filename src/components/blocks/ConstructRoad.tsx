import React from "react";

import { GRID_SIZE } from "utils/GridEnum";
import { IConstructRoad } from "types/Ixion";
import PreRoad from "components/atoms/PreRoad";

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const ConstructRoad = ({ pos: { x, y }, roadPos, fill }: IConstructRoad) => {
  if(roadPos.start) {
    const roadArray = Array.from({length: Math.abs((roadPos.direction === 'v') ? roadPos.y - y : roadPos.x - x)/GRID_WIDTH + 1}, (_, i) => i);
    return (
      <>
        {roadArray.map((val) => {
          if(roadPos.direction === 'v') {
            const posY = (y > roadPos.y) ? roadPos.y + (val * GRID_HEIGHT) : roadPos.y - (val * GRID_HEIGHT);
            return <PreRoad key={val} x={roadPos.x} y={posY} opacity={0.7} fill={fill}/>
          }

          const posX = (x > roadPos.x) ? roadPos.x + (val * GRID_WIDTH) : roadPos.x - (val * GRID_WIDTH);
          return (
            <PreRoad key={val} x={posX} y={roadPos.y} opacity={0.7} fill={fill}/>
          )
        })}
      </>
    )
  }
  return <PreRoad x={x} y={y} opacity={0.7} fill={fill}/>
};

export default ConstructRoad;