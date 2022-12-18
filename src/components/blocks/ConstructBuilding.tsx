import React from "react";
import { GRID_SIZE } from "utils/GridEnum";
import { isOverlap } from "./SVGStage";

interface IConstructBuilding {
  id: string;
  pos: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  isWall: boolean;
  degree: number;
}

const ConstructBuilding = ({ id, pos: {x, y}, width, height, isWall, degree }: IConstructBuilding) => {
  const { grid_width, grid_height } = GRID_SIZE;
  const isWrap = isOverlap(
    { x: x, y: y + grid_height * height },
    { x: x + grid_width * width, y: y },
    { x: 480, y: 20 },
    { x: 640, y: 0 }
  );
  
  return (
    <>
      {isWall && <rect x="480" y="0" width="160" height="20" fill="#ff0000" />}
      {isWall && isWrap ? (
        <rect
          x={x}
          y={y}
          width={grid_width * width}
          height={grid_height * height}
          fill="#ff0000"
          transform={`rotate(${degree}, ${x + (grid_width * 3) / 2}, ${y + (grid_height * 3) / 2})`}
        />
      ) : (
        <use
          xlinkHref={`#pre-${id}`}
          x={x}
          y={y}
          opacity={0.7}
          transform={`rotate(${degree}, ${x + (grid_width * 3) / 2}, ${y + (grid_height * 3) / 2})`}
        />
      )}
    </>
  );
};

export default ConstructBuilding;