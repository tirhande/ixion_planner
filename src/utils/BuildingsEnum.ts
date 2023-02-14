import { FACTORIES_BUILD } from 'utils/FactoriesEnum';
import { FOOD_BUILD } from 'utils/FoodEnum';
import { MAINTENANCE_BUILD } from 'utils/MaintenanceEnum';
import { POPULATION_BUILD } from 'utils/PopulationEnum';
import { SPACE_BUILD } from 'utils/SpaceEnum';
import { STABILITY_BUILD } from 'utils/StabilityEnum';

const BUILDINGS = Object.assign(
  FACTORIES_BUILD,
  FOOD_BUILD,
  MAINTENANCE_BUILD,
  POPULATION_BUILD,
  SPACE_BUILD,
  STABILITY_BUILD
);

export default BUILDINGS;
