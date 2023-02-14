declare module 'types/Ixion' {
  interface IPoint {
    x: number;
    y: number;
  }
  interface IDimension {
    width: number;
    height: number;
    isPerspective?: boolean;
  }
  interface IConstructBuilding extends IDimension {
    id: string;
    pos: IPoint;
    isWall: boolean;
    degree: number;
  }
  interface IConstructRoad {
    pos: IPoint;
    roadPos: {
      start: boolean;
      direction: string;
    } & IPoint;
    fill: string;
  }
  interface IConstructState extends IDimension {
    isConstruct: boolean;
    construct_id: string;
    isWall: boolean;
    degree: number;
  }
  interface ISectionBuilding {
    [key: number]: IBuilding[];
    1: IBuilding[];
    2: IBuilding[];
    3: IBuilding[];
    4: IBuilding[];
    5: IBuilding[];
    6: IBuilding[];
  }
  interface ISectionRoad {
    [key: number]: IPoint[];
    1: IPoint[];
    2: IPoint[];
    3: IPoint[];
    4: IPoint[];
    5: IPoint[];
    6: IPoint[];
  }
  interface IBuilding extends IPoint, IDimension {
    id: string;
    degree: number;
    isWall: boolean;
  }
  interface IPreBuilding extends IPoint {
    id: string;
    transform: string;
  }
  interface IBlockBuilding extends IPoint, IDimension {
    transform?: string;
  }
  interface ITemplateBuilding extends IDimension {
    construct_id: string;
    location: readonly number[];
    fillColor: string;
    text: string;
  }
  interface IRoad extends IPoint {
    opacity: number;
    fill: string;
  }

  interface IBounds extends IPoint, IDimension {
    transform?: string;
    degree?: number;
  }
  interface IRectangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }
  interface IDiffBounds {
    origin: IBounds;
    diff: IBounds;
  }
  interface IDiffRectangle {
    cur: IRectangle;
    diff: IRectangle;
  }
  interface IFindBuilding extends IPoint, IDimension {
    bx: number;
    by: number;
  }
  interface IMinMaxAngle {
    [key: number]: ({ width, height }: IDimension) => {
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
    };
  }
}

declare module 'types/atoms' {
  interface IStyle {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    name?: string;
    width?: string;
    height?: string;
    title?: string;
  }
  interface IMenuClick {
    onMenuClick: ({ id, width, height, isWall }: IWrapProps) => void;
  }
  interface IWrapProps {
    id: string;
    width: number;
    height: number;
    isWall: boolean;
  }
  interface IWrapButton extends IWrapProps, IMenuClick {
    child: JSX.Element;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_GOOGLE_ANALYTICS_TRAKING_ID: string;
  }
}
