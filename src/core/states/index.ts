import { atom } from 'recoil';

import { IBuilding, IConstructState } from 'types/Ixion';

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

export const roadState = atom<boolean>({
  key: 'roadState',
  default: false
});

export const menuState = atom<string>({
  key: 'menuState',
  default: ''
});

export const buildingState = atom<IBuilding[]>({
  key: 'buildingState',
  default: []
});