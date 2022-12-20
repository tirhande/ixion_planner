// location = [top, right, bottom, left]
export const SPACE_BUILD = {
  DockingBay: {
    width: 12,
    height: 9,
    location: [0, 0, 8, 0],
    isWall: true,
  },
  EVAAirlock: {
    width: 12,
    height: 9,
    location: [0, 0, 8, 0],
    isWall: true,
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
  },
} as const;
type SPACE_BUILD = typeof SPACE_BUILD[keyof typeof SPACE_BUILD];