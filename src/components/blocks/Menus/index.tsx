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
import { ReactComponent as FlipHorizontalIcon } from 'assets/Menus/Default/FlipHorizontal.svg';
import { ReactComponent as FlipVerticalIcon } from 'assets/Menus/Default/FlipVertical.svg';
import { ReactComponent as Rotate180Icon } from 'assets/Menus/Default/Rotate180.svg';

import SubMenus from './SubMenus';
import { buildingState, constructState, menuState, roadState, sectionState, visibleState } from 'core/states';
import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
import { adjustPoint, getOriginFromVisualBox, isWallOnBanner } from 'utils/utilFuncs';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const Menus = () => {
  const { t } = useTranslation();
  const [clickMenu, setClickMenu] = useRecoilState(menuState);
  const sectionNumber = useRecoilValue(sectionState);

  const [isVisible, setIsVisible] = useRecoilState(visibleState);
  const setRoads = useSetRecoilState(roadState);
  const [buildings, setBuildings] = useRecoilState(buildingState);

  const resetConstruct = useResetRecoilState(constructState);

  const onMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const menuName = e.currentTarget.name;

    if (e.shiftKey && (menuName === 'delBuilding' || menuName === 'delRoad')) {
      const confirmText = t(menuName === 'delBuilding' ? 'deleteAllBuildings' : 'deleteAllRoads');
      if (confirm(confirmText)) {
        if (menuName === 'delBuilding') setBuildings(prev => ({ ...prev, [sectionNumber]: [] }));
        else setRoads(prev => ({ ...prev, [sectionNumber]: [] }));
      }
      return;
    }

    resetConstruct();
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

  // Round-trip through the on-screen box: mirroring stored x/y directly drifts off-grid (see adjustPoint).
  const transformBuilding = <T extends { x: number; y: number; width: number; height: number; degree: number }>(
    b: T,
    mirrorBox: (box: { x1: number; y1: number; x2: number; y2: number }) => { x1: number; yTop: number },
    nextDegree: (degree: number) => number
  ): T => {
    const box = adjustPoint({ x: b.x, y: b.y, width: b.width, height: b.height, degree: b.degree });
    const degree = nextDegree(b.degree);
    const { x1, yTop } = mirrorBox(box);
    const { x, y } = getOriginFromVisualBox({ x1, yTop, width: b.width, height: b.height, degree });
    return { ...b, x, y, degree };
  };

  // Mirroring only swaps the headings perpendicular to the mirror axis; both axes at once is a 180 rotation.
  const applyTransform = (flipX: boolean, flipY: boolean) => {
    const next = buildings[sectionNumber].map(b =>
      transformBuilding(
        b,
        box => ({ x1: flipX ? CANVAS_WIDTH - box.x2 : box.x1, yTop: flipY ? CANVAS_HEIGHT - box.y1 : box.y2 }),
        d => ((flipX && d % 180 !== 0) || (flipY && d % 180 === 0) ? (d + 180) % 360 : d)
      )
    );
    if (isWallOnBanner(next)) {
      alert(t('bannerBlocked'));
      return;
    }
    setBuildings(prev => ({ ...prev, [sectionNumber]: next }));
    setRoads(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(r => ({
        ...r,
        x: flipX ? CANVAS_WIDTH - r.x - GRID_WIDTH : r.x,
        y: flipY ? CANVAS_HEIGHT - r.y - GRID_HEIGHT : r.y,
      })),
    }));
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
        <ImageButton
          name="flipHorizontal"
          width="61px"
          height="61px"
          title={t('flipHorizontal') ?? undefined}
          onClick={() => applyTransform(true, false)}
        >
          <FlipHorizontalIcon />
        </ImageButton>
        <ImageButton
          name="flipVertical"
          width="61px"
          height="61px"
          title={t('flipVertical') ?? undefined}
          onClick={() => applyTransform(false, true)}
        >
          <FlipVerticalIcon />
        </ImageButton>
        <ImageButton
          name="rotate180"
          width="61px"
          height="61px"
          title={t('rotate180') ?? undefined}
          onClick={() => applyTransform(true, true)}
        >
          <Rotate180Icon />
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
