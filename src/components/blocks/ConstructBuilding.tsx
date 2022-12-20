import React from "react";
import { IConstructBuilding } from "types/Ixion";

import { GRID_SIZE } from "utils/GridEnum";
import { isOverlap } from "utils/utilFuncs";

const ConstructBuilding = ({ id, pos: {x, y}, width, height, isWall, degree }: IConstructBuilding) => {
  const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;
  
  if(isWall) {
    const isWrap = isOverlap({
      l1: { x: x, y: GRID_HEIGHT * height + y },
      r1: { x: GRID_WIDTH * width + x, y: y },
      l2: { x: GRID_WIDTH * 24, y: GRID_HEIGHT },
      r2: { x: GRID_WIDTH * 32, y: 0 }
    });

    if(isWrap) {
      return (
        <>
          <rect x={GRID_WIDTH * 24} y="0" width={GRID_WIDTH * 8} height={GRID_HEIGHT} fill="#ff0000" />
          <rect
            x={x}
            y={y}
            width={GRID_WIDTH * width}
            height={GRID_HEIGHT * height}
            fill="#ff0000"
          />
        </>
      )
    }

    return (
      <>
        <rect x={GRID_WIDTH * 24} y="0" width={GRID_WIDTH * 8} height={GRID_HEIGHT} fill="#ff0000" />
        <use
          xlinkHref={`#pre-${id}`}
          x={x}
          y={y}
          opacity={0.7}
          transform={`${(y !== 0) ? `rotate(180, ${x + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`: ``}`}
        />
      </>
    )
  }
  const centralX = x - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : -GRID_WIDTH / 2);
  const centralY = y - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT/2);

  return (
    <use
      xlinkHref={`#pre-${id}`}
      x={centralX}
      y={centralY}
      opacity={0.7}
      transform={`rotate(${degree}, ${x + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`}
    />
  );
};

export default ConstructBuilding;