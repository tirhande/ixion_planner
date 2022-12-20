import React from "react";

import Road from "components/atoms/Road";
import { GRID_SIZE } from "utils/GridEnum";
import { IConstructRoad } from "types/Ixion";

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const ConstructRoad = ({ pos: { x, y }, roadPos }: IConstructRoad) => {

  if(roadPos.start) {
    const roadArray = Array.from({length: Math.abs((roadPos.direction === 'v') ? roadPos.y - y : roadPos.x - x)/GRID_WIDTH + 1}, (_, i) => i);
    return (
      <>
        {roadArray.map((val) => {
          if(roadPos.direction === 'v') {
            const posY = (y > roadPos.y) ? roadPos.y + (val * GRID_HEIGHT) : roadPos.y - (val * GRID_HEIGHT);
            return <Road key={val} x={roadPos.x} y={posY} opacity={0.7} />
          }

          const posX = (x > roadPos.x) ? roadPos.x + (val * GRID_WIDTH) : roadPos.x - (val * GRID_WIDTH);
          return (
            <Road key={val} x={posX} y={roadPos.y} opacity={0.7} />
          )
        })}
      </>
    )
  }
  return <Road x={x} y={y} opacity={0.7} />
};

export default ConstructRoad;