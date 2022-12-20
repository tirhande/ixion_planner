import { atom } from 'recoil';

import { IConstructState, ISectionBuilding, ISectionRoad } from 'types/Ixion';

export const constructState = atom<IConstructState>({
  key: 'constructState',
  default: {
    isConstruct: false,
    construct_id: "",
    width: 0,
    height: 0,
    isWall: false,
    degree: 0,
  },
});

export const menuState = atom<string>({
  key: 'menuState',
  default: ''
});

export const buildingState = atom<ISectionBuilding>({
  key: 'buildingState',
  default: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }
});
export const roadState = atom<ISectionRoad>({
  key: 'roadState',
  default: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }
});

export const sectionState = atom<number>({
  key: 'sectionState',
  default: 1
})