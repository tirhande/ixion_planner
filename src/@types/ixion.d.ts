declare module 'types/Ixion' {
  interface IPoint {
    x: number;
    y: number;
  }
  interface IDimension {
    width: number;
    height: number;
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
    } & IPoint
  }
  interface IConstructState extends IDimension {
    isConstruct: boolean;
    construct_id: string;
    isWall: boolean;
    degree: number;
  }
  interface IBuilding extends IPoint, IDimension {
    id: string;
    degree: number;
  }
  interface IPreBuilding extends IDimension {
    construct_id: string;
    location: readonly number[];
    fillColor: string;
  }
  interface IRoad extends IPoint {
    opacity: number;
  }

  // used util/funcs
  interface IRectangle {
    l1: IPoint;
    r1: IPoint;
    l2: IPoint;
    r2: IPoint;
  }
  
  interface IFindBuilding extends IPoint, IDimension {
    bx: number;
    by: number;
  }
}

declare module 'types/atoms' {
  interface IStyle {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    name?: string;
    width?: string;
    height?: string;
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