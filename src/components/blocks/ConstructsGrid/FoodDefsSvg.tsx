import React from 'react';

import TemplateBuilding from 'components/atoms/TemplateBuilding';
import { BUILDING_INFO } from 'utils/GridEnum';

const FoodDefsSvg = () => (
  <>
    {Object.keys(BUILDING_INFO.Food).map((v) => {
      const { width, height, location } = BUILDING_INFO.Food[v as keyof typeof BUILDING_INFO.Food];
      return (
        <TemplateBuilding
          key={v}
          construct_id={v}
          width={width}
          height={height}
          location={location}
          fillColor="#9ec282"
        />
      );
    })}
  </>
);

export default FoodDefsSvg;
