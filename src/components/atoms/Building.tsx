import React from 'react';

import { IBuilding } from 'components/blocks/SVGStage';
import { GRID_SIZE } from 'utils/GridEnum';


const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const Building = ({ id, degree, x, y, width, height }: IBuilding) => {
  // const onTest = (e: React.MouseEvent<SVGUseElement>) => {
  //   console.log(e.currentTarget.x);
  //   console.log(e.target);
  // }
  // v.x + (GRID_WIDTH * v.width) / 2
  // v.y + (GRID_HEIGHT * v.height) / 2
  return (
    <use
      xlinkHref={`#construct-${id}`}
      x={x}
      y={y}
      style={{ opacity: 1 }}
      transform={`rotate(${degree}, ${x + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`}
    />
  )
}

export default Building;