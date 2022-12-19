import React from 'react';
import { GRID_SIZE } from 'utils/GridEnum';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const RoadDefsSvg = () => {
  return (
    <g>
      <g id={`pre-Road`}>
        <rect x="0" y="0" width={GRID_WIDTH} height={GRID_HEIGHT} fill="white" stroke="black" />
      </g>
      <svg id={`construct-Road`} width={GRID_WIDTH} height={GRID_HEIGHT}>
        <rect x="0" y="0" width={GRID_WIDTH} height={GRID_HEIGHT} fill="white" stroke="black" />
      </svg>
    </g>
  );
};

export default RoadDefsSvg;
