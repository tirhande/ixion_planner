import React from "react";

import { MenusDiv } from "./styles";
import { ReactComponent as DockingBay } from 'assets/Menus/Space/DockingBay.svg';
import { ReactComponent as EVAAirlock } from 'assets/Menus/Space/EVAAirlock.svg';
import { ReactComponent as ProbeLauncher } from 'assets/Menus/Space/ProbeLauncher.svg';
import { ReactComponent as ColonyTrainingCenter } from 'assets/Menus/Space/ColonyTrainingCenter.svg';
import { ReactComponent as BioengineeringCenter } from 'assets/Menus/Space/BioengineeringCenter.svg';

import wrapButton from "components/atoms/WrapMenuButton";
import { BUILDING_INFO } from "utils/GridEnum";
import { IMenuClick } from "types/atoms";


const SubMenus = [
  { id: 'DockingBay', child: <DockingBay /> },
  { id: 'EVAAirlock', child: <EVAAirlock /> },
  { id: 'ProbeLauncher', child: <ProbeLauncher /> },
  { id: 'ColonyTrainingCenter', child: <ColonyTrainingCenter /> },
  { id: 'BioengineeringCenter', child: <BioengineeringCenter /> },
];

const SpaceMenu = ({ onMenuClick }: IMenuClick) => {
  return (
    <MenusDiv>
      {SubMenus.map(({ id, child }) => {
        const { width, height, isWall } = BUILDING_INFO.Space[id as keyof typeof BUILDING_INFO.Space];
        return wrapButton({ id, width, height, isWall, child, onMenuClick });
      })}
    </MenusDiv>
  );
};

export default SpaceMenu;