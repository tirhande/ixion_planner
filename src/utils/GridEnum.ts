import { FACTORIES_BUILD } from "./FactoriesEnum";
import { FOOD_BUILD } from "./FoodEnum";
import { MAINTENANCE_BUILD } from "./MaintenanceEnum";
import { POPULATION_BUILD } from "./PopulationEnum";
import { SPACE_BUILD } from "./SpaceEnum";
import { STABILITY_BUILD } from "./StabilityEnum";

export const GRID_SIZE = {
  grid_width: 20,
  grid_height: 20
};

export const BUILDING_INFO = {
  Maintenance: MAINTENANCE_BUILD,
  Space: SPACE_BUILD,
  Factories: FACTORIES_BUILD,
  Population: POPULATION_BUILD,
  Food: FOOD_BUILD,
  Stability: STABILITY_BUILD,
} as const;
type BUILDING_INFO = typeof BUILDING_INFO[keyof typeof BUILDING_INFO];