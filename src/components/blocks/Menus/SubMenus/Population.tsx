import React from "react";

import { MenusDiv } from "./styles";

import { ReactComponent as BaseQuarter } from 'assets/Menus/Population/BaseQuarter.svg';
import { ReactComponent as AdvancedQuarter } from 'assets/Menus/Population/AdvancedQuarter.svg';
import { ReactComponent as DomoticQuarter } from 'assets/Menus/Population/DomoticQuarter.svg';
import { ReactComponent as CellHousing } from 'assets/Menus/Population/CellHousing.svg';
import { ReactComponent as CryonicCenter } from 'assets/Menus/Population/CryonicCenter.svg';
import { ReactComponent as Infirmary } from 'assets/Menus/Population/Infirmary.svg';
import { ReactComponent as HealthCenter } from 'assets/Menus/Population/HealthCenter.svg';

import wrapButton from "components/atoms/WrapMenuButton";
import { BUILDING_INFO } from "utils/GridEnum";
import { IMenuClick } from "types/atoms";

const SubMenus = [
  { id: 'BaseQuarter', child: <BaseQuarter /> },
  { id: 'AdvancedQuarter', child: <AdvancedQuarter /> },
  { id: 'DomoticQuarter', child: <DomoticQuarter /> },
  { id: 'CellHousing', isWall: true, child: <CellHousing /> },
  { id: 'CryonicCenter', child: <CryonicCenter /> },
  { id: 'Infirmary', child: <Infirmary /> },
  { id: 'HealthCenter', child: <HealthCenter /> },
];

const PopulationMenu = ({ onMenuClick }: IMenuClick) => {
  return (
    <MenusDiv>
      {SubMenus.map(({ id, child }) => {
        const { width, height, isWall } = BUILDING_INFO.Population[id as keyof typeof BUILDING_INFO.Population];
        return wrapButton({ id, width, height, isWall, child, onMenuClick });
      })}
    </MenusDiv>
  );
};

export default PopulationMenu;