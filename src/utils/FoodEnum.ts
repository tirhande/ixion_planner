// location = [top, right, bottom, left]

export const FOOD_BUILD = {
  MessHall: {
    width: 4,
    height: 6,
    location: [0, 0, 4, 0],
    isWall: false,
    power: 5,
    workers: 5
  },
  InsectFarm: {
    width: 4,
    height: 8,
    location: [0, 0, 4, 0],
    isWall: false,
    power: 5,
    workers: 8
  },
  CropsFarm: {
    width: 3,
    height: 6,
    location: [0, 0, 3, 0],
    isWall: false,
    power: 7,
    workers: 4
  },
  CropsFarmField: {
    width: 4,
    height: 4,
    location: [0, 0, 0, 0],
    isWall: false,
    power: 3,
    workers: 4
  },
  AlgaeFarm: {
    width: 6,
    height: 4,
    location: [0, 0, 6, 0],
    isWall: false,
    power: 9,
    workers: 15
  },
  AlgaeFarmField: {
    width: 6,
    height: 4,
    location: [0, 0, 0, 0],
    isWall: false,
    power: 6,
    workers: 5
  },
  MushroomWall: {
    width: 8,
    height: 4,
    location: [0, 0, 8, 0],
    isWall: true,
    power: 5,
    workers: 10
  },
} as const;
type FOOD_BUILD = typeof FOOD_BUILD[keyof typeof FOOD_BUILD];