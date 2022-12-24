import { FACTORIES_BUILD } from "./FactoriesEnum";
import { FOOD_BUILD } from "./FoodEnum";
import { MAINTENANCE_BUILD } from "./MaintenanceEnum";
import { POPULATION_BUILD } from "./PopulationEnum";
import { SPACE_BUILD } from "./SpaceEnum";
import { STABILITY_BUILD } from "./StabilityEnum";

export const GRID_SIZE = {
  GRID_WIDTH: 20,
  GRID_HEIGHT: 20
};

// 1120
// 600
export const CANVAS_SIZE = {
  CANVAS_WIDTH: GRID_SIZE.GRID_WIDTH * 56,
  CANVAS_HEIGHT: GRID_SIZE.GRID_HEIGHT * 30
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

export const Specialization = {
  Maintenance: MAINTENANCE_BUILD,
  Space: SPACE_BUILD,
  Factories: FACTORIES_BUILD,
  Population: POPULATION_BUILD,
  Food: FOOD_BUILD,
  Stability: STABILITY_BUILD,
}
// 19

// Specialization	Requirement
// Space T1	4 buildings
// Space T2	7 buildings
// Food T1	6 buildings	
// Food T2	12 Buildings
// Industry T1	6 Buildings
// Industry T2	12 Buildings	
// Population T1	19 Buildings
// Population T2	54 Buildings
// Recycling T1	4 Buildings	
// Recycling T2	10 Buildings