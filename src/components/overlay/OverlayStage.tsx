import React, { memo } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { buildingState, sectionState, perspectiveState } from 'core/states';
import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;
import { IDimension, IPoint } from 'types/Ixion';
import BUILDINGS from 'utils/BuildingsEnum';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;

const OverlayStage = () => {
  const isPerspective = useRecoilValue(perspectiveState);
  const buildings = useRecoilValue(buildingState);
  const sector = useRecoilValue(sectionState);
  return (
    <OverlayContainer width={CANVAS_WIDTH} height={CANVAS_HEIGHT} isPerspective={isPerspective}>
      {buildings[sector].map((building, index) => {
        if (BUILDINGS[building.id].image && BUILDINGS[building.id].imageHeight)
          return (
            <BuildingImg
              key={index}
              src={BUILDINGS[building.id].image}
              width={GRID_WIDTH * building.width}
              x={building.x}
              y={building.y - (BUILDINGS[building.id].imageHeight - GRID_HEIGHT * building.height)}
            />
          );
      })}
    </OverlayContainer>
  );
};

export default memo(OverlayStage);

const OverlayContainer = styled.div<IDimension>`
  display: ${({ isPerspective }) => (isPerspective ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent !important;
  width: ${({ width }) => (width ? `${width}px` : '1400px')};
  height: ${({ height }) => (height ? `${height}px` : '750px')};
  justify-content: center;
  z-index: 2;

  text {
    cursor: default;
  }
`;

const BuildingImg = styled.img<IPoint>`
  position: absolute;
  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;
