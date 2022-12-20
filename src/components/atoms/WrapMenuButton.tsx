import React from "react";

import { ImageButton } from "./ImageButton";
import { IWrapButton } from "types/atoms";

const wrapButton = ({ id, width, height, isWall, child, onMenuClick }: IWrapButton) => (
  <ImageButton key={id} onClick={() => onMenuClick({ id, width, height, isWall })}>
    {child}
  </ImageButton>
);

export default wrapButton;