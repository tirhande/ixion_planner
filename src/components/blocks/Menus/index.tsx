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
import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
import { adjustPoint, getOriginFromVisualBox } from 'utils/utilFuncs';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const FlipHorizontalIcon = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path d="M50 10 V90" stroke={fill} strokeWidth="6" strokeDasharray="6 6" />
    <path d="M20 25 H42 V75 H20 Z" fill={fill} />
    <path d="M80 25 H58 V75 H80 Z" fill="none" stroke={fill} strokeWidth="4" />
  </svg>
);

const FlipVerticalIcon = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path d="M10 50 H90" stroke={fill} strokeWidth="6" strokeDasharray="6 6" />
    <path d="M25 20 V42 H75 V20 Z" fill={fill} />
    <path d="M25 80 V58 H75 V80 Z" fill="none" stroke={fill} strokeWidth="4" />
  </svg>
);

const Rotate180Icon = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path
      d="M75 30 A30 30 0 1 0 75 70"
      fill="none"
      stroke={fill}
      strokeWidth="8"
    />
    <path d="M75 14 L92 30 L75 46 Z" fill={fill} />
  </svg>
);

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

  const flipDegreeHorizontal = (degree: number) => (degree % 180 !== 0 ? (degree + 180) % 360 : degree);
  const flipDegreeVertical = (degree: number) => (degree % 180 === 0 ? (degree + 180) % 360 : degree);
  const rotateDegree180 = (degree: number) => (degree + 180) % 360;

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

  const onFlipHorizontal = () => {
    setBuildings(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(b =>
        transformBuilding(b, box => ({ x1: CANVAS_WIDTH - box.x2, yTop: box.y2 }), flipDegreeHorizontal)
      ),
    }));
    setRoads(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(r => ({ ...r, x: CANVAS_WIDTH - r.x - GRID_WIDTH })),
    }));
  };

  const onFlipVertical = () => {
    setBuildings(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(b =>
        transformBuilding(b, box => ({ x1: box.x1, yTop: CANVAS_HEIGHT - box.y1 }), flipDegreeVertical)
      ),
    }));
    setRoads(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(r => ({ ...r, y: CANVAS_HEIGHT - r.y - GRID_HEIGHT })),
    }));
  };

  const onRotate180 = () => {
    setBuildings(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(b =>
        transformBuilding(
          b,
          box => ({ x1: CANVAS_WIDTH - box.x2, yTop: CANVAS_HEIGHT - box.y1 }),
          rotateDegree180
        )
      ),
    }));
    setRoads(prev => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber].map(r => ({
        ...r,
        x: CANVAS_WIDTH - r.x - GRID_WIDTH,
        y: CANVAS_HEIGHT - r.y - GRID_HEIGHT,
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
        <ImageButton name="flipHorizontal" width="61px" height="61px" title={t('flipHorizontal') ?? undefined} onClick={onFlipHorizontal}>
          <FlipHorizontalIcon fill="black" />
        </ImageButton>
        <ImageButton name="flipVertical" width="61px" height="61px" title={t('flipVertical') ?? undefined} onClick={onFlipVertical}>
          <FlipVerticalIcon fill="black" />
        </ImageButton>
        <ImageButton name="rotate180" width="61px" height="61px" title={t('rotate180') ?? undefined} onClick={onRotate180}>
          <Rotate180Icon fill="black" />
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
