import React from "react";
import { GRID_SIZE } from "utils/GridEnum";

interface IConstructRoad {
  pos: {
    x: number;
    y: number;
  },
  roadPos: {
    start: boolean;
    direction: string;
    x: number;
    y: number;
  }
}

const { grid_width, grid_height } = GRID_SIZE;

const ConstructRoad = ({ pos: { x, y }, roadPos }: IConstructRoad) => {

  if(roadPos.start) {
    const roadArray = Array.from({length: Math.abs((roadPos.direction === 'v') ? roadPos.y - y : roadPos.x - x)/20 + 1}, (_, i) => i);
    return (
      <>
        {roadArray.map((val) => {
          if(roadPos.direction === 'v') {
            const posY = (y > roadPos.y) ? roadPos.y + (val * grid_height) : roadPos.y - (val * grid_height);
            return <use key={val} xlinkHref="#pre-Road" x={roadPos.x} y={posY} style={{ opacity: 0.7 }} />
          }

          const posX = (x > roadPos.x) ? roadPos.x + (val * grid_width) : roadPos.x - (val * grid_width);
          return (
            <use key={val} xlinkHref="#pre-Road" x={posX} y={roadPos.y} style={{ opacity: 0.7 }} />
          )
        })}
      </>
    )
  }
  return <use xlinkHref="#pre-Road" x={x} y={y} style={{ opacity: 0.7 }} />;
};

export default ConstructRoad;