import React from 'react';

import { Building } from 'components/atoms/Building';
import { BUILDING_INFO } from 'utils/GridEnum';

const PopulationDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Population).map((v) => {
      const { width, height, location } = BUILDING_INFO.Population[v as keyof typeof BUILDING_INFO.Population];
      return <Building key={v} construct_id={v} width={width} height={height} location={location} fillColor="#54808c"></Building>
    })}
  </>
);

export default PopulationDefsSvg;
