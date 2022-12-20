import React from 'react';

import PreBuilding from 'components/atoms/PreBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const FactoriesDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Factories).map((v) => {
      const { width, height, location } = BUILDING_INFO.Factories[v as keyof typeof BUILDING_INFO.Factories];
      return <PreBuilding key={v} construct_id={v} width={width} height={height} location={location} fillColor="#d06e69"></PreBuilding>
    })}
  </>
);

export default FactoriesDefsSvg;
