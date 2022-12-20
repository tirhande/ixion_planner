import React from "react";

import { MenusDiv } from "./styles";

import { ReactComponent as TechLab } from 'assets/Menus/Factories/TechLab.svg';
import { ReactComponent as SteelMill } from 'assets/Menus/Factories/SteelMill.svg';
import { ReactComponent as ElectronicsFactory } from 'assets/Menus/Factories/ElectronicsFactory.svg';
import { ReactComponent as PolymerRefinery } from 'assets/Menus/Factories/PolymerRefinery.svg';
import { ReactComponent as FusionStation } from 'assets/Menus/Factories/FusionStation.svg';
import { ReactComponent as WaterTreatment } from 'assets/Menus/Factories/WaterTreatment.svg';
import { ReactComponent as WasteTreatment } from 'assets/Menus/Factories/WasteTreatment.svg';
import { ReactComponent as NuclearPowerPlant } from 'assets/Menus/Factories/NuclearPowerPlant.svg';

import wrapButton from "components/atoms/WrapMenuButton";
import { BUILDING_INFO } from "utils/GridEnum";
import { IMenuClick } from "types/atoms";

const SubMenus = [
  { id: 'TechLab', child: <TechLab /> },
  { id: 'SteelMill', child: <SteelMill /> },
  { id: 'ElectronicsFactory', child: <ElectronicsFactory /> },
  { id: 'PolymerRefinery', child: <PolymerRefinery /> },
  { id: 'FusionStation', child: <FusionStation /> },
  { id: 'WaterTreatment', child: <WaterTreatment /> },
  { id: 'WasteTreatment', child: <WasteTreatment /> },
  { id: 'NuclearPowerPlant', child: <NuclearPowerPlant /> },
];

const FactoriesMenu = ({ onMenuClick }: IMenuClick) => {
  return (
    <MenusDiv>
      {SubMenus.map(({ id, child }) => {
        const { width, height, isWall } = BUILDING_INFO.Factories[id as keyof typeof BUILDING_INFO.Factories];
        return wrapButton({ id, width, height, isWall, child, onMenuClick });
      })}
    </MenusDiv>
  );
};

export default FactoriesMenu;