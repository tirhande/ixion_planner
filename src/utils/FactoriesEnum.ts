// location = [top, right, bottom, left]
export const FACTORIES_BUILD = {
  TechLab: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
  },
  SteelMill: {
    width: 9,
    height: 12,
    location: [0, 0, 9, 0],
    isWall: false,
  },
  ElectronicsFactory: {
    width: 15,
    height: 6,
    location: [0, 0, 15, 0],
    isWall: false,
  },
  PolymerRefinery: {
    width: 9,
    height: 6,
    location: [0, 0, 9, 0],
    isWall: false,
  },
  FusionStation: {
    width: 6,
    height: 12,
    location: [0, 0, 6, 0],
    isWall: false,
  },
  WaterTreatment: {
    width: 5,
    height: 7,
    location: [0, 0, 5, 0],
    isWall: false,
  },
  WasteTreatment: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
  },
  NuclearPowerPlant: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
  }
} as const;
type FACTORIES_BUILD = typeof FACTORIES_BUILD[keyof typeof FACTORIES_BUILD];