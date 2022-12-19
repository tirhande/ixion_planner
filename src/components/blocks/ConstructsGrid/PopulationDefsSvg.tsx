import React from 'react';

import PreBuilding from 'components/atoms/PreBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const PopulationDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Population).map((v) => {
      const { width, height, location } = BUILDING_INFO.Population[v as keyof typeof BUILDING_INFO.Population];
      return <PreBuilding key={v} construct_id={v} width={width} height={height} location={location} fillColor="#54808c"></PreBuilding>
    })}
  </>
);

export default PopulationDefsSvg;
