import React, { memo } from 'react';

import { GRID_SIZE } from 'utils/GridEnum';
import { IBuilding } from 'types/Ixion';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const Building = ({ id, degree, x, y, width, height }: IBuilding) => {
  const [transX, transY] = [x + (GRID_WIDTH * width) / 2, y + (GRID_HEIGHT * height) / 2];

  return (
    <use
      xlinkHref={`#construct-${id}`}
      x={x}
      y={y}
      style={{ opacity: 1 }}
      transform={`rotate(${degree}, ${(transX % GRID_WIDTH === 0) ? transX : transX + (GRID_WIDTH/2)}, ${(transY % GRID_HEIGHT === 0) ? transY : transY + (GRID_HEIGHT/2)})`}
    />
  )
}

export default memo(Building);