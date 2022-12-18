import React from 'react';

import { Building } from 'components/atoms/Building';
import { BUILDING_INFO } from 'utils/GridEnum';

const MaintenanceDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Maintenance).map(v => {
      const { width, height, location } = BUILDING_INFO.Maintenance[v as keyof typeof BUILDING_INFO.Maintenance];
      return (
        <Building
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
