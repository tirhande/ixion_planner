import React from 'react';
import { GRID_SIZE } from 'utils/GridEnum';

const { grid_width, grid_height } = GRID_SIZE;

const RoadDefsSvg = () => {
  return (
    <g>
      <g id={`pre-Road`}>
        <rect x="0" y="0" width={grid_width} height={grid_height} fill="white" stroke="black" />
      </g>
      <svg id={`construct-Road`} width={grid_width} height={grid_height}>
        <rect x="0" y="0" width={grid_width} height={grid_height} fill="white" stroke="black" />
      </svg>
    </g>
  );
};

export default RoadDefsSvg;
