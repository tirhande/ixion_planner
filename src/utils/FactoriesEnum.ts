// location = [top, right, bottom, left]
export const FACTORIES_BUILD = {
  TechLab: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
    power: 12,
    workers: 30,
    specialisation: {
      space: 81
    }
  },
  SteelMill: {
    width: 9,
    height: 12,
    location: [0, 0, 9, 0],
    isWall: false,
    power: 15,
    workers: 30,
    specialisation: {
      industry: 16
    }
  },
  ElectronicsFactory: {
    width: 15,
    height: 6,
    location: [0, 0, 15, 0],
    isWall: false,
    power: 30,
    workers: 30,
    specialisation: {
      industry: 90
    }
  },
  PolymerRefinery: {
    width: 9,
    height: 6,
    location: [0, 0, 9, 0],
    isWall: false,
    power: 5,
    workers: 15,
    specialisation: {
      industry: 54
    }
  },
  FusionStation: {
    width: 6,
    height: 12,
    location: [0, 0, 6, 0],
    isWall: false,
    power: 10,
    workers: 10,
    specialisation: {
      industry: 72,
      food: 72,
    }
  },
  WaterTreatment: {
    width: 5,
    height: 7,
    location: [0, 0, 5, 0],
    isWall: false,
    power: 100,
    workers: 10,
    specialisation: {
      industry: 35,
      recycling: 35
    }
  },
  WasteTreatment: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
    power: 15,
    workers: 20,
    specialisation: {
      industry: 81,
      recycling: 81,
    }
  },
  NuclearPowerPlant: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
    power: 20,
    workers: 60,
  },
} as const;
type FACTORIES_BUILD = typeof FACTORIES_BUILD[keyof typeof FACTORIES_BUILD];
