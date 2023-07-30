// location = [top, right, bottom, left]
// special = [food, Industry, population, space, recycling]
export const MAINTENANCE_BUILD = {
  Workshop: {
    width: 4,
    height: 4,
    location: [0, 0, 4, 0],
    isWall: false,
    special: [],
    power: 2,
    workers: 4,
    specialisation: {
      industry: 16
    }
  },
  StockpileSmall: {
    width: 4,
    height: 4,
    location: [0, 0, 4, 0],
    isWall: false,
    power: 3,
    workers: 5
  },
  StockpileMedium: {
    width: 8,
    height: 4,
    location: [0, 0, 8, 0],
    isWall: false,
    power: 4,
    workers: 8
  },
  StockpileLarge: {
    width: 8,
    height: 8,
    location: [0, 0, 8, 0],
    isWall: false,
    power: 5,
    workers: 12
  },
  BatteryT1: {
    width: 3,
    height: 3,
    location: [3, 3, 3, 3],
    isWall: false,
    power: 0,
    battery: 100,
    workers: 0
  },
  BatteryT2: {
    width: 5,
    height: 5,
    location: [5, 5, 5, 5],
    isWall: false,
    power: 0,
    battery: 300,
    workers: 0
  },
  BatteryT3: {
    width: 7,
    height: 7,
    location: [7, 7, 7, 7],
    isWall: false,
    power: 0,
    battery: 700,
    workers: 0
  },
  FireStation: {
    width: 6,
    height: 6,
    location: [0, 0, 6, 0],
    isWall: false,
    power: 5,
    workers: 10,
    specialisation: {
      industry: 36
    }
  },
  DroneBay: {
    width: 8,
    height: 8,
    location: [0, 0, 8, 0],
    isWall: false,
    power: 30,
    workers: 10,
    specialisation: {
      industry: 64
    }
  },
} as const;
type MAINTENANCE_BUILD = typeof MAINTENANCE_BUILD[keyof typeof MAINTENANCE_BUILD];