// location = [top, right, bottom, left]
export const POPULATION_BUILD = {
  BaseQuarter: {
    width: 3,
    height: 3,
    location: [3, 3, 3, 3],
    isWall: false,
  },
  AdvancedQuarter: {
    width: 6,
    height: 3,
    location: [6, 3, 6, 3],
    isWall: false,
  },
  DomoticQuarter: {
    width: 6,
    height: 3,
    location: [6, 3, 6, 3],
    isWall: false,
  },
  CellHousing: {
    width: 8,
    height: 2,
    location: [0, 0, 8, 0],
    isWall: true,
  },
  CryonicCenter: {
    width: 7,
    height: 5,
    location: [0, 0, 7, 0],
    isWall: false,
  },
  Infirmary: {
    width: 3,
    height: 6,
    location: [0, 0, 3, 0],
    isWall: false,
  },
  HealthCenter: {
    width: 8,
    height: 8,
    location: [0, 0, 8, 0],
    isWall: false,
  },
} as const;
type POPULATION_BUILD = typeof POPULATION_BUILD[keyof typeof POPULATION_BUILD];