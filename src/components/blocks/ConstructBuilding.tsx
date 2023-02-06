import React, { memo } from "react";
import { useRecoilValue } from 'recoil';

import { GRID_SIZE } from 'utils/GridEnum';
import { isBannerOverlap, isBuildingOverlap, isRotateCorrect, getMinMaxPoint } from 'utils/utilFuncs';
import { buildingState, sectionState } from "core/states";
import { IConstructBuilding } from "types/Ixion";
import BlockBuilding from "components/atoms/BlockBuilding";
import PreBuilding from "components/atoms/PreBuilding";
import Banner from "components/atoms/Banner";

const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const ConstructBuilding = ({ id, pos: {x, y}, width, height, isWall, degree }: IConstructBuilding) => {
  const sectionNumber = useRecoilValue(sectionState);
  const buildings = useRecoilValue(buildingState);

  if(isWall) {
    const borderPoint = getMinMaxPoint({ width, height, degree: y === 0 ? 0 : 180 });

    const wallX = y === 0 ? x - width * GRID_WIDTH / 2 : x + width * GRID_WIDTH / 2;
    const diffX = y === 0 ? x + width * GRID_WIDTH / 2 : x - width * GRID_WIDTH / 2;
    const posX = (y === 0 ? (wallX < borderPoint.minX ? borderPoint.minX : (wallX > borderPoint.maxX ? borderPoint.maxX : wallX)) : 
    (diffX < borderPoint.minX ? borderPoint.minX : (diffX > borderPoint.maxX ? borderPoint.maxX : diffX)))
    const isBuildingWrap = buildings[sectionNumber].some(v =>
      isBuildingOverlap({
        origin: { x: posX, y: y, width: width, height: height, degree: degree },
        diff: { x: v.x, y: v.y, width: v.width, height: v.height, degree: v.degree },
      })
    );
    
    const isBannerWrap = isBannerOverlap({ x: wallX, y, width, height });
    if(isBannerWrap || isBuildingWrap) {
      return (
        <>
          <Banner />
          <BlockBuilding x={posX} y={y} width={GRID_WIDTH * width} height={GRID_HEIGHT * height} transform={`${(y !== 0) ? `rotate(180, ${posX + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`: ``}`} />
        </>
      )
    }

    return (
      <>
        <Banner />
        <PreBuilding id={id} x={posX} y={y} transform={`${(y !== 0) ? `rotate(180, ${posX + (GRID_WIDTH * width) / 2}, ${y + (GRID_HEIGHT * height) / 2})`: ``}`} />
      </>
    )
  }
  
  const topLeftX = x - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : (width === 3 && height === 6 && degree === 180) ? GRID_WIDTH / 2 : -GRID_WIDTH / 2);
  const topLeftY = y - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT / 2);

  const borderPoint = getMinMaxPoint({ width, height, degree });
  const posX = (topLeftX < borderPoint.minX ? borderPoint.minX : (topLeftX > borderPoint.maxX ? borderPoint.maxX : topLeftX));
  const posY = (topLeftY < borderPoint.minY ? borderPoint.minY : (topLeftY > borderPoint.maxY ? borderPoint.maxY : topLeftY));

  const [centerX, centerY] = [posX + (GRID_WIDTH * width) / 2, posY + (GRID_HEIGHT * height) / 2];
  const rotateX = isRotateCorrect({ width, height }) || (centerX % GRID_WIDTH === 0) ? centerX : centerX + (GRID_WIDTH / 2);
  const rotateY = isRotateCorrect({ width, height }) || (centerY % GRID_HEIGHT === 0) ? centerY : centerY + (GRID_HEIGHT / 2);
  const isBuildingWrap = buildings[sectionNumber].some(v =>
    isBuildingOverlap({
      origin: { x: posX, y: posY, width: width, height: height, degree: degree },
      diff: { x: v.x, y: v.y, width: v.width, height: v.height, degree: v.degree },
    })
  );

  if (isBuildingWrap) {
    return (
      <BlockBuilding
        x={posX}
        y={posY}
        width={GRID_WIDTH * width}
        height={GRID_HEIGHT * height}
        transform={`rotate(${degree}, ${degree % 180 === 0 || width % 2 === 0 ? centerX : rotateX}, ${degree % 180 === 0 || height % 2 === 0 ? centerY : rotateY})`}
      />
    );
  }
  
  return (
    <PreBuilding id={id} x={posX} y={posY} transform={`rotate(${degree}, ${degree % 180 === 0 || width % 2 === 0 ? centerX : rotateX}, ${degree % 180 === 0 || height % 2 === 0 ? centerY : rotateY})`} />
  )
};

export default memo(ConstructBuilding);