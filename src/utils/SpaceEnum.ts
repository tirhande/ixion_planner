// location = [top, right, bottom, left]
export const SPACE_BUILD = {
  DockingBay: {
    width: 12,
    height: 9,
    location: [0, 0, 8, 0],
    isWall: true,
    power: 14,
    workers: 12,
  },
  EVAAirlock: {
    width: 12,
    height: 9,
    location: [0, 0, 8, 0],
    isWall: true,
    power:12,
    workers: 9,
  },
  ProbeLauncher: {
    width: 12,
    height: 9,
    location: [0, 0, 8, 0],
    isWall: true,
  },
  ColonyTrainingCenter: {
    width: 9,
    height: 9,
    location: [0, 0, 9, 0],
    isWall: false,
    power: 2,
    workers: 4,
  },
  BioengineeringCenter: { // What is this?
    width: 14,
    height: 14,
    location: [0, 0, 0, 14],
    isWall: false,
    power: 0,
    workers: 0,
  },
} as const;
type SPACE_BUILD = typeof SPACE_BUILD[keyof typeof SPACE_BUILD];