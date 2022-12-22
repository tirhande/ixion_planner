import React, { memo } from 'react';

import { GRID_SIZE } from 'utils/GridEnum';
import { IBuilding } from 'types/Ixion';
import { isRotateCorrect } from 'utils/utilFuncs';

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const Building = ({ id, degree, x, y, width, height }: IBuilding) => {
  const [centerX, centerY] = [x + (GRID_WIDTH * width) / 2, y + (GRID_HEIGHT * height) / 2];
  const rotateX = isRotateCorrect({ width, height }) || (centerX % GRID_WIDTH === 0) ? centerX : centerX + (GRID_WIDTH / 2);
  const rotateY = isRotateCorrect({ width, height }) || (centerY % GRID_HEIGHT === 0) ? centerY : centerY + (GRID_HEIGHT / 2);
  return (
    <use
      xlinkHref={`#construct-${id}`}
      x={x}
      y={y}
      style={{ opacity: 1 }}
      transform={`rotate(${degree}, ${degree % 180 === 0 || width % 2 === 0 ? centerX : rotateX}, ${degree % 180 === 0 || height % 2 === 0 ? centerY : rotateY})`}
    />
  )
}

export default memo(Building);