// location = [top, right, bottom, left]
export const STABILITY_BUILD = {
  DataListeningCenter: {
    width: 5,
    height: 7,
    location: [0, 0, 5, 0],
    isWall: false,
  },
  AlternativeLifeCenter: {
    width: 6,
    height: 5,
    location: [0, 0, 6, 0],
    isWall: false,
  },
  GeneticConatusMemorial: {
    width: 7,
    height: 7,
    location: [0, 0, 7, 0],
    isWall: false,
  },
  LunaclysmMemorial: {
    width: 7,
    height: 7,
    location: [0, 0, 7, 0],
    isWall: false,
  },
  MardukMemorial: {
    width: 7,
    height: 7,
    location: [0, 0, 7, 0],
    isWall: false,
  },
  LawEnforcement: {
    width: 6,
    height: 6,
    location: [0, 0, 6, 0],
    isWall: false,
  },
  HullTemple: {
    width: 4,
    height: 8,
    location: [0, 0, 4, 0],
    isWall: true,
  },
  Observatory: {
    width: 12,
    height: 3,
    location: [0, 0, 12, 0],
    isWall: true,
  },
  ExoFightingDome: {
    width: 14,
    height: 14,
    location: [14, 14, 14, 14],
    isWall: false,
  },
} as const;
type STABILITY_BUILD = typeof STABILITY_BUILD[keyof typeof STABILITY_BUILD];
