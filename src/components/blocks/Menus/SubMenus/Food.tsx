import React from "react";

import { MenusDiv } from "./styles";

import { ReactComponent as MessHall } from 'assets/Menus/Food/MessHall.svg';
import { ReactComponent as InsectFarm } from 'assets/Menus/Food/InsectFarm.svg';
import { ReactComponent as CropsFarm } from 'assets/Menus/Food/CropsFarm.svg';
import { ReactComponent as CropsFarmField } from 'assets/Menus/Food/CropsFarmField.svg';
import { ReactComponent as AlgaeFarm } from 'assets/Menus/Food/AlgaeFarm.svg';
import { ReactComponent as AlgaeFarmField } from 'assets/Menus/Food/AlgaeFarmField.svg';
import { ReactComponent as MushroomWall } from 'assets/Menus/Food/MushroomWall.svg';
import { IMenuClick, wrapButton } from "components/atoms/WrapMenuButton";
import { BUILDING_INFO } from "utils/GridEnum";

const SubMenus = [
  { id: 'MessHall', child: <MessHall /> },
  { id: 'InsectFarm', child: <InsectFarm /> },
  { id: 'CropsFarm', child: <CropsFarm /> },
  { id: 'CropsFarmField', child: <CropsFarmField /> },
  { id: 'AlgaeFarm', child: <AlgaeFarm /> },
  { id: 'AlgaeFarmField', child: <AlgaeFarmField /> },
  { id: 'MushroomWall', child: <MushroomWall /> },
];

const FoodMenu = ({ onMenuClick }: IMenuClick) => {
  return (
    <MenusDiv>
      {SubMenus.map(({ id, child }) => {
        const { width, height, isWall } = BUILDING_INFO.Food[id as keyof typeof BUILDING_INFO.Food];
        return wrapButton({ id, width, height, isWall, child, onMenuClick });
      })}
    </MenusDiv>
  );
};

export default FoodMenu;