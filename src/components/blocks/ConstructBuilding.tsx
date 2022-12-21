import React from "react";
import { useRecoilValue } from 'recoil';

import { GRID_SIZE } from "utils/GridEnum";
import { isBannerOverlap, isBuildingOverlap } from "utils/utilFuncs";
import { buildingState, sectionState } from "core/states";
import { IConstructBuilding } from "types/Ixion";
import BlockBuilding from "components/atoms/BlockBuilding";

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const ConstructBuilding = ({ id, pos: {x, y}, width, height, isWall, degree }: IConstructBuilding) => {
  const sectionNumber = useRecoilValue(sectionState);
  const buildings = useRecoilValue(buildingState);
  
  const centralX = x - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : -GRID_WIDTH / 2);
  const centralY = y - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT/2);

  const isBuildingWrap = buildings[sectionNumber].some(v =>
    isBuildingOverlap({
      origin: { x: isWall ? x : centralX, y: isWall ? y : centralY, width: width, height: height },
      diff: { x: v.x, y: v.y, width: v.width, height: v.height },
    })
  );
  
  if(isWall) {
    const isBannerWrap = isBannerOverlap({ x, y, width, height });

    if(isBannerWrap || isBuildingWrap) {
      return (
        <>
          <rect x={GRID_WIDTH * 24} y="0" width={GRID_WIDTH * 8} height={GRID_HEIGHT} fill="#ff0000" />
          <BlockBuilding x={x} y={y} width={GRID_WIDTH * width} height={GRID_HEIGHT * height} />
        </>
      )
    }

    return (
      <>
        <rect x={GRID_WIDTH * 24} y="0" width={GRID_WIDTH * 8} height={GRID_HEIGHT} fill="#ff0000" />
        <use
          xlinkHref={`#pre-${id}`}
          x={x}
          y={y}
          opacity={0.7}
          transform={`${(y !== 0) ? `rotate(180, ${x + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`: ``}`}
        />
      </>
    )
  }

  if (isBuildingWrap)
    return <BlockBuilding x={centralX} y={centralY} width={GRID_WIDTH * width} height={GRID_HEIGHT * height} />;

  const [transX, transY] = [centralX + (GRID_WIDTH * width) / 2, centralY + (GRID_HEIGHT * height) / 2];
  return (
    <use
      xlinkHref={`#pre-${id}`}
      x={centralX}
      y={centralY}
      opacity={0.7}
      transform={`rotate(${degree}, ${(transX % GRID_WIDTH === 0) ? transX : transX + (GRID_WIDTH/2)}, ${(transY % GRID_HEIGHT === 0) ? transY : transY + (GRID_HEIGHT/2)})`}
    />
  );
};

export default ConstructBuilding;