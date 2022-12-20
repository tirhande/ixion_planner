import React from 'react';

import PreBuilding from 'components/atoms/PreBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const SpaceDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Space).map((v) => {
      const { width, height, location } = BUILDING_INFO.Space[v as keyof typeof BUILDING_INFO.Space];
      return <PreBuilding key={v} construct_id={v} width={width} height={height} location={location} fillColor="#8b7cbd"></PreBuilding>
    })}
  </>
);

export default SpaceDefsSvg;
