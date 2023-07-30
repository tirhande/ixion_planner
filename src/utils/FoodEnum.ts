// location = [top, right, bottom, left]

export const FOOD_BUILD = {
  MessHall: {
    width: 4,
    height: 6,
    location: [0, 0, 4, 0],
    isWall: false,
    power: 5,
    workers: 5,
    specialisation: {
      food: 24,
      population: 24
    }
  },
  InsectFarm: {
    width: 4,
    height: 8,
    location: [0, 0, 4, 0],
    isWall: false,
    power: 5,
    workers: 8,
    specialisation: {
      food: 32
    }
  },
  CropsFarm: {
    width: 3,
    height: 6,
    location: [0, 0, 3, 0],
    isWall: false,
    power: 7,
    workers: 4,
    specialisation: {
      food: 18
    }
  },
  CropsFarmField: {
    width: 4,
    height: 4,
    location: [0, 0, 0, 0],
    isWall: false,
    power: 3,
    workers: 4,
    specialisation: {
      food: 18
    }
  },
  AlgaeFarm: {
    width: 6,
    height: 4,
    location: [0, 0, 6, 0],
    isWall: false,
    power: 9,
    workers: 15,
    specialisation: {
      food: 24
    }
  },
  AlgaeFarmField: {
    width: 6,
    height: 4,
    location: [0, 0, 0, 0],
    isWall: false,
    power: 6,
    workers: 5,
    specialisation: {
      food: 24
    }
  },
  MushroomWall: {
    width: 8,
    height: 4,
    location: [0, 0, 8, 0],
    isWall: true,
    power: 5,
    workers: 10,
    specialisation: {
      food: 81,
      recycling: 81,
    }
  },
} as const;
type FOOD_BUILD = typeof FOOD_BUILD[keyof typeof FOOD_BUILD];