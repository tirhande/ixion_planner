import React, { useState } from 'react';
import { useResetRecoilState, useRecoilState } from 'recoil';
import styled from 'styled-components';

import { ImageButton } from 'components/atoms/ImageButton';
import { ReactComponent as DemolishBuildingIcon } from 'assets/Menus/Default/DemolishBuilding.svg';
import { ReactComponent as DemolishRoadIcon } from 'assets/Menus/Default/DemolishRoad.svg';
import { ReactComponent as RoadIcon } from 'assets/Menus/Default/Road.svg';
import { ReactComponent as ConstructIcon } from 'assets/Menus/Default/Construct.svg';
import { ReactComponent as ResearchIcon } from 'assets/Menus/Default/Research.svg';

import SubMenus from './SubMenus';
import { constructState, roadState } from 'core/states';

const Menus = () => {
  const [isRoadConstruct, setRoadConstruct] = useRecoilState(roadState);
  const resetConstruct = useResetRecoilState(constructState);

  const [isConstruct, setIsConstruct] = useState(false);

  // delBuilding
  // delRoad
  // Road
  // Building
  
  const onMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e.currentTarget);
    console.log(e.currentTarget.name);
  }

  return (
    <>
      {isConstruct && <SubMenus />}
      <MenusSection>
        <ImageButton name="delBuilding" width="61px" height="62px" onClick={onMenuClick}>
          <DemolishBuildingIcon />
        </ImageButton>
        <ImageButton name="delRoad" width="61px" height="62px" onClick={onMenuClick}>
          <DemolishRoadIcon />
        </ImageButton>
        <ImageButton name="consRoad" width="86px" height="85px" onClick={() => {setRoadConstruct(prev => !prev); resetConstruct();}}>
          <RoadIcon fill={isRoadConstruct ? '#dccaa4' : 'black'}/>
        </ImageButton>
        <ImageButton name="consBuilding" width="109px" height="109px" onClick={() => setIsConstruct(prev => !prev)}>
          <ConstructIcon fill={isConstruct ? '#dccaa4' : 'black'}/>
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
  padding: 10px 38%;
  margin:0 auto;
  background: #00000070;
`;