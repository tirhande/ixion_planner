import React, { useState } from 'react';
import styled from 'styled-components';

// import { useSetRecoilState } from 'recoil';
// import { dragState } from 'core/states';

import { ImageButton } from 'components/atoms/ImageButton';
import { ReactComponent as DemolishBuildingIcon } from 'assets/Menus/Default/DemolishBuilding.svg';
import { ReactComponent as DemolishRoadIcon } from 'assets/Menus/Default/DemolishRoad.svg';
import { ReactComponent as RoadIcon } from 'assets/Menus/Default/Road.svg';
import { ReactComponent as ConstructIcon } from 'assets/Menus/Default/Construct.svg';
import { ReactComponent as ResearchIcon } from 'assets/Menus/Default/Research.svg';
import SubMenus from './SubMenus';


const MenusSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: start;

  width: 24%;
  margin:0 auto;
`;

const Menus = () => {
  const [isConstruct, setIsConstruct] = useState(false);
  // const setIsDrag = useSetRecoilState(dragState);

  // const onConstruction = () => {
  //   setIsDrag(prev => !prev);
  // }

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
        <ImageButton width="86px" height="85px">
          <RoadIcon />
        </ImageButton>
        <ImageButton onClick={() => setIsConstruct(prev => !prev)} width="109px" height="109px">
          <ConstructIcon />
        </ImageButton>
        <ImageButton width="86px" height="85px">
          <ResearchIcon />
        </ImageButton>
      </MenusSection>
    </>
  );
};

export default Menus;
