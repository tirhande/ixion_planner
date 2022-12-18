import React from "react";

import { ImageButton } from "./ImageButton";

export interface IMenuClick {
  onMenuClick: ({ id, width, height, isWall }: IWrapProps) => void;
}

export interface IWrapProps {
  id: string;
  width: number;
  height: number;
  isWall: boolean;
}
interface IWrapButton extends IWrapProps {
  child: JSX.Element;
}

export const wrapButton = ({ id, width, height, isWall, child, onMenuClick }: IWrapButton & IMenuClick) => (
  <ImageButton key={id} onClick={() => onMenuClick({ id, width, height, isWall })}>
    {child}
  </ImageButton>
);