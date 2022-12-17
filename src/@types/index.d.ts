export type SliceState = {
  searchWord: string;
  isOpen: boolean;
  itemsLength: number;
  selectIndex: number;
};

export interface ISicks {
  sickCd: string;
  sickNm: string;
}

export interface IResultItems {
  read(): [] | ISicks[];
}
