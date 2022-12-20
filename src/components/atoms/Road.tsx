import React, { memo } from 'react';

import { IRoad } from 'types/Ixion';

const Road = ({ x, y, opacity }: IRoad) => {
  return (
    <use xlinkHref="#pre-Road" x={x} y={y} style={{ opacity: opacity }}/>
  )
}

export default memo(Road);