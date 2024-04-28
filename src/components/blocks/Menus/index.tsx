import React from 'react';
import { useResetRecoilState, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ImageButton } from 'components/atoms/ImageButton';
import { ReactComponent as DemolishBuildingIcon } from 'assets/Menus/Default/DemolishBuilding.svg';
import { ReactComponent as DemolishRoadIcon } from 'assets/Menus/Default/DemolishRoad.svg';
import { ReactComponent as RoadIcon } from 'assets/Menus/Default/Road.svg';
import { ReactComponent as ConstructIcon } from 'assets/Menus/Default/Construct.svg';
// import { ReactComponent as ResearchIcon } from 'assets/Menus/Default/Research.svg';
import { ReactComponent as ShowHideIcon } from 'assets/Menus/Default/ShowHide.svg';
import { ReactComponent as ResetLayoutIcon } from 'assets/Menus/Default/ResetLayout.svg';

import SubMenus from './SubMenus';
import { buildingState, constructState, menuState, roadState, sectionState, visibleState } from 'core/states';

const Menus = () => {
  const { t } = useTranslation();
  const [clickMenu, setClickMenu] = useRecoilState(menuState);
  const sectionNumber = useRecoilValue(sectionState);

  const [isVisible, setIsVisible] = useRecoilState(visibleState);
  const setRoads = useSetRecoilState(roadState);
  const setBuildings = useSetRecoilState(buildingState);

  const resetConstruct = useResetRecoilState(constructState);

  const onMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    resetConstruct();
    const menuName = e.currentTarget.name;
    setClickMenu(clickMenu === menuName ? '' : menuName);

    if (menuName === 'consRoad') setIsVisible(true);
  };
  const onShowHide = () => {
    setIsVisible(prev => !prev);
  };
  const onResetLayout = () => {
    const confirmText = t('resetLayout');
    if (confirm(confirmText)) {
      setBuildings(prev => ({ ...prev, [sectionNumber]: [] }));
      setRoads(prev => ({ ...prev, [sectionNumber]: [] }));
    }
  };

  return (
    <>
      {clickMenu === 'consBuilding' && <SubMenus />}
      <MenusSection>
        <ImageButton name="delBuilding" width="61px" height="62px" onClick={onMenuClick}>
          <DemolishBuildingIcon fill={clickMenu === 'delBuilding' ? '#dccaa4' : 'black'} />
        </ImageButton>
        <ImageButton name="delRoad" width="61px" height="62px" onClick={onMenuClick}>
          <DemolishRoadIcon fill={clickMenu === 'delRoad' ? '#dccaa4' : 'black'} />
        </ImageButton>
        <ImageButton name="consRoad" width="81px" height="80px" onClick={onMenuClick}>
          <RoadIcon fill={clickMenu === 'consRoad' ? '#dccaa4' : 'black'} />
        </ImageButton>
        <ImageButton name="consBuilding" width="90px" height="90px" onClick={onMenuClick}>
          <ConstructIcon fill={clickMenu === 'consBuilding' ? '#dccaa4' : 'black'} />
        </ImageButton>
        {/* <ImageButton width="86px" height="85px">
          <ResearchIcon />
        </ImageButton> */}
        <ImageButton name="showHideRoad" width="81px" height="80px" onClick={onShowHide}>
          <ShowHideIcon fill={isVisible ? '#dccaa4' : 'black'} />
        </ImageButton>
        <ImageButton name="resetLayout" width="81px" height="80px" onClick={onResetLayout}>
          <ResetLayoutIcon fill="black" />
        </ImageButton>
      </MenusSection>
    </>
  );
};

export default Menus;

const MenusSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  z-index: 3;
  width: 28%;
  margin: 0 auto;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
