import React from 'react';
import PreBuilding from 'components/atoms/PreBuilding';

import { BUILDING_INFO } from 'utils/GridEnum';

const StabilityDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Stability).map((v) => {
      const { width, height, location } = BUILDING_INFO.Stability[v as keyof typeof BUILDING_INFO.Stability];
      return <PreBuilding key={v} construct_id={v} width={width} height={height} location={location} fillColor="#4c76d3"></PreBuilding>
    })}
  </>
);

export default StabilityDefsSvg;
