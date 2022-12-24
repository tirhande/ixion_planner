import React, { memo } from "react";
import { useRecoilValue } from 'recoil';

import { GRID_SIZE } from "utils/GridEnum";
import { isBannerOverlap, isBuildingOverlap, isRotateCorrect } from "utils/utilFuncs";
import { buildingState, sectionState } from "core/states";
import { IConstructBuilding } from "types/Ixion";
import BlockBuilding from "components/atoms/BlockBuilding";
import PreBuilding from "components/atoms/PreBuilding";
import Banner from "components/atoms/Banner";

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const ConstructBuilding = ({ id, pos: {x, y}, width, height, isWall, degree }: IConstructBuilding) => {
  const sectionNumber = useRecoilValue(sectionState);
  const buildings = useRecoilValue(buildingState);

  const topLeftX = x - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : -GRID_WIDTH / 2);
  const topLeftY = y - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT/2);
  
  const isBuildingWrap = buildings[sectionNumber].some(v =>
    isBuildingOverlap({
      origin: { x: isWall ? x : topLeftX, y: isWall ? y : topLeftY, width: width, height: height, degree: degree },
      diff: { x: v.x, y: v.y, width: v.width, height: v.height, degree: v.degree },
    })
  );

  if(isWall) {
    const isBannerWrap = isBannerOverlap({ x, y, width, height });
    
    if(isBannerWrap || isBuildingWrap) {
      return (
        <>
          <Banner />
          <BlockBuilding x={x} y={y} width={GRID_WIDTH * width} height={GRID_HEIGHT * height} />
        </>
      )
    }
    return (
      <>
        <Banner />
        <PreBuilding id={id} x={x} y={y} transform={`${(y !== 0) ? `rotate(180, ${x + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`: ``}`} />
      </>
    )
  }

  const [centerX, centerY] = [topLeftX + (GRID_WIDTH * width) / 2, topLeftY + (GRID_HEIGHT * height) / 2];
  const rotateX = isRotateCorrect({ width, height }) || (centerX % GRID_WIDTH === 0) ? centerX : centerX + (GRID_WIDTH / 2);
  const rotateY = isRotateCorrect({ width, height }) || (centerY % GRID_HEIGHT === 0) ? centerY : centerY + (GRID_HEIGHT / 2);

  if (isBuildingWrap) {
    return (
      <BlockBuilding
        x={topLeftX}
        y={topLeftY}
        width={GRID_WIDTH * width}
        height={GRID_HEIGHT * height}
        transform={`rotate(${degree}, ${degree % 180 === 0 ? centerX : width % 2 === 0 ? centerX : rotateX}, ${
          degree % 180 === 0 ? centerY : height % 2 === 0 ? centerY : rotateY
        })`}
      />
    );
  }

  if(degree % 180 === 0) return <PreBuilding id={id} x={topLeftX} y={topLeftY} transform={`rotate(${degree}, ${centerX}, ${centerY})`} />
  return (
    <PreBuilding id={id} x={topLeftX} y={topLeftY} transform={`rotate(${degree}, ${width % 2 === 0 ? centerX : rotateX}, ${height % 2 === 0 ? centerY : rotateY})`} />
  )
};

export default memo(ConstructBuilding);