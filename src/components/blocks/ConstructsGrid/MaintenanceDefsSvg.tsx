import React from 'react';

import TemplateBuilding from 'components/atoms/TemplateBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const MaintenanceDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Maintenance).map(v => {
      const { width, height, location } = BUILDING_INFO.Maintenance[v as keyof typeof BUILDING_INFO.Maintenance];
      return (
        <TemplateBuilding
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
