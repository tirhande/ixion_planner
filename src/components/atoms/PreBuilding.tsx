import React, { memo } from 'react';

import { IPreBuilding } from 'types/Ixion';

const PreBuilding = ({ id, x, y, transform }: IPreBuilding) => {
  return (
    <use
      xlinkHref={`#pre-${id}`}
      x={x}
      y={y}
      opacity={0.7}
      transform={transform}
    />
  )
}

export default memo(PreBuilding);