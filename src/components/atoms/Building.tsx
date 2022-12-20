import React, { memo } from 'react';

import { GRID_SIZE } from 'utils/GridEnum';
import { IBuilding } from 'types/Ixion';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const Building = ({ id, degree, x, y, width, height }: IBuilding) => {
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

export default memo(Building);