import React, { memo } from 'react';

import { IRoad } from 'types/Ixion';

const PreRoad = ({ x, y, opacity, fill }: IRoad) => {
  return (
    <use xlinkHref="#pre-Road" x={x} y={y} opacity={opacity} fill={fill}/>
  )
}

export default memo(PreRoad);