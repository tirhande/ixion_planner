import React, { useState } from 'react';
import { useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

import { constructState, roadState } from 'core/states';
import ConstructsGrid from './ConstructsGrid';
import { CANVAS_SIZE, GRID_SIZE } from 'utils/GridEnum';
import ConstructBuilding from './ConstructBuilding';
import ConstructRoad from './ConstructRoad';
import { Road } from 'components/atoms/Road';
import Building from 'components/atoms/Building';

export interface IPoint {
  x: number;
  y: number;
}
export interface IBuilding extends IPoint {
  id: string;
  degree: number;
  width: number;
  height: number;
}

const { CANVAS_WIDTH, CANVAS_HEIGHT } = CANVAS_SIZE;
const { GRID_WIDTH, GRID_HEIGHT } = GRID_SIZE;

export const isOverlap = (l1: IPoint, r1: IPoint, l2: IPoint, r2: IPoint) => {
  if (l1.x === r1.x || l1.y === r1.y || r2.x === l2.x || l2.y === r2.y) return false;
  if (l1.x >= r2.x || l2.x >= r1.x) return false;
  if (r1.y >= l2.y || r2.y >= l1.y) return false;
  return true;
};

const SVGStage = () => {
  const { isConstruct, construct_id, width, height, isWall, degree } = useRecoilValue(constructState);
  const [isRoadConstruct, setRoadConstrct] = useRecoilState(roadState);
  const resetConstruct = useResetRecoilState(constructState);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [roads, setRoads] = useState<IPoint[]>([]);

  const [roadPos, setRoadPos] = useState({
    start: false,
    direction: '',
    x: 0,
    y: 0,
  });

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const [posX, posY] = [
      Math.floor(e.nativeEvent.offsetX / GRID_WIDTH) * GRID_WIDTH,
      Math.floor(e.nativeEvent.offsetY / GRID_HEIGHT) * GRID_HEIGHT,
    ];

    if (isConstruct) {
      setRoadConstrct(false);

      if (e.button !== 2) {
        const centralX = posX - (GRID_WIDTH * width) / 2 + GRID_WIDTH + (width % 2 === 0 ? 0 : -GRID_WIDTH / 2);
        const centralY = posY - (GRID_HEIGHT * height) / 2 + (height % 2 === 0 ? 0 : GRID_HEIGHT / 2);

        if (isWall) {
          const stickY = CANVAS_HEIGHT / 2 > posY ? 0 : CANVAS_HEIGHT - height * GRID_HEIGHT;
          const isWrap = isOverlap(
            { x: posX, y: GRID_HEIGHT * height + stickY },
            { x: GRID_WIDTH * width + posX, y: posY },
            { x: GRID_WIDTH * 24, y: GRID_HEIGHT },
            { x: GRID_WIDTH * 32, y: 0 }
          );

          // 벽이고 안겹칠때
          if (!isWrap) {
            setBuildings(prev => [
              ...prev,
              ...[{ id: construct_id, x: posX, y: stickY, degree: degree, width: width, height: height }],
            ]);
          }
        } else {
          setBuildings(prev => [
            ...prev,
            ...[{ id: construct_id, x: centralX, y: centralY, degree: degree, width: width, height: height }],
            // ...[{ id: construct_id, x: (centralX < 0) ? 0 : centralX, y: (centralY < 0) ? 0 : centralY, degree: degree, width: width, height: height }],
          ]);
        }
      } else {
        // 마우스 우클릭
        resetConstruct();
      }
    } else if (isRoadConstruct) {
      resetConstruct();

      if (e.button !== 2) {
        if (roadPos.start) {
          const roadArray = Array.from(
            { length: Math.max((posX - roadPos.x) / GRID_WIDTH + 1, (posY - roadPos.y) / GRID_HEIGHT + 1) },
            (_, i) => i
          );
          const tmpRoads = roadArray
            .map(v =>
              roadPos.x === posX
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
            x: posX,
            y: posY,
          });
        }
      } else {
        setRoadPos({
          start: false,
          direction: '',
          x: 0,
          y: 0,
        });
        setRoadConstrct(false);
      }
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const [posX, posY] = [
      Math.floor(e.nativeEvent.offsetX / GRID_WIDTH) * GRID_WIDTH,
      Math.floor(e.nativeEvent.offsetY / GRID_HEIGHT) * GRID_HEIGHT,
    ];
    // 4, 4   20, 40
    // 8, 4   60, 40
    if (isConstruct || isRoadConstruct) {
      if (
        isRoadConstruct &&
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
        <defs>
          <pattern id="grid" width={GRID_WIDTH} height={GRID_HEIGHT} patternUnits="userSpaceOnUse">
            <path
              d={`M ${GRID_WIDTH} 0 L 0 0 0 ${GRID_HEIGHT}`}
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity={0.5}
            />
          </pattern>
          <g id="passage" opacity={0.8} fill="#d6b138">
            {[4, 13, 16, 25].map(v => {
              return (
                <g key={v}>
                  <polygon
                    points={`0 ${GRID_WIDTH * v}, 8 ${GRID_WIDTH * v + GRID_WIDTH / 2}, 0 ${GRID_WIDTH * (v + 1)}`}
                  />
                  <polygon
                    points={`${CANVAS_WIDTH} ${GRID_WIDTH * v}, ${CANVAS_WIDTH - 8} ${
                      GRID_WIDTH * v + GRID_WIDTH / 2
                    }, ${CANVAS_WIDTH} ${GRID_WIDTH * (v + 1)}`}
                  />
                </g>
              );
            })}
          </g>
          <ConstructsGrid />
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <use xlinkHref="#passage" />
        {buildings.map((v, i) => (
          <Building
            key={i}
            id={v.id}
            x={v.x}
            y={v.y}
            degree={v.degree}
            width={v.width}
            height={v.height}
          />
        ))}
        {roads.map((v, i) => {
          return <Road key={i} x={v.x} y={v.y} opacity={1} />;
        })}
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
        {isRoadConstruct && <ConstructRoad pos={pos} roadPos={roadPos} />}
      </svg>
    </div>
  );
};

export default SVGStage;
