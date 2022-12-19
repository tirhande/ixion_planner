import React from 'react';

import { IPoint } from 'components/blocks/SVGStage';


interface IRoad extends IPoint {
  opacity: number;
}


export const Road = ({ x, y, opacity }: IRoad) => {
  const onTest = (e: React.MouseEvent<SVGUseElement>) => {
    console.log(e.currentTarget.x);
    console.log(e.target);
  }
  return (
    <use xlinkHref="#pre-Road" x={x} y={y} style={{ opacity: opacity }} onClick={onTest}/>
  )
}
