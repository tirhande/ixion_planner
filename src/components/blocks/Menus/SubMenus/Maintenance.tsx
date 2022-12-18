import React from "react";

import { MenusDiv } from "./styles";
import { ReactComponent as Workshop } from 'assets/Menus/Maintenance/Workshop.svg';
import { ReactComponent as StockS } from 'assets/Menus/Maintenance/StockpileSmall.svg';
import { ReactComponent as StockM } from 'assets/Menus/Maintenance/StockpileMedium.svg';
import { ReactComponent as StockL } from 'assets/Menus/Maintenance/StockpileLarge.svg';
import { ReactComponent as BatteryS } from 'assets/Menus/Maintenance/BatteryT1.svg';
import { ReactComponent as BatteryM } from 'assets/Menus/Maintenance/BatteryT2.svg';
import { ReactComponent as BatteryL } from 'assets/Menus/Maintenance/BatteryT3.svg';
import { ReactComponent as FireStation } from 'assets/Menus/Maintenance/FireStation.svg';
import { ReactComponent as DroneBay } from 'assets/Menus/Maintenance/DroneLandingBay.svg';

import { IMenuClick, wrapButton } from "components/atoms/WrapMenuButton";
import { BUILDING_INFO } from "utils/GridEnum";

const SubMenus = [
  { id: 'Workshop', child: <Workshop /> },
  { id: 'StockpileSmall',child: <StockS /> },
  { id: 'StockpileMedium', child: <StockM /> },
  { id: 'StockpileLarge', child: <StockL /> },
  { id: 'BatteryT1', child: <BatteryS /> },
  { id: 'BatteryT2', child: <BatteryM /> },
  { id: 'BatteryT3', child: <BatteryL /> },
  { id: 'FireStation', child: <FireStation /> },
  { id: 'DroneBay', child: <DroneBay /> },
];

const MaintenanceMenu = ({ onMenuClick }: IMenuClick) => {
  
  return (
    <MenusDiv>
      {SubMenus.map(({ id, child }) => {
        const { width, height, isWall } = BUILDING_INFO.Maintenance[id as keyof typeof BUILDING_INFO.Maintenance];
        return wrapButton({ id, width, height, isWall, child, onMenuClick });
      })}
    </MenusDiv>
  );
};

export default MaintenanceMenu;