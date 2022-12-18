// location = [top, right, bottom, left]
// special = [food, Industry, population, space, recycling]
export const MAINTENANCE_BUILD = {
  Workshop: {
    width: 4,
    height: 4,
    location: [0, 0, 4, 0],
    isWall: false,
    special: [],
  },
  StockpileSmall: {
    width: 4,
    height: 4,
    location: [0, 0, 4, 0],
    isWall: false,
  },
  StockpileMedium: {
    width: 8,
    height: 4,
    location: [0, 0, 8, 0],
    isWall: false,
  },
  StockpileLarge: {
    width: 8,
    height: 8,
    location: [0, 0, 8, 0],
    isWall: false,
  },
  BatteryT1: {
    width: 3,
    height: 3,
    location: [3, 3, 3, 3],
    isWall: false,
  },
  BatteryT2: {
    width: 5,
    height: 5,
    location: [5, 5, 5, 5],
    isWall: false,
  },
  BatteryT3: {
    width: 7,
    height: 7,
    location: [7, 7, 7, 7],
    isWall: false,
  },
  FireStation: {
    width: 6,
    height: 6,
    location: [0, 0, 6, 0],
    isWall: false,
  },
  DroneBay: {
    width: 8,
    height: 8,
    location: [0, 0, 8, 0],
    isWall: false,
  },
} as const;
type MAINTENANCE_BUILD = typeof MAINTENANCE_BUILD[keyof typeof MAINTENANCE_BUILD];