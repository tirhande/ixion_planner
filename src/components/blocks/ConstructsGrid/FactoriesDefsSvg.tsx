import React from 'react';

import { Building } from 'components/atoms/Building';
import { BUILDING_INFO } from 'utils/GridEnum';

const FactoriesDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Factories).map((v) => {
      const { width, height, location } = BUILDING_INFO.Factories[v as keyof typeof BUILDING_INFO.Factories];
      return <Building key={v} construct_id={v} width={width} height={height} location={location} fillColor="#d06e69"></Building>
    })}
  </>
);

export default FactoriesDefsSvg;
