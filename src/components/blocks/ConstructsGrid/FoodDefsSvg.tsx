import React from 'react';
import { TFunction } from 'i18next';

import TemplateBuilding from 'components/atoms/TemplateBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const FoodDefsSvg = ({ t }: { t: TFunction }) => (
  <>
    {Object.keys(BUILDING_INFO.Food).map(v => {
      const { width, height, location } = BUILDING_INFO.Food[v as keyof typeof BUILDING_INFO.Food];
      return (
        <TemplateBuilding
          key={v}
          construct_id={v}
          text={t(v)}
          width={width}
          height={height}
          location={location}
          fillColor="#8cae72"
        />
      );
    })}
  </>
);

export default FoodDefsSvg;
