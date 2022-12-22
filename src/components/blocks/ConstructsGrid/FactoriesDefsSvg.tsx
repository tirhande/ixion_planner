import React from 'react';
import { TFunction } from 'i18next';

import TemplateBuilding from 'components/atoms/TemplateBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const FactoriesDefsSvg = ({ t }: { t: TFunction }) => (
  <>
    {Object.keys(BUILDING_INFO.Factories).map((v) => {
      const { width, height, location } = BUILDING_INFO.Factories[v as keyof typeof BUILDING_INFO.Factories];
      return (
        <TemplateBuilding
          key={v}
          construct_id={v}
          text={t(v)}
          width={width}
          height={height}
          location={location}
          fillColor="#d06e69"
        />
      );
    })}
  </>
);

export default FactoriesDefsSvg;
