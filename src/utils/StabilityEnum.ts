// location = [top, right, bottom, left]
export const STABILITY_BUILD = {
  DataListeningCenter: {
    width: 5,
    height: 7,
    location: [0, 0, 5, 0],
    isWall: false,
    power: 5,
    workers: 3,
  },
  AlternativeLifeCenter: {
    width: 6,
    height: 5,
    location: [0, 0, 6, 0],
    isWall: false,
    power: 6,
    workers: 10,
    specialisation: {
      population: 28
    }
  },
  GeneticConatusMemorial: {
    width: 7,
    height: 7,
    location: [0, 0, 7, 0],
    isWall: false,
    power: 0,
    workers: 0,
    specialisation: {
      population: 49
    }
  },
  LunaclysmMemorial: {
    width: 7,
    height: 7,
    location: [0, 0, 7, 0],
    isWall: false,
    power: 0,
    workers: 0,
    specialisation: {
      population: 49
    }
  },
  MardukMemorial: {
    width: 7,
    height: 7,
    location: [0, 0, 7, 0],
    isWall: false,
    power: 0,
    workers: 0,
    specialisation: {
      population: 49
    }
  },
  LawEnforcement: {
    width: 6,
    height: 6,
    location: [0, 0, 6, 0],
    isWall: false,
    power: 6,
    workers: 10,
  },
  HullTemple: {
    width: 4,
    height: 8,
    location: [0, 0, 4, 0],
    isWall: true,
    power: 7,
    workers: 10,
    specialization: {
      population: 32
  },
  Observatory: {
    width: 12,
    height: 3,
    location: [0, 0, 12, 0],
    isWall: true,
    power: 0,
    workers: 0,
    specialization: {
      population: 36
    }
  },
  ExoFightingDome: {
    width: 14,
    height: 14,
    location: [14, 14, 14, 14],
    isWall: false,
    power: 40,
    workers: 20,
    specialisation: {
      population: 100
    }
  },
} as const;
type STABILITY_BUILD = typeof STABILITY_BUILD[keyof typeof STABILITY_BUILD];
