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

const MenusSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: start;

  width: 24%;
  margin:0 auto;
`;

const Menus = () => {
  const [isRoadConstruct, setRoadConstruct] = useRecoilState(roadState);
  const resetConstruct = useResetRecoilState(constructState);

  const [isConstruct, setIsConstruct] = useState(false);

  return (
    <>
      {isConstruct && <SubMenus />}
      <MenusSection>
        <ImageButton width="61px" height="62px">
          <DemolishBuildingIcon />
        </ImageButton>
        <ImageButton width="61px" height="62px">
          <DemolishRoadIcon />
        </ImageButton>
        <ImageButton width="86px" height="85px" onClick={() => {setRoadConstruct(prev => !prev); resetConstruct();}}>
          <RoadIcon fill={isRoadConstruct ? '#dccaa4' : 'black'}/>
        </ImageButton>
        <ImageButton width="109px" height="109px" onClick={() => setIsConstruct(prev => !prev)}>
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
