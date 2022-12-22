import React from 'react';
import { TFunction } from 'i18next';

import TemplateBuilding from 'components/atoms/TemplateBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const MaintenanceDefsSvg = ({ t }: { t: TFunction }) => (
  <>
    {Object.keys(BUILDING_INFO.Maintenance).map(v => {
      const { width, height, location } = BUILDING_INFO.Maintenance[v as keyof typeof BUILDING_INFO.Maintenance];
      return (
        <TemplateBuilding
          key={v}
          construct_id={v}
          text={t(v)}
          width={width}
          height={height}
          location={location}
          fillColor="#bc915d"
        />
      );
    })}
  </>
);

export default MaintenanceDefsSvg;
