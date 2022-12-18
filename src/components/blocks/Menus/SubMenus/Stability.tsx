import React from "react";

import { MenusDiv } from "./styles";

import { ReactComponent as DataListeningCenter } from 'assets/Menus/Stability/DataListeningCenter.svg';
import { ReactComponent as AlternativeLifeCenter } from 'assets/Menus/Stability/AlternativeLifeCenter.svg';
import { ReactComponent as GeneticConatusMemorial } from 'assets/Menus/Stability/GeneticConatusMemorial.svg';
import { ReactComponent as LunaclysmMemorial } from 'assets/Menus/Stability/LunaclysmMemorial.svg';
import { ReactComponent as MardukMemorial } from 'assets/Menus/Stability/MardukMemorial.svg';
import { ReactComponent as LawEnforcement } from 'assets/Menus/Stability/LawEnforcement.svg';
import { ReactComponent as HullTemple } from 'assets/Menus/Stability/HullTemple.svg';
import { ReactComponent as Observatory } from 'assets/Menus/Stability/Observatory.svg';
import { ReactComponent as ExoFightingDome } from 'assets/Menus/Stability/ExoFightingDome.svg';
import { IMenuClick, wrapButton } from "components/atoms/WrapMenuButton";
import { BUILDING_INFO } from "utils/GridEnum";

const SubMenus = [
  { id: 'DataListeningCenter', child: <DataListeningCenter /> },
  { id: 'AlternativeLifeCenter', child: <AlternativeLifeCenter /> },
  { id: 'GeneticConatusMemorial', child: <GeneticConatusMemorial /> },
  { id: 'LunaclysmMemorial', child: <LunaclysmMemorial /> },
  { id: 'MardukMemorial', child: <MardukMemorial /> },
  { id: 'LawEnforcement', child: <LawEnforcement /> },
  { id: 'HullTemple', child: <HullTemple /> },
  { id: 'Observatory', child: <Observatory /> },
  { id: 'ExoFightingDome', child: <ExoFightingDome /> },
];

const StabilityMenu = ({ onMenuClick }: IMenuClick ) => {
  return (
    <MenusDiv>
      {SubMenus.map(({ id, child }) => {
        const { width, height, isWall } = BUILDING_INFO.Stability[id as keyof typeof BUILDING_INFO.Stability];
        return wrapButton({ id, width, height, isWall, child, onMenuClick });
      })}
    </MenusDiv>
  );
};

export default StabilityMenu;