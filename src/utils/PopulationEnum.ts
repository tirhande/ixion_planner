// location = [top, right, bottom, left]
export const POPULATION_BUILD = {
  BaseQuarter: {
    width: 3,
    height: 3,
    location: [3, 3, 3, 3],
    isWall: false,
    power: 1,
    workers: 0,
    housing: 15,
    specialisation: {
      population: 9
    }
  },
  AdvancedQuarter: {
    width: 6,
    height: 3,
    location: [6, 3, 6, 3],
    isWall: false,
    power: 2,
    workers: 0,
    housing: 40,
    specialisation: {
      population: 9
    }
  },
  DomoticQuarter: {
    width: 6,
    height: 3,
    location: [6, 3, 6, 3],
    isWall: false,
    power: 2,
    workers: 0,
    housing: 60,
    specialisation: {
      population: 18
    }
  },
  CellHousing: {
    width: 8,
    height: 2,
    location: [0, 0, 8, 0],
    isWall: true,
    power: 3,
    workers: 0,
    housing: 125,
    specialisation: {
      population: 16
    }
  },
  CryonicCenter: {
    width: 7,
    height: 5,
    location: [0, 0, 7, 0],
    isWall: false,
    power: 5,
    workers: 15,
  },
  Infirmary: {
    width: 3,
    height: 6,
    location: [0, 0, 3, 0],
    isWall: false,
    power: 3,
    workers: 5,
  },
  HealthCenter: {
    width: 8,
    height: 8,
    location: [0, 0, 8, 0],
    isWall: false,
    power: 40,
    workers: 50,
  },
} as const;
type POPULATION_BUILD = typeof POPULATION_BUILD[keyof typeof POPULATION_BUILD];