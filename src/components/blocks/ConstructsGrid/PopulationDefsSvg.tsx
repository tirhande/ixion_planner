import React from 'react';

import TemplateBuilding from 'components/atoms/TemplateBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const PopulationDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Population).map((v) => {
      const { width, height, location } = BUILDING_INFO.Population[v as keyof typeof BUILDING_INFO.Population];
      return (
        <TemplateBuilding
          key={v}
          construct_id={v}
          width={width}
          height={height}
          location={location}
          fillColor="#54808c"
        />
      );
    })}
  </>
);

export default PopulationDefsSvg;
