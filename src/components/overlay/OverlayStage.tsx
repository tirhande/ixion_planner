import React, { memo } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { buildingState, sectionState, perspectiveState } from 'core/states';
import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;
import { IDimension, IPoint } from 'types/Ixion';
import BatteryT1 from 'assets/Buildings/Maintenance/BatteryT1.png';
import BUILDINGS from 'utils/BuildingsEnum';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;

const OverlayStage = () => {
  const isPerspective = useRecoilValue(perspectiveState);
  const buildings = useRecoilValue(buildingState);
  const sector = useRecoilValue(sectionState);
  console.log(buildings[sector]);
  console.log(BUILDINGS);
  return (
    <OverlayContainer width={CANVAS_WIDTH} height={CANVAS_HEIGHT} isPerspective={isPerspective}>
      <PerspectivePlane>
        {buildings[sector].map((building, index) => {
          if (building.id === 'BatteryT1')
            return <BuildingImg key={index} src={BatteryT1} width={GRID_WIDTH * 3} x={building.x} y={building.y} />;
        })}
      </PerspectivePlane>
    </OverlayContainer>
  );
};

export default memo(OverlayStage);

const OverlayContainer = styled.div<IDimension>`
  display: ${({ isPerspective }) => (isPerspective ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  perspective: '1000px;
  background-color: transparent  !important;
  width: ${({ width }) => (width ? `${width}px` : '1400px')};
  height: ${({ height }) => (height ? `${height}px` : '750px')};
  justify-content: center;
  z-index: 2;

  text {
    cursor: default;
  }
`;

const PerspectivePlane = styled.div`
  width: 1120px;
  height: 600px;
  transform: rotateX(25deg);
`;

const BuildingImg = styled.img<IPoint>`
  position: absolute;
  transform: rotateX(0deg) ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;
