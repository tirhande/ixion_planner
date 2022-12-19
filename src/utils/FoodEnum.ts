// location = [top, right, bottom, left]

export const FOOD_BUILD = {
  MessHall: {
    width: 4,
    height: 6,
    location: [0, 0, 4, 0],
    isWall: false,
  },
  InsectFarm: {
    width: 4,
    height: 8,
    location: [0, 0, 4, 0],
    isWall: false,
  },
  CropsFarm: {
    width: 3,
    height: 6,
    location: [0, 0, 3, 0],
    isWall: false,
  },
  CropsFarmField: {
    width: 4,
    height: 4,
    location: [0, 0, 0, 0],
    isWall: false,
  },
  AlgaeFarm: {
    width: 6,
    height: 4,
    location: [0, 0, 6, 0],
    isWall: false,
  },
  AlgaeFarmField: {
    width: 6,
    height: 4,
    location: [0, 0, 0, 0],
    isWall: false,
  },
  MushroomWall: {
    width: 8,
    height: 4,
    location: [0, 0, 8, 0],
    isWall: true,
  },
} as const;
type FOOD_BUILD = typeof FOOD_BUILD[keyof typeof FOOD_BUILD];