import { atom } from 'recoil';

// export interface IQueries {
//   page?: number;
//   limit?: number;
//   broker?: string;
//   active?: string;
//   status?: string;
//   q?: string;
// }

// export const queriesState = atom<IQueries>({
//   key: 'queriesState',
//   default: {
//     page: 1,
//     limit: 10,
//     broker: '',
//     active: '',
//     status: '',
//     q: '',
//   },
// });

export const dragState = atom<boolean>({
  key: 'dragState',
  default: false,
});
