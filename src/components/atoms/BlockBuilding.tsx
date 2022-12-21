import React, { memo } from 'react';

import { IBounds } from 'types/Ixion';

const BlockBuilding = ({ x, y, width, height }: IBounds) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={0.7}
      fill="#ff0000"
    />
  )
}

export default memo(BlockBuilding);