import React, { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';

import { buildingState, constructState, menuState, roadState, sectionState } from 'core/states';
import ConstructBuilding from 'components/blocks/ConstructBuilding';
import ConstructRoad from 'components/blocks/ConstructRoad';
import Building from 'components/atoms/Building';
import Road from 'components/atoms/Road';

import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
import { isBannerOverlap, isBuildingOverlap, isInsidePoint } from 'utils/utilFuncs';
import { IPoint } from 'types/Ixion';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const SVGContainer = () => {
  const clickMenu = useRecoilValue(menuState);
  const { isConstruct, construct_id, width, height, isWall, degree } = useRecoilValue(constructState);

  const resetMenu = useResetRecoilState(menuState);
  const resetConstruct = useResetRecoilState(constructState);
  const sectionNumber = useRecoilValue(sectionState);

  const [buildings, setBuildings] = useRecoilState(buildingState);
  const [roads, setRoads] = useRecoilState(roadState);
  
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const [roadPos, setRoadPos] = useState({
    start: false,
    direction: '',
    x: 0,
    y: 0,
  });

  const demolishBuilding = ({ x, y }: IPoint) => {
    setBuildings(prev =>
      ({...prev, [sectionNumber]: prev[sectionNumber].filter(({ x: bx, y: by, width, height }) => !isInsidePoint({ x, y, bx, by, width, height }))})
    );
  };
  const demolishRoad = ({ x, y }: IPoint) => {
    if (roadPos.start) {
      const tmpX = (x - roadPos.x) / GRID_WIDTH;
      const tmpY = (y - roadPos.y) / GRID_HEIGHT;

      const roadArray = Array.from(
        { length: roadPos.direction === 'h' ? Math.abs(tmpX) + 1 : Math.abs(tmpY) + 1 },
        (_, i) => i
      );
      const tmpRoads = roadArray.map(v =>
        roadPos.direction === 'v'
          ? { x: roadPos.x, y: tmpY > 0 ? roadPos.y + v * GRID_HEIGHT : roadPos.y - v * GRID_HEIGHT }
          : { x: tmpX > 0 ? roadPos.x + v * GRID_WIDTH : roadPos.x - v * GRID_WIDTH, y: roadPos.y }
      );
      setRoads(prev =>
        ({...prev, [sectionNumber]: prev[sectionNumber].filter((road) => !tmpRoads.some((tmp) => tmp.x === road.x && tmp.y === road.y))})
      );
      setRoadPos({
        start: false,
        direction: '',
        x: 0,
        y: 0,
      });
    } else {
      setRoadPos({
        ...roadPos,
        start: true,
        x: x,
        y: y,
      });
    }
  }
  
  const constructRoad = ({x, y}: IPoint) => {
    if (roadPos.start) {
      const tmpX = (x - roadPos.x) / GRID_WIDTH;
      const tmpY = (y - roadPos.y) / GRID_HEIGHT;

      const roadArray = Array.from(
        { length: roadPos.direction === 'h' ? Math.abs(tmpX) + 1 : Math.abs(tmpY) + 1 },
        (_, i) => i
      );
      
      const tmpRoads = roadArray
        .map(v =>
          roadPos.direction === 'v'
          ? { x: roadPos.x, y: tmpY > 0 ? roadPos.y + v * GRID_HEIGHT : roadPos.y - v * GRID_HEIGHT }
          : { x: tmpX > 0 ? roadPos.x + v * GRID_WIDTH : roadPos.x - v * GRID_WIDTH, y: roadPos.y }
        )
        .filter(v => !roads[sectionNumber].some(val => val.x === v.x && val.y === v.y));
      
      setRoads(prev =>
        ({...prev, [sectionNumber]: [...prev[sectionNumber], ...tmpRoads]})
      );
      setRoadPos({
        start: false,
        direction: '',
        x: 0,
        y: 0,
      });
    } else {
      setRoadPos({
        ...roadPos,
        start: true,
        x: x,
        y: y,
      });
    }
  };

  const constructBuilding = ({ x, y }: IPoint) => {
    const topLeftX = x - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : -GRID_WIDTH / 2);
    const topLeftY = y - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT / 2);

    const isBuildingWrap = buildings[sectionNumber].some(v =>
      isBuildingOverlap({
        origin: { x: isWall ? x : topLeftX, y: isWall ? y : topLeftY, width: width, height: height, degree: degree },
        diff: { x: v.x, y: v.y, width: v.width, height: v.height, degree: v.degree },
      })
    );

    if (isWall) {
      const stickY = CANVAS_HEIGHT / 2 > y ? 0 : CANVAS_HEIGHT - height * GRID_HEIGHT;
      const isBannerWrap = isBannerOverlap({ x, y: stickY, width, height });

      // 벽이고 안겹칠때
      if (!isBannerWrap && !isBuildingWrap) {
        setBuildings(prev =>
          ({...prev, [sectionNumber]: [...prev[sectionNumber], ...[{ id: construct_id, x: x, y: stickY, degree: stickY === 0 ? 0 : 180, width: width, height: height }]]})
        );
      }
    } else {
      if(!isBuildingWrap) {
        setBuildings(prev =>
          ({...prev, [sectionNumber]: [...prev[sectionNumber], ...[{ id: construct_id, x: topLeftX, y: topLeftY, degree: degree, width: width, height: height }]]})
        );
      }
    }
  };

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.button === 2) {
      resetMenu();
      resetConstruct();
      setRoadPos({
        start: false,
        direction: '',
        x: 0,
        y: 0,
      });
      setPos({
        x: 0,
        y: 0
      })
      return;
    }

    if(e.buttons !== 4) {
      const [x, y] = [
        Math.floor(e.nativeEvent.offsetX / GRID_WIDTH) * GRID_WIDTH,
        Math.floor(e.nativeEvent.offsetY / GRID_HEIGHT) * GRID_HEIGHT,
      ];
      // resetConstruct();

      if(clickMenu === 'delBuilding') demolishBuilding({x, y});
      else if(clickMenu === 'delRoad') demolishRoad({x, y});
      else if(clickMenu === 'consRoad') constructRoad({x, y});
      else if(clickMenu === 'consBuilding') isConstruct && constructBuilding({x, y});
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const [posX, posY] = [
      Math.floor(e.nativeEvent.offsetX / GRID_WIDTH) * GRID_WIDTH,
      Math.floor(e.nativeEvent.offsetY / GRID_HEIGHT) * GRID_HEIGHT,
    ];

    if (clickMenu === 'consRoad' || clickMenu === 'delRoad') {
      if(posX !== pos.x || posY !== pos.y) {
        setPos({
          x: posX,
          y: posY,
        });
      }

      if (roadPos.start && (e.nativeEvent.offsetX % GRID_WIDTH === 0 || e.nativeEvent.offsetY % GRID_HEIGHT === 0)) {
        const direct = Math.abs(roadPos.x - posX) >= Math.abs(roadPos.y - posY) ? 'h' : 'v';
        setRoadPos({
          ...roadPos,
          direction: direct,
        });
      }
    }

    if(isConstruct) {
      if(isWall) {
        const stickWall = CANVAS_HEIGHT / 2 > posY ? 0 : CANVAS_HEIGHT - height * GRID_HEIGHT;
        setPos({
          x: posX,
          y: stickWall,
        });
      } else {
        if(posX !== pos.x || posY !== pos.y) {
          setPos({
            x: posX,
            y: posY,
          });
        }
      }
    }
  };

  return (
    <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onContextMenu={onContextMenu}>
      <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <use xlinkHref="#passage" />
        <g>
          {roads[sectionNumber].map((v, i) => {
            return <Road key={i} x={v.x} y={v.y} opacity={0.6} fill='white'/>;
          })}
        </g>
        <g>
          {buildings[sectionNumber].map((v, i) => {
            return (
              <Building key={v.id + i} id={v.id} x={v.x} y={v.y} degree={v.degree} width={v.width} height={v.height} />
          )})}
        </g>
        {isConstruct && (
          <ConstructBuilding
            id={construct_id}
            pos={pos}
            width={width}
            height={height}
            isWall={isWall}
            degree={degree}
          />
        )}
        {clickMenu === 'consRoad' && <ConstructRoad pos={pos} roadPos={roadPos} fill='white'/>}
        {clickMenu === 'delRoad' && <ConstructRoad pos={pos} roadPos={roadPos} fill='red' />}
      </svg>
    </div>
  );
};

export default SVGContainer;
