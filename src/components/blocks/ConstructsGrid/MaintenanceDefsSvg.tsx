import React from 'react';

import PreBuilding from 'components/atoms/PreBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const MaintenanceDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Maintenance).map(v => {
      const { width, height, location } = BUILDING_INFO.Maintenance[v as keyof typeof BUILDING_INFO.Maintenance];
      return (
        <PreBuilding
          key={v}
          construct_id={v}
          width={width}
          height={height}
          location={location}
          fillColor="#ebb674"
        />
      );
    })}
  </>
);

export default MaintenanceDefsSvg;
