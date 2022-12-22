import React from 'react';

import { IBlockBuilding } from 'types/Ixion';

const BlockBuilding = ({ x, y, width, height, transform }: IBlockBuilding) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={0.7}
      fill="#ff0000"
      transform={transform}
    />
  )
}

export default BlockBuilding;