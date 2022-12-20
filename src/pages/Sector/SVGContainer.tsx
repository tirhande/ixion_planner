import React, { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';

import { buildingState, constructState, menuState } from 'core/states';
import ConstructBuilding from 'components/blocks/ConstructBuilding';
import ConstructRoad from 'components/blocks/ConstructRoad';
import Building from 'components/atoms/Building';
import Road from 'components/atoms/Road';

import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
import { isInsidePoint, isOverlap } from 'utils/utilFuncs';
import { IPoint } from 'types/Ixion';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

const SVGContainer = () => {
  const clickMenu = useRecoilValue(menuState);
  const { isConstruct, construct_id, width, height, isWall, degree } = useRecoilValue(constructState);
  const resetMenu = useResetRecoilState(menuState);
  const resetConstruct = useResetRecoilState(constructState);

  const [buildings, setBuildings] = useRecoilState(buildingState);

  const [roads, setRoads] = useState<IPoint[]>([]);
  
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
      prev.filter(({ x: bx, y: by, width, height }) => !isInsidePoint({ x, y, bx, by, width, height }))
    );
  };
  const demolishRoad = ({ x, y }: IPoint) => {
    setRoads(prev => prev.filter(road => x !== road.x || y !== road.y));
  }
  
  const constructRoad = ({x, y}: IPoint) => {
    if (roadPos.start) {
      const roadArray = Array.from(
        { length: Math.max((x - roadPos.x) / GRID_WIDTH + 1, (y - roadPos.y) / GRID_HEIGHT + 1) },
        (_, i) => i
      );
      const tmpRoads = roadArray
        .map(v =>
          roadPos.x === x
            ? { x: roadPos.x, y: roadPos.y + v * GRID_HEIGHT }
            : { x: roadPos.x + v * GRID_WIDTH, y: roadPos.y }
        )
        .filter(v => !roads.some(val => val.x === v.x && val.y === v.y));
      setRoads(prev => [...prev, ...tmpRoads]);
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
    const centralX = x - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : -GRID_WIDTH / 2);
    const centralY = y - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT / 2);

    if (isWall) {
      const stickY = CANVAS_HEIGHT / 2 > y ? 0 : CANVAS_HEIGHT - height * GRID_HEIGHT;
      const isWrap = isOverlap({
        l1: { x: x, y: GRID_HEIGHT * height + stickY },
        r1: { x: GRID_WIDTH * width + x, y: y },
        l2: { x: GRID_WIDTH * 24, y: GRID_HEIGHT },
        r2: { x: GRID_WIDTH * 32, y: 0 }
      });

      // 벽이고 안겹칠때
      if (!isWrap) {
        setBuildings(prev => [
          ...prev,
          ...[{ id: construct_id, x: x, y: stickY, degree: degree, width: width, height: height }],
        ]);
      }
    } else {
      setBuildings(prev => [
        ...prev,
        ...[{ id: construct_id, x: centralX, y: centralY, degree: degree, width: width, height: height }],
        // ...[{ id: construct_id, x: (centralX < 0) ? 0 : centralX, y: (centralY < 0) ? 0 : centralY, degree: degree, width: width, height: height }],
      ]);
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
      return;
    }

    const [x, y] = [
      Math.floor(e.nativeEvent.offsetX / GRID_WIDTH) * GRID_WIDTH,
      Math.floor(e.nativeEvent.offsetY / GRID_HEIGHT) * GRID_HEIGHT,
    ];
    // resetConstruct();

    if(clickMenu === 'delBuilding') demolishBuilding({x, y});
    else if(clickMenu === 'delRoad') demolishRoad({x, y});
    else if(clickMenu === 'consRoad') constructRoad({x, y});
    else if(clickMenu === 'consBuilding') isConstruct && constructBuilding({x, y});
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const [posX, posY] = [
      Math.floor(e.nativeEvent.offsetX / GRID_WIDTH) * GRID_WIDTH,
      Math.floor(e.nativeEvent.offsetY / GRID_HEIGHT) * GRID_HEIGHT,
    ];

    if (isConstruct || clickMenu === 'consRoad') {
      if (
        clickMenu === 'consRoad' &&
        roadPos.start &&
        (e.nativeEvent.offsetX % GRID_WIDTH === 0 || e.nativeEvent.offsetY % GRID_HEIGHT === 0)
      ) {
        const direct = Math.abs(roadPos.x - posX) >= Math.abs(roadPos.y - posY) ? 'h' : 'v';
        setRoadPos({
          ...roadPos,
          direction: direct,
        });
        
      }

      if(isConstruct) {
        if(isWall) {
          const stickWall = CANVAS_HEIGHT / 2 > posY ? 0 : CANVAS_HEIGHT - height * GRID_HEIGHT;
          setPos({
            x: posX,
            y: stickWall,
          });
        } else {
          setPos({
            x: posX,
            y: posY,
          });
        }
      } else {
        setPos({
          x: posX,
          y: posY,
        });
      }
      // if (isConstruct && isWall) {
      //   const stickWall = CANVAS_HEIGHT / 2 > posY ? 0 : CANVAS_HEIGHT - height * GRID_HEIGHT;
      //   setPos({
      //     x: posX,
      //     y: stickWall,
      //   });
      // } else {
      //   setPos({
      //     x: posX,
      //     y: posY,
      //   });
      // }
    }
  };

  return (
    <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onContextMenu={onContextMenu}>
      <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <use xlinkHref="#passage" />
        <g>
          {buildings.map((v, i) => {
            return (
              <Building key={v.id + i} id={v.id} x={v.x} y={v.y} degree={v.degree} width={v.width} height={v.height} />
          )})}
        </g>
        <g>
          {roads.map((v, i) => {
            return <Road key={i} x={v.x} y={v.y} opacity={1} />;
          })}
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
        {clickMenu === 'consRoad' && <ConstructRoad pos={pos} roadPos={roadPos} />}
      </svg>
    </div>
  );
};

export default SVGContainer;
