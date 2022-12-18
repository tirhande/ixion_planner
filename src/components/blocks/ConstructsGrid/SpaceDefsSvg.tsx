import React from 'react';

import { Building } from 'components/atoms/Building';
import { BUILDING_INFO } from 'utils/GridEnum';

const SpaceDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Space).map((v) => {
      const { width, height, location } = BUILDING_INFO.Space[v as keyof typeof BUILDING_INFO.Space];
      return <Building key={v} construct_id={v} width={width} height={height} location={location} fillColor="#8b7cbd"></Building>
    })}
  </>
);

export default SpaceDefsSvg;
