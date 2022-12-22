import React from 'react';
import { useTranslation } from 'react-i18next';

import MaintenanceDefsSvg from './MaintenanceDefsSvg';
import SpaceDefsSvg from './SpaceDefsSvg';
import FactoriesDefsSvg from './FactoriesDefsSvg';
import PopulationDefsSvg from './PopulationDefsSvg';
import FoodDefsSvg from './FoodDefsSvg';
import StabilityDefsSvg from './StabilityDefsSvg';
import RoadDefsSvg from './RoadDefsSvg';

const ConstructsGrid = () => {
  const { t } = useTranslation();

  return (
    <>
      <RoadDefsSvg />
      <MaintenanceDefsSvg t={t} />
      <SpaceDefsSvg t={t} />
      <FactoriesDefsSvg t={t} />
      <PopulationDefsSvg t={t} />
      <FoodDefsSvg t={t} />
      <StabilityDefsSvg t={t} />
    </>
  );
};

export default ConstructsGrid;
