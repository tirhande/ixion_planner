import React, { memo } from 'react';

import { IRoad } from 'types/Ixion';

const Road = ({ x, y, opacity, fill }: IRoad) => {
  return (
    <use xlinkHref="#construct-Road" x={x} y={y} style={{ opacity: opacity }} fill={fill}/>
  )
}

export default memo(Road);