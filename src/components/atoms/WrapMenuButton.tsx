import React from "react";
import { t } from "i18next";

import { ImageButton } from "./ImageButton";
import { IWrapButton } from "types/atoms";

const wrapButton = ({ id, width, height, isWall, child, onMenuClick }: IWrapButton) => {
  const title = t(id).replace('|', ' ');
  return (
    <ImageButton key={id} title={title} onClick={() => onMenuClick({ id, width, height, isWall })}>
      {child}
    </ImageButton>
  );
};

export default wrapButton;