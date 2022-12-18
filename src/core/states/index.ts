import { atom } from 'recoil';

export interface IConstructState {
  isConstruct: boolean;
  construct_id: string;
  width: number;
  height: number;
  isWall: boolean;
  degree: number;
}

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