import React from 'react';
import { useResetRecoilState, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { ImageButton } from 'components/atoms/ImageButton';
import { ReactComponent as DemolishBuildingIcon } from 'assets/Menus/Default/DemolishBuilding.svg';
import { ReactComponent as DemolishRoadIcon } from 'assets/Menus/Default/DemolishRoad.svg';
import { ReactComponent as RoadIcon } from 'assets/Menus/Default/Road.svg';
import { ReactComponent as ConstructIcon } from 'assets/Menus/Default/Construct.svg';
import { ReactComponent as ResearchIcon } from 'assets/Menus/Default/Research.svg';

import SubMenus from './SubMenus';
import { constructState, menuState } from 'core/states';

const Menus = () => {
  const [clickMenu, setClickMenu] = useRecoilState(menuState);
  const resetConstruct = useResetRecoilState(constructState);

  const onMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    resetConstruct();
    const menuName = e.currentTarget.name;
    setClickMenu(clickMenu === menuName ? '' : menuName);
  }

  return (
    <>
      {clickMenu === 'consBuilding' && <SubMenus />}
      <MenusSection>
        <ImageButton name="delBuilding" width="61px" height="62px" onClick={onMenuClick}>
          <DemolishBuildingIcon fill={clickMenu === 'delBuilding' ? '#dccaa4' : 'black'}/>
        </ImageButton>
        <ImageButton name="delRoad" width="61px" height="62px" onClick={onMenuClick}>
          <DemolishRoadIcon fill={clickMenu === 'delRoad' ? '#dccaa4' : 'black'}/>
        </ImageButton>
        {/* <ImageButton name="consRoad" width="86px" height="85px" onClick={() => {setRoadConstruct(prev => !prev); resetConstruct();}}> */}
        <ImageButton name="consRoad" width="86px" height="85px" onClick={onMenuClick}>
          <RoadIcon fill={clickMenu === 'consRoad' ? '#dccaa4' : 'black'}/>
        </ImageButton>
        {/* <ImageButton name="consBuilding" width="109px" height="109px" onClick={() => setIsConstruct(prev => !prev)}> */}
        <ImageButton name="consBuilding" width="109px" height="109px" onClick={onMenuClick}>
          <ConstructIcon fill={clickMenu === 'consBuilding' ? '#dccaa4' : 'black'}/>
        </ImageButton>
        <ImageButton width="86px" height="85px">
          <ResearchIcon />
        </ImageButton>
      </MenusSection>
    </>
  );
};

export default Menus;

const MenusSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: start;

  width: 100%;
  padding: 5px 38%;
  margin:0 auto;
  background: #00000070;
`;