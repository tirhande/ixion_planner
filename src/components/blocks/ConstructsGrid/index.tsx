import React from 'react';

import MaintenanceDefsSvg from './MaintenanceDefsSvg';
import SpaceDefsSvg from './SpaceDefsSvg';
import FactoriesDefsSvg from './FactoriesDefsSvg';
import PopulationDefsSvg from './PopulationDefsSvg';
import FoodDefsSvg from './FoodDefsSvg';
import StabilityDefsSvg from './StabilityDefsSvg';
import RoadDefsSvg from './RoadDefsSvg';

const ConstructsGrid = () => {
  return (
    <>
      <RoadDefsSvg />
      <MaintenanceDefsSvg />
      <SpaceDefsSvg />
      <FactoriesDefsSvg />
      <PopulationDefsSvg />
      <FoodDefsSvg />
      <StabilityDefsSvg />
    </>
  );
};

export default ConstructsGrid;
